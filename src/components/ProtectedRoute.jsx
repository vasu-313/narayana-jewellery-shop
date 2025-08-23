// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return null; // Or show a spinner

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
