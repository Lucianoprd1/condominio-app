import { z } from "zod";

// Validación para un ObjectId de MongoDB
const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "ID inválido");

// Esquema para la creación de gastos
export const crearGastoSchema = z.object({
  total: z
    .number({
      required_error: "El campo 'total' es obligatorio.",
    })
    .positive("El 'total' debe ser un número positivo."),

  utilidades: z
    .number()
    .optional()
    .refine((val) => val >= 0, {
      message: "Las 'utilidades' deben ser un número positivo o cero.",
    }),

  mantencion: z
    .number()
    .optional()
    .refine((val) => val >= 0, {
      message: "La 'mantención' debe ser un número positivo o cero.",
    }),

  otros: z
    .number()
    .optional()
    .refine((val) => val >= 0, {
      message: "El campo 'otros' debe ser un número positivo o cero.",
    }),

  mes: z
    .number({
      required_error: "El campo 'mes' es obligatorio.",
    })
    .min(1, "El 'mes' debe estar entre 1 y 12.")
    .max(12, "El 'mes' debe estar entre 1 y 12."),

  userId: objectIdSchema.refine(
    (id) => id,
    "El campo 'userId' es obligatorio y debe ser un ObjectId válido."
  ),
});

// Esquema para actualizar un gasto (similar al de creación)
export const actualizarGastoSchema = crearGastoSchema.partial(); // Permite que todos los campos sean opcionales

// Esquema para registrar un pago
export const registrarPagoSchema = z.object({
  gastoId: objectIdSchema,
});

// Esquema para agregar o editar observaciones
export const observacionesSchema = z.object({
  observaciones: z.string().optional(),
  //.min(1, "Las observaciones no pueden estar vacías."),
});

// Esquema para eliminar un gasto o consultar por ID
export const idSchema = z.object({
  id: objectIdSchema,
});

// Esquema para listar gastos o morosidad de un residente por ID
export const listadoResidenteSchema = z.object({
  id: objectIdSchema,
});
