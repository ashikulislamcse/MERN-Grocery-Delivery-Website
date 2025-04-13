import { Navigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { isUser, isUserLoading } = useAppContext();

  if (isUserLoading) {
    // Optional: Show loading message while user status is being fetched
    return <div>Loading...</div>;
  }

  if (!isUser) {
    toast.error("You need to log in to access this page.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
