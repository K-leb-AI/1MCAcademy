import { useState, useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      //make api call here
      // toast.success("Account created! Please check your email for verification.");
      //routing logic
      navigate("/auth/survey");
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
      <form
        action=""
        className="flex justify-center items-center flex-col w-full"
        onSubmit={(e) => handleSignUp(e)}
      >
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-gray mb-2 font-light">Back to the grind.</p>

        <div className="flex flex-col mb-4 w-full">
          <input
            type="email"
            id="email"
            className="w-full mt-4 px-4 py-3 bg-white border-1 border-gray/30 rounded-lg text-left focus:outline-none placeholder:text-black-1/30"
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
              className="w-full px-4 py-3 bg-white border-1 border-gray/30 rounded-lg text-left focus:outline-none placeholder:text-black-1/30 after"
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
          className="w-full h-10 bg-accent rounded-lg text-white text-sm hover:bg-light-accent duration-300 cursor-pointer grid place-content-center"
          type="submit"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <div className="flex gap-1 mt-3">
        <span>Don't have an account?</span>
        <span className="underline font-bold">
          <Link to={"/auth/signup"}>Sign up</Link>
        </span>
      </div>
      <div className="flex w-full gap-2 items-center mt-5">
        <div className="border w-9/20 border-gray/10 rounded-full"></div>
        OR
        <div className="border w-9/20 border-gray/10 rounded-full"></div>
      </div>
      <button
        className="flex items-center gap-2 justify-center w-full h-10 bg-white-0 shadow-sm rounded-lg text-black font-medium mt-3 text-xs hover:bg-white-1 duration-300 cursor-pointer"
        onClick={signInWithGoogle}
      >
        <FcGoogle className="size-4" />
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginForm;
