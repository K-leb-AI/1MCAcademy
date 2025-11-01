import { useState, useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [hasLetters, setHasLetters] = useState(true);
  const [hasNumbers, setHasNumbers] = useState(true);
  const [isLongEnough, setIsLongEnough] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  //check password
  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setHasLetters(/[a-zA-Z]/.test(value));
    setHasNumbers(/\d/.test(value));
    setIsLongEnough(value.length >= 6);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    //check email
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email.");
    }
    try {
      //make api call here
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/survey`,
          data: {
            display_name: name,
          },
        },
      });

      localStorage.setItem("region", JSON.stringify(selectedRegion));

      if (error) {
        console.log("Error in handleSignUp: ", error.message);
        toast.error(error.message || "Signup failed. Please try again.");
        setLoading(false);
        return;
      } else {
        toast.success(
          "Account created! Please check your email for verification."
        );
        navigate("/auth/check");
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

  // const signInWithGoogle = () => {};

  const regions = [
    "Ashanti Region",
    "Bono Region",
    "Bono East Region",
    "Ahafo Region",
    "Central Region",
    "Eastern Region",
    "Greater Accra Region",
    "North East Region",
    "Northern Region",
    "Oti Region",
    "Savannah Region",
    "Upper East Region",
    "Upper West Region",
    "Western Region",
    "Western North Region",
  ];
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
    setIsOpen(false);
  };

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
        onSubmit={(e) => handleSignUp(e)}
      >
        <h1 className="text-2xl font-bold">Welcome Coder</h1>
        <p className="text-gray mb-2 font-light">Let&apos;s get you started!</p>

        <div className="flex flex-col mb-4 w-full">
          <input
            type="text"
            id="name"
            className="mt-4 w-full px-4 py-3 bg-background border-1 border-border rounded-lg text-left focus:outline-none placeholder:text-foreground/30 placeholder:text-sm"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Full Name"
          />
        </div>
        <div className="flex flex-col mb-4 w-full">
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 bg-background border-1 border-border rounded-lg text-left focus:outline-none placeholder:text-foreground/30 placeholder:text-sm"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
        </div>
        <div
          className={
            isLongEnough && hasLetters && hasNumbers
              ? "flex flex-col w-full mb-4"
              : "flex flex-col w-full"
          }
        >
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-3 bg-background border-1 border-border rounded-lg text-left focus:outline-none placeholder:text-foreground/30 placeholder:text-sm"
              onChange={(e) => handleChange(e)}
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

          <div className="my-0.5">
            <div className="flex items-center gap-1">
              <span className={hasLetters ? "hidden" : "text-red-600 text-xs"}>
                Needs at least one letter
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className={hasNumbers ? "hidden" : "text-red-600 text-xs"}>
                Needs at least one number
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span
                className={isLongEnough ? "hidden" : "text-red-600 text-xs"}
              >
                Needs at least 6 characters
              </span>
            </div>
          </div>
        </div>

        <div className="relative w-full mb-4" ref={dropdownRef}>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-3 bg-background border-1 border-border rounded-lg text-left focus:outline-none placeholder:text-foreground/30 text-sm transition flex items-center justify-between"
          >
            <span
              className={
                selectedRegion ? "text-foreground" : "text-foreground/30"
              }
            >
              {selectedRegion || "Select your region"}
            </span>
            <MdOutlineKeyboardArrowDown
              size={20}
              className={`text-gray/50 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 md:-top-18 md:left-[105%] md:w-3/5 mt-2 bg-sidebar rounded-xl shadow-lg z-10">
              <ul className="py-2">
                {regions.map((region) => (
                  <li key={region}>
                    <button
                      onClick={() => handleSelectRegion(region)}
                      className={`w-full px-6 py-1 text-left transition text-xs ${
                        selectedRegion === region
                          ? "bg-accent bg-opacity-20"
                          : "text-foreground/50 hover:bg-accent/40"
                      }`}
                    >
                      {region}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          className="w-full h-10 bg-primary rounded-lg text-primary-foreground text-sm hover:bg-light-accent duration-300 cursor-pointer grid place-content-center"
          type="submit"
        >
          {loading ? "Loading..." : "Continue"}
        </button>
      </form>
      <div className="flex gap-1 mt-3 text-sm">
        <span>Already have an account?</span>
        <span className="underline font-bold">
          <Link to={"/auth/login"}>Login</Link>
        </span>
      </div>
      {/* <div className="flex w-full gap-2 items-center mt-5">
        <div className="border w-9/20 border-gray/10 rounded-full"></div>
        OR
        <div className="border w-9/20 border-gray/10 rounded-full"></div>
      </div> */}
      {/* <button
        className="flex items-center gap-2 justify-center w-full h-10 bg-card shadow-sm rounded-lg text-foreground font-medium mt-3 text-xs hover:bg-card/80 duration-300 cursor-pointer"
        // onClick={signInWithGoogle}
      >
        <FcGoogle className="size-4" />
        Sign in with Google
      </button> */}
    </div>
  );
};

export default SignupForm;
