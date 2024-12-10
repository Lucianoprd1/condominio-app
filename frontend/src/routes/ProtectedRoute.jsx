// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../Components/LoadingSpinner";
import API from "../api/axiosConfig";

function ProtectedRoute() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await API.get("/verify");
        if (response.data.isValid) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [setIsAuthenticated]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;