import mongoose from "mongoose";
import Multa from "../models/multas.model.js";



// Crear una multa (solo administrador)
export const crearMulta = async (req, res) => {
    try {

        const { userId, montoMulta, descripcion } = req.body;
       
    
        const nuevaMulta = new Multa({ userId, montoMulta, descripcion });
    
        await nuevaMulta.save();
    
        res.status(201).json({ message: "Multa creada correctamente", multa: nuevaMulta });
    } catch (error) {
        console.error("Error al crear multa:", error);
        res.status(500).json({ message: "Error al crear multa" });
    }
};


//Obtener multas por usuario
export const obtenerMultas = async (req, res) => {
    try {
        const { userId } = req.query;
        
        // Si hay userId en la consulta, filtrar por ese usuario
        const query = userId ? { userId } : {};
        
        const multas = await Multa.find(query).sort({ fechaRegistro: -1 });
        res.json(multas);
    } catch (error) {
        console.error("Error al obtener multas:", error);
        res.status(500).json({ message: "Error al obtener multas" });
    }
};
//Obtener multas por id (solo admin)
export const obtenerMultaId = async (req, res) => {
    try {
        const multa = await Multa.findById(req.params.id);
        if (!multa) {
            return res.status(404).json({ message: "Multa no encontrada" });
        }
        res.json(multa);
    } catch (error) {
        console.error("Error al obtener multa:", error);
        res.status(500).json({ message: "Error al obtener multa" });
    }
};

//Actualizar multa
export const actualizarMulta = async (req, res) => {
    try {
        
        const { montoMulta, descripcion, estadoPago } = req.body;
        const multa = await Multa.findById(req.params.id);

        if (!multa) {
            return res.status(404).json({ message: "Multa no encontrada" });
        }

        multa.montoMulta = montoMulta;
        multa.descripcion = descripcion;
        multa.estadoPago = estadoPago;

        await multa.save();

        res.json({ message: "Multa actualizada correctamente", multa });
    } catch (error) {
        console.error("Error al actualizar multa:", error);
        res.status(500).json({ message: "Error al actualizar multa" });
    }
};

//Eliminar multa
export const eliminarMulta = async (req, res) => {
    try {
        
        const multa = await Multa.findByIdAndDelete(req.params.id);

        if (!multa) {
            return res.status(404).json({ message: "Multa no encontrada" });
        }

        res.json({ message: "Multa eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar multa:", error);
        res.status(500).json({ message: "Error al eliminar multa" });
    }
};

//Registrar pago de multa
export const registrarPagoMulta = async (req, res) => {
    try {
        const { MultaId } = req.body;
        //verificar si la multa existe
        const multa = await Multa.findById(MultaId);
        if(!multa){
            return res.status(404).json({message: "Multa no encontrada"});
        }
        //verificar si la multa ya fue pagada
        if(multa.estadoPago === "pagado"){
            return res.status(400).json({message: "La multa ya fue pagada"});
        }
        //actualizar el estado de pago
        multa.estadoPago = "pagado";
        multa.fechaPago = new Date();
        await multa.save();
        res.json({message: "Pago registrado con éxito", multa});
    
    }
    catch (error) {
        console.error("Error al registrar el pago:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};