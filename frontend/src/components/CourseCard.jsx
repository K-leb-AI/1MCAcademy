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
import ReactMarkdown from "react-markdown";

const CourseCard = ({ course, onClick }) => {
  return (
    <div className="bg-sidebar border border-border flex flex-col justify-between rounded-xl p-3 hover:scale-[1.01] duration-300 relative">
      <Tooltip>
        <div className="absolute top-6 right-6 w-8 aspect-square flex justify-center items-center rounded-xl bg-accent text-foreground">
          <TooltipTrigger>
            {course.skill_path === "drone piloting" && <Drone size={13} />}
          </TooltipTrigger>
          <TooltipTrigger>
            {course.skill_path === "virtual reality development" && (
              <RectangleGoggles size={13} />
            )}
          </TooltipTrigger>

          <TooltipTrigger>
            {course.skill_path === "web development" && <CodeXml size={13} />}
          </TooltipTrigger>

          <TooltipTrigger>
            {course.skill_path === "python programming" && (
              <FaPython size={13} />
            )}
          </TooltipTrigger>

          <TooltipTrigger>
            {course.skill_path === "entrepreneurship" && (
              <Handshake size={13} />
            )}
          </TooltipTrigger>

          <TooltipTrigger>
            {course.skill_path === "3d modeling and printing" && (
              <Box size={13} />
            )}
          </TooltipTrigger>
        </div>
        <TooltipContent className="capitalize">
          <p>{course.skill_path}</p>
        </TooltipContent>
      </Tooltip>
      <div>
        <img
          src={course.thumbnail_url}
          className="aspect-3/2 rounded-xl object-cover w-500px"
          loading="lazy"
        />
        <div className=" flex gap-2 items-center mt-3 justify-between">
          <h3 className="text-lg font-semibold ">{course.title}</h3>
          <p className="px-3 py-1 bg-primary/10 border border-primary text-primary text-xs font-medium rounded-full capitalize flex items-center">
            {course.level}
          </p>
        </div>
        <p className="text-xs text-foreground/50 mt-2 border-l border-foreground/10 pl-4 leading-4.5 py-1">
          {course.description.length >= 130 ? (
            <div className="flex">
              <ReactMarkdown>
                {course.description.slice(0, 130).concat(" ...")}
              </ReactMarkdown>
            </div>
          ) : (
            <ReactMarkdown>course.description</ReactMarkdown>
          )}
        </p>
        <div className="text-foreground/50 text-xs mt-3 flex gap-2">
          <IoPerson size={12} />{" "}
          <span>Instructor: {course.instructor?.name}</span>
        </div>
        <div className="text-foreground/50 flex items-center mt-1 gap-2 ">
          <Trophy size={13} />
          <span className="text-xs text-foreground/50">
            {course.badge.title}
          </span>
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
        <p className="text-lg font-medium ">GH₵ {course.price}</p>
        <Button className="cursor-pointer" variant="default" onClick={onClick}>
          View
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
