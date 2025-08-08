import React from "react";

import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loader } = useAuth();
  const { userRole } = useUserRole();

  if (loader) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
        <span className="loading loading-spinner loading-lg text-blue-300"></span>
      </div>
    );
  }

  if (!user || userRole !== "admin") {
    return <Navigate to={"/forbidden"} />;
  }

  return children;
};

export default AdminRoute;
