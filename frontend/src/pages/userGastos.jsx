// src/pages/UserGastos.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axiosConfig';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const UserGastos = () => {
  const { user, logout } = useAuth();
  const [gastosPendientes, setGastosPendientes] = useState([]);
  const [morosidad, setMorosidad] = useState([]);
  const [observacion, setObservacion] = useState('');
  const [selectedGasto, setSelectedGasto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setError(null);
    setLoading(true);
    try {
      const gastosResponse = await API.get('/gastos');
      console.log('Gastos response:', gastosResponse.data);
      
      if (gastosResponse.data) {
        setGastosPendientes(gastosResponse.data.filter(g => g.estadoPago === 'pendiente'));
        
        const morosidadResponse = await API.get('/gastos/morosidad');
        console.log('Morosidad response:', morosidadResponse.data);
        setMorosidad(morosidadResponse.data.morosidad || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.response?.data?.message || 'Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handlePago = async (gastoId) => {
    try {
      await API.put('/gastos/pagar', { gastoId });
      await fetchData();
    } catch (error) {
      console.error('Error al procesar pago:', error);
      setError(error.response?.data?.message || 'Error al procesar el pago');
    }
  };

  const handleObservacion = async (action, gastoId) => {
    try {
      switch (action) {
        case 'add':
          await API.post(`/gastos/observaciones/${gastoId}`, { observaciones: observacion });
          break;
        case 'edit':
          await API.put(`/gastos/observaciones/${gastoId}`, { observaciones: observacion });
          break;
        case 'delete':
          await API.delete(`/gastos/observaciones/${gastoId}`);
          break;
        default:
          return;
      }
      await fetchData();
      setObservacion('');
      setSelectedGasto(null);
    } catch (error) {
      console.error('Error al gestionar observación:', error);
      setError(error.response?.data?.message || 'Error al gestionar la observación');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userName={user?.name} onLogout={logout} />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userName={user?.name} onLogout={logout} />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Gestión de Gastos</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Gastos Pendientes</h3>
          {!error && gastosPendientes.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 text-center">No hay gastos pendientes</p>
            </div>
          ) : (
            gastosPendientes.map((gasto) => (
              <div key={gasto._id} className="bg-white p-6 rounded-lg shadow mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Mes: {gasto.mes}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <p className="text-gray-600">Utilidades: ${gasto.utilidades?.toLocaleString()}</p>
                      <p className="text-gray-600">Mantención: ${gasto.mantencion?.toLocaleString()}</p>
                      <p className="text-gray-600">Otros: ${gasto.otros?.toLocaleString()}</p>
                      <p className="font-semibold">Total: ${gasto.total?.toLocaleString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePago(gasto._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Pagar
                  </button>
                </div>

                <div className="mt-4 border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">Observaciones</p>
                    <div className="space-x-2">
                      {gasto.Observaciones ? (
                        <>
                          <button
                            onClick={() => {
                              setSelectedGasto(gasto._id);
                              setObservacion(gasto.Observaciones);
                            }}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleObservacion('delete', gasto._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                          >
                            Eliminar
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setSelectedGasto(gasto._id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                        >
                          Agregar
                        </button>
                      )}
                    </div>
                  </div>

                  {selectedGasto === gasto._id ? (
                    <div className="mt-2">
                      <textarea
                        value={observacion}
                        onChange={(e) => setObservacion(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        placeholder="Escriba su observación aquí..."
                      />
                      <div className="mt-2 space-x-2">
                        <button
                          onClick={() => handleObservacion(gasto.Observaciones ? 'edit' : 'add', gasto._id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => {
                            setSelectedGasto(null);
                            setObservacion('');
                          }}
                          className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    gasto.Observaciones && (
                      <p className="text-gray-600 mt-2">{gasto.Observaciones}</p>
                    )
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {morosidad.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Morosidad</h3>
            {morosidad.map((gasto) => (
              <div key={gasto._id} className="bg-red-50 p-6 rounded-lg shadow border border-red-200 mb-4">
                <h4 className="text-lg font-semibold mb-2">Mes: {gasto.mes}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-gray-600">Utilidades: ${gasto.utilidades?.toLocaleString()}</p>
                  <p className="text-gray-600">Mantención: ${gasto.mantencion?.toLocaleString()}</p>
                  <p className="text-gray-600">Otros: ${gasto.otros?.toLocaleString()}</p>
                  <p className="font-semibold text-red-600">Total: ${gasto.total?.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserGastos;