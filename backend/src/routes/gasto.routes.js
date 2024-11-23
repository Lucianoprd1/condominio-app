import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import {
  crearGasto,
  registrarPago,
  obtenerGastos,
  eliminarGasto,
  getGastosByUser,
} from "../controllers/gasto.controller.js";

const router = Router();

// Crear un gasto (solo administrador)
router.post("/", authRequired, verifyRole("admin"), crearGasto);

// Consultar los gastos del usuario autenticado
router.get("/", authRequired, obtenerGastos);

// Consultar los gastos de cualquier usuario por ID.
// Sólo para propósitos de presentación / Eliminar.
router.get("/user/:userId", authRequired, verifyRole("admin"), getGastosByUser);

// Registrar el pago de un gasto (usuario autenticado)
router.put("/pagar", authRequired, registrarPago);

// Eliminar un gasto (solo administrador)
router.delete("/:id", authRequired, verifyRole("admin"), eliminarGasto);

export default router;
