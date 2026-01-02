import React from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Star } from "lucide-react";
import { IoPerson } from "react-icons/io5";
import ReactMarkdown from "react-markdown";

export const InstructorCourseCard = ({ course }) => {
  // Guard against missing course data
  if (!course) {
    return (
      <div className="bg-sidebar border border-border rounded-xl p-6 text-center">
        <p className="text-foreground/50">Course data unavailable</p>
      </div>
    );
  }

  return (
    <div className="bg-sidebar border border-border flex rounded-xl shadow-lg gap-4 duration-300 relative">
      {course.is_published && (
        <div className="absolute top-3 left-3 bg-primary text-white rounded-md text-xs px-2 py-1">
          Published
        </div>
      )}
      {!course.is_published && (
        <div className="absolute top-3 left-3 bg-yellow-500 text-white rounded-md text-xs px-2 py-1">
          Draft
        </div>
      )}
      {/* Course Thumbnail */}
      {course.thumbnail_url ? (
        <img
          src={course.thumbnail_url}
          alt={course.title}
          className="aspect-video rounded-tl-xl rounded-bl-xl object-cover object-center w-5/12"
          loading="lazy"
        />
      ) : (
        <div className="aspect-video rounded-xl bg-accent flex items-center justify-center">
          <span className="text-foreground/50 text-sm">No thumbnail</span>
        </div>
      )}
      <div className="px-2 py-1">
        {/* Title and Level */}
        <div className="flex gap-2 items-center mt-3 justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            {course.title || "Untitled Course"}
          </h3>
        </div>

        {/* Badge */}
        {course.badge?.title && (
          <div className="text-foreground/50 flex items-center mt-1 gap-2">
            <Trophy size={13} />
            <span className="text-xs text-foreground/50">
              {course.badge.title}
            </span>
          </div>
        )}

        {/* Stats */}
        <div className="flex gap-1 items-center mt-3 flex-wrap">
          {course.lessons && (
            <div className="flex bg-accent items-center text-foreground/50 px-3 py-2 rounded-lg gap-1 text-xs">
              {course.lessons.length} lesson
              {course.lessons.length !== 1 ? "s" : ""}
            </div>
          )}
          {course.rating && (
            <div className="flex bg-accent items-center text-foreground/50 px-3 py-2 rounded-lg gap-2 text-xs">
              <Star size={14} />
              {course.rating.toFixed(1)}
            </div>
          )}
          {course.user_courses && (
            <div className="flex bg-accent items-center text-foreground/50 px-3 py-2 rounded-lg gap-2 text-xs">
              {course.user_courses.length} students
            </div>
          )}
        </div>

        {/* Footer */}
        {/* <div className="flex items-center mt-5 justify-between">
          {course.price !== undefined && (
            <p className="text-lg font-medium text-foreground">
              GH₵ {course.price.toFixed(2)}
            </p>
          )}
          <Button className="cursor-pointer" variant="default">
            View
          </Button>
        </div> */}
      </div>
    </div>
  );
};
