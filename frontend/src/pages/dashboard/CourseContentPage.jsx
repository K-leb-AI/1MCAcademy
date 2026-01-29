import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import { useUser } from "../../utils/UserProvider";
import { Check } from "lucide-react";

const CourseContentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedUser, isLoading } = useUser();

  const pathParts = location.pathname.split("/").filter(Boolean);
  const lessonId = pathParts[pathParts.length - 1];
  const courseId = pathParts[pathParts.length - 2];

  console.log(lessonId);

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [courseLessons, setCourseLessons] = useState([]);
  const [embeddedUrl, setEmbeddedUrl] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  // Helper to extract embed URL
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const videoIdMatch = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  // Handle lesson completion with proper course filtering
  const handleLessonComplete = useCallback(async () => {
    if (!loggedUser || !selectedLesson || !courseLessons.length) return;

    try {
      const { data: checkLessonData, error: checkError } = await supabase
        .from("user_lessons")
        .select("*")
        .eq("lesson_id", selectedLesson.id)
        .eq("user_id", loggedUser.id)
        .eq("course_id", courseId)
        .eq("completed", true)
        .single();

      const { data: user_course_id, error } = await supabase
        .from("user_courses")
        .select("id")
        .eq("course_id", courseId)
        .eq("user_id", loggedUser.id)
        .single();

      if (error) throw Error(error);

      const { data: updateProfileData, error: updateProfileError } =
        await supabase
          .from("profile")
          .update({
            last_course_id: user_course_id.id,
          })
          .eq("user_id", loggedUser.id);

      console.log(updateProfileData);
      console.log(updateProfileError);

      // Lesson already completed - just update last_lesson_id
      if (checkLessonData) {
        await supabase
          .from("user_courses")
          .update({
            last_lesson_id: selectedLesson.id,
          })
          .eq("user_id", loggedUser.id)
          .eq("course_id", courseId)
          .select("id");

        console.log(user_course_id);

        return;
      }

      // Insert completion record
      const { error: lessonError } = await supabase
        .from("user_lessons")
        .insert({
          user_id: loggedUser.id,
          lesson_id: selectedLesson.id,
          course_id: courseId,
          completed: true,
        });

      if (lessonError) throw lessonError;

      // Count completed lessons for THIS course only
      const { data: completedLessons, error: completedError } = await supabase
        .from("user_lessons")
        .select("id")
        .eq("user_id", loggedUser.id)
        .eq("course_id", courseId)
        .eq("completed", true);

      if (completedError) throw completedError;

      const totalLessons = courseLessons.length;
      const progressPercentage = Math.floor(
        ((completedLessons?.length || 0) / totalLessons) * 100
      );

      // Update course progress
      const { error: progressError } = await supabase
        .from("user_courses")
        .update({
          progress: progressPercentage,
          last_lesson_id: selectedLesson.id,
        })
        .eq("user_id", loggedUser.id)
        .eq("course_id", courseId);

      if (progressError) throw progressError;

      // Update local state to reflect completion
      setCurrentCourse((prev) => ({
        ...prev,
        progress: progressPercentage,
      }));

      toast.success(`Lesson completed! Progress: ${progressPercentage}%`);
    } catch (err) {
      console.error("Error in handleLessonComplete:", err);
      toast.error("Could not update lesson progress.");
    }
  }, [loggedUser, selectedLesson, courseLessons, courseId]);

  // Fetch lessons and user progress
  useEffect(() => {
    if (!lessonId || !courseId || !loggedUser?.id) return;

    const handleLessonFetch = async () => {
      try {
        const { data: fetchLessonsData, error: fetchLessonsError } =
          await supabase
            .from("lessons")
            .select(
              ` id,
                title,
                description,
                video_url,
                course_id,
                course: course_id (title),
                user_lessons(lesson_id, completed, user_id)
                `
            )
            .eq("course_id", courseId)
            .eq("user_lessons.user_id", loggedUser.id)
            .order("id", { ascending: true });

        console.log(fetchLessonsData);

        if (fetchLessonsError) throw fetchLessonsError;
        if (!fetchLessonsData?.length) {
          toast.error("No lessons found for this course.");
          navigate(-1);
          return;
        }

        const selected = fetchLessonsData.find(
          (lesson) => lesson.id === lessonId
        );

        if (!selected) {
          toast.error("Lesson not found.");
          navigate(-1);
          return;
        }

        const { data: courseData, error: courseError } = await supabase
          .from("user_courses")
          .select("*")
          .eq("user_id", loggedUser.id)
          .eq("course_id", courseId)
          .single();

        if (courseError) throw courseError;

        setSelectedLesson(selected);
        setCourseLessons(fetchLessonsData);
        setCurrentCourse(courseData);
        setEmbeddedUrl(getEmbedUrl(selected.video_url));
      } catch (err) {
        console.error("Error fetching lesson:", err);
        toast.error("Something went wrong while loading the lesson.");
      } finally {
        setIsFetching(false);
      }
    };

    handleLessonFetch();
  }, [lessonId, courseId, loggedUser?.id, navigate]);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }, []);

  // Initialize YouTube player with completion handler
  useEffect(() => {
    if (!window.YT || !embeddedUrl || !selectedLesson) return;

    let player;

    const onYouTubeIframeAPIReady = () => {
      setTimeout(() => {
        player = new window.YT.Player(`youtube-player-${selectedLesson.id}`, {
          events: {
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                handleLessonComplete();
              }
            },
            onReady: () => {
              setPlayerReady(true);
            },
          },
          playerVars: {
            autoplay: 0,
            controls: 1,
            origin: window.location.origin,
          },
        });
      }, 300);
    };

    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    // return () => {
    //   if (player && typeof player.destroy === "function") {
    //     player.destroy();
    //   }
    // };
  }, [embeddedUrl, selectedLesson, handleLessonComplete]);

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (!selectedLesson || !currentCourse) return null;

  // Find lesson index (1-based for display, 0-based for array)
  const currentLessonIndex = courseLessons.findIndex(
    (l) => l.id === selectedLesson.id
  );
  const isFirstLesson = currentLessonIndex === 0;
  const isLastLesson = currentLessonIndex === courseLessons.length - 1;
  const canFinish = isLastLesson && currentCourse.progress === 100;

  const handlePrevious = () => {
    if (!isFirstLesson) {
      navigate(
        `/dashboard/courses/${courseId}/${
          courseLessons[currentLessonIndex - 1].id
        }`
      );
    }
  };

  const handleNext = () => {
    if (isLastLesson && canFinish) {
      finishCourse();
    } else if (!isLastLesson) {
      navigate(
        `/dashboard/courses/${courseId}/${
          courseLessons[currentLessonIndex + 1].id
        }`
      );
    }
  };

  const finishCourse = async () => {
    try {
      setIsFetching(true);
      const { error: finishError } = await supabase
        .from("user_courses")
        .update({ status: "completed" })
        .eq("user_id", loggedUser.id)
        .eq("course_id", courseId);

      if (finishError) throw finishError;

      toast.success("Congratulations on finishing the course!");
      navigate("/dashboard/courses");
    } catch (err) {
      console.error("Finish Error:", err);
      toast.error("Failed to finish course.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="mb-5 px-4 md:px-10 grid md:grid-cols-3 gap-5 mt-10">
      {/* Left: Video and content */}
      <div className="col-span-1 md:col-span-2">
        <div className="w-full aspect-video rounded-xl overflow-hidden bg-sidebar">
          <iframe
            id={`youtube-player-${selectedLesson.id}`}
            width="100%"
            height="100%"
            src={`${embeddedUrl}?enablejsapi=1&origin=${window.location.origin}`}
            title={selectedLesson.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>

        <div className="mt-8">
          <p className="text-3xl font-bold">{selectedLesson.title}</p>
          <p className="text-lg text-foreground/70 mt-2">
            {selectedLesson.course[0]?.title || "Course"}
          </p>
          <p className="text-sm leading-6 text-foreground/50 mt-3 text-justify">
            {selectedLesson.description}
          </p>
        </div>
      </div>

      {/* Right: Lesson list */}
      <div className="w-full h-[55vh] md:h-[84vh] col-span-1 rounded-xl border border-border relative">
        <div className="bg-sidebar/60 p-4 font-semibold text-lg border-border border-b rounded-tl-xl">
          {selectedLesson.course[0]?.title || "Lessons"} Lesson List
        </div>

        <ul className="overflow-y-scroll h-[70%]">
          {courseLessons.map((lesson) => {
            const isCompleted = lesson.user_lessons?.some(
              (ul) => ul.completed === true
            );
            const isSelected = selectedLesson.id === lesson.id;

            return (
              <li
                key={lesson.id}
                className={`py-5 px-3 border-b border-border text-sm duration-300 cursor-pointer
                  ${isSelected ? "bg-accent text-foreground" : ""}
                  ${
                    isCompleted && !isSelected
                      ? "bg-accent/20 text-foreground/50"
                      : ""
                  }
                  ${!isSelected && !isCompleted ? "hover:bg-accent/50" : ""}
                `}
                onClick={() =>
                  navigate(`/dashboard/courses/${courseId}/${lesson.id}`)
                }
              >
                {lesson.title}
                {isCompleted && !isSelected && (
                  <Check className="ml-2 text-sm inline" size={14} />
                )}
              </li>
            );
          })}
        </ul>

        <div className="absolute bottom-0 w-full">
          <div className="flex items-center w-full">
            <div
              className={`border-t border-r border-border flex items-center justify-center py-4 w-1/2 duration-300 ${
                !isFirstLesson
                  ? "hover:bg-accent/50 cursor-pointer"
                  : "bg-accent/50 text-foreground/30 cursor-not-allowed"
              }`}
              onClick={handlePrevious}
            >
              Previous
            </div>
            <div
              className={`border-t border-border flex items-center justify-center py-4 w-1/2 duration-300 ${
                canFinish
                  ? "bg-primary hover:bg-primary/80 text-white cursor-pointer"
                  : isLastLesson
                  ? "bg-accent/50 text-foreground/30 cursor-not-allowed"
                  : "hover:bg-accent/50 cursor-pointer"
              }`}
              onClick={handleNext}
            >
              {canFinish ? "Finish Course" : "Next"}
            </div>
          </div>
          <div className="bg-sidebar/60 p-4 font-semibold text-sm rounded-br-xl rounded-bl-xl border-t border-border flex items-center gap-3">
            <p className="w-3/10">Current Progress:</p>
            <div className="w-7/10 flex items-center gap-2">
              <div className="w-full rounded-xl bg-sidebar h-2 relative">
                <div
                  className="absolute rounded-xl bg-primary h-2 top-0 left-0 transition-all duration-500"
                  style={{ width: `${currentCourse?.progress || 0}%` }}
                ></div>
              </div>
              <div className="ml-1 p-2 bg-accent rounded-lg">
                {currentCourse?.progress || 0}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContentPage;
