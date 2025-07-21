import axios from "axios";
import { use } from "react";
import { AuthContext } from "../provider/AuthContext";

const axiosSecure = axios.create({
  baseURL: `https://assignment-12-server-two-bice.vercel.app`,
});
const useAxiosSecure = () => {
  const { user } = use(AuthContext); 

  axiosSecure.interceptors.request.use(
    config => {
      if (user?.accessToken){
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config; 
    },
    error => Promise.reject(error) 
  );

  return axiosSecure;
};

export default useAxiosSecure;
