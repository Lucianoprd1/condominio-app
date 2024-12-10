// src/pages/MultasPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../Components/AdminHeader';
import Footer from '../Components/Footer';
import API from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';

const MultasPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedMulta, setSelectedMulta] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await API.get('/residents');
      if (response.data.residents) {
        const usersWithMultas = await Promise.all(
          response.data.residents.map(async (user) => {
            try {
              // Get multas for each user
              const multasResponse = await API.get('/multas', {
                params: { userId: user._id }
              });
              
              // Sort multas by date (most recent first)
              const sortedMultas = multasResponse.data.sort((a, b) => 
                new Date(b.fechaRegistro) - new Date(a.fechaRegistro)
              );

              return {
                ...user,
                lastMulta: sortedMultas[0],
                multas: sortedMultas
              };
            } catch (error) {
              return { ...user, lastMulta: null, multas: [] };
            }
          })
        );
        setUsers(usersWithMultas);
      }
      setLoading(false);
    } catch (error) {
      setError('Error al cargar los datos');
      setLoading(false);
    }
  };

  const handleDeleteMulta = async (multaId) => {
    if (window.confirm('¿Está seguro de eliminar esta multa?')) {
      try {
        await API.delete(`/multas/${multaId}`);
        await fetchData();
      } catch (error) {
        setError('Error al eliminar la multa');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredUsers = users.filter(user => {
    if (filter === 'pending') {
      return user.lastMulta?.estadoPago === 'pendiente';
    }
    if (filter === 'paid') {
      return user.lastMulta?.estadoPago === 'pagado';
    }
    return true;
  });

  const CreateMultaForm = ({ user, onClose }) => {
    const [formData, setFormData] = useState({
      userId: user._id,
      montoMulta: '',
      descripcion: ''
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await API.post('/multas', formData);
        await fetchData();
        onClose();
      } catch (error) {
        setError(error.response?.data?.message || 'Error al crear multa');
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg w-96">
          <h2 className="text-2xl font-bold mb-6">Nueva Multa</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              value={formData.montoMulta}
              onChange={(e) => setFormData({ ...formData, montoMulta: Number(e.target.value) })}
              className="w-full p-2 border rounded"
              placeholder="Monto de la multa"
              required
            />
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Descripción"
              rows="3"
              required
            />
            <div className="flex justify-end space-x-4">
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
                Crear Multa
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
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Multas</h1>
          <div className="space-x-4">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="all">Todas</option>
              <option value="pending">Pendientes</option>
              <option value="paid">Pagadas</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div key={user._id} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-600">Depto: {user.departamento}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowCreateForm(true);
                    }}
                    className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700"
                  >
                    Nueva Multa
                  </button>
                </div>

                {user.lastMulta ? (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Última Multa</h4>
                    <div className="space-y-2">
                      <p className="text-sm">Monto: ${user.lastMulta.montoMulta?.toLocaleString()}</p>
                      <p className="text-sm">Descripción: {user.lastMulta.descripcion}</p>
                      <p className="text-sm">Estado: 
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${
                          user.lastMulta.estadoPago === 'pagado' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.lastMulta.estadoPago}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Fecha: {new Date(user.lastMulta.fechaRegistro).toLocaleDateString()}
                      </p>
                      
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => handleDeleteMulta(user.lastMulta._id)}
                          className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Sin multas registradas</p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {showCreateForm && selectedUser && (
        <CreateMultaForm
          user={selectedUser}
          onClose={() => {
            setShowCreateForm(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default MultasPage;