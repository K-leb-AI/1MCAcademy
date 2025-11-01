import React from "react";
import { CheckEmail } from "../../components/auth/CheckEmail";
import { motion } from "motion/react";

const Check = () => {
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
        <CheckEmail />
      </motion.div>
    </div>
  );
};

export default Check;
