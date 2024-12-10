import { z } from "zod";

// Validación para un ObjectId de MongoDB
const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "ID inválido");

// Esquema para crear una multa
export const crearMultaSchema = z.object({
  userId: objectIdSchema.refine(
    (id) => id,
    "El campo 'userId' es obligatorio y debe ser un ObjectId válido."
  ), // Validación de ObjectId
  montoMulta: z
    .number({
      required_error: "El campo 'montoMulta' es obligatorio.",
    })
    .refine((val) => val > 0, "El 'montoMulta' debe ser un número positivo."), // Validación para números positivos
  descripcion: z
    .string({
      required_error: "El campo 'descripcion' es obligatorio.",
    })
    .refine(
      (val) => val.trim().length > 0,
      "La 'descripcion' no puede estar vacía."
    ), // Validación para que no sea una cadena vacía
});

// Esquema para actualizar una multa
export const actualizarMultaSchema = z.object({
  montoMulta: z
    .number()
    .optional()
    .refine(
      (val) => val === undefined || val > 0,
      "El 'montoMulta' debe ser un número positivo."
    ), // Validación opcional para números positivos
  descripcion: z
    .string()
    .optional()
    .refine(
      (val) => val === undefined || val.trim().length > 0,
      "La 'descripcion' no puede estar vacía si se proporciona."
    ), // Validación opcional para cadenas no vacías
  estadoPago: z
    .string()
    .optional()
    .refine(
      (val) => val === undefined || ["pendiente", "pagado"].includes(val),
      {
        message: "El estado de pago debe ser 'pendiente' o 'pagado'.",
      }
    ), // Validación opcional para valores específicos
});

// Esquema para registrar el pago de una multa
export const registrarPagoMultaSchema = z.object({
  MultaId: objectIdSchema, // Validación de ObjectId
});

// Esquema para validar el ID de una multa (para consultar o eliminar)
export const idSchema = z.object({
  id: objectIdSchema, // Validación de ObjectId
});
