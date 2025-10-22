"use client";

import * as React from "react";
import {
  CodeXml,
  LayoutDashboard,
  BookMarked,
  PenTool,
  Waypoints,
  Settings2,
  MessageCircle,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
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
      title: "Skill Paths",
      url: "/dashboard/skill-paths",
      icon: Waypoints,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
    {
      title: "Notifications",
      url: "/dashboard/notifications",
      icon: MessageCircle,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
