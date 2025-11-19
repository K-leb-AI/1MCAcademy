import React from "react";
import { GiPoliceBadge } from "react-icons/gi";

const BadgeCard = ({ badgeName, courseTitle }) => {
  return (
    <div className=" bg-accent/50 border border-border rounded-xl p-3 flex items-center gap-2">
      <img src="/badge.png" alt="badge" className="w-15" />
      <div className="">
        <div className="text-lg font-bold">{badgeName.title || badgeName}</div>
        <div className="text-xs text-foreground/30 mt-2">{courseTitle}</div>
      </div>
    </div>
  );
};

export default BadgeCard;
