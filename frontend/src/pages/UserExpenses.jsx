import React from "react";
import PaymentButton from "../Components/PaymentButton";

const UserExpenses = () => {
  const totalAmount = 1200; // Total de ejemplo

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Gastos</h1>
      <p>Esta página está en construcción.</p>
      <div className="mt-8">
        <PaymentButton totalAmount={totalAmount} />
      </div>
    </div>
  );
};

export default UserExpenses;