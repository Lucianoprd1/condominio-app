import Gasto from "../models/gastos.model.js";
import mongoose from 'mongoose';


export const crearGasto = async (req, res) => {
    try {
        const { total, utilidades, mantencion, otros, mes, userId } = req.body;

        // Validar que el userId es válido
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'userId inválido o faltante' });
        }

        // Crear el gasto asociado al usuario especificado
        const nuevoGasto = new Gasto({
            total,
            utilidades,
            mantencion,
            otros,
            mes,
            userId,
        });

        const gastoGuardado = await nuevoGasto.save();
        res.status(201).json({ message: 'Gasto creado con éxito', gasto: gastoGuardado });
    } catch (error) {
        console.error('Error al crear el gasto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};




export const registrarPago = async (req, res) => {
    try {
        const { gastoId } = req.body;

        // Validar si el gasto existe
        const gasto = await Gasto.findById(gastoId);
        if (!gasto) {
            return res.status(404).json({ message: 'Gasto no encontrado' });
        }

        // Verificar si el gasto ya está pagado
        if (gasto.estadoPago === 'pagado') {
            return res.status(400).json({ message: 'El gasto ya está pagado' });
        }

        // Actualizar el estado del pago
        gasto.estadoPago = 'pagado';
        gasto.fechaPago = new Date();
        await gasto.save();

        res.json({ message: 'Pago registrado con éxito', gasto });
    } catch (error) {
        console.error('Error al registrar el pago:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const obtenerGastos = async (req, res) => {
    try {
      const gastos = await Gasto.find({ userId: req.userId });
  
      if (!gastos || gastos.length === 0) {
        return res.status(404).json({ message: 'No se encontraron gastos para este usuario' });
      }
  
      res.json(gastos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los gastos' });
    }
  };

export const eliminarGasto = async (req, res) => {
    try {
      const { id } = req.params;
  
      const gastoEliminado = await Gasto.findByIdAndDelete(id);
  
      if (!gastoEliminado) {
        return res.status(404).json({ message: 'Gasto no encontrado' });
      }
  
      res.json({ message: 'Gasto eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar el gasto' });
    }
  };