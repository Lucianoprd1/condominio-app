import Publicacion from "../models/publicaciones.model.js";

// Crear una nueva publicación (solo admin)
export const crearPublicacion = async (req, res) => {
  try {
    const { titulo, contenido } = req.body;

    if (!titulo || !contenido) {
      return res
        .status(400)
        .json({ message: "Título y contenido son obligatorios" });
    }

    const nuevaPublicacion = new Publicacion({
      titulo,
      contenido,
    });

    const publicacionGuardada = await nuevaPublicacion.save();

    res.status(201).json({
      message: "Publicación creada con éxito",
      publicacion: publicacionGuardada,
    });
  } catch (error) {
    console.error("Error al crear publicación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener todas las publicaciones
export const obtenerPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicacion.find().sort({ fecha: -1 });
    res.json(publicaciones);
  } catch (error) {
    console.error("Error al obtener publicaciones:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Editar una publicación (solo admin)
export const editarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, contenido } = req.body;

    if (!titulo || !contenido) {
      return res
        .status(400)
        .json({ message: "Título y contenido son obligatorios" });
    }

    const publicacionEditada = await Publicacion.findByIdAndUpdate(
      id,
      { titulo, contenido },
      { new: true } // Devuelve el documento actualizado
    );

    if (!publicacionEditada) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    res.json({
      message: "Publicación editada con éxito",
      publicacion: publicacionEditada,
    });
  } catch (error) {
    console.error("Error al editar publicación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminar una publicación (solo admin)
export const eliminarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;

    const publicacionEliminada = await Publicacion.findByIdAndDelete(id);

    if (!publicacionEliminada) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    res.json({ message: "Publicación eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar publicación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
