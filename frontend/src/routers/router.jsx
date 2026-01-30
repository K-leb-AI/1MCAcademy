import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Signup from "../pages/auth/Signup.jsx";
import Login from "../pages/auth/Login.jsx";
import MyLearning from "../pages/dashboard/MyLearning.jsx";
import DashboardLayout from "../components/DashboardLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Courses from "../pages/dashboard/Courses.jsx";
import NunyaAssistant from "../pages/dashboard/NunyaAssistant.jsx";
import SupportPage from "../pages/dashboard/Support.jsx";
import Notifications from "../pages/dashboard/Notifications.jsx";
import NotificationMessage from "../components/NotificationMessage.jsx";
import Check from "../pages/auth/Check.jsx";
import Survey from "../pages/auth/Survey.jsx";
import LandingPage from "../pages/landingpage/LandingPage.jsx";
import CourseDetail from "../pages/dashboard/CourseDetail.jsx";
import NotFound from "../components/NotFound.jsx";
import CourseContentPage from "../pages/dashboard/CourseContentPage.jsx";
import UserProfile from "@/pages/dashboard/Profile.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import ErrorPageComponent, {
  ErrorBoundary,
} from "../pages/dashboard/ErrorPage.jsx";

import InstructorDashboard from "@/pages/instructorDashboard/InstructorDashboard.jsx";
import CreateCourse from "@/pages/instructorDashboard/CreateCourse.jsx";
import InstructorProfile from "@/pages/instructorDashboard/InstructorProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPageComponent statusCode={500} />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/auth/signup",
        element: <Signup />,
      },
      {
        path: "/auth/check",
        element: <Check />,
      },
      {
        path: "/auth/survey",
        element: <Survey />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },

      // Protected routes - require authentication
      // Instructor dashboard routes
      {
        path: "/instructor",
        element: <InstructorDashboard />,
      },
      {
        path: "/instructor/create-course",
        element: <CreateCourse />,
      },
      {
        path: "/instructor/profile",
        element: <InstructorProfile />,
      },

      //Student dashboard routes
      {
        path: "/dashboard",
        element: (
          <ErrorBoundary>
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          </ErrorBoundary>
        ),
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/courses",
            element: <Courses />,
          },
          {
            path: "/dashboard/courses/:courseId",
            element: (
              <ErrorBoundary>
                <CourseDetail />
              </ErrorBoundary>
            ),
          },
          {
            path: "/dashboard/courses/:courseId/:lessonId",
            element: (
              <ErrorBoundary>
                <CourseContentPage />
              </ErrorBoundary>
            ),
          },
          {
            path: "/dashboard/my-learning",
            element: <MyLearning />,
          },
          {
            path: "/dashboard/assistant",
            element: <NunyaAssistant />,
          },
          {
            path: "/dashboard/support",
            element: <SupportPage />,
          },
          {
            path: "/dashboard/profile",
            element: <UserProfile />,
          },
          {
            path: "/dashboard/notifications",
            element: <Notifications />,
            children: [
              {
                path: "/dashboard/notifications/:messageId",
                element: <NotificationMessage />,
              },
            ],
          },
        ],
      },
      // Error pages
      {
        path: "/error/offline",
        element: <NotFound />,
      },
      {
        path: "/error/401",
        element: <ErrorPageComponent statusCode={401} />,
      },
      {
        path: "/error/403",
        element: <ErrorPageComponent statusCode={403} />,
      },
      {
        path: "/error/500",
        element: <ErrorPageComponent statusCode={500} />,
      },
      {
        path: "/error/503",
        element: <ErrorPageComponent statusCode={503} />,
      },

      // Catch-all 404
      {
        path: "*",
        element: <ErrorPageComponent statusCode={404} />,
      },
    ],
  },
]);

export default router;
