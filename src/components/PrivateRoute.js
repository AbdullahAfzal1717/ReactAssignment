import { AuthContext } from "../context/AuthContext";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ Component, allowedRoles }) {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated) return <Navigate to="/auth/login" />;
  if (
    !allowedRoles?.length ||
    user?.roles?.find((role) => allowedRoles?.includes(role))
  )
    return <Component />;
  return <h1>You do not have the permission to access this page</h1>;
}
