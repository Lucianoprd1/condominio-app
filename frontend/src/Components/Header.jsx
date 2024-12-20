// src/Components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import profileImage from '../assets/profile.png';

const Header = ({ userName, onLogout }) => {
  return (
    <header className="flex justify-between items-center py-4 bg-gray-800 text-white px-6 shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src={profileImage}
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <h1 className="text-xl font-bold">Bienvenido(a), {userName}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        >
          Inicio
        </Link>
        <Link
          to="/gastos"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Gastos
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

export default Header;