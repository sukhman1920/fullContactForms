
function CarList({ cars, onEdit, onDelete }) {
  if (cars.length === 0) {
    return <p className="empty">Todavía no hay vehículos registrados.</p>;
  }

  return (
    <section className="car-list">
      <h2>Catálogo de vehículos</h2>

      <div className="cars-grid">
        {cars.map((car) => (
          <article className="car-card" key={car.id}>
            <span>{car.marca}</span>
            <h3>{car.modelo}</h3>
            <p>Color: {car.color}</p>
            <p>Año: {car.anio}</p>
            <p className="price">
              {car.precio.toLocaleString("es-ES")} €
            </p>

            <button onClick={() => onEdit(car)}>Editar</button>
            <button
              className="delete-button"
              onClick={() => onDelete(car.id)}
            >
              Eliminar
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CarList;
