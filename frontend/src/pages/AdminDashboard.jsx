// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AdminHeader from "../Components/AdminHeader";
import Footer from "../Components/Footer";
import CreateUserForm from "../Components/CreateUserForm";
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUserCreated = (userData) => {
    console.log('Usuario creado:', userData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <AdminHeader onLogout={handleLogout} />

      <main className="mt-8 max-w-6xl mx-auto px-4 mb-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Panel de Administración</h1>
        
        {/* Primera fila - 4 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Crear Usuario */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-4">Crear Usuario</h2>
            <p className="text-gray-700 mb-4">Registra nuevos usuarios del sistema.</p>
            <button 
              onClick={() => setShowCreateUserForm(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Crear Usuario
            </button>
          </div>

          {/* Gestionar Publicaciones */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-4">Gestionar Publicaciones</h2>
            <p className="text-gray-700 mb-4">Añade nuevas publicaciones visibles para los residentes.</p>
            <button 
              onClick={() => navigate('/admin/publicaciones')}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Gestionar Publicaciones
            </button>
          </div>

          {/* Gestionar Gastos */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-4">Gestionar Gastos</h2>
            <p className="text-gray-700 mb-4">Consulta y edita los gastos del condominio.</p>
            <button 
              onClick={() => navigate('/admin/gastos')}
              className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
            >
              Ver Gastos
            </button>
          </div>

          {/* Gestionar Multas */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-4">Gestionar Multas</h2>
            <p className="text-gray-700 mb-4">Gestiona las multas de los residentes.</p>
            <button 
              onClick={() => navigate('/admin/multas')}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Ver Multas
            </button>
          </div>
        </div>

        {/* Segunda fila - 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ver Usuarios */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-4">Ver Usuarios</h2>
            <p className="text-gray-700 mb-4">Lista y gestiona usuarios existentes.</p>
            <div className="flex space-x-4">
              <button 
                onClick={() => navigate('/admin/users')}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                Ver Usuarios
              </button>
              <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                Gestionar Accesos
              </button>
            </div>
          </div>

          {/* Configuraciones */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-4">Configuraciones</h2>
            <p className="text-gray-700 mb-4">Ajusta configuraciones del sistema.</p>
            <div className="flex space-x-4">
              <button className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                Configuración General
              </button>
              <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
                Personalización
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {showCreateUserForm && (
        <CreateUserForm
          onClose={() => setShowCreateUserForm(false)}
          onUserCreated={handleUserCreated}
        />
      )}
    </div>
  );
};

export default AdminDashboard;