import React, { useState } from "react";

const CreatePublicationForm = () => {
  const [publication, setPublication] = useState({
    titulo: "",
    contenido: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPublication({ ...publication, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/publicaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Agregamos el token del localStorage
        },
        body: JSON.stringify(publication),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Publicación creada con éxito");
        setPublication({ titulo: "", contenido: "" });
      } else {
        setMessage(data.message || "Error al crear publicación");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error en la conexión con el servidor");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Crear Nueva Publicación</h2>
      {message && <p className="text-center text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="titulo"
            className="block text-sm font-medium text-gray-700"
          >
            Título
          </label>
          <input
            type="text"
            name="titulo"
            id="titulo"
            value={publication.titulo}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md shadow-sm"
            placeholder="Escribe el título de la publicación"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="contenido"
            className="block text-sm font-medium text-gray-700"
          >
            Contenido
          </label>
          <textarea
            name="contenido"
            id="contenido"
            value={publication.contenido}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md shadow-sm"
            placeholder="Escribe el contenido de la publicación"
            rows="5"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear Publicación
        </button>
      </form>
    </div>
  );
};

export default CreatePublicationForm;