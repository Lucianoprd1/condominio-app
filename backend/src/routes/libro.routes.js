import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
  crearEventoSchema,
  editarEventoSchema,
  idSchema,
} from "../schemas/libro.schema.js";
import {
  crearEvento,
  obtenerEventos,
  editarEvento,
  eliminarEvento,
} from "../controllers/libro.controller.js";

const router = Router();

// Crear un evento en el libro (solo admin)
router.post("/", authRequired, verifyRole("admin"), crearEvento);

// Obtener todos los eventos (solo admin)
router.get("/", authRequired, verifyRole("admin"), obtenerEventos);

// Editar un evento por ID (solo admin)
router.put("/:id", authRequired, verifyRole("admin"), editarEvento);

// Eliminar un evento por ID (solo admin)
router.delete("/:id", authRequired, verifyRole("admin"), eliminarEvento);

export default router;
