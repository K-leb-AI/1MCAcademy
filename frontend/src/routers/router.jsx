import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Signup from "../pages/auth/Signup.jsx";
import Survey from "../pages/auth/Survey.jsx";
import Login from "../pages/auth/Login.jsx";
import DashboardLayout from "../components/DashboardLayout.tsx";
// import Dashboard from "../pages/Dashboard.jsx";
// import Analytics from "../pages/Analytics.jsx";
// import Settings from "../pages/Settings.jsx";

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
          // {
          //   path: "/dashboard",
          //   element: <Dashboard />,
          // },
          // {
          //   path: "/analytics",
          //   element: <Analytics />,
          // },
          // {
          //   path: "/settings",
          //   element: <Settings />,
          // },
        ],
      },
    ],
  },
]);

export default router;
