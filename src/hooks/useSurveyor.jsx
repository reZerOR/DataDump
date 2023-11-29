import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useSurveyor = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: isSurveyor, isPending: isSurveyorLoading } = useQuery({
    queryKey: [user?.email, "surveyor"],
    enabled: !loading,
    queryFn: async () => {
      console.log("checking if user is pro user");
      const res = await axiosSecure.get(
        `/users/pro-and-admin-surveyor/${user?.email}`
      );
      return res.data?.surveyor;
    },
  });
  return [isSurveyor, isSurveyorLoading];
};

export default useSurveyor;
