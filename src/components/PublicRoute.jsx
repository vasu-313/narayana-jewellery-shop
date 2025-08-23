import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return null; 

  return currentUser ? <Navigate to="/" /> : children;
};

export default PublicRoute;
