import React, { useState } from "react";

const CourseCreationProgress = (props) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/40 grid place-items-center z-50">
      <div className="py-5 px-8 bg-background rounded-xl shadow-xl border border-border max-w-2xl w-full">
        <h1 className="text-xl font-bold mb-6">Uploading Course...</h1>
        <div className="relative w-full bg-foreground/10 rounded-full h-2">
          <div
            className="absolute bg-primary rounded-full h-2 duration-300"
            style={{
              width: `${props.courseStatus.index * 20 || 0}%`,
            }}
          ></div>
        </div>

        <p className="text-foreground/40 mt-5 text-xs">
          {props.courseStatus.status} - {props.courseStatus.index * 20 || 0}%
        </p>
      </div>
    </div>
  );
};

export default CourseCreationProgress;
