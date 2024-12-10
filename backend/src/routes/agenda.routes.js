import { Router } from "express";
import { obtenerDiasOcupados,crearReserva, eliminarReserva } from '../controllers/agenda.controller.js';

const router = Router();

// devuelve los dias reservados(para ocupar en front)
router.get('/', obtenerDiasOcupados);

// crea la reserva y la almacena en la bd
router.post('/', crearReserva);

//elimina una reserva
router.delete('/', eliminarReserva);

export default router;