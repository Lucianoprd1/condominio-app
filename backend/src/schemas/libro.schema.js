import { z } from "zod";

// Validación para un ObjectId de MongoDB
const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "ID inválido");

// Esquema para crear un evento
export const crearEventoSchema = z.object({
  titulo: z
    .string({
      required_error: "El título es obligatorio.",
    })
    .min(1, "El título no puede estar vacío."),
  contenido: z
    .string({
      required_error: "El contenido es obligatorio.",
    })
    .min(1, "El contenido no puede estar vacío."),
});

// Esquema para editar un evento (igual al de crear)
export const editarEventoSchema = crearEventoSchema;

// Esquema para validar el ID de un evento
export const idSchema = z.object({
  id: objectIdSchema,
});
