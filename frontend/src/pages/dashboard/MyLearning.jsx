import React, { useEffect, useState } from "react";
import { HiLightningBolt } from "react-icons/hi";
import { AlarmCheck, Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarouselSize } from "../../components/LearningCarousel";
import { CompletedCarouselSize } from "../../components/LearningCarouselCompleted";
import BadgeCard from "../../components/BadgeCard";
import Loading from "../../components/Loading";
import Calendar20 from "../../components/calendar-20";
import { useUser } from "../../utils/UserProvider";
import { supabase } from "@/supabaseClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdHourglassEmpty } from "react-icons/md";

const MyLearning = () => {
  const { loggedUser, isLoading, userProfile } = useUser();
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [runtime, setRuntime] = useState(0);

  const formatRuntime = (runtime) => {
    const hrs = Math.floor(runtime / 3600);
    const mins = Math.floor((runtime % 3600) / 60);

    if (hrs < 1) return `${mins} mins`;
    else return `${hrs} hrs, ${mins} mins`;
  };

  useEffect(() => {
    try {
      const fetchUserCourses = async () => {
        const { data: userCoursesData, error: userCoursesError } =
          await supabase
            .from("user_courses")
            .select(
              "*, course!left(title, badge(title, badge_img_url), thumbnail_url, profile(username))",
            )
            .eq("user_id", loggedUser.id);

        const { data: userLessonsData, error: userLessonError } = await supabase
          .from("user_lessons")
          .select("lessons(runtime)")
          .eq("completed", true)
          .eq("user_id", loggedUser.id);

        console.log(userCoursesData);

        if (userCoursesError || userLessonError) {
          console.log(
            "Error fetching user's courses: ",
            userCoursesError || userLessonError,
          );
          return;
        }

        setCompleted(
          userCoursesData.filter((course) => course.status === "completed"),
        );

        setInProgress(
          userCoursesData.filter((course) => course.status === "enrolled"),
        );

        let totalCourseRuntime = 0;

        for (let i = 0; i < userLessonsData.length; i++) {
          totalCourseRuntime =
            userLessonsData[i].lessons.runtime + totalCourseRuntime;
        }
        setRuntime(totalCourseRuntime);
      };

      fetchUserCourses();

      setIsFetching(false);
    } catch (error) {
      console.log("Error fetching user's courses: ", error.message);
    }
  }, []);

  if (isLoading || isFetching) {
    return <Loading />;
  }
  return (
    <div className="mb-5 mt-12 px-4 md:px-10">
      {/* <div className="flex flex-col gap-6"> */}
      <div className="flex items-center justify-between my-6">
        <div className="font-bold text-2xl">My Learning Journey</div>

        <Dialog>
          <DialogTrigger>
            <div className="flex h-8 items-center justify-center rounded-lg p-2 gap-2 bg-primary text-white hover:bg-primary/80 duration-300 cursor-pointer">
              <AlarmCheck size={17} />
              <p className="">Set a reminder</p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set a reminder to study</DialogTitle>
              <DialogDescription>
                Select a time period when you would like to study and we'll send
                you an email to remind you about it.
              </DialogDescription>
              <Calendar20 />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* Section 1: Overview Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-primary rounded-xl p-6 flex flex-col justify-center items-center">
          <h3 className="text-white mb-2">Current Streak</h3>
          <div className="text-white text-4xl font-bold flex h-8 items-center justify-center rounded-lg p-2 gap-1">
            <HiLightningBolt />
            <p>{userProfile.current_streak}</p>
          </div>
        </div>
        <div className="bg-sidebar rounded-xl p-6 flex flex-col justify-center items-center border border-border">
          <h3 className="text-foreground/50">Courses in Progress</h3>
          <p className="text-4xl font-bold mt-2">{inProgress.length}</p>
        </div>
        <div className="bg-sidebar rounded-xl p-6 flex flex-col justify-center items-center border border-border">
          <h3 className="text-foreground/50">Completed Courses</h3>
          <p className="text-4xl font-bold mt-2">{completed.length}</p>
        </div>
        <div className="bg-sidebar rounded-xl p-6 flex flex-col justify-center items-center border border-border">
          <h3 className="text-foreground/50">Total Learning Hours</h3>
          <p className="text-2xl font-bold mt-2">{formatRuntime(runtime)}</p>
        </div>
      </div>

      {/* Section 2: Ongoing Courses */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
        {inProgress.length > 0 ? (
          <CarouselSize courses={inProgress} className="w-full" />
        ) : (
          <div className="flex w-full justify-center items-center bg-sidebar rounded-xl py-8 flex-col animate-pulse">
            <MdHourglassEmpty size={60} className="opacity-50" />
            <p className="mt-4 opacity-50">No courses in progress</p>
          </div>
        )}
      </div>

      {/* Section 3: Completed Courses */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Completed</h2>

        {completed.length > 0 ? (
          <CompletedCarouselSize courses={completed} className="w-full" />
        ) : (
          <div className="flex w-full justify-center items-center bg-sidebar rounded-xl py-8 flex-col animate-pulse">
            <MdHourglassEmpty size={60} className="opacity-50" />
            <p className="mt-4 opacity-50">
              You haven't completed any courses yet
            </p>
          </div>
        )}
      </div>

      {/* Section 4: Badges */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Badges</h2>
        {completed.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {completed.map((course, index) => (
              <BadgeCard
                key={index}
                badgeName={course.course.badge.title}
                badgeImage={course.course.badge.badge_img_url}
                courseTitle={course.course.title}
                className="w-full"
              />
            ))}
          </div>
        ) : (
          <div className="flex w-full justify-center items-center bg-sidebar rounded-xl py-8 flex-col animate-pulse">
            <MdHourglassEmpty size={60} className="opacity-50" />
            <p className="mt-4 opacity-50">
              You haven't completed any courses yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
