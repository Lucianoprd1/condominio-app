import mongoose from "mongoose";


const AgendaSchema = new mongoose.Schema({
  //opciones de áreas comunes 
  area: {
      type: String,
      required: true,
      enum: ['quincho', 'piscina', 'cancha multiusos', 'estacionamientos'], 
    },
    fecha: {
      type: Date,
      required: true,
    },
    //ejemplo de división de horarios
    horario: {
      type: String,
      required: true,
      enum: ['mañana', 'tarde', 'noche'], 
    },
    //usuario que hizo la reserva
    reservadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, 
    },
  });

AgendaSchema.index({ area: 1, fecha: 1, horario: 1 }, { unique: true })

// Método estático para obtener los días ocupados
AgendaSchema.statics.obtenerDiasOcupados = async function () {
  return this.aggregate([
    {
      $group: {
        _id: "$fecha", // Agrupar por fecha
        reservas: {
          $push: {
            horario: "$horario",
            area: "$area",
            reservadoPor: "$reservadoPor",
          },
        },
        count: { $sum: 1 }, // Contar las reservas por día
      },
    },
    {
      $project: {
        fecha: "$_id",
        _id: 0,
        count: 1,
        reservas: 1,
      },
    },
  ]);
};

export default mongoose.model('Agenda',AgendaSchema)