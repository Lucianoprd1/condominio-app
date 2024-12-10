import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
  crearMultaSchema,
  actualizarMultaSchema,
  registrarPagoMultaSchema,
  idSchema,
} from "../schemas/multas.schema.js";
import {
  crearMulta,
  obtenerMultas,
  actualizarMulta,
  registrarPagoMulta,
  obtenerMultaId,
  eliminarMulta,
} from "../controllers/multas.controller.js";

const router = Router();

// Crear una multa (solo administrador)
router.post("/", authRequired, verifyRole("admin"), crearMulta);

// Consultar las multas del usuario autenticado
router.get("/", authRequired, obtenerMultas);

// Consultar una multa por ID (solo administrador)
router.get("/:id", authRequired, verifyRole("admin"), obtenerMultaId);

// Actualizar una multa (solo administrador)
router.put("/:id", authRequired, verifyRole("admin"), actualizarMulta);

// Registrar el pago de una multa (usuario autenticado)
router.put("/pagar/:id", authRequired, registrarPagoMulta);

//eliminar multa (solo admin)
router.delete("/:id", authRequired, verifyRole("admin"), eliminarMulta);

export default router;
