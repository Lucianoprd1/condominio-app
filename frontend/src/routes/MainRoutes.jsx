import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

// Pages
import Dashboard from "../pages/Dashboard.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import CreatePublicationForm from "../Components/CreatePublicationForm.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import UserExpenses from "../pages/UserExpenses.jsx";
import UserHelp from "../pages/UserHelp.jsx";

function MainRoutes() {
  return (
    <Router>
      <Routes>
        {/* Ruta predeterminada redirige al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas para usuarios logueados */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gastos"
          element={
            <ProtectedRoute>
              <UserExpenses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ayuda"
          element={
            <ProtectedRoute>
              <UserHelp />
            </ProtectedRoute>
          }
        />

        {/* Rutas protegidas para administradores */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/publicaciones/nueva"
          element={
            <ProtectedRoute requiredRole="admin">
              <CreatePublicationForm />
            </ProtectedRoute>
          }
        />

        {/* Ruta de error 404 */}
        <Route path="*" element={<h1>Página no encontrada (404)</h1>} />
      </Routes>
    </Router>
  );
}

export default MainRoutes;