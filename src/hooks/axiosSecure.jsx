import axios from "axios";
import { useEffect } from "react";
import { getIdToken } from "firebase/auth";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://threadify-server.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await getIdToken(user);
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => axiosSecure.interceptors.request.eject(interceptor);
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
