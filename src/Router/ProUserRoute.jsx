import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const ProUserRoute = ({ children }) => {
  const [isUser, isUserLoading] = useUser();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isUser && user) {
    return children;
  }
  return <Navigate to={"/"}></Navigate>;
};

export default ProUserRoute;
