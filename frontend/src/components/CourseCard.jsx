import React from "react";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Star,
  RectangleGoggles,
  Box,
  CodeXml,
  Drone,
  Handshake,
} from "lucide-react";
import { FaPython } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-sidebar border border-border flex flex-col justify-between rounded-xl p-3 hover:scale-[1.01] duration-300 relative">
      <Tooltip>
        <div className="absolute top-6 right-6 w-8 aspect-square flex justify-center items-center rounded-xl bg-accent text-foreground">
          <TooltipTrigger>
            {course.topic === "Drone Piloting" && <Drone size={13} />}
          </TooltipTrigger>
          <TooltipTrigger>
            {course.topic === "VR Development" && (
              <RectangleGoggles size={13} />
            )}
          </TooltipTrigger>

          <TooltipTrigger>
            {course.topic === "Web Development" && <CodeXml size={13} />}
          </TooltipTrigger>

          <TooltipTrigger>
            {course.topic === "Python Programming" && <FaPython size={13} />}
          </TooltipTrigger>

          <TooltipTrigger>
            {course.topic === "Entrepreneurship" && <Handshake size={13} />}
          </TooltipTrigger>

          <TooltipTrigger>
            {course.topic === "3D Modeling" && <Box size={13} />}
          </TooltipTrigger>
        </div>
        <TooltipContent>
          <p>{course.topic}</p>
        </TooltipContent>
      </Tooltip>
      <div>
        <img
          src={course.thumbnail}
          className={`aspect-3/2 rounded-xl object-cover w-500px`}
        />
        <div className=" flex gap-2 items-center mt-3 justify-between">
          <h3 className="text-lg font-semibold ">{course.title}</h3>
          <p className="px-3 py-1 bg-primary/10 border border-primary text-primary text-xs font-medium rounded-full capitalize flex items-center">
            {course.level}
          </p>
        </div>
        <p className="text-sm text-foreground/50">{course.description}</p>
        <div className="text-foreground/50 text-xs mt-3 flex gap-2">
          <IoPerson size={12} /> <span>Instructor: {course.instructor}</span>
        </div>
        <div className="text-foreground/50 flex items-center mt-1 gap-2 ">
          <Trophy size={13} />
          <span className="text-xs text-foreground/50">{course.badge}</span>
        </div>
      </div>

      <div className="flex gap-1 items-center mt-3">
        <div className="flex bg-accent items-center text-foreground/50 px-3 py-2 rounded-lg gap-2">
          {course.lessonsCount} lessons
        </div>
        <div className="flex bg-accent items-center text-foreground/50 px-3 py-2 rounded-lg gap-2">
          {course.duration} run time
        </div>
        <div className="flex bg-accent items-center text-foreground/50 px-3 py-2 rounded-lg gap-2">
          <Star size={14} />
          {course.rating}
        </div>
      </div>

      <div className="flex items-center mt-5 justify-between">
        <p className="text-lg font-medium ">{course.price}</p>
        <Button className="cursor-pointer" variant="default">
          Start
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
