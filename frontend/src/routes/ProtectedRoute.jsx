import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  // Leer datos del usuario desde localStorage
  const userLoggedIn = JSON.parse(localStorage.getItem("loggedInUser"));

  // Si no hay usuario logueado, redirigir al login
  if (!userLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene, redirigir al dashboard general
  if (requiredRole && userLoggedIn.role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  // Si todo es correcto, mostrar el contenido de la ruta protegida
  return children;
};

export default ProtectedRoute;