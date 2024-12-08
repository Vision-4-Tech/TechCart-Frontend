import React from "react";
import { Navigate, Outlet } from "react-router-dom"; // Import necessary components
import { useUser } from "../components/context/userContext"; // Import useUser hook

const ProtectedRoute = () => {
  const { userDetails } = useUser(); // Access user details from context

  // If the user is not logged in (i.e., userDetails is null or undefined), redirect to login page.
  if (!userDetails) {
    return <Navigate to="/" replace />;
  }

  // If user is logged in, render the children routes.
  return <Outlet />;
};

export default ProtectedRoute;
