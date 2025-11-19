import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../utils/UserProvider";
import Loading from "./Loading";

export default function ProtectedRoute({ children }) {
  const { loggedUser, isLoading } = useUser();

  if (isLoading) {
    return <Loading />;
  }

  if (!loggedUser) {
    return <Navigate to="/error/401" replace />;
  }

  return children;
}
