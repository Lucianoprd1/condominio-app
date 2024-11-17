import React from 'react';
import { Bar } from 'react-chartjs-2'; // Importamos el componente de gráficos de Chart.js

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
// Importamos los módulos necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
// Registramos los módulos necesarios
const ExpensesChart = ({ currentData, previousData }) => {
  const data = {
    labels: ['Total a Pagar', 'Utilidades', 'Mantención', 'Otros'],
    datasets: [
      {
        label: 'Este Mes',
        data: currentData,
        backgroundColor: 'rgba(54, 162, 235, 0.8)', // Color de las barras actuales (Azul)
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        borderRadius: 5, // Bordes redondeados
        barThickness: 30, // Grosor de las barras
      },
      {
        label: 'Mes Pasado',
        data: previousData,
        backgroundColor: 'rgba(255, 99, 132, 0.8)', // Color de las barras anteriores (Rojo)
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        borderRadius: 5, // Bordes redondeados
        barThickness: 30, // Grosor de las barras
      }
    ],
  };
  // Configuración del gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14, // Tamaño de la fuente de la leyenda
            family: 'Arial', // Tipografía de la leyenda
          },
          color: '#333', // Color de la leyenda
        }
      },
      title: {
        // Configuración del título del gráfico
        display: true,
        text: 'Comparación de Gastos: Este Mes vs. Mes Pasado',
        font: {
          size: 20, // Tamaño de la fuente del título
          weight: 'bold',
        },
        color: '#333', // Color del título
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#555', // Color de los nombres de las categorías (Eje X)
          font: {
            size: 14,
            family: 'Arial',
          },
        },
        grid: {
          display: false, // Oculta las líneas del grid en el eje X
        },
      },
      y: {
        ticks: {
          color: '#555', // Color de los valores numéricos (Eje Y)
          font: {
            size: 14,
            family: 'Arial',
          },
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.3)', // Color de las líneas del grid en el eje Y
        },
      },
    },
  };
  // Renderizamos el gráfico de barras
  return (
    <div className="mt-8" style={{ height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpensesChart;