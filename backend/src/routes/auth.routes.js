import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";

const router = Router();

// Registro de un usuario (solo administrador)
router.post("/register", authRequired, verifyRole("admin"), register);

// Inicio de sesión
router.post("/login", login);

// Cierre de sesión
router.post("/logout", logout);

export default router;