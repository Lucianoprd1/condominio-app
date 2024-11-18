import React from "react";
import Header from "../Components/Header"; // Importamos el Header
import Footer from "../Components/Footer"; // Importamos el Footer

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      {/* Header */}
      <Header userName="Administrador" />

      {/* Contenido principal */}
      <main className="mt-8 max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Panel de Administración</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Crear Usuario */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Crear Usuario</h2>
            <p className="text-gray-700">Registra nuevos usuarios del sistema.</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Crear Usuario
            </button>
          </div>

          {/* Crear Publicación */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Crear Publicación</h2>
            <p className="text-gray-700">Añade nuevas publicaciones visibles para los residentes.</p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Crear Publicación
            </button>
          </div>

          {/* Gestionar Gastos */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Gestionar Gastos</h2>
            <p className="text-gray-700">Consulta y edita los gastos del condominio.</p>
            <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
              Ver Gastos
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Otros Paneles de Administración */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Ver Usuarios</h2>
            <p className="text-gray-700">Lista y gestiona usuarios existentes.</p>
            <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Ver Usuarios
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Configuraciones</h2>
            <p className="text-gray-700">Ajusta configuraciones del sistema.</p>
            <button className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
              Configurar
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;