import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
  crearPublicacionSchema,
  editarPublicacionSchema,
  idSchema,
} from "../schemas/publicaciones.schema.js";
import {
  crearPublicacion,
  obtenerPublicaciones,
  editarPublicacion,
  eliminarPublicacion,
} from "../controllers/publicaciones.controller.js";

const router = Router();

// Crear una publicación (solo admin)
router.post("/", authRequired, verifyRole("admin"), crearPublicacion);

// Obtener todas las publicaciones
router.get("/", authRequired, obtenerPublicaciones);

// Editar una publicación por ID (solo admin)
router.put("/:id", authRequired, verifyRole("admin"), editarPublicacion);

// Eliminar una publicación por ID (solo admin)
router.delete("/:id", authRequired, verifyRole("admin"), eliminarPublicacion);

export default router;
