import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import gastoRoutes from './routes/gasto.routes.js';
import publicacionesRoutes from "./routes/publicaciones.routes.js";
import multasRoutes from './routes/multas.routes.js';
import libroRoutes from './routes/libro.routes.js';
import agenda from './routes/agenda.routes.js';

const app = express();
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders:['set-cookie']
    }
));
app.use(morgan('dev'));
app.use(express.json()); // Manejar JSON en solicitudes
app.use(cookieParser()); // Middleware para manejar cookies
app.use('/api', authRoutes);
app.use('/api/gastos', gastoRoutes);
app.use('/api/publicaciones', publicacionesRoutes);
app.use('/api/multas', multasRoutes);
app.use('/api/libro', libroRoutes);
app.use('/api/reservas',agenda);
export default app;