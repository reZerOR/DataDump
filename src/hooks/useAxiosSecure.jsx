import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  // its intersept the request and add token to the request and then send the request
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Baerer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // its intercept the response and find any unusal things then logout
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response?.status;
      console.log("hitting error");

      // if found 401 or 403 then logout the user
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
