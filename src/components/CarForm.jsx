
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carSchema } from "../schemas/carSchema";

function CarForm({ onSave, editingCar, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(carSchema),
    defaultValues: {
      marca: "",
      modelo: "",
      color: "",
      anio: 2025,
      precio: 0
    }
  });

  useEffect(() => {
    if (editingCar) {
      reset(editingCar);
    } else {
      reset({
        marca: "",
        modelo: "",
        color: "",
        anio: 2025,
        precio: 0
      });
    }
  }, [editingCar, reset]);

  async function submitForm(data) {
    await onSave(data);
    reset();
  }

  return (
    <form className="car-form" onSubmit={handleSubmit(submitForm)}>
      <h2>{editingCar ? "Editar vehículo" : "Registrar vehículo"}</h2>

      <label>Marca</label>
      <select {...register("marca")}>
        <option value="">Selecciona una marca</option>
        <option value="Ferrari">Ferrari</option>
        <option value="Lamborghini">Lamborghini</option>
        <option value="Porsche">Porsche</option>
      </select>
      <p className="error">{errors.marca?.message}</p>

      <label>Modelo</label>
      <input {...register("modelo")} placeholder="Ej. 911 GT3" />
      <p className="error">{errors.modelo?.message}</p>

      <label>Color</label>
      <select {...register("color")}>
        <option value="">Selecciona un color</option>
        <option value="Rojo">Rojo</option>
        <option value="Negro">Negro</option>
        <option value="Blanco">Blanco</option>
        <option value="Azul">Azul</option>
      </select>
      <p className="error">{errors.color?.message}</p>

      <label>Año</label>
      <input type="number" {...register("anio", { valueAsNumber: true })} />
      <p className="error">{errors.anio?.message}</p>

      <label>Precio (€)</label>
      <input
        type="number"
        {...register("precio", { valueAsNumber: true })}
      />
      <p className="error">{errors.precio?.message}</p>

      <button type="submit" disabled={isSubmitting}>
        {editingCar ? "Guardar cambios" : "Registrar coche"}
      </button>

      {editingCar && (
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancelar
        </button>
      )}
    </form>
  );
}

export default CarForm;
