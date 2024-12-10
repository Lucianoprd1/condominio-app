import { z } from "zod";

// Validación para un ObjectId de MongoDB
const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "ID inválido");

// Esquema para crear una publicación
export const crearPublicacionSchema = z.object({
  titulo: z
    .string({
      required_error: "El título es obligatorio.",
    })
    .refine((val) => val.trim().length > 0, "El título no puede estar vacío."), // Validación para evitar cadenas vacías
  contenido: z
    .string({
      required_error: "El contenido es obligatorio.",
    })
    .refine(
      (val) => val.trim().length > 0,
      "El contenido no puede estar vacío."
    ), // Validación para evitar cadenas vacías
});

// Esquema para editar una publicación
export const editarPublicacionSchema = z.object({
  titulo: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim().length > 0, {
      message: "El título no puede estar vacío si se proporciona.",
    }), // Validación opcional para evitar cadenas vacías
  contenido: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim().length > 0, {
      message: "El contenido no puede estar vacío si se proporciona.",
    }), // Validación opcional para evitar cadenas vacías
});

// Esquema para validar el ID de una publicación (usado en eliminar o editar)
export const idSchema = z.object({
  id: objectIdSchema, // Validación para asegurarse de que sea un ObjectId válido
});
