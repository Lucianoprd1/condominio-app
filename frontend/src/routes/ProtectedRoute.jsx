import React from "react";
import { Navigate } from "react-router-dom";

// Componente que protegerá las rutas
function ProtectedRoute({ children }) {
  const userLoggedIn = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!userLoggedIn) {
    // Si no hay usuario logueado, redirige al login
    return <Navigate to="/login" />;
  }

  // Si el usuario está logueado, muestra el contenido de la ruta
  return children;
}

export default ProtectedRoute;
