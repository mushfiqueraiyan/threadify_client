import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./axiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
  const { user, loader } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userRole } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      if (!user?.email) return "user";
      const res = await axiosSecure.get(`/userData?email=${user?.email}`);
      return res?.data?.role;
    },
    enabled: !loader && !!user?.email,
  });

  return { userRole };
};

export default useUserRole;
