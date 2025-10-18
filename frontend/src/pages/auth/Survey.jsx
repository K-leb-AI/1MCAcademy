import React from "react";
import SurveyForm from "../../components/auth/SurveyForm";
import { motion } from "motion/react";

const Survey = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center text-xs">
      <motion.div
        initial={{ translateX: -100, opacity: 0 }}
        animate={{
          translateX: 0,
          opacity: 1,
          transition: { duration: 0.8 },
        }}
      >
        <SurveyForm />
      </motion.div>
    </div>
  );
};

export default Survey;
