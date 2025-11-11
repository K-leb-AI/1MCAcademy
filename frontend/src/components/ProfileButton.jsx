import { useUser } from "@/utils/UserProvider";
import React from "react";
import { User } from "lucide-react";

const ProfileButton = () => {
  const { loggedUser } = useUser();
  console.log(loggedUser);
  return (
    <div className="px-6 py-5 bg-sidebar rounded-xl absolute top-5 right-4 z-20 flex items-center gap-3">
      <div className="rounded-full bg-accent grid place-items-center p-2">
        <User size={16} />
      </div>
      <div className="">
        <div className="text-bold text-sm leading-3">
          {loggedUser.user_metadata.display_name}
        </div>
        <div className="text-bold text-xs text-foreground/50">
          {loggedUser.email}
        </div>
      </div>
    </div>
  );
};

export default ProfileButton;
