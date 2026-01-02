import { useUser } from "@/utils/UserProvider";
import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const ProfileButton = () => {
  const { loggedUser } = useUser();
  const navigate = useNavigate();

  return (
    <div
      className="px-4 py-3 bg-sidebar rounded-xl absolute top-5 right-4 md:right-10 z-20 flex items-center gap-3 cursor-pointer hover:text-primary hover:bg-primary/20 duration-300 group"
      onClick={() => navigate("/dashboard/profile")}
    >
      <div className="rounded-full bg-accent grid place-items-center p-2 group-hover:bg-primary/50 group-hover:text-white duration-300">
        <User size={16} />
      </div>
      <div className="">
        <div className="text-bold text-sm leading-5">
          {loggedUser.user_metadata.display_name}
        </div>
        <div className="text-bold text-[10px] text-foreground/50 group-hover:text-primary/60">
          {loggedUser.email}
        </div>
      </div>
    </div>
  );
};

export default ProfileButton;
