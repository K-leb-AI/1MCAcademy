import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ModeToggle } from "./components/ThemeToggle";

function App() {
  return (
    <>
      <ModeToggle />

      <Toaster />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
