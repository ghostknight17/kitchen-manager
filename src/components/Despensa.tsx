import { useState } from "react";
import { Fragment } from "react";
import { Indice, Ingrediente } from "../types";

export default function Despensa({
  despensa,
  setDespensa,
}: {
  despensa: Ingrediente[];
  setDespensa: (despensa: Ingrediente[]) => void;
}) {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [unidad, setUnidad] = useState("");
  const [indiceEdicion, setIndiceEdicion] = useState<Indice>(null);

  function guardarIngrediente() {
    if (!nombre.trim()) return;

    const ingrediente = {
      nombre: nombre.trim(),
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
    setCantidad("");
    setUnidad("");
  }

  function editarIngrediente(indice: number) {
    const item = despensa[indice];
    setNombre(item.nombre);
    setCantidad(String(item.cantidad) ?? "");
    setUnidad(item.unidad ?? "");
    setIndiceEdicion(indice);
  }

  function eliminarIngrediente(indice: number) {
    setDespensa(despensa.filter((_, i) => i !== indice));
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2>Despensa</h2>
      <p>Aquí puedes gestionar tus ingredientes guardados.</p>
      <div className="bg-gray-900 rounded-lg p-6 ">
        <ul>
          {despensa.map((ingrediente, indice) => (
            <Fragment key={indice}>
              <li>
                {ingrediente.cantidad === null
                  ? ingrediente.nombre
                  : `${ingrediente.cantidad} ${ingrediente.unidad} de ${ingrediente.nombre}`}
              </li>
              <button type="button" onClick={() => editarIngrediente(indice)}>
                Editar
              </button>
              <button type="button" onClick={() => eliminarIngrediente(indice)}>
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
            className="w-80 rounded-xl bg-gray-700 p-1 text-gray-300"
          />
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder="Cantidad disponible"
            className="w-80 rounded-xl bg-gray-700 p-1 text-gray-300"
          />
          <input
            type="text"
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
            placeholder="Unidad (e.g., u, g, ml)"
            className="w-80 rounded-xl bg-gray-700 p-1 text-gray-300"
          />
          <button
            type="button"
            onClick={guardarIngrediente}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full"
          >
            {indiceEdicion !== null ? "Aceptar" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}
