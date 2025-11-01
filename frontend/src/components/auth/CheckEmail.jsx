import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export const CheckEmail = () => {
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
      <p className="text-gray mb-4 font-light">
        Click on the link we sent to your email to complete the sign up process
      </p>
    </div>
  );
};
