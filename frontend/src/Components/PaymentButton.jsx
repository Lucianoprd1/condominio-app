import React from 'react';

const PaymentButton = ({ totalAmount }) => {
  const handlePayment = () => {
    alert(`Realizando el pago de ${totalAmount}`);
    // Aquí puedes agregar la lógica para redirigir al usuario a una página de pago o realizar una acción de pago
  };

  return (
    <div className="mt-8">
      <button
        onClick={handlePayment}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        Pagar: ${totalAmount}
      </button>
    </div>
  );
};

export default PaymentButton;