import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./utils/UserProvider";
import ErrorBoundary from "./pages/dashboard/ErrorPage";

function App() {
  return (
    <>
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
