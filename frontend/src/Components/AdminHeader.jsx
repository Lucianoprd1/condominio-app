// src/Components/AdminHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import profileImage from '../assets/profile.png';

const AdminHeader = ({ onLogout }) => {
  return (
    <header className="flex justify-between items-center py-4 bg-gray-900 text-white px-6 shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src={profileImage}
          alt="admin-profile"
          className="w-10 h-10 rounded-full"
        />
        <h1 className="text-xl font-bold">Panel Administrativo</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          to="/admin"
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
        >
          Dashboard
        </Link>
       
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;