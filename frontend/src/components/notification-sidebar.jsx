"use client";

import * as React from "react";
import { ArchiveX, Command, File, Inbox, Send, Trash2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  useSidebar,
} from "../components/ui/notification-sidebar";

// This is sample data

export function NotificationSidebar({ ...props }) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [mails, setMails] = React.useState(props.data.mails);
  const { setOpen } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row border border-l-0 relative -left-10 h-[92vh]"
      {...props}
    >
      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="border border-l-0">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="text-foreground font-bold text-2xl">
            Notifications
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="">
            <SidebarGroupContent>
              {mails.map((mail, index) => (
                <a
                  href={"/dashboard/notifications/" + index}
                  key={mail.email}
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{mail.name}</span>{" "}
                    <span className="ml-auto text-xs">{mail.date}</span>
                  </div>
                  <span className="font-medium">{mail.subject}</span>
                  <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces text-foreground/50 text-justify">
                    {mail.message.length > 80
                      ? mail.message
                          .replace(/\n/g, " ") // Replace all line breaks with spaces
                          .replace(/\s+/g, " ") // Collapse multiple spaces
                          .trim() // Remove leading/trailing spaces
                          .substring(0, 100) + "..."
                      : mail.message}
                  </span>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
