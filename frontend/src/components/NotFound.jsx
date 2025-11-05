import React from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { motion } from "motion/react";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <motion.div
        initial={{ translateX: -100, opacity: 0 }}
        animate={{
          translateX: 0,
          opacity: 1,
          transition: { duration: 0.8 },
        }}
      >
        <div className="flex items-center flex-col w-[300px]">
          <div className="self-start mb-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground mb-15"
              aria-label="Go back"
            >
              <MdArrowBack size={18} /> Back
            </button>
          </div>
          <h1 className="text-2xl font-bold">404 | Page Not Found</h1>
          <p className="text-gray mb-2 font-light">
            The page you're looking for doesn't exist
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
