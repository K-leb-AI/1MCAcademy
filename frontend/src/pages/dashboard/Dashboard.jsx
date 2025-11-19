import React, { useEffect, useState } from "react";
import { Waypoints, History, Bell } from "lucide-react";
import { HiLightningBolt } from "react-icons/hi";
import { IoPerson } from "react-icons/io5";
import Calendar20 from "../../components/calendar-20";
import { RiProgress8Fill } from "react-icons/ri";
import { ChartAreaDefault } from "../../components/chart";
import { CarouselSpacing } from "../../components/Carousel";
import Loading from "../../components/Loading";
import { useUser } from "../../utils/UserProvider";
import { supabase } from "@/supabaseClient";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { loggedUser, userProfile, isLoading } = useUser();
  const [lastCourse, setLastCourse] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [badgeList, setBadgeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLastCourse = async () => {
      try {
        const { data: userCoursesData, error: userCoursesError } =
          await supabase
            .from("user_courses")
            .select(
              "progress, lessons(id, title), course(id, title, level, instructor_id)"
            )
            .eq("id", userProfile.last_course_id)
            .eq("user_id", loggedUser.id)
            .single();

        const { data: instructorData, error: instructorError } = await supabase
          .from("instructor")
          .select("name")
          .eq("id", userCoursesData.course.instructor_id)
          .single();

        const { data: completedBadgesData, error: completedBadgesError } =
          await supabase
            .from("user_courses")
            .select("course(title, badge(title))")
            .eq("user_id", loggedUser.id)
            .eq("status", "completed");

        if (!userCoursesData) {
          setLastCourse({
            ...userCoursesData,
            ...instructorData,
          });
        }

        if (instructorError || userCoursesError || completedBadgesError)
          throw Error(courseError || userCoursesError || completedBadgesError);

        setLastCourse({
          ...userCoursesData,
          ...instructorData,
        });

        setBadgeList(completedBadgesData);
      } catch (error) {
        console.log("Error fetching latest course: ", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchLastCourse();
  }, []);

  const handleContinue = (courseId, lessonId) => {
    navigate(`courses/${courseId}/${lessonId}`);
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <div className="mb-5 mt-12 px-4 md:px-10">
      <div className="lg:flex items-center justify-between">
        <div className="mt-4 lg:mb-8 mb-2 font-bold text-2xl flex gap-2 items-center">
          <div className="w-8 aspect-square rounded-full bg-primary/20 grid place-items-center text-primary text-lg">
            {loggedUser?.user_metadata.display_name.split(" ")[0][0]}
          </div>
          Welcome back, {loggedUser?.user_metadata.display_name.split(" ")[0]}
        </div>
        <div className="flex items-center mt-4 mb-8 gap-3">
          <div className="bg-accent text-foreground/50 flex h-8 items-center justify-center rounded-lg p-2 gap-1 animate-pulse">
            <HiLightningBolt size={17} />
            <p>{userProfile?.current_streak}</p>
          </div>
          <div className="bg-accent text-foreground/50 flex aspect-square size-8 items-center justify-center rounded-lg p-2">
            <Waypoints size={17} />
          </div>
          <div>
            <span className="text-foreground font-semibold block leading-4">
              Current Skill Path
            </span>
            <span className="text-xs text-foreground/50 capitalize">
              {userProfile?.skill_path} . {userProfile?.experience}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-[55vh] rounded-xl mb-4 flex overflow-clip">
        <div className="hidden lg:block w-1/2 px-16 py-20 bg-linear-to-r from-[#214098] to-[#3a61cb]">
          <div className="bg-white rounded-xl shadow-lg shadow-[#2a3c76d1] w-full h-full px-10 flex flex-col justify-center text-[#000]">
            <div className="flex items-center gap-1.5 text-[#214098] w-fit mb-3">
              <Bell size={12} />
              <p className="text-sm uppercase font-medium">Coming Soon</p>
            </div>
            <p className="text-3xl font-black mb-3">
              Introduction to 3D Modeling and Printing
            </p>
            <p className="text-sm text-black/40 leading-6">
              Get ready with Ms. Sefam Adagbe to explore the intricacies of 3D
              modeling with Autodesk Fusion 360 and discover how easy it is
              begin your 3D printing journey!
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-full relative">
          <img
            src="upcoming.png"
            className="object-center object-cover w-full h-full"
          />
          <div className="flex lg:hidden absolute bg-linear-to-t from-[#000000b6] to-[#00000000] w-full h-60 bottom-0 flex-col justify-end px-8 py-6">
            <div className="flex items-center gap-1.5 text-white w-fit mb-3">
              <Bell size={12} />
              <p className="text-sm uppercase font-medium">Coming Soon</p>
            </div>
            <p className="text-2xl font-bold mb-3 text-white">
              Introduction to 3D Modeling and Printing
            </p>
            <p className="text-sm text-white/80">
              Get ready with Ms. Sefam Adagbe to explore the intricacies of 3D
              modeling with Autodesk Fusion 360 and discover how easy it is
              begin your 3D printing journey!
            </p>
          </div>
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 grid-cols-1 lg:grid-cols-2 lg:grid-rows-4">
        {lastCourse === undefined ? (
          <div className="bg-sidebar col-span-1 lg:row-span-1 lg:col-span-1 rounded-xl p-8 flex items-center justify-center flex-col gap-3 relative">
            <img src="study.svg" alt="" className="w-1/4" />
            <p className="font-medium text-xl opacity-50">
              Your journey awaits!
            </p>
            <div className="text-foreground/50 top-4 left-8 absolute">
              Current Progress
            </div>
          </div>
        ) : (
          <div className="bg-sidebar col-span-1 lg:row-span-1 lg:col-span-1 rounded-xl py-4 px-8 relative">
            <div className="text-foreground/50 mb-4 lg:mb-8">
              Current Progress
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="">
                <div className="flex gap-4 items-center-justify-center">
                  <p className="font-bold text-foreground text-2xl capitalize">
                    {lastCourse?.course.title}
                  </p>
                  <p className="px-3 py-2 bg-primary/5 border border-primary text-primary text-xs font-medium rounded-full capitalize flex items-center absolute top-4 right-4">
                    {lastCourse?.course.level}
                  </p>
                </div>
                <div className="text-foreground/50 mt-1 flex gap-2">
                  <IoPerson size={12} /> <span>{lastCourse?.name}</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-foreground/50">
                  <History size={12} />
                  <span>{lastCourse?.lessons.title}</span>
                </div>
              </div>

              <div className="flex flex-row gap-2 items-center mt-1">
                <div className="gap-2"></div>
                <RiProgress8Fill size={12} className="text-foreground/50" />
                <p className="text-foreground/50">Progress: </p>
                <span className="block lg:hidden text-primary">
                  {lastCourse?.progress}%
                </span>
                <div
                  className="radial-progress lg:grid hidden text-primary"
                  style={
                    {
                      "--value": lastCourse?.progress,
                      "--size": "4rem",
                      "--thickness": "4px",
                    } /* as React.CSSProperties */
                  }
                  aria-valuenow={lastCourse?.progress}
                  role="progressbar"
                >
                  {lastCourse?.progress}%
                </div>
              </div>
            </div>
            <button
              className="w-full mt-12 px-5 py-2 bg-primary text-white text-md font-medium rounded-xl grid place-items-center hover:bg-primary/80 duration-300 cursor-pointer"
              onClick={() =>
                handleContinue(lastCourse?.course.id, lastCourse?.lessons.id)
              }
            >
              Continue
            </button>
          </div>
        )}
        <div className="relative bg-sidebar col-span-1 lg:row-span-2 lg:col-span-1 rounded-xl py-4 px-8">
          <div className="text-foreground/50 mb-4">Study Schedule</div>
          <Calendar20 />
        </div>
        <div className="bg-sidebar col-span-1 lg:row-span-1 rounded-xl relative flex items-center justify-center px-8 py-12 md:py-0">
          <div className="text-foreground/50 absolute top-4 left-8">Badges</div>
          {badgeList.length !== 0 ? (
            <div className="w-full">
              <CarouselSpacing badgeList={badgeList} />
            </div>
          ) : (
            <div className="w-full flex items-center justify-center">
              You have not earned any badges yet
            </div>
          )}
        </div>
        <div className="bg-sidebar col-span-1 lg:col-span-2 lg:row-span-2 rounded-xl py-4 px-8">
          <div className="text-foreground/50 mb-4">
            Completed Lessons over the year
          </div>
          <ChartAreaDefault />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
