import axios from "axios";
import { use, useEffect } from "react";
import { AuthContext } from "../provider/AuthContext";

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`,
});

const useAxiosSecure = () => {
  const { user } = use(AuthContext);

  useEffect(() => {
   
    const requestInterceptor = axiosSecure.interceptors.request.use(
      config => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );


    const responseInterceptor = axiosSecure.interceptors.response.use(
      res => res,
      error => {
        return Promise.reject(error);
      }
    );

    
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
