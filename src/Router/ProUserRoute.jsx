import { Navigate } from "react-router-dom";
import useProUser from "../hooks/useProUser";

const ProUserRoute = ({ children }) => {
  const [proUser] = useProUser();

  if (proUser) {
    return <Navigate to={"/"}></Navigate>;
  }
  return children;
};

export default ProUserRoute;
