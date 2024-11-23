import {z} from 'zod';

export const crearGastoSchema = z.object({
    userId: z.string({
        required_error: "User is required",
    }),
    total: z.number({
        required_error: "Total is required",
    }),
    utilidades: z.number({
        required_error: "Utilidades is required",
    }),
    mantencion: z.number({
        required_error: "Mantencion is required",
    }),
    otros: z.number({
        required_error: "Otros is required",
    }),
    mes: z.string({
        required_error: "Mes is required",
    }),

});

