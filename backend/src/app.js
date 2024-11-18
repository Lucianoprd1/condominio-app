import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import gastoRoutes from './routes/gasto.routes.js';
import publicacionesRoutes from "./routes/publicaciones.routes.js";

const app = express();
app.use(morgan('dev'));
app.use(express.json()); // Manejar JSON en solicitudes
app.use(cookieParser()); // Middleware para manejar cookies
app.use('/api', authRoutes);
app.use('/api/gastos', gastoRoutes);
app.use("/api/publicaciones", publicacionesRoutes);
export default app;