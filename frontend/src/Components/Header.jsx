import React from 'react';
import profileImage from '../assets/profile.png'; // Importamos la imagen local de perfil

const Header = ({ userName }) => {
  return (
    <header className="flex justify-between items-center py-4 bg-gray-800 text-white px-6 shadow-md">
      <div className="flex items-center space-x-4">
        {/* Imagen de perfil que viene de src/profile.png */}
        <img
          src={profileImage}
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h1 className="text-xl font-bold">Bienvenido(a), {userName}</h1>
        </div>
      </div>
      <nav className="flex space-x-4">
        <a href="/perfil" className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Perfil</a>
        <a href="/gastos" className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Gastos</a>
        <a href="/ayuda" className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Ayuda</a>
      </nav>
    </header>
  );
};

export default Header;