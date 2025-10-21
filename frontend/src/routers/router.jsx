import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Signup from "../pages/auth/Signup.jsx";
import Survey from "../pages/auth/Survey.jsx";
import Login from "../pages/auth/Login.jsx";
import MyLearning from "../pages/dashboard/MyLearning.jsx";
import DashboardLayout from "../components/DashboardLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Courses from "../pages/dashboard/Courses.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/auth/signup",
        element: <Signup />,
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
            path: "/dashboard/my-learning",
            element: <MyLearning />,
          },
          {
            path: "/dashboard/skill-paths",
            element: <div>Skill Paths</div>,
          },
          {
            path: "/dashboard/settings",
            element: <div>Settings</div>,
          },
          {
            path: "/dashboard/support",
            element: <div>Support</div>,
          },
        ],
      },
    ],
  },
]);

export default router;
