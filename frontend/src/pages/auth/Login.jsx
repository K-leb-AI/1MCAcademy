import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import { motion } from "motion/react";

const Login = () => {
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
        <LoginForm />
      </motion.div>
    </div>
  );
};

export default Login;
