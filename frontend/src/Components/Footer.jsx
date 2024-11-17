import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-sm">
          © 2024 Condominio DWM. Todos los derechos reservados.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="/terms" className="hover:text-gray-400">Términos y Condiciones</a>
          <a href="/privacy" className="hover:text-gray-400">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;