import Agenda from '../models/agenda.model.js';

export const obtenerDiasOcupados = async (req, res) => {
  try {
    const diasOcupados = await Agenda.obtenerDiasOcupados();
    res.status(200).json(diasOcupados);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los días ocupados", error });
  }
};

// Crear una nueva reserva
export const crearReserva = async (req, res) => {
  try {
      const { area, fecha, horario, reservadoPor } = req.body;

      // Verificar si ya existe una reserva para la misma fecha, área y horario
      const reservaExistente = await Agenda.findOne({ area, fecha, horario });
      if (reservaExistente) {
          return res.status(400).json({ message: 'Ya existe una reserva para ese horario y área.' });
      }

      const nuevaReserva = new Agenda({ area, fecha, horario, reservadoPor });
      await nuevaReserva.save();

      // Obtener los días ocupados actualizados
      const diasOcupados = await Agenda.obtenerDiasOcupados();

      res.status(201).json({ message: 'Reserva creada exitosamente.', reserva: nuevaReserva, diasOcupados });
  } catch (error) {
      res.status(500).json({ message: 'Error al crear la reserva.', error });
  }
};


import mongoose from "mongoose";

export const eliminarReserva = async (req, res) => {
  try {
    console.log(req.body);
      const { area, fecha, horario, reservadoPor } = req.body;

      //validar que los parámetros están presentes
      if (!area || !fecha || !horario || !reservadoPor) {
          return res.status(400).json({ message: 'Todos los campos (area, fecha, horario, reservadoPor) son obligatorios.' });
      }

      //vlidar que reservadoPor es un ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(reservadoPor)) {
          return res.status(400).json({ message: 'El campo reservadoPor debe ser un ObjectId válido.' });
      }

      // Verificar si existe la reserva con los parámetros proporcionados
      const reserva = await Agenda.findOne({ area, fecha, horario, reservadoPor });
      if (!reserva) {
          return res.status(404).json({ message: 'Reserva no encontrada.' });
      }

      await reserva.deleteOne();

      // Obtener los días ocupados actualizados
      const diasOcupados = await Agenda.obtenerDiasOcupados();

      res.status(200).json({ message: 'Reserva eliminada exitosamente.', diasOcupados });
    } catch (error) {
      console.error('Error en eliminarReserva:', error); // Log del error para depuración
      res.status(500).json({
          message: 'Error al eliminar la reserva.',
          error: error.message || error,
      });
  }
};