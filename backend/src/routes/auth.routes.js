import { Router } from "express";
import { register, login, logout, verifyToken } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

// Registro de un usuario (solo administrador)
router.post("/register", authRequired, verifyRole("admin"),validateSchema(registerSchema), register);

// Inicio de sesión
router.post("/login",validateSchema(loginSchema) ,login);

// Verificar token
router.get("/verify", verifyToken);

// Cierre de sesión
router.post("/logout", logout);

export default router;