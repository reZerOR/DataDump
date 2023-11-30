import { useContext } from "react";
import useSurveyor from "../hooks/useSurveyor";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const SurveyorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isSurveyor, isSurveyorLoading] = useSurveyor();
  const location = useLocation();

  if (loading || isSurveyorLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user && isSurveyor) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SurveyorRoute;
