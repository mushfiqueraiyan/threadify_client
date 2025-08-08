import React from "react";
import useUserRole from "../../hooks/useUserRole";
import UserProfile from "./UserProfile";
import AdminProfile from "./AdminProfile";

const Dashboard = () => {
  const { userRole } = useUserRole();
  //console.log(userRole);

  if (userRole === "user") {
    return <UserProfile />;
  } else if (userRole === "admin") {
    return <AdminProfile />;
  }
};

export default Dashboard;
