import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: isUser, isPending: isUserLoading } = useQuery({
    queryKey: [user?.email, "user"],
    enabled: !loading,
    queryFn: async () => {
      console.log("checking if user is pro user");
      const res = await axiosSecure.get(
        `/users/pro-and-admin-surveyor/${user?.email}`
      );
      return res.data?.isUser;
    },
  });
  return [isUser, isUserLoading];
};

export default useUser;
