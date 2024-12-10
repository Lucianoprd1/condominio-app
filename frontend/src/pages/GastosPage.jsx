// src/pages/GastosPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../Components/AdminHeader';
import Footer from '../Components/Footer';
import API from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import CreateGastoForm from '../Components/CreateGastoForm';

const GastosPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGasto, setSelectedGasto] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get('/residents');
      console.log('Residents response:', response.data);
      
      if (response.data.residents) {
        const usersWithGastos = await Promise.all(
          response.data.residents.map(async (user) => {
            try {
              const gastosResponse = await API.get(`/gastos/residente/${user._id}`);
              console.log(`Gastos for user ${user._id}:`, gastosResponse.data);
              return {
                ...user,
                lastGasto: gastosResponse.data.gastos?.[0] || null,
                estado: gastosResponse.data.estado || null
              };
            } catch (error) {
              console.error(`Error fetching gastos for user ${user._id}:`, error);
              return { ...user, lastGasto: null, estado: null };
            }
          })
        );
        setUsers(usersWithGastos);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGasto = async (gastoData) => {
    try {
      await API.post('/gastos', {
        ...gastoData,
        userId: selectedUser._id
      });
      await fetchData();
      setShowCreateForm(false);
      setSelectedUser(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Error al crear el gasto');
    }
  };

  const handleDeleteGasto = async (gastoId) => {
    if (window.confirm('¿Está seguro de eliminar este gasto?')) {
      try {
        await API.delete(`/gastos/${gastoId}`);
        await fetchData();
      } catch (error) {
        setError('Error al eliminar el gasto');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredUsers = users.filter(user => {
    if (filter === 'pending') {
      return user.lastGasto?.estadoPago === 'pendiente';
    }
    if (filter === 'paid') {
      return user.lastGasto?.estadoPago === 'pagado';
    }
    return true;
  });

  const EditGastoForm = ({ gasto, onClose }) => {
    const [formData, setFormData] = useState({
      total: gasto.total,
      utilidades: gasto.utilidades,
      mantencion: gasto.mantencion,
      otros: gasto.otros,
      mes: gasto.mes
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await API.put(`/gastos/${gasto._id}`, formData);
        await fetchData();
        onClose();
      } catch (error) {
        setError(error.response?.data?.message || 'Error al actualizar el gasto');
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg w-96">
          <h2 className="text-2xl font-bold mb-6">Editar Gasto</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={formData.mes}
              onChange={(e) => setFormData({ ...formData, mes: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Mes"
              required
            />
            <input
              type="number"
              value={formData.utilidades}
              onChange={(e) => setFormData({ ...formData, utilidades: Number(e.target.value) })}
              className="w-full p-2 border rounded"
              placeholder="Utilidades"
              required
            />
            <input
              type="number"
              value={formData.mantencion}
              onChange={(e) => setFormData({ ...formData, mantencion: Number(e.target.value) })}
              className="w-full p-2 border rounded"
              placeholder="Mantención"
              required
            />
            <input
              type="number"
              value={formData.otros}
              onChange={(e) => setFormData({ ...formData, otros: Number(e.target.value) })}
              className="w-full p-2 border rounded"
              placeholder="Otros"
              required
            />
            <input
              type="number"
              value={formData.total}
              onChange={(e) => setFormData({ ...formData, total: Number(e.target.value) })}
              className="w-full p-2 border rounded"
              placeholder="Total"
              required
            />
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Actualizar
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
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Gastos</h1>
          <div className="space-x-4">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="all">Todos</option>
              <option value="pending">Pendientes</option>
              <option value="paid">Pagados</option>
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
                    className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700"
                  >
                    Nuevo Gasto
                  </button>
                </div>

                {user.lastGasto ? (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Último Gasto: {user.lastGasto.mes}</h4>
                    <div className="space-y-2">
                      <p className="text-sm">Total: ${user.lastGasto.total?.toLocaleString()}</p>
                      <p className="text-sm">Estado: 
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${
                          user.lastGasto.estadoPago === 'pagado' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.lastGasto.estadoPago}
                        </span>
                      </p>
                      
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => {
                            setSelectedGasto(user.lastGasto);
                            setShowEditForm(true);
                          }}
                          className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteGasto(user.lastGasto._id)}
                          className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700"
                        >
                          Eliminar
                        </button>
                      </div>

                      {user.lastGasto.Observaciones && (
                        <p className="text-sm text-gray-600 mt-2">
                          Observación: {user.lastGasto.Observaciones}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Sin gastos registrados</p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {showCreateForm && selectedUser && (
        <CreateGastoForm
          user={selectedUser}
          onSubmit={handleCreateGasto}
          onClose={() => {
            setShowCreateForm(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showEditForm && selectedGasto && (
        <EditGastoForm
          gasto={selectedGasto}
          onClose={() => {
            setShowEditForm(false);
            setSelectedGasto(null);
          }}
        />
      )}
    </div>
  );
};

export default GastosPage;