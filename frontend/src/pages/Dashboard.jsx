// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../Components/Header';
import PaymentButton from '../Components/PaymentButton';
import ExpensesChart from '../Components/ExpensesChart';
import Publicaciones from '../Components/Publicaciones';
import Footer from '../Components/Footer';
import API from '../api/axiosConfig';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [gastos, setGastos] = useState({
    currentExpenses: {
      total: 0,
      utilidades: 0,
      mantencion: 0,
      otros: 0,
      mes: ''
    },
    previousExpenses: {
      total: 0,
      utilidades: 0,
      mantencion: 0,
      otros: 0,
      mes: ''
    }
  });
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get expenses
        const gastosResponse = await API.get('/gastos');
        console.log('Gastos response:', gastosResponse.data);

        if (gastosResponse.data && gastosResponse.data.length > 0) {
          // Get current month expenses (most recent)
          const sortedGastos = gastosResponse.data.sort((a, b) => 
            new Date(b.fechaRegistro) - new Date(a.fechaRegistro)
          );
          
          const currentMonthExpense = sortedGastos[0];
          const previousMonthExpense = sortedGastos[1] || null;

          setGastos({
            currentExpenses: {
              total: currentMonthExpense.total || 0,
              utilidades: currentMonthExpense.utilidades || 0,
              mantencion: currentMonthExpense.mantencion || 0,
              otros: currentMonthExpense.otros || 0,
              mes: currentMonthExpense.mes || '',
              estadoPago: currentMonthExpense.estadoPago
            },
            previousExpenses: previousMonthExpense ? {
              total: previousMonthExpense.total || 0,
              utilidades: previousMonthExpense.utilidades || 0,
              mantencion: previousMonthExpense.mantencion || 0,
              otros: previousMonthExpense.otros || 0,
              mes: previousMonthExpense.mes || '',
              estadoPago: previousMonthExpense.estadoPago
            } : {
              total: 0,
              utilidades: 0,
              mantencion: 0,
              otros: 0,
              mes: '',
              estadoPago: ''
            }
          });
        }

        // Get publications
        const publicacionesResponse = await API.get('/publicaciones');
        console.log('Publicaciones response:', publicacionesResponse.data);
        
        if (publicacionesResponse.data) {
          setPublicaciones(publicacionesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <Header 
      userName={user?.name || user?.email|| 'Usuario'} 
      onLogout={logout} 
      />

      <main className="mt-8 max-w-5xl mx-auto px-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Detalles de gastos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Current Month Expenses */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                Gastos del mes: {gastos.currentExpenses.mes}
              </h3>
              <span className={`px-2 py-1 rounded text-sm ${
                gastos.currentExpenses.estadoPago === 'pagado' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {gastos.currentExpenses.estadoPago === 'pagado' ? 'Pagado' : 'Pendiente'}
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span>Utilidades:</span>
                <span className="font-medium">${gastos.currentExpenses.utilidades.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Mantención:</span>
                <span className="font-medium">${gastos.currentExpenses.mantencion.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Otros:</span>
                <span className="font-medium">${gastos.currentExpenses.otros.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-lg">${gastos.currentExpenses.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Previous Month Expenses */}
          {gastos.previousExpenses.mes && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  Mes anterior: {gastos.previousExpenses.mes}
                </h3>
                <span className={`px-2 py-1 rounded text-sm ${
                  gastos.previousExpenses.estadoPago === 'pagado' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {gastos.previousExpenses.estadoPago === 'pagado' ? 'Pagado' : 'Pendiente'}
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span>Utilidades:</span>
                  <span className="font-medium">${gastos.previousExpenses.utilidades.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Mantención:</span>
                  <span className="font-medium">${gastos.previousExpenses.mantencion.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Otros:</span>
                  <span className="font-medium">${gastos.previousExpenses.otros.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-lg">${gastos.previousExpenses.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {gastos.currentExpenses.estadoPago === 'pendiente' && (
          <div className="mb-8">
            <PaymentButton totalAmount={gastos.currentExpenses.total} />
          </div>
        )}

        <div className="mb-8">
          <ExpensesChart 
            currentData={[
              gastos.currentExpenses.total,
              gastos.currentExpenses.utilidades,
              gastos.currentExpenses.mantencion,
              gastos.currentExpenses.otros
            ]}
            previousData={[
              gastos.previousExpenses.total,
              gastos.previousExpenses.utilidades,
              gastos.previousExpenses.mantencion,
              gastos.previousExpenses.otros
            ]}
          />
        </div>

        <Publicaciones posts={publicaciones} />
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;