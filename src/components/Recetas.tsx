import { useState } from "react";
import { Fragment } from "react";
import { Receta, Ingrediente, Indice } from "../types";

export default function Recetas({
  recetas,
  setRecetas,
  despensa,
}: {
  recetas: Receta[];
  setRecetas: (recetas: Receta[]) => void;
  despensa: Ingrediente[];
}) {
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [ingredientesVisible, setIngredientesVisible] = useState(false);
  const [indiceEdicion, setIndiceEdicion] = useState<Indice>(null);

  const [recetaSeleccionada, setRecetaSeleccionada] = useState<Indice>(null);

  const [nombre, setNombre] = useState("");
  const [ingredientes, setingredientes] = useState<Ingrediente[]>([]);
  const [instrucciones, setInstrucciones] = useState("");

  const [inputNombre, setInputNombre] = useState("");
  const [inputCantidad, setInputCantidad] = useState("");
  const [inputUnidad, setInputUnidad] = useState("");

  function abrirFormularioNuevo() {
    setNombre("");
    setingredientes([]);
    setInstrucciones("");
    setIndiceEdicion(null);
    setFormularioVisible(true);
  }

  function abrirFormularioEdicion(indice: number) {
    const receta = recetas[indice];
    setNombre(receta.nombre);
    setingredientes(receta.ingredientes);
    setInstrucciones(receta.instrucciones);
    setIndiceEdicion(indice);
    setFormularioVisible(true);
  }

  function guardarIngrediente() {
    if (!inputNombre.trim()) {
      alert("El nombre del ingrediente es requerido");
      return;
    }

    const ingrediente = {
      nombre: inputNombre.trim(),
      cantidad: Number(inputCantidad) || null,
      unidad: inputUnidad || null,
    };

    setingredientes([...ingredientes, ingrediente]);
    setInputNombre("");
    setInputCantidad("");
    setInputUnidad("");

    setIngredientesVisible(true);
  }

  function guardarReceta() {
    if (!nombre.trim()) {
      alert("El nombre de la receta es requerida");
      return;
    }

    const receta = {
      nombre: nombre.trim(),
      ingredientes: ingredientes,
      instrucciones: instrucciones,
    };

    setNombre("");
    setingredientes([]);
    setInstrucciones("");

    setFormularioVisible(false);
    setRecetas([...recetas, receta]);
  }

  function eliminarReceta(indice: number) {
    setRecetas(recetas.filter((_, i) => i !== indice));
  }

  if (recetaSeleccionada === null) {
    return (
      <div className="p-6 max-w-4xl mx-auto flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2>Recetas</h2>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
            onClick={abrirFormularioNuevo}
          >
            Agregar Receta
          </button>
        </div>
        <p>Aquí puedes encontrar deliciosas recetas para preparar en casa.</p>
        <div id="card" className="bg-gray-900 rounded-lg p-6">
          <div id="recetas-div">
            <ul className="flex flex-wrap gap-4 justify-center flex-row">
              {recetas.map((receta, indice) => (
                <div
                  className="bg-gray-800 rounded-lg p-4 max-w-md flex flex-col"
                  id="receta-card"
                  key={indice}
                >
                  <div>
                    <img
                      src="https://picsum.photos/600/400"
                      alt=""
                      className="w-full h-48 object-cover mb-4 cursor-pointer"
                    ></img>
                    <h3
                      className="text-lg pb-2 cursor-pointer"
                      onClick={() => {
                        setRecetaSeleccionada(indice);
                      }}
                    >
                      {receta.nombre}
                    </h3>
                    <div className="flex flex-row gap-2 justify-end items-center">
                      <button
                        className="text-white text-xl px-2"
                        onClick={() => eliminarReceta(indice)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div>
          {formularioVisible && (
            <div>
              <label htmlFor="nombre">Nombre de la receta:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              {ingredientesVisible && (
                <div>
                  <ul>
                    {ingredientes.map((ingrediente, index) => (
                      <Fragment key={index}>
                        <li>
                          {ingrediente.cantidad === null
                            ? ingrediente.nombre
                            : `${ingrediente.cantidad} ${ingrediente.unidad} de ${ingrediente.nombre}`}
                        </li>
                      </Fragment>
                    ))}
                  </ul>
                </div>
              )}
              <label htmlFor="ingredientes" id="ingredientes-label">
                Ingredientes:
              </label>
              <input
                type="text"
                id="nombre-ingrediente"
                placeholder="Nombre del ingrediente"
                value={inputNombre}
                onChange={(e) => setInputNombre(e.target.value)}
              />
              <input
                type="number"
                id="cantidad-ingrediente"
                placeholder="0"
                value={inputCantidad}
                onChange={(e) => setInputCantidad(e.target.value)}
              />
              <input
                type="text"
                id="unidad-ingrediente"
                placeholder="Unidad (e.g., u, g, ml)"
                value={inputUnidad}
                onChange={(e) => setInputUnidad(e.target.value)}
              />
              <button
                type="button"
                id="agregar-ingrediente"
                onClick={guardarIngrediente}
              >
                Guardar
              </button>
              <textarea
                id="instrucciones"
                name="instrucciones"
                required
                value={instrucciones}
                onChange={(e) => setInstrucciones(e.target.value)}
              />
              <button type="submit" onClick={guardarReceta}>
                Guardar
              </button>
              `
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="p-6 max-w-4xl mx-auto flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2>{recetas[recetaSeleccionada].nombre}</h2>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
            onClick={() => {
              setRecetaSeleccionada(null);
            }}
          >
            Atrás
          </button>
        </div>
        <h3>Ingredientes:</h3>
        <ul>
          {recetas[recetaSeleccionada].ingredientes.map(
            (ingrediente, indice) => {
              const ingredienteDisponible = despensa.find(
                (item) =>
                  item.nombre.toLowerCase() ===
                  ingrediente.nombre.toLowerCase(),
              );
              let estilo = ingredienteDisponible ? "" : "text-red-500";
              let texto = "";
              if (ingrediente.cantidad === null) {
                texto = ingredienteDisponible
                  ? `${ingrediente.nombre} a gusto`
                  : `${ingrediente.nombre} a gusto (no disponible)`;
              } else if (ingredienteDisponible) {
                if (
                  ingredienteDisponible.cantidad &&
                  ingredienteDisponible.cantidad >= ingrediente.cantidad
                ) {
                  texto = `${ingrediente.cantidad} ${ingrediente.unidad} de ${ingrediente.nombre}`;
                } else {
                  texto = `${ingrediente.cantidad} ${ingrediente.unidad} de ${ingrediente.nombre} (insuficiente)`;
                  estilo = "text-orange-500";
                }
              } else {
                texto = `${ingrediente.cantidad} ${ingrediente.unidad} de ${ingrediente.nombre} (no disponible)`;
              }
              return (
                <li className={estilo} key={indice}>
                  {texto}
                </li>
              );
            },
          )}
        </ul>
        <h3>Instrucciones:</h3>
        <p>{recetas[recetaSeleccionada].instrucciones}</p>
      </div>
    );
  }
}
