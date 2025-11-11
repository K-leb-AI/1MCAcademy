import React from "react";
import { PiSpinner } from "react-icons/pi";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background flex-col gap-3">
      <PiSpinner className="animate-spin" size={40} />
      <p className="mt-4 text-foreground">Loading...</p>
    </div>
  );
};

export default Loading;
