import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axiosSecure";

const useUserData = () => {
  const { user, loader } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["userBadge", user?.email],
    queryFn: async () => {
      if (!user?.email) return "user";
      const res = await axiosSecure.get(`/userData?email=${user?.email}`);
      return res.data.badge;
    },
    enabled: !loader && !!user?.email,
  });

  return { userData, isLoading };
};

export default useUserData;
