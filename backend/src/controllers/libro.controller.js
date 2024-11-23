import Libro from "../models/libro.model.js";

// Crear un evento en el libro (solo admin)
export const crearEvento = async (req, res) => {
    try {
        
        const { titulo, contenido } = req.body;

        if (!titulo || !contenido) {
            return res.status(400).json({ message: "Título y contenido son obligatorios" });
        }

        const nuevoLibro = new Libro({
            titulo,
            contenido,
        });

        const libroGuardado = await nuevoLibro.save();

        res.status(201).json({
            message: "Evento creado con éxito",
            libro: libroGuardado,
        });
    } catch (error) {
        console.error("Error al crear evento:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener todos los eventos (solo admin)
export const obtenerEventos = async (req, res) => {
    try {
        
        const eventos = await Libro.find().sort({ fecha: -1 });
        res.json(eventos);
    } catch (error) {
        console.error("Error al obtener eventos:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Editar un evento en el libro (solo admin)
export const editarEvento = async (req, res) => {
    try {
        
        const { id } = req.params;
        const { titulo, contenido } = req.body;

        if (!titulo || !contenido) {
            return res.status(400).json({ message: "Título y contenido son obligatorios" });
        }

        const eventoEditado = await Libro.findByIdAndUpdate(
            id,
            { titulo, contenido },
            { new: true } // Devuelve el documento actualizado
        );

        if (!eventoEditado) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }

        res.json({
            message: "Evento editado con éxito",
            evento: eventoEditado,
        });
    } catch (error) {
        console.error("Error al editar evento:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Eliminar un evento en el libro (solo admin)
export const eliminarEvento = async (req, res) => {
    try {
        
        const { id } = req.params;

        const eventoEliminado = await Libro.findByIdAndDelete(id);

        if (!eventoEliminado) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }

        res.json({
            message: "Evento eliminado con éxito",
            evento: eventoEliminado,
        });
    } catch (error) {
        console.error("Error al eliminar evento:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};