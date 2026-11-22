
import { z } from "zod";

export const carSchema = z.object({
  id: z.number().optional(),
  marca: z.string().min(1, "Selecciona una marca"),
  modelo: z.string().min(2, "El modelo debe tener al menos 2 caracteres"),
  color: z.string().min(1, "Selecciona un color"),
  anio: z.number().int().min(1950).max(2030),
  precio: z.number().positive("El precio debe ser mayor que 0")
});

export const carsResponseSchema = z.array(
  carSchema.extend({
    id: z.number()
  })
);
