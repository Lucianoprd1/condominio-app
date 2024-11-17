import React from 'react';
// Principalmente se muestran las publicaciones, de lo contrario se muestra un mensaje
const Publicaciones = ({ posts }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Comunicados</h2>
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
              <p className="text-gray-700 mt-2">{post.content}</p>
              <p className="text-sm text-gray-500 mt-4">Publicado el: {post.date}</p>
            </div>
          ))
        ) : (
          <p>No hay comunicados disponibles en este momento.</p>
        )}
      </div>
    </div>
  );
};

export default Publicaciones;