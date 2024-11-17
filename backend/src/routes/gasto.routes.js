import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { verifyRole } from '../middlewares/verifyRole.js';
import {
  crearGasto,
  registrarPago,
  obtenerGastos,
  eliminarGasto,
} from '../controllers/gasto.controller.js';

const router = Router();

// Crear un gasto (solo administrador)
router.post('/', authRequired, verifyRole('admin'), crearGasto);

// Consultar los gastos del usuario autenticado
router.get('/', authRequired, obtenerGastos);

// Registrar el pago de un gasto (usuario autenticado)
router.put('/pagar', authRequired, registrarPago);

// Eliminar un gasto (solo administrador)
router.delete('/:id', authRequired, verifyRole('admin'), eliminarGasto);

export default router;