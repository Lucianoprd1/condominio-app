import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

/// Pages
import Home from "../pages/Home.jsx";
import Reservation from "../pages/Reservation.jsx";
import Dashboard from '../pages/Dashboard.jsx';
/// Register and Login
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

function MainRoutes() {
  return (
    <Router>
      <Routes>
        {/* Proteger la ruta del Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservation"
          element={
            <ProtectedRoute>
              <Reservation />
            </ProtectedRoute>
          }
        />
        {/* Registro y Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/perfil' element={<h1>Perfil del Usuario</h1>} />
        <Route path='/gastos' element={<h1>Sección de Gastos</h1>} />
        <Route path='/ayuda' element={<h1>Centro de Ayuda</h1>} />
        <Route path='/pagar' element={<h1>Pagar</h1>} />
      </Routes>
    </Router>
  );
}

export default MainRoutes;
