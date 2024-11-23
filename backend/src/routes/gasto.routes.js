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
} from '../controllers/gasto.controller.js';

const router = Router();

// Crear un gasto (solo administrador)
router.post('/', authRequired, verifyRole('admin'), crearGasto);

// Consultar los gastos del usuario autenticado
router.get('/', authRequired, obtenerGastos);

//Consultar los gastos de un residente (solo administrador)
router.get('/residente/:id', authRequired, verifyRole('admin'), obtenerGastos);


// Registrar el pago de un gasto (usuario autenticado)
router.put('/pagar', authRequired, registrarPago);

//Registrar el pago de un gasto por id (solo administrador)
router.put('/pagar/:id', authRequired, verifyRole('admin'), registrarPagoPorId);


// Actualizar un gasto (solo administrador)
router.put('/:id', authRequired, verifyRole('admin'), actualizarGasto);

// Eliminar un gasto (solo administrador)
router.delete('/:id', authRequired, verifyRole('admin'), eliminarGasto);

//Observaciones a gastos comunes

// Agregar observaciones (residente)
router.post('/observaciones/:id', authRequired, agregarObservaciones);

// Editar observaciones (residente)
router.put('/observaciones/:id', authRequired, editarObservaciones);

// Eliminar observaciones (residente)
router.delete('/observaciones/:id', authRequired, eliminarObservaciones);


// Ruta para calcular morosidad

// Consultar la morosidad de los residentes (solo administrador)
router.get('/obtenerMorosidad', authRequired ,verifyRole('admin'),obtenerMorosidadResidentes);

// Consultar la morosidad de un usuario (usuario autenticado)
router.get('/morosidad', authRequired, obtenerMorosidadUsuario);

// Eliminar la morosidad de un usuario (solo administrador)
router.delete('/morosidad/:id', authRequired, verifyRole('admin'), eliminarMorosidad);

export default router;