import toast from "react-hot-toast";
import { useAppContext } from "../Context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { isUser, navigate } = useAppContext();

  if (!isUser) {
    toast.error("You need to log in to access this page."); // Show error toast if not authenticated
    return navigate("/");
  }

  return children;
};

export default ProtectedRoute;
