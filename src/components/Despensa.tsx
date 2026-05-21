import { useState } from "react";
import { Fragment } from "react";

export default function Despensa({ despensa, setDespensa }) {
  const [nombre, setNombre] = useState("");
  const [cantidad, setcantidad] = useState("");
  const [unidad, setUnidad] = useState("");
  const [indiceEdicion, setIndiceEdicion] = useState(null);

  function guardarIngrediente() {
    if (!nombre.trim()) return;

    const ingrediente = {
      nombre,
      cantidad: cantidad === "" ? null : Number(cantidad),
      unidad: unidad === "" ? null : unidad.trim(),
    };

    if (indiceEdicion !== null) {
      const actualizado = despensa.map((item, i) =>
        i === indiceEdicion ? ingrediente : item,
      );
      setDespensa(actualizado);
      setIndiceEdicion(null);
    } else {
      setDespensa([...despensa, ingrediente]);
    }

    setNombre("");
    setcantidad("");
    setUnidad("");
  }

  function editarIngrediente(index) {
    const item = despensa[index];
    setNombre(item.nombre);
    setcantidad(item.cantidad ?? "");
    setUnidad(item.unidad ?? "");
    setIndiceEdicion(index);
  }

  function eliminarIngrediente(index) {
    setDespensa(despensa.filter((_, i) => i !== index));
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2>Despensa</h2>
      <p>Aquí puedes gestionar tus ingredientes guardados.</p>
      <div id="card" className="bg-gray-900 rounded-lg p-6 ">
        <ul>
          {despensa.map((ingrediente, index) => (
            <Fragment key={index}>
              <li>
                {ingrediente.cantidad === null
                  ? ingrediente.nombre
                  : `${ingrediente.cantidad} ${ingrediente.unidad} de ${ingrediente.nombre}`}
              </li>
              <button type="button" onClick={() => editarIngrediente(index)}>
                Editar
              </button>
              <button type="button" onClick={() => eliminarIngrediente(index)}>
                X
              </button>
            </Fragment>
          ))}
        </ul>
        <div>
          <h3>
            {indiceEdicion !== null
              ? "Editando ingrediente"
              : "Agregar ingrediente"}
          </h3>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del ingrediente"
            required
          />
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setcantidad(e.target.value)}
            placeholder="Cantidad disponible"
          />
          <input
            type="text"
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
            placeholder="Unidad (e.g., u, g, ml)"
          />
          <button type="button" onClick={guardarIngrediente}>
            {indiceEdicion !== null ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
