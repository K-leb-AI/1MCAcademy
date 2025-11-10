import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import toast from "react-hot-toast";
import { PiSpinner } from "react-icons/pi";

const CourseContentPage = () => {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);
  const lessonId = pathParts[pathParts.length - 1];
  const courseId = pathParts[pathParts.length - 2];
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [courseLessons, setCourseLessons] = useState([]);
  const [embeddedUrl, setEmbeddedUrl] = useState(null);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Converts any YouTube URL into an embeddable one
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const videoIdMatch = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  useEffect(() => {
    if (!lessonId || !courseId) return;

    const handleLessonFetch = async () => {
      try {
        // ✅ Check authentication
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          toast.error("Please log in again.");
          navigate("/");
          return;
        }

        // ✅ Fetch all lessons for the course
        const { data: fetchLessonsData, error: fetchLessonsError } =
          await supabase
            .from("lessons")
            .select("*, course: course_id (title)")
            .eq("course_id", courseId);

        const { data: courseProgressData, error: courseProgressError } =
          await supabase
            .from("user_courses")
            .select("progress")
            .eq("user_id", user.id)
            .single();

        if (fetchLessonsError) {
          console.error("Error fetching lesson:", fetchLessonsError.message);
          toast.error("Error fetching lesson details.");
          navigate(-1);
          return;
        }

        if (!fetchLessonsData || fetchLessonsData.length === 0) {
          toast.error("No lessons found for this course.");
          navigate(-1);
          return;
        }

        // ✅ Find the selected lesson
        const selected = fetchLessonsData.find(
          (lesson) => String(lesson.id) === String(lessonId)
        );

        if (!selected) {
          toast.error("Lesson not found.");
          navigate(-1);
          return;
        }

        setSelectedLesson({ ...selected, ...courseProgressData });
        setCourseLessons(fetchLessonsData);
        setEmbeddedUrl(getEmbedUrl(selected.video_url));
      } catch (err) {
        console.error("Unexpected error:", err);
        toast.error("Something went wrong while loading the lesson.");
      } finally {
        setIsLoading(false);
      }
    };

    handleLessonFetch();
  }, [lessonId, courseId, navigate]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-background flex-col gap-3">
        <PiSpinner className="animate-spin" size={40} />
        <p className="mt-4 text-foreground">Loading...</p>
      </div>
    );

  if (!selectedLesson) return null;

  return (
    <div className="mb-5 px-4 md:px-10 grid md:grid-cols-3 gap-5 mt-10">
      {/* Left: Video and content */}
      <div className="col-span-1 md:col-span-2">
        <div className="w-full aspect-video rounded-xl overflow-hidden">
          <iframe
            key={selectedLesson.id}
            width="100%"
            height="100%"
            src={`${embeddedUrl}?autoplay=1`}
            title={selectedLesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>

        <div className="mt-8">
          <p className="text-3xl font-bold">{selectedLesson.title}</p>
          <p className="text-lg text-foreground/70 mt-2">
            {selectedLesson.course.title}
          </p>
          <p className="text-sm leading-6 text-foreground/50 mt-3 text-justify">
            {selectedLesson.description}
          </p>
        </div>
      </div>

      {/* Right: Lesson list */}
      <div className="w-full h-[55vh] md:h-[84vh] col-span-1 rounded-xl border border-border relative">
        <div className="bg-sidebar/60 p-4 font-semibold text-lg border-border border-b rounded-tl-xl">
          {selectedLesson.course.title} Lesson List
        </div>

        <div className="bg-sidebar/60 p-4 w-full font-semibold text-sm rounded-br-xl rounded-bl-xl border-t border-border absolute bottom-0 flex items-center gap-3 ">
          <p className="w-3/10">Current Progress:</p>
          <div className="w-7/10 flex items-center gap-2">
            <div className="w-full rounded-xl bg-sidebar h-2 relative">
              <div
                className="absolute rounded-xl bg-primary h-2 top-0 left-0 transition-all duration-500"
                style={{ width: `${selectedLesson.progress || 0}%` }}
              ></div>
            </div>
            <div className="ml-1 p-2 bg-accent rounded-lg">
              {selectedLesson.progress}%
            </div>
          </div>
        </div>

        <ul className="overflow-y-scroll h-[77%]">
          {courseLessons
            .slice() // make a shallow copy to avoid mutating state
            .sort((a, b) => a.id - b.id) // sort by id (or use `a.order - b.order` if you have a sequence field)
            .map((lesson) => (
              <li
                key={lesson.id}
                className={`py-5 px-3 border-b border-border text-sm hover:bg-accent/50 duration-300 cursor-pointer ${
                  selectedLesson.id === lesson.id ? "bg-accent" : ""
                }`}
                onClick={() => {
                  navigate(`/dashboard/courses/${courseId}/${lesson.id}`);
                }}
              >
                {lesson.title}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseContentPage;
