"use client";

import * as React from "react";
import {
  CodeXml,
  LayoutDashboard,
  BookMarked,
  PenTool,
  BotMessageSquare,
  Headset,
  MessageCircle,
  LogOut,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { supabase } from "../supabaseClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Nunya",
      logo: CodeXml,
      plan: "Learners' Arena",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Courses",
      url: "/dashboard/courses",
      icon: BookMarked,
    },
    {
      title: "My Learning",
      url: "/dashboard/my-learning",
      icon: PenTool,
    },
    {
      title: "Ask Makafui",
      url: "/dashboard/assistant",
      icon: BotMessageSquare,
    },
    {
      title: "Support",
      url: "/dashboard/support",
      icon: Headset,
    },
    // {
    //   title: "Notifications",
    //   url: "/dashboard/notifications",
    //   icon: MessageCircle,
    // },
  ],
};

export function AppSidebar({ ...props }) {
  // ✅ Move hook to the top level
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      navigate("/");
      await supabase.auth.signOut();
      toast.success("Successfully Logged Out");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error logging out");
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-red-500 hover:text-white cursor-pointer"
          onClick={handleLogout}
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarFallback className="rounded-lg">
              <LogOut size={12} />
            </AvatarFallback>
          </Avatar>
          <div className="duration-300 flex items-center justify-center py-2 rounded-xl gap-2">
            <p>Logout</p>
          </div>
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
