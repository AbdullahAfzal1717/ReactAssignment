import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Frontend from "./Frontend";
import Dashboard from "./Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import { AuthContext } from "../context/AuthContext";

export default function Index() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/*"
        element={<PrivateRoute Component={Frontend} allowedRoles={["admin"]} />}
      />
      <Route
        path="dashboard/*"
        element={<PrivateRoute Component={Dashboard} />}
      />
      <Route
        path="auth/*"
        element={
          !isAuthenticated ? <Auth /> : <Navigate to="/dashboard/menu" />
        }
      />
    </Routes>
  );
}
