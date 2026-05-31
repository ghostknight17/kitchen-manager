import { useState } from "react";
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
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [instrucciones, setInstrucciones] = useState("");
  const [image, setImage] = useState("");

  const [inputNombre, setInputNombre] = useState("");
  const [inputCantidad, setInputCantidad] = useState("");
  const [inputUnidad, setInputUnidad] = useState("");

  function abrirFormularioNuevo() {
    setNombre("");
    setIngredientes([]);
    setInstrucciones("");
    setImage("");
    setIndiceEdicion(null);
    formularioVisible
      ? setFormularioVisible(false)
      : setFormularioVisible(true);
  }

  function abrirFormularioEdicion(indice: number) {
    const receta = recetas[indice];
    setNombre(receta.nombre);
    setIngredientes(receta.ingredientes);
    setInstrucciones(receta.instrucciones);
    setImage(receta.image);
    setIndiceEdicion(indice);
    setFormularioVisible(true);
    setIngredientesVisible(true);
  }

  function guardarIngrediente() {
    if (!inputNombre.trim()) {
      alert("El nombre del ingrediente es requerido");
      return;
    }

    const ingrediente = {
      nombre: inputNombre.trim(),
      cantidad: Number(inputCantidad) || null,
      unidad: inputUnidad.trim() || null,
    };

    setIngredientes([...ingredientes, ingrediente]);
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
      image: image,
    };

    if (indiceEdicion !== null) {
      const actualizada = recetas.map((item, i) =>
        i == indiceEdicion ? receta : item,
      );
      setRecetas(actualizada);
      setIndiceEdicion(null);
    } else {
      setRecetas([...recetas, receta]);
    }

    setNombre("");
    setIngredientes([]);
    setInstrucciones("");
    setImage("");

    setFormularioVisible(false);
  }

  function eliminarReceta(indice: number) {
    setRecetas(recetas.filter((_, i) => i !== indice));
  }

  function eliminarIngrediente(indice: number) {
    setIngredientes(ingredientes.filter((_, i) => i !== indice));
  }

  async function addImage(e: React.ChangeEvent<HTMLInputElement>) {
    const formData = new FormData();
    if (e.target.files !== null) {
      formData.append("file", e.target.files[0]);
      formData.append("upload_preset", "kitchen_manager");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxaaqm4ty/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );
      const resultado = await response.json();
      setImage(resultado.url);
    }
  }

  if (recetaSeleccionada === null) {
    return (
      <div className="p-6 max-w-4xl mx-auto flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2>Recetario</h2>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full"
            onClick={abrirFormularioNuevo}
          >
            {formularioVisible ? "Cancelar" : "Agregar receta"}
          </button>
        </div>
        <p>
          {recetas.length === 0
            ? "Podés empezar por agregar una receta al recetario."
            : "Tus recetas se guardan acá."}
        </p>
        <div className="bg-gray-900 rounded-lg p-6">
          <div>
            <ul className="flex flex-wrap gap-4 justify-center flex-row">
              {recetas.map((receta, indice) => (
                <div
                  className="bg-gray-800 rounded-lg p-4 max-w-md flex flex-col"
                  key={indice}
                >
                  <div>
                    {receta.image && (
                      <img
                        src={receta.image}
                        alt="Recipe image"
                        className="w-full h-48 object-cover mb-4 cursor-pointer"
                      ></img>
                    )}
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
                        type="button"
                        onClick={() => abrirFormularioEdicion(indice)}
                      >
                        Editar
                      </button>
                      <button
                        className="px-2"
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
            <div className="flex flex-col gap-2 bg-gray-900 rounded-lg p-8 items-start">
              <label htmlFor="nombre">Nombre de la receta</label>
              <div>
                <input
                  type="text"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-80 rounded-lg bg-gray-700 p-1 text-gray-300 focus:outline focus:outline-orange-400 pl-3"
                />
                <label className="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-lg h-10 ml-4 cursor-pointer">
                  {image !== "" ? "Imagen agregada" : "Agregar Imagen"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => addImage(e)}
                    className="hidden"
                  />
                </label>
              </div>
              {ingredientesVisible && (
                <div>
                  <ul>
                    {ingredientes.map((ingrediente, indice) => (
                      <div
                        key={indice}
                        className="max-w-screen-sm flex flex-row mb-2"
                      >
                        <li>
                          {ingrediente.cantidad === null
                            ? `• ${ingrediente.nombre}`
                            : ingrediente.unidad
                              ? `• ${ingrediente.cantidad} ${ingrediente.unidad} de ${ingrediente.nombre}`
                              : `• ${ingrediente.cantidad} ${ingrediente.nombre}`}
                        </li>
                        <div className="ml-auto">
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
                </div>
              )}
              <label htmlFor="ingredientes">Ingredientes</label>
              <input
                type="text"
                placeholder="Nombre del ingrediente"
                value={inputNombre}
                onChange={(e) => setInputNombre(e.target.value)}
                className="w-80 rounded-lg bg-gray-700 p-1 text-gray-300 focus:outline focus:outline-orange-400 pl-3"
              />
              <input
                type="number"
                placeholder="Cantidad"
                value={inputCantidad}
                onChange={(e) => setInputCantidad(e.target.value)}
                className="w-80 rounded-lg bg-gray-700 p-1 text-gray-300 focus:outline focus:outline-orange-400 pl-3"
              />
              <input
                type="text"
                placeholder="Unidad (u, g, ml, cc, tazas, etc)"
                value={inputUnidad}
                onChange={(e) => setInputUnidad(e.target.value)}
                className="w-80 rounded-lg bg-gray-700 p-1 text-gray-300 focus:outline focus:outline-orange-400 pl-3"
              />
              <button type="button" onClick={guardarIngrediente}>
                Agregar ingrediente
              </button>
              <label htmlFor="instrucciones" className="mt-3">
                Instrucciones o pasos
              </label>
              <textarea
                name="instrucciones"
                required
                placeholder="Describí los pasos necesarios para realizar esta receta."
                value={instrucciones}
                onChange={(e) => setInstrucciones(e.target.value)}
                className="w-10/12 h-64 shrink-0 rounded-lg bg-gray-700 p-1 text-gray-300 focus:outline focus:outline-orange-400 pl-3 resize-none"
              />
              <button
                type="submit"
                onClick={guardarReceta}
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full mt-6"
              >
                Guardar
              </button>
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
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full"
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
              let disponibilidad = "";
              if (ingrediente.cantidad === null) {
                if (ingredienteDisponible) {
                  texto = `${ingrediente.nombre} a gusto`;
                  disponibilidad = "";
                } else {
                  texto = `${ingrediente.nombre} a gusto`;
                  disponibilidad = "(no disponible)";
                }
              } else if (ingredienteDisponible) {
                if (
                  ingredienteDisponible.cantidad &&
                  ingredienteDisponible.cantidad >= ingrediente.cantidad
                ) {
                  if (ingrediente.unidad) {
                    texto = `${ingrediente.cantidad} ${ingrediente.unidad} de ${ingrediente.nombre}`;
                    disponibilidad = "";
                  } else {
                    texto = `${ingrediente.cantidad} ${ingrediente.nombre}`;
                    disponibilidad = "";
                  }
                } else {
                  if (ingrediente.unidad) {
                    texto = `${ingrediente.cantidad} ${ingrediente.unidad} de ${ingrediente.nombre}`;
                    disponibilidad = "(insuficiente)";
                    estilo = "text-orange-500";
                  } else {
                    texto = `${ingrediente.cantidad} ${ingrediente.nombre}`;
                    disponibilidad = "(insuficiente)";
                    estilo = "text-orange-500";
                  }
                }
              } else {
                if (ingrediente.unidad) {
                  texto = `${ingrediente.cantidad} ${ingrediente.unidad} de ${ingrediente.nombre}`;
                  disponibilidad = "(no disponible)";
                } else {
                  texto = `${ingrediente.cantidad} ${ingrediente.nombre}`;
                  disponibilidad = "(no disponible)";
                }
              }
              return (
                <li key={indice}>
                  {texto}
                  <span className={estilo}>{` ${disponibilidad}`}</span>
                </li>
              );
            },
          )}
        </ul>
        <h3>Instrucciones:</h3>
        <p className="whitespace-pre-wrap">
          {recetas[recetaSeleccionada].instrucciones}
        </p>
      </div>
    );
  }
}
