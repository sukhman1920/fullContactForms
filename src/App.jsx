
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Header from "./components/Header";
import CarForm from "./components/CarForm";
import CarList from "./components/CarList";

import {
  getCars,
  addCar,
  updateCar,
  deleteCar
} from "./api";

import "./App.css";

function App() {
  const queryClient = useQueryClient();

  const [editingCar, setEditingCar] = useState(null);

  // Consultar los coches de la API.
  const {
    data: cars = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars
  });

  // Registrar o actualizar un coche.
  const saveMutation = useMutation({
    mutationFn: (car) => {
      if (car.id) {
        return updateCar(car);
      }

      return addCar(car);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cars"]
      });

      setEditingCar(null);
    }
  });

  // Eliminar un coche.
  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cars"]
      });
    }
  });

  function handleSave(car) {
    return saveMutation.mutateAsync(car);
  }

  function handleEdit(car) {
    setEditingCar(car);
  }

  function handleDelete(id) {
    if (window.confirm("¿Quieres eliminar este vehículo?")) {
      deleteMutation.mutate(id);
    }
  }

  return (
    <>
      <Header />

      <main className="container">

        <CarForm
          onSave={handleSave}
          editingCar={editingCar}
          onCancel={() => setEditingCar(null)}
        />

        {/* Estado de registro y edición */}
        {saveMutation.isPending && (
          <p className="loading">Guardando vehículo...</p>
        )}

        {saveMutation.isError && (
          <p className="error">
            Error al guardar el vehículo: {saveMutation.error.message}
          </p>
        )}

        {saveMutation.isSuccess && (
          <p className="success">
            Vehículo guardado correctamente.
          </p>
        )}

        {/* Estado de eliminación */}
        {deleteMutation.isPending && (
          <p className="loading">Eliminando vehículo...</p>
        )}

        {deleteMutation.isError && (
          <p className="error">
            Error al eliminar el vehículo.
          </p>
        )}

        {deleteMutation.isSuccess && (
          <p className="success">
            Vehículo eliminado correctamente.
          </p>
        )}

        {/* Estado de consulta */}
        {isLoading && (
          <p className="loading">Cargando vehículos...</p>
        )}

        {isError && (
          <p className="error">
            Error al cargar: {error.message}
          </p>
        )}

        {!isLoading && !isError && (
          <CarList
            cars={cars}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

      </main>
    </>
  );
}

export default App;
