import { useState } from "react";
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
      <div className="flex justify-between items-center mb-6">
        <h2>Despensa</h2>
      </div>
      <p>Agregá los ingredientes que tengas disponibles.</p>
      <div className="bg-gray-900 rounded-lg p-6 mt-4">
        <ul>
          {despensa.map((ingrediente, indice) => (
            <div
              key={indice}
              className="bg-gray-800 rounded-lg p-4 max-w-screen-sm flex flex-row mb-2"
            >
              <li>
                {ingrediente.cantidad === null
                  ? `${ingrediente.nombre}`
                  : ingrediente.unidad
                    ? `${ingrediente.cantidad} ${ingrediente.unidad} de ${ingrediente.nombre}`
                    : `${ingrediente.cantidad} ${ingrediente.nombre}`}
              </li>
              <div className="ml-auto">
                <button type="button" onClick={() => editarIngrediente(indice)}>
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => eliminarIngrediente(indice)}
                  className="ml-6"
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </ul>
        <h3 className="mt-6 ml-4 mb-2">
          {indiceEdicion !== null
            ? "Editando el ingrediente seleccionado:"
            : "Sólo el nombre del ingrediente es obligatorio para agregarlo a la despensa:"}
        </h3>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2 p-2 items-start">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del ingrediente"
              required
              className="w-80 rounded-lg bg-gray-700 p-1 text-gray-300 focus:outline focus:outline-orange-400 pl-3"
            />
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              placeholder="Cantidad disponible"
              className="w-80 rounded-lg bg-gray-700 p-1 text-gray-300 focus:outline focus:outline-orange-400 pl-3"
            />
            <input
              type="text"
              value={unidad}
              onChange={(e) => setUnidad(e.target.value)}
              placeholder="Unidad (u, g, ml, cc, tazas, etc)"
              className="w-80 rounded-lg bg-gray-700 p-1 text-gray-300 focus:outline focus:outline-orange-400 pl-3"
            />
            <button
              type="button"
              onClick={guardarIngrediente}
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full max-h-12 mt-4"
            >
              {indiceEdicion !== null ? "Aceptar" : "Agregar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
