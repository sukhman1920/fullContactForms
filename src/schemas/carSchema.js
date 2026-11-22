
import { z } from "zod";

// Validamos los datos que introduce el usuario.
export const carSchema = z.object({
  id: z.number().optional(),
  marca: z.string().min(1, "Selecciona una marca"),
  modelo: z.string().min(2, "El modelo debe tener al menos 2 caracteres"),
  color: z.string().min(1, "Selecciona un color"),
  anio: z.number().int().min(1950, "Año no válido").max(2030, "Año no válido"),
  precio: z.number().positive("El precio debe ser mayor que 0")
});

// Validamos también los coches que recibimos de la API.
export const carsResponseSchema = z.array(
  carSchema.extend({
    id: z.number()
  })
);
