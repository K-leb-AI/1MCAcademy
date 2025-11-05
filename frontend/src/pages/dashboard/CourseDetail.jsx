import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { PiSpinner } from "react-icons/pi";
import ReactMarkdown from "react-markdown";
import { Star, Radio } from "lucide-react";
import toast from "react-hot-toast";

const CourseDetail = () => {
  const courseId = useLocation().pathname.split("/").pop();
  const [course, setCourse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [loggedUser, setLoggedUser] = useState();
  const navigate = useNavigate();

  const handleEnroll = async () => {
    try {
      const { data, error } = await supabase
        .from("user_courses")
        .insert(`course_id: ${course.id}, user_id: ${loggedUser.id}`)
        .eq("id", courseId);

      if (error) {
        console.log("Error Fetching Course: ", error);
      } else {
        setCourse(data[0]);
        console.log(course);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const handleCourseFetch = async () => {
      try {
        const { data, error } = await supabase
          .from("course")
          .select("*, instructor: instructor_id (name, bio)")
          .eq("id", courseId);

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (!user) {
          console.log("Unauthenticated");
          navigate("/");
        }

        if (error || authError) {
          toast("Error Fetching Course");
          console.log("Error Fetching Course: ", error || authError);
          navigate(-1);
        } else {
          setCourse(data[0]);
          setLoggedUser(user);
          console.log(course);
        }

        setLoggedUser(user);
      } finally {
        setIsLoading(false);
      }
    };

    handleCourseFetch();
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-background flex-col gap-3">
        <PiSpinner className="animate-spin" size={40} />
        <p className="mt-4 text-foreground">Loading...</p>
      </div>
    );

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
          className="border border-border rounded-tl-2xl rounded-bl-2xl md:rounded-bl-none md:rounded-tr-2xl w-1/2 md:w-full h-full md:h-3/5 object-center object-contain"
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
                {course.lessonsCount} lessons
              </div>
              <div className="flex bg-accent items-center text-foreground/50 px-3 py-2 rounded-lg gap-2 text-xs">
                {course.duration} run time
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
              // onClick={()}
            >
              Enroll Now
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
              {course.learning_plan.split(".").map((point) => (
                <li className="list-disc">
                  <ReactMarkdown>{point}</ReactMarkdown>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <p className="text-2xl font-bold mt-8">Requirements</p>
        <div className="mt-5 text-justify text-foreground/50 leading-6 pl-4">
          <ol>
            {course.requirements.split(".").map((point) => (
              <li className="list-disc">
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
            {course.learning_outcomes.split(".").map((point) => (
              <li className="list-disc">
                <ReactMarkdown>{point}</ReactMarkdown>
              </li>
            ))}
          </ol>
        </div>
        <p className="text-2xl font-bold mt-8">About your Instructor</p>
        <div className="flex gap-2 items-center mt-5">
          <div className="w-8 aspect-square rounded-full bg-primary grid place-items-center text-white text-lg font-bold">
            {course.instructor.name[0]}
          </div>
          <div className="text-lg font-semibold">{course.instructor.name}</div>
        </div>

        <p className="mt-2 text-justify text-foreground/50 leading-6">
          {course.instructor.bio}
        </p>
      </div>
    </div>
  );
};

export default CourseDetail;
