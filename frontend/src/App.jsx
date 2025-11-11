import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ModeToggle } from "./components/ThemeToggle";
import { UserProvider } from "./utils/UserProvider";

function App() {
  return (
    <>
      {/* <ModeToggle /> */}
      <Toaster />
      <UserProvider>
        <main>
          <Outlet />
        </main>
      </UserProvider>
    </>
  );
}

export default App;
