import { useState, useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    //make api call here

    if (error) {
      console.log("Error in handleSignUp: ", error.message);
      toast.error(error.message || "Signup failed. Please try again.");
      setLoading(false);
      return;
    } else {
      toast.success(
        "Account created! Please check your email for verification."
      );
      router.push("/auth/signup/checkemail");
    }
  };

  const signInWithGoogle = () => {};

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
            className="mt-4 w-full px-4 py-3 bg-white border-1 border-gray/30 rounded-lg text-left focus:outline-none placeholder:text-black-1/30"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Full Name"
          />
        </div>
        <div className="flex flex-col mb-4 w-full">
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 bg-white border-1 border-gray/30 rounded-lg text-left focus:outline-none placeholder:text-black-1/30"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col mb-4 w-full">
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 bg-white border-1 border-gray/30 rounded-lg text-left focus:outline-none placeholder:text-black-1/30"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </div>

        <div className="relative w-full mb-4" ref={dropdownRef}>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-3 bg-white border-1 border-gray/30 rounded-lg text-left focus:outline-none placeholder:text-black-1/30 transition flex items-center justify-between"
          >
            <span className={selectedRegion ? "text-black" : "text-black-1/30"}>
              {selectedRegion || "Select your region"}
            </span>
            <MdOutlineKeyboardArrowDown
              size={20}
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 md:top-0 md:left-[105%] md:w-4/5 mt-2 bg-white rounded-xl shadow-lg z-10">
              <ul className="py-2">
                {regions.map((region) => (
                  <li key={region}>
                    <button
                      onClick={() => handleSelectRegion(region)}
                      className={`w-full px-6 py-1 text-left transition text-sm ${
                        selectedRegion === region
                          ? "bg-white-1 bg-opacity-20"
                          : "text-gray hover:bg-gray-100"
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
          className="w-full h-10 bg-accent rounded-lg text-white text-xs hover:bg-light-accent duration-300 cursor-pointer grid place-content-center"
          type="submit"
        >
          {loading ? "Loading..." : "Continue"}
        </button>
      </form>
      <div className="flex gap-1 mt-3">
        <span>Already have an account?</span>
        <span className="underline font-bold">
          <Link to={"/auth/login"}>Login</Link>
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

export default SignupForm;
