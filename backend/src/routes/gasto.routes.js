// backend/src/routes/gasto.routes.js - Limpieza de rutas duplicadas
import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { verifyRole } from '../middlewares/verifyRole.js';
import {
  crearGasto,
  registrarPago,
  obtenerGastos,
  eliminarGasto,
  actualizarGasto,
  obtenerMorosidadResidentes,
  obtenerMorosidadUsuario,
  eliminarMorosidad,
  agregarObservaciones,
  editarObservaciones,
  eliminarObservaciones,
  registrarPagoPorId,
  obtenerGastoPorId,
  obtenerPagosPendById,
  obtenerPagosCancelById,
  reporteResidentesPagoPend
} from '../controllers/gasto.controller.js';

const router = Router();

// Rutas básicas de gastos
router.post('/', authRequired, verifyRole('admin'), crearGasto);
router.get('/', authRequired, obtenerGastos);
router.get('/residente/:id', authRequired, verifyRole('admin'), obtenerGastoPorId);
router.put('/:id', authRequired, verifyRole('admin'), actualizarGasto);
router.delete('/:id', authRequired, verifyRole('admin'), eliminarGasto);

// Rutas de pago
router.put('/pagar', authRequired, registrarPago);
router.put('/pagar/:id', authRequired, verifyRole('admin'), registrarPagoPorId);

// Rutas de morosidad
router.get('/morosidad/residentes', authRequired, verifyRole('admin'), obtenerMorosidadResidentes);
router.get('/morosidad/usuario', authRequired, obtenerMorosidadUsuario);
router.delete('/morosidad/:id', authRequired, verifyRole('admin'), eliminarMorosidad);

// Rutas de observaciones
router.post('/observaciones/:id', authRequired, agregarObservaciones);
router.put('/observaciones/:id', authRequired, editarObservaciones);
router.delete('/observaciones/:id', authRequired, eliminarObservaciones);

// Rutas de reportes
router.get('/pagos/pendientes/:id', authRequired, verifyRole('admin'), obtenerPagosPendById);
router.get('/pagos/cancelados/:id', authRequired, verifyRole('admin'), obtenerPagosCancelById);
router.get('/reportes/pendientes', authRequired, verifyRole('admin'), reporteResidentesPagoPend);

export default router;