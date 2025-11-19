// src/pages/ErrorPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Home, RotateCcw, LogOut, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ErrorPageComponent({
  statusCode = 500,
  message = "Something went wrong",
  onReset,
}) {
  const navigate = useNavigate();

  const errorMessages = {
    401: {
      title: "Unauthenticated!",
      description: "Your session has expired. Please log in again.",
      icon: "🔐",
      action: "Login",
      actionIcon: LogOut,
    },
    404: {
      title: "Page Not Found",
      description:
        "The page you're looking for doesn't exist or has been moved.",
      icon: "🔍",
      action: "Go Back",
      actionIcon: ArrowLeft,
    },
    403: {
      title: "Access Denied",
      description: "You do not have permission to access this resource.",
      icon: "🔒",
      action: "Go Home",
      actionIcon: Home,
    },
    500: {
      title: "Server Error",
      description: "Something went wrong on our end. Please try again later.",
      icon: "⚠️",
      action: "Try Again",
      actionIcon: RotateCcw,
    },
    503: {
      title: "Service Unavailable",
      description:
        "The service is temporarily unavailable. Please try again later.",
      icon: "🛠️",
      action: "Try Again",
      actionIcon: RotateCcw,
    },
  };

  const error = errorMessages[statusCode] || {
    title: "Oops!",
    description: message,
    icon: "❌",
    action: "Go Home",
    actionIcon: Home,
  };

  const handlePrimaryAction = () => {
    if (statusCode === 401) {
      navigate("/auth/login");
    } else if (statusCode === 500 || statusCode === 503) {
      if (onReset) onReset();
      window.location.reload();
    } else if (statusCode === 404) navigate(-1);
    else {
      navigate("/");
    }
  };

  const ActionIcon = error.actionIcon;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full text-center"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl mb-6"
        >
          {error.icon}
        </motion.div>

        {/* Status Code */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-muted-foreground text-sm font-medium mb-2">
            Error {statusCode}
          </p>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-semibold text-foreground mb-2"
        >
          {error.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-sm mb-8"
        >
          {error.description}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-3"
        >
          <button
            onClick={handlePrimaryAction}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium text-sm"
          >
            <ActionIcon className="w-4 h-4" />
            {error.action}
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors font-medium text-sm"
          >
            <Home className="w-4 h-4" />
            Go Home
          </button>
        </motion.div>

        {/* Support Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-muted-foreground mt-8 pt-6 border-t border-border"
        >
          Need help? Contact{" "}
          <a
            href="mailto:support@nunya.com"
            className="text-primary hover:underline"
          >
            support@nunya.com
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default ErrorPageComponent;

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      statusCode: 500,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);

    this.setState((prev) => ({
      error,
      errorInfo,
      errorCount: prev.errorCount + 1,
    }));

    // Determine status code based on error message
    let statusCode = 500;
    if (error.message?.includes("404")) statusCode = 404;
    if (error.message?.includes("403")) statusCode = 403;
    if (error.message?.includes("401")) statusCode = 401;

    this.setState({ statusCode });

    // Log to external service in production
    if (process.env.NODE_ENV === "production") {
      // logErrorToService(error, errorInfo);
      console.log("Error logged to service");
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPageComponent
          statusCode={this.state.statusCode}
          message={this.state.error?.message}
          onReset={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}
