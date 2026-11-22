
import { carsResponseSchema } from "./schemas/carSchema";

const API_URL = "http://localhost:3000";

export async function getCars() {
  const response = await fetch(`${API_URL}/coches`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los coches");
  }

  const data = await response.json();
  return carsResponseSchema.parse(data);
}

export async function addCar(car) {
  const response = await fetch(`${API_URL}/coches`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car)
  });

  if (!response.ok) {
    throw new Error("No se pudo registrar el coche");
  }

  return response.json();
}

export async function updateCar(car) {
  const response = await fetch(`${API_URL}/coches/${car.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car)
  });

  if (!response.ok) {
    throw new Error("No se pudo actualizar el coche");
  }

  return response.json();
}

export async function deleteCar(id) {
  const response = await fetch(`${API_URL}/coches/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar el coche");
  }

  return true;
}
