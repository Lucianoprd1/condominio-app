import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
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
import { AuthProvider } from "../context/AuthContext.jsx";
import UserGastos from "../pages/userGastos.jsx";
import PublicacionesPage from "../pages/PublicacionesPage.jsx";
import GastosPage from "../pages/GastosPage.jsx";
import MultasPage from "../pages/MultasPage.jsx";
import UsersPage from "../pages/UsersPage.jsx";

// src/routes/MainRoutes.jsx
function MainRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/expenses" element={<UserExpenses />} />
            <Route path="/gastos" element={<UserGastos />} />
            <Route path="/admin/publicaciones" element={<PublicacionesPage />} />
            <Route path="/admin/gastos" element={<GastosPage />} />
            <Route path="/admin/multas" element={<MultasPage />} />
            <Route path="/admin/users" element={<UsersPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default MainRoutes;