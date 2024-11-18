import React, { useState } from "react";

const CreateUserForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Usuario creado con éxito");
      } else {
        alert(data.message || "Error al crear usuario");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="p-6 bg-white rounded shadow-lg" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Crear Usuario</h2>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={user.name}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Correo Electrónico"
        value={user.email}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={user.password}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <select
        name="role"
        value={user.role}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Crear Usuario
      </button>
    </form>
  );
};

export default CreateUserForm;