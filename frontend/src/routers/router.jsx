import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Signup from "../pages/auth/Signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/auth/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
