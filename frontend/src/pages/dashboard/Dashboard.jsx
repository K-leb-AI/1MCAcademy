import React from "react";
import { Waypoints, History } from "lucide-react";
import { HiLightningBolt } from "react-icons/hi";
import { IoPerson } from "react-icons/io5";
import Calendar20 from "../../components/calendar-20";
import { RiProgress8Fill } from "react-icons/ri";
import { ChartAreaDefault } from "../../components/chart";
import { CarouselSpacing } from "../../components/Carousel";

const Dashboard = () => {
  return (
    <>
      <div className="lg:flex items-center justify-between">
        <div className="mt-4 lg:mb-8 mb-2 font-bold text-2xl">
          Welcome back, Caleb!
        </div>
        <div className="flex items-center mt-4 mb-8 gap-3">
          <div className="bg-accent text-foreground/50 flex h-8 items-center justify-center rounded-lg p-2 gap-1">
            <HiLightningBolt size={17} />
            <p>16</p>
          </div>
          <div className="bg-accent text-foreground/50 flex aspect-square size-8 items-center justify-center rounded-lg p-2">
            <Waypoints size={17} />
          </div>
          <div>
            <span className="text-foreground font-semibold block leading-4">
              Current Skill Path
            </span>
            <span className="text-xs text-foreground/50 ">
              Web Developer . Intermediate
            </span>
          </div>
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 grid-cols-1 lg:grid-cols-2 lg:grid-rows-4">
        <div className="bg-sidebar col-span-1 lg:row-span-1 lg:col-span-1 rounded-xl py-4 px-8">
          <div className="text-foreground/50 mb-4 lg:mb-8">
            Current Progress
          </div>
          {/* <img
              src="book.png"
              alt=""
              className="hidden lg:block lg:size-70 absolute top-0 lg:-top-15 right-0"
            /> */}
          <div className="flex flex-col lg:flex-row lg:justify-between">
            <div className="">
              <div className="flex gap-4 items-center-justify-center">
                <p className="font-bold text-foreground text-2xl">
                  Web Development
                </p>
                <p className="px-3 bg-primary/10 border border-primary text-primary text-xs font-medium rounded-full capitalize flex items-center">
                  Beginner
                </p>
              </div>
              <div className="text-foreground/50 mt-1 flex gap-2">
                <IoPerson size={12} />{" "}
                <span>Instructor: Michael Osei Frimpong</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-foreground/50">
                <History size={12} />
                <span>Last Lesson: </span>
                <span>HTML Lesson 5</span>
              </div>
            </div>

            <div className="flex flex-row gap-5 items-center mt-1">
              <div className="gap-2"></div>
              <RiProgress8Fill size={12} className="text-foreground/50" />
              <p className="text-foreground/50">Your Progress: </p>
              <span className="block lg:hidden text-primary">85%</span>
              <div
                className="radial-progress lg:grid hidden text-primary"
                style={
                  {
                    "--value": "85",
                    "--size": "4rem",
                    "--thickness": "4px",
                  } /* as React.CSSProperties */
                }
                aria-valuenow={85}
                role="progressbar"
              >
                85%
              </div>
            </div>
          </div>
          <button className="w-full mt-12 px-5 py-2 bg-primary text-white text-md font-medium rounded-xl grid place-items-center hover:bg-primary/80 duration-300 cursor-pointer">
            Continue
          </button>
        </div>
        <div className="relative bg-sidebar col-span-1 lg:row-span-2 lg:col-span-1 rounded-xl py-4 px-8">
          <div className="text-foreground/50 mb-4">Study Schedule</div>
          <Calendar20 />
        </div>
        <div className="bg-sidebar col-span-1 lg:row-span-1 rounded-xl py-4 px-8">
          <div className="text-foreground/50 mb-4">Trophies</div>
          <div className="w-full">
            <CarouselSpacing />
          </div>
        </div>
        <div className="bg-sidebar col-span-1 lg:col-span-2 lg:row-span-2 rounded-xl py-4 px-8">
          <div className="text-foreground/50 mb-4">Your Stats</div>
          <ChartAreaDefault />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
