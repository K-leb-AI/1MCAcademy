import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import { Star, Radio } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "../../utils/UserProvider";

const CourseDetail = () => {
  const courseId = useLocation().pathname.split("/").pop();
  const [course, setCourse] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const { loggedUser, userProfile, isLoading } = useUser();
  const navigate = useNavigate();

  const handleEnroll = async () => {
    setIsFetching(true);
    if (course.status)
      navigate(`/dashboard/courses/${courseId}/${course.last_lesson_id}`);
    else {
      try {
        const { data: firstLesson, error: firstLessonError } = await supabase
          .from("lessons")
          .select("id")
          .eq("course_id", courseId)
          .order("created_at", { ascending: true })
          .maybeSingle();

        if (firstLessonError)
          return console.log(
            "Error while fetching first lesson: ",
            firstLessonError
          );

        const { data, error } = await supabase
          .from("user_courses")
          .insert([
            {
              course_id: course.id,
              user_id: loggedUser.id,
              last_lesson_id: firstLesson.id,
            },
          ])
          .select("*");

        if (error) {
          console.error("Error enrolling in course:", error.message);
          toast.error("Could not enroll in the course. Please try again.");
          return;
        }

        console.log("Enrollment successful:", data);
        toast.success("Successfully enrolled!");
        setCourse((prev) => ({ ...prev, status: "enrolled" }));
        navigate(`/dashboard/courses/${courseId}/${firstLesson.id}`);
      } catch (err) {
        console.error("Unexpected error enrolling:", err);
        toast.error("An unexpected error occurred.");
      } finally {
        setIsFetching(false);
      }
    }
  };

  useEffect(() => {
    const handleCourseFetch = async () => {
      try {
        const { data: courseData, error: courseError } = await supabase
          .from("course")
          .select("*, lessons (runtime)")
          .eq("id", courseId)
          .single();

        if (courseError) {
          console.error("Error fetching course:", courseError);
          toast.error("Error fetching course details.");
          navigate(-1);
          return;
        }

        const { data: userCourse, error: userCourseError } = await supabase
          .from("user_courses")
          .select("*")
          .eq("user_id", loggedUser.id)
          .eq("course_id", courseId)
          .maybeSingle();

        if (userCourseError) {
          console.error("Error fetching user-course:", userCourseError);
        }

        let totalCourseRuntime = 0;
        for (let i = 0; i < courseData.lessons.length; i++) {
          totalCourseRuntime =
            courseData.lessons[i].runtime + totalCourseRuntime;
          i++;
        }

        setCourse({
          ...courseData,
          status: userCourse?.status,
          last_lesson_id: userCourse?.last_lesson_id,
          runtime: totalCourseRuntime,
        });
      } catch (err) {
        console.error("Unexpected error:", err);
        toast.error("Something went wrong while loading the course.");
      } finally {
        setIsFetching(false);
      }
    };

    handleCourseFetch();
  }, [courseId, navigate]);

  const formatRuntime = (runtime) => {
    const hrs = Math.floor(runtime / 3600);
    const mins = Math.floor((runtime % 3600) / 60);

    if (hrs < 1) return `${mins} mins`;
    else return `${hrs} hrs, ${mins} mins`;
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <div className="px-4 md:px-5 lg:px-35 mt-10 flex md:flex-row flex-col md:gap-5 lg:gap-15 gap-2">
      <div className="w-full md:w-1/3 h-[40vh] md:h-[85vh] bg-sidebar rounded-2xl border border-border sticky top-4 flex md:block">
        <div className="absolute py-3 px-2 bg-primary flex flex-col items-center justify-center top-3 left-3 rounded-xl text-white gap-2">
          <p className="font-bold leading-2 text-xs">GH₵</p>
          <p className="font-bold text-3xl leading-4">{course.price}</p>
        </div>
        <img
          src={course.thumbnail_url}
          alt=""
          className="border border-border rounded-tl-2xl rounded-bl-2xl md:rounded-bl-none md:rounded-tr-2xl w-1/2 md:w-full h-full md:h-3/5 object-center object-cover"
        />
        <div className="p-4 md:h-2/5 h-full flex flex-col justify-between w-full">
          <div className="">
            <div className="text-lg font-semibold">{course.title}</div>
            <div className="flex bg-primary/20 items-center text-primary px-3 py-2 rounded-lg gap-2 w-fit text-xs mt-2">
              <Radio size={12} />
              <p>Live Sessions available</p>
            </div>

            <div className="flex gap-1 items-center mt-3 flex-wrap">
              <div className="flex bg-accent items-center text-foreground/50 px-3 py-2 rounded-lg gap-2 text-xs">
                {course.lessons.length} lessons
              </div>
              <div className="flex bg-accent items-center text-foreground/50 px-3 py-2 rounded-lg gap-2 text-xs">
                {formatRuntime(course.runtime)}
              </div>
              <div className="flex bg-accent items-center text-foreground/50 px-3 py-2 rounded-lg gap-2 text-xs">
                <Star size={14} />
                {course.rating}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <a
              className="py-2 flex items-center justify-center text-xs hover:bg-primary/15 bg-primary/20 border border-primary/20 text-primary w-full rounded-xl cursor-pointer duration-300"
              href="https://meet.google.com/cdv-sgsp-poj"
              target="_blank"
            >
              Join Live Session
            </a>
            <button
              className="py-2 flex items-center justify-center text-xs bg-primary hover:bg-primary/80 text-white w-full rounded-xl mt-2 cursor-pointer duration-300"
              onClick={handleEnroll}
            >
              {course?.status === "completed"
                ? "Revisit course"
                : course?.status === "enrolled"
                ? "Go to course"
                : "Enroll Now"}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/3 py-8">
        <h1 className="text-4xl font-bold">{course.title}</h1>
        <div className="mt-10 text-justify text-foreground/50 leading-6">
          <ReactMarkdown>{course.description}</ReactMarkdown>
        </div>

        <div className="bg-primary/20 p-6 mt-8 rounded-xl">
          <p className="text-2xl font-bold text-primary">What you'll learn</p>
          <div className="mt-5 text-justify text-foreground/50 leading-8 pl-4">
            <ol>
              {course.learning_plan.split(".").map((point, index) => (
                <li className="list-disc" key={index}>
                  <ReactMarkdown>{point}</ReactMarkdown>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <p className="text-2xl font-bold mt-8">Requirements</p>
        <div className="mt-5 text-justify text-foreground/50 leading-6 pl-4">
          <ol>
            {course.requirements.split(".").map((point, index) => (
              <li className="list-disc" key={index}>
                <ReactMarkdown>{point}</ReactMarkdown>
              </li>
            ))}
          </ol>
        </div>
        <p className="text-2xl font-bold mt-8">
          By the end of this course, you will be able to:
        </p>
        <div className="mt-5 text-justify text-foreground/50 leading-6 pl-4">
          <ol>
            {course.learning_outcomes.split(".").map((point, index) => (
              <li className="list-disc" key={index}>
                <ReactMarkdown>{point}</ReactMarkdown>
              </li>
            ))}
          </ol>
        </div>
        <p className="text-2xl font-bold mt-8">About your Instructor</p>
        <div className="flex gap-2 items-center mt-5">
          <div className="w-8 aspect-square rounded-full bg-primary grid place-items-center text-white text-lg font-bold">
            {userProfile.username[0]}
          </div>
          <div className="text-lg font-semibold">{userProfile.username}</div>
        </div>

        <p className="mt-2 text-justify text-foreground/50 leading-6">
          {userProfile.bio}
        </p>
      </div>
    </div>
  );
};

export default CourseDetail;
