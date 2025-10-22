import React, { useState } from "react";
import { AppSidebar } from "./app-sidebar";
import { ModeToggle } from "../components/ThemeToggle";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";

import { ChevronRight } from "lucide-react";

export default function Page() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter((seg) => seg);
  const formatSegment = (seg) => {
    const subseg = seg.split("-").join(" ");
    return subseg.charAt(0).toUpperCase() + subseg.slice(1);
  };

  return (
    <>
      <SidebarProvider
        defaultOpen={true}
        className=""
        style={{
          "--sidebar-width": "19rem",
        }}
      >
        <AppSidebar />
        <SidebarInset className="text-sm">
          <ModeToggle />

          <header className="flex h-16 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger
              className="-ml-1 hover:bg-sidebar-accent"
              onClick={() => {}}
            />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb className="z-10">
              <BreadcrumbList className="">
                {segments.map((segment, index) => {
                  const path = "/" + segments.slice(0, index + 1).join("/");
                  const isLast = index == segments.length - 1;

                  return (
                    <BreadcrumbItem className="hidden md:block" key={index}>
                      {!isLast ? (
                        <div className="flex items-center gap-1">
                          <BreadcrumbLink href={path} className="" asChild="">
                            {formatSegment(segment)}
                          </BreadcrumbLink>
                          <ChevronRight className="hidden md:block" size={14} />
                        </div>
                      ) : (
                        <BreadcrumbPage className="">
                          {formatSegment(segment)}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
