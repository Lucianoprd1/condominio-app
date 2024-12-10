// src/pages/PublicacionesPage.jsx
import React, { useState, useEffect } from 'react';
import AdminHeader from '../Components/AdminHeader';
import Footer from '../Components/Footer';
import API from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicacionesPage = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPublicacion, setSelectedPublicacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    fetchPublicaciones();
  }, []);

  const fetchPublicaciones = async () => {
    try {
      const response = await API.get('/publicaciones');
      setPublicaciones(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching publicaciones:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta publicación?')) {
      try {
        await API.delete(`/publicaciones/${id}`);
        fetchPublicaciones();
      } catch (error) {
        console.error('Error deleting publicacion:', error);
      }
    }
  };

  const CreatePublicacionForm = ({ onClose, publicacionToEdit = null }) => {
    const [formData, setFormData] = useState({
      titulo: publicacionToEdit?.titulo || '',
      contenido: publicacionToEdit?.contenido || ''
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (publicacionToEdit) {
          await API.put(`/publicaciones/${publicacionToEdit._id}`, formData);
        } else {
          await API.post('/publicaciones', formData);
        }
        fetchPublicaciones();
        onClose();
      } catch (error) {
        console.error('Error saving publicacion:', error);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg w-[600px]">
          <h2 className="text-2xl font-bold mb-6">
            {publicacionToEdit ? 'Editar Publicación' : 'Crear Nueva Publicación'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                className="w-full p-2 border rounded mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contenido</label>
              <textarea
                value={formData.contenido}
                onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}
                className="w-full p-2 border rounded mt-1"
                rows="6"
                required
              />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {publicacionToEdit ? 'Guardar Cambios' : 'Crear Publicación'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminHeader onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Publicaciones</h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Nueva Publicación
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid gap-6">
            {publicaciones.map((publicacion) => (
              <div key={publicacion._id} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">{publicacion.titulo}</h3>
                <p className="text-gray-600 mb-4">{publicacion.contenido}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    Publicado el: {new Date(publicacion.fecha).toLocaleDateString()}
                  </span>
                  <div className="space-x-4">
                    <button
                      onClick={() => {
                        setSelectedPublicacion(publicacion);
                        setShowCreateForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(publicacion._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showCreateForm && (
          <CreatePublicacionForm
            onClose={() => {
              setShowCreateForm(false);
              setSelectedPublicacion(null);
            }}
            publicacionToEdit={selectedPublicacion}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PublicacionesPage;