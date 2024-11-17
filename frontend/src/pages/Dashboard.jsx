import React from 'react';
import Header from '../Components/Header'; // Importamos el Header
import PaymentButton from '../Components/PaymentButton'; // Importamos el componente de Pago
import ExpensesChart from '../Components/ExpensesChart'; // Importamos el gráfico de comparación de gastos
import Publicaciones from '../Components/Publicaciones'; // Importamos el componente de Publicaciones
import Footer from '../Components/Footer'; // Importamos el Footer

const Dashboard = () => {
  const userName = 'Juanita Díaz'; // Nombre del usuario
  const totalAmount = 100000; // Total a pagar, puede ser dinámico si lo necesitas

  // Datos de los gastos actuales
  const currentExpenses = [100000, 40000, 35000, 25000];

  // Datos de los gastos del mes pasado
  const previousExpenses = [95000, 42000, 30000, 27000];

  // Datos de las publicaciones
  const publicaciones = [
    {
      title: 'Mantenimiento de Ascensores',
      content: 'Se realizará un mantenimiento de los ascensores el próximo lunes 20 de octubre.',
      date: '15 de octubre, 2024',
    },
    {
      title: 'Nueva Normativa de Seguridad',
      content: 'Se ha actualizado la normativa de seguridad del edificio. Por favor, revisarla en el portal de residentes.',
      date: '12 de octubre, 2024',
    },
    {
      title: 'Reunión de Condominio',
      content: 'Habrá una reunión de condominio el viernes 25 de octubre en el salón comunal.',
      date: '10 de octubre, 2024',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      {/* Header con saludo y botones */}
      <Header userName={userName} />

      <main className="mt-8 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Detalles de gastos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold text-gray-800">Total a Pagar</p>
              <span className="text-lg text-gray-900">$100.000</span>
            </div>
            <p className="text-sm text-green-600">+5%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold text-gray-800">Utilidades</p>
              <span className="text-lg text-gray-900">$40.000</span>
            </div>
            <p className="text-sm text-red-600">-2%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold text-gray-800">Mantención</p>
              <span className="text-lg text-gray-900">$35.000</span>
            </div>
            <p className="text-sm text-green-600">+8%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold text-gray-800">Otros</p>
              <span className="text-lg text-gray-900">$25.000</span>
            </div>
            <p className="text-sm text-green-600">+12%</p>
          </div>
        </div>

        {/* Componente de Pago */}
        <PaymentButton totalAmount={totalAmount} />

        {/* Gráfico de comparación de gastos */}
        <ExpensesChart currentData={currentExpenses} previousData={previousExpenses} />

        {/* Publicaciones */}
        <Publicaciones posts={publicaciones} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
// Exportamos el componente Dashboard
export default Dashboard;