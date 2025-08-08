import React, { use } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
  const userAuth = use(AuthContext);

  return userAuth;
};

export default useAuth;
