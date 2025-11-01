import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { supabase } from "../../supabaseClient";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (user) {
        toast.success("Successful Login.");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Error in handleSignUp: ", error.message);
      toast.error(error.message || "Signup failed. Please try again.");
      setLoading(false);
      return;
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const signInWithGoogle = () => {};

  return (
    <div className="flex items-center flex-col w-[300px]">
      <div className="self-start mb-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800"
          aria-label="Go back"
        >
          <MdArrowBack size={18} /> Back
        </button>
      </div>
      <form
        action=""
        className="flex justify-center items-center flex-col w-full"
        onSubmit={(e) => handleLogin(e)}
      >
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-gray mb-2 font-light">Back to the grind.</p>

        <div className="flex flex-col mb-4 w-full">
          <input
            type="email"
            id="email"
            className="mt-4 w-full px-4 py-3 bg-background border border-border rounded-lg text-left focus:outline-none placeholder:text-foreground/30 text-sm transition flex items-center justify-between"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col w-full mb-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-3 bg-background border-1 border-border rounded-lg text-left focus:outline-none placeholder:text-foreground/30 text-sm transition flex items-center justify-between"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
            />
            <div
              className="absolute top-0.5 right-2 grid place-items-center aspect-square text-gray/50 w-11 text-lg cursor-pointer hover:text-gray duration-200"
              onClick={handlePasswordToggle}
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </div>
          </div>
        </div>
        <button
          className="w-full h-10 bg-primary rounded-lg text-primary-foreground text-sm hover:bg-light-accent duration-300 cursor-pointer grid place-content-center"
          type="submit"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <div className="flex gap-1 mt-3 text-sm">
        <span>Don't have an account?</span>
        <span className="underline font-bold">
          <Link to={"/auth/signup"}>Sign up</Link>
        </span>
      </div>
      <div className="flex w-full gap-2 items-center mt-5">
        {/* <div className="border w-9/20 border-gray/10 rounded-full"></div>
        OR
        <div className="border w-9/20 border-gray/10 rounded-full"></div> */}
      </div>
      {/* <button
        className="flex items-center gap-2 justify-center w-full h-10 bg-card shadow-sm rounded-lg text-foreground font-medium mt-3 text-xs hover:bg-card/80 duration-300 cursor-pointer"
        onClick={signInWithGoogle}
      >
        <FcGoogle className="size-4" />
        Sign in with Google
      </button> */}
    </div>
  );
};

export default LoginForm;
