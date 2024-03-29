import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useProUser = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: proUser, isPending: isProUserLoading } = useQuery({
    queryKey: [user?.email, "pro-user"],
    enabled: !loading,
    queryFn: async () => {
      console.log("checking if user is pro user");
      const res = await axiosSecure.get(
        `/users/pro-and-admin-surveyor/${user?.email}`
      );
      return res.data?.pro_user;
    },
  });
  return [proUser, isProUserLoading];
};

export default useProUser;
