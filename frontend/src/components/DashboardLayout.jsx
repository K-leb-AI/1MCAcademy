import React, { useState, useEffect } from "react";
import { AppSidebar } from "./app-sidebar";
import { ModeToggle } from "../components/ThemeToggle";
import { supabase } from "../supabaseClient";
import { useNavigate, Outlet, useLocation, Link } from "react-router-dom";
import { PiSpinner } from "react-icons/pi";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { ChevronRight } from "lucide-react";

export default function Page() {
  const location = useLocation();
  const navigate = useNavigate();
  const segments = location.pathname.split("/").filter((seg) => seg);

  const [loggedUser, setLoggedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [courseTitle, setCourseTitle] = useState(null);

  const formatSegment = (seg) => {
    const subseg = seg.split("-").join(" ");
    return subseg.charAt(0).toUpperCase() + subseg.slice(1);
  };

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (!user) {
          console.log("Unauthenticated");
          navigate("/");
          return;
        }

        if (error) {
          console.error("Error in Dashboard auth:", error);
          return;
        }

        setLoggedUser(user);
      } catch (error) {
        console.error("Auth error:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    handleAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchCourseTitle = async () => {
      const courseIndex = segments.indexOf("courses");
      if (courseIndex === -1) {
        setCourseTitle(null);
        return;
      }

      const courseId = segments[courseIndex + 1];
      if (!courseId) {
        setCourseTitle(null);
        return;
      }

      // Check sessionStorage first
      const cachedTitle = sessionStorage.getItem(`course-title-${courseId}`);
      if (cachedTitle) {
        setCourseTitle(cachedTitle);
        return;
      }

      // Fetch from Supabase if not cached
      const { data, error } = await supabase
        .from("course")
        .select("title")
        .eq("id", courseId)
        .single();

      if (!error && data) {
        setCourseTitle(data.title);
        sessionStorage.setItem(`course-title-${courseId}`, data.title);
      } else {
        console.warn("Failed to fetch course title:", error?.message);
        setCourseTitle(null);
      }
    };

    fetchCourseTitle();
  }, [segments]);

  // ---------------------------------------------
  // 🌀 Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background flex-col gap-3">
        <PiSpinner className="animate-spin" size={40} />
        <p className="mt-4 text-foreground">Loading...</p>
      </div>
    );
  }

  if (!loggedUser) return null;

  // ---------------------------------------------
  // 🧭 Render
  return (
    <SidebarProvider defaultOpen={true} style={{ "--sidebar-width": "19rem" }}>
      <AppSidebar />
      <SidebarInset className="text-sm">
        <ModeToggle />
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 hover:bg-sidebar-accent z-20" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb className="z-10">
            <BreadcrumbList>
              {segments.map((segment, index) => {
                const path = "/" + segments.slice(0, index + 1).join("/");
                const isLast = index === segments.length - 1;

                // Check if this segment is the course ID
                const courseIndex = segments.indexOf("courses");
                const courseId = segments[courseIndex + 1];
                const isCourseIdSegment = segment === courseId && courseTitle;

                const label = isCourseIdSegment
                  ? courseTitle
                  : formatSegment(segment);

                return (
                  <BreadcrumbItem
                    className="hidden md:block capitalize"
                    key={index}
                  >
                    {!isLast ? (
                      <div className="flex items-center gap-1">
                        <BreadcrumbLink asChild>
                          <Link to={path}>{label}</Link>
                        </BreadcrumbLink>
                        <ChevronRight className="hidden md:block" size={14} />
                      </div>
                    ) : (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
