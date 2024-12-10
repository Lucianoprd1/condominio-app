// src/Components/CreateGastoForm.jsx
import React, { useState } from 'react';

const CreateGastoForm = ({ user, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    mes: '',
    utilidades: 0,
    mantencion: 0,
    otros: 0,
    total: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numValue = name !== 'mes' ? parseFloat(value) || 0 : value;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: numValue };
      if (name !== 'mes') {
        newData.total = newData.utilidades + newData.mantencion + newData.otros;
      }
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6">Crear Gasto para {user.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Mes</label>
            <input
              type="text"
              name="mes"
              value={formData.mes}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Utilidades</label>
            <input
              type="number"
              name="utilidades"
              value={formData.utilidades}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Mantención</label>
            <input
              type="number"
              name="mantencion"
              value={formData.mantencion}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Otros</label>
            <input
              type="number"
              name="otros"
              value={formData.otros}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Total</label>
            <input
              type="number"
              name="total"
              value={formData.total}
              className="mt-1 w-full p-2 border rounded bg-gray-50"
              disabled
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Crear Gasto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGastoForm;