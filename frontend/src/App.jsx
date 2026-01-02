import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./utils/UserProvider";


function App() {
  return (
    <>
    <UserProvider>
      <Toaster />
      <main>
        <Outlet />
      </main>
    </UserProvider>
    </>
  );
}

export default App;
