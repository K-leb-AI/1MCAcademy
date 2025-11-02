import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ModeToggle } from "./components/ThemeToggle";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <ModeToggle />
      <Toaster />
      <main>
        <Outlet />
      </main>
      {/* <LandingPage/> */}
    </>
  );
}

export default App;
