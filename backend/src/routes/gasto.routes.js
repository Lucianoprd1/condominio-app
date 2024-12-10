import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
  crearGastoSchema,
  actualizarGastoSchema,
  registrarPagoSchema,
  observacionesSchema,
  idSchema,
} from "../schemas/gasto.schema.js";
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
  reporteResidentesPagoPend,
  listarGGCCResidentes,
  listarGGCCResidentesCondominio,
} from "../controllers/gasto.controller.js";

const router = Router();

// Crear un gasto (solo administrador)
router.post("/", authRequired, verifyRole("admin"), crearGasto); //OK

// Consultar los gastos del usuario autenticado
router.get("/", authRequired, obtenerGastos); //OK

//Consultar los gastos de un residente (solo administrador)
router.get(
  "/residente/:id",
  authRequired,
  verifyRole("admin"),
  obtenerGastoPorId
); //OK

// Registrar el pago de un gasto (usuario autenticado)
router.put("/pagar", authRequired, registrarPago); //OK

//Registrar el pago de un gasto por id (solo administrador)
router.put("/pagar/:id", authRequired, verifyRole("admin"), registrarPagoPorId); //OK

// Actualizar un gasto (solo administrador)
router.put("/:id", authRequired, verifyRole("admin"), actualizarGasto);

// Eliminar un gasto (solo administrador)
router.delete("/:id", authRequired, verifyRole("admin"), eliminarGasto);

//Observaciones a gastos comunes

// Agregar observaciones (residente)
router.post("/observaciones/:id", authRequired, agregarObservaciones);

// Editar observaciones (residente)
router.put("/observaciones/:id", authRequired, editarObservaciones);

// Eliminar observaciones (residente)
router.delete("/observaciones/:id", authRequired, eliminarObservaciones);

// Ruta para calcular morosidad

// Consultar la morosidad de los residentes (solo administrador)
router.get(
  "/obtenerMorosidad",
  authRequired,
  verifyRole("admin"),
  obtenerMorosidadResidentes
);

// Consultar la morosidad de un usuario (usuario autenticado)
router.get("/morosidad", authRequired, obtenerMorosidadUsuario);

// Eliminar la morosidad de un usuario (solo administrador)
router.delete(
  "/morosidad/:id",
  authRequired,
  verifyRole("admin"),
  eliminarMorosidad
);

// Obtener listado de pagos pendientes de un residente según su id.
router.get(
  "/pagosPendientes/:id",
  authRequired,
  verifyRole("admin"),
  obtenerPagosPendById
);

// Obtener listado de pagos cancelados de un residente según su id.
router.get(
  "/pagosCancelados/:id",
  authRequired,
  verifyRole("admin"),
  obtenerPagosCancelById
);

// Obtener un listado de todos los residentes que se encuentran con pagos pendientes. (admin)
router.get(
  "/reportePagosPendientes",
  authRequired,
  verifyRole("admin"),
  reporteResidentesPagoPend
);

// Listar todos los residentes con sus gastos comunes por mes (nombre, depto y monto )y que calcule el total.
router.get(
  "/listarGGCCResidentes",
  authRequired,
  verifyRole("admin"),
  listarGGCCResidentes
);

// Mismo listado anterior, pero agreganto totales del condominio.
router.get(
  "/listarGGCCCondominio",
  authRequired,
  verifyRole("admin"),
  listarGGCCResidentesCondominio
);

export default router;
