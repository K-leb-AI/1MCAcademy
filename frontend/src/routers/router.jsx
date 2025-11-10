import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Signup from "../pages/auth/Signup.jsx";
import Login from "../pages/auth/Login.jsx";
import MyLearning from "../pages/dashboard/MyLearning.jsx";
import DashboardLayout from "../components/DashboardLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Courses from "../pages/dashboard/Courses.jsx";
import SkillPath from "../pages/dashboard/SkillPath.jsx";
import SettingsPage from "../pages/dashboard/Settings.jsx";
import Notifications from "../pages/dashboard/Notifications.jsx";
import NotificationMessage from "../components/NotificationMessage.jsx";
import Check from "../pages/auth/Check.jsx";
import Survey from "../pages/auth/Survey.jsx";
import LandingPage from "../pages/landingpage/LandingPage.jsx";
import CourseDetail from "../pages/dashboard/CourseDetail.jsx";
import NotFound from "../components/NotFound.jsx";
import CourseContentPage from "../pages/dashboard/CourseContentPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
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
      {
        path: "/dashboard",
        element: <DashboardLayout />,
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
            element: <CourseDetail />,
          },
          {
            path: "/dashboard/courses/:courseId/:lessonId",
            element: <CourseContentPage />,
          },
          {
            path: "/dashboard/my-learning",
            element: <MyLearning />,
          },
          {
            path: "/dashboard/skill-paths",
            element: <SkillPath />,
          },
          {
            path: "/dashboard/settings",
            element: <SettingsPage />,
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
    ],
  },
]);

export default router;
