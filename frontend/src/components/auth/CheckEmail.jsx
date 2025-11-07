import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import toast from "react-hot-toast";

export const CheckEmail = () => {
  const handleResend = async () => {
    // const redirectTo = window.location.origin;
    const redirectTo = import.meta.env.VITE_SITE_URL;
    try {
      let email = localStorage.getItem("email");
      if (email) email = JSON.parse(email);
      const { data, error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${redirectTo}/auth/survey`,
        },
      });
      if (error) {
        console.log("Error resending magic link:", error.message);
      } else {
        console.log("Link successfully sent!");
        toast.success("Link successfully sent!");
      }
    } catch (err) {
      console.warn("Failed to parse email data:", err);
    }
  };

  return (
    <div className="flex flex-col w-[300px]">
      <Link
        to="/auth/signup"
        className="flex gap-2 text-gray mb-6 cursor-pointer"
      >
        <FaArrowLeft />
        Back
      </Link>
      <h1 className="text-2xl font-bold mb-3">Please check your email</h1>
      <p className="text-foreground/50 mb-4 font-light">
        Click on the link we sent to your email to complete the sign up process
      </p>

      <div className="mt-10">
        <span className="text-foreground/50">Didn't get email?</span>
        <span
          className="ml-4 underline hover:text-foreground/70 duration-300 cursor-pointer"
          onClick={handleResend}
        >
          Resend link
        </span>
      </div>
    </div>
  );
};
