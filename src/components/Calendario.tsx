import { useState } from "react";
import { DiaCalendario, Receta } from "../types";

export default function Calendario({
  calendario,
  setCalendario,
  recetas,
}: {
  calendario: DiaCalendario[];
  setCalendario: (calendario: DiaCalendario[]) => void;
  recetas: Receta[];
}) {
  const [recetarioVisible, setRecetarioVisible] = useState(false);
  const [diaElegido, setDiaElegido] = useState<number>(-1);

  function mostrarRecetario(indiceDia: number) {
    setRecetarioVisible(true);
    setDiaElegido(indiceDia);
  }

  function asignarReceta(indice: number) {
    const recetaElegida = recetas[indice];

    if (diaElegido < 0 || recetaElegida === null) {
      alert("Error: no elegiste una receta.");
      cancelarAsignacion();
      return;
    }

    const nuevoCalendario = calendario.map((dia, indice) => {
      if (indice !== diaElegido) {
        return dia;
      } else {
        if (dia.menu === null) {
          dia.menu = [];
          dia.menu.push(recetaElegida);
        } else {
          dia.menu.push(recetaElegida);
        }
        return dia;
      }
    });
    setCalendario(nuevoCalendario);
  }

  function eliminarRecetaMenu(indiceDia: number, indiceReceta: number) {
    setDiaElegido(indiceDia);
    const nuevoCalendario = calendario.map((dia, indice) => {
      if (indice !== diaElegido) {
        return dia;
      } else {
        dia.menu?.splice(indiceReceta, 1);
        return dia;
      }
    });
    setCalendario(nuevoCalendario);
    cancelarAsignacion();
  }

  function cancelarAsignacion() {
    setRecetarioVisible(false);
    setDiaElegido(-1);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2>Calendario</h2>
      </div>
      <p>Tocá en alguno de los días para editar el menú.</p>
      <div className="bg-gray-900 rounded-lg p-6 mt-4">
        <ul>
          {calendario.map((dia, indiceDia) => (
            <div
              key={indiceDia}
              className={`bg-gray-800 rounded-lg p-4 flex flex-col mb-2 cursor-pointer border-2 border-orange-500 ${
                indiceDia === diaElegido
                  ? "border-2 border-orange-500"
                  : "border-none"
              }`}
            >
              <p onClick={() => mostrarRecetario(indiceDia)}>{dia.nombre}</p>
              <div
                className="flex flex-row flex-wrap"
                onClick={() => mostrarRecetario(indiceDia)}
              >
                {dia.menu.length > 0 ? (
                  dia.menu.map((receta, indiceReceta) => (
                    <div
                      className="bg-gray-700 rounded-lg p-4 max-w-80 flex flex-col m-4 shrink-0 min-w-24"
                      key={indiceReceta}
                    >
                      <h3 className="text-lg pb-2">{receta.nombre}</h3>
                      {recetarioVisible === true ? (
                        <button
                          type="button"
                          onClick={() =>
                            eliminarRecetaMenu(indiceDia, indiceReceta)
                          }
                          className={`ml-auto px-2 rounded-lg ${indiceDia !== diaElegido ? "hidden" : "bg-gray-600"}`}
                        >
                          X
                        </button>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <p>No hay recetas asignadas para este día.</p>
                )}
              </div>
              {recetarioVisible && (
                <div
                  id="formulario"
                  className={`bg-gray-900 rounded-lg p-6 mt-8 ${indiceDia !== diaElegido ? "hidden" : "bg-gray-700"}`}
                >
                  <div className="flex flex-row justify-between items-center mb-8">
                    <h3>Elegir receta:</h3>
                    <button
                      className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full"
                      onClick={() => cancelarAsignacion()}
                    >
                      Aceptar
                    </button>
                  </div>
                  <div className="flex flex-row flex-wrap justify-evenly">
                    {recetas.map((receta, indice) => (
                      <div
                        className="bg-gray-800 rounded-lg p-4 max-w-80 flex flex-col m-4 shrink-0 cursor-pointer"
                        key={indice}
                        onClick={() => asignarReceta(indice)}
                      >
                        <img
                          src={receta.image}
                          alt="Recipe image"
                          className="w-full h-48 object-cover mb-4"
                        ></img>
                        <h3 className="text-lg pb-2">{receta.nombre}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
