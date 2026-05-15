import { useState } from "react";
import { Fragment } from "react";

export default function Calendario({ calendario, setCalendario, recetas }) {
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [recetasVisible, setRecetasVisible] = useState(false);
  const [diaElegido, setDiaElegido] = useState(null);
  const [comidaElegida, setComidaElegida] = useState(null);

  function elegirComida(indice) {
    setDiaElegido(indice);
    setFormularioVisible(true);
  }

  function elegirReceta() {
    setRecetasVisible(true);
  }

  function asignarReceta(receta) {
    setFormularioVisible(false);
    setRecetasVisible(false);
    calendario[diaElegido][comidaElegida] = receta;
  }

  return (
    <>
      <h2>Calendario</h2>
      <p>Aquí puedes planificar tus comidas semanalmente.</p>
      <div>
        <div>
          <ul>
            {calendario.map((dia, indice) => (
              <Fragment key={indice}>
                <li onClick={() => elegirComida(indice)}>
                  {dia.nombre}: Desayuno:{" "}
                  {dia.desayuno === null ? "Sin asignar" : dia.desayuno.nombre},
                  Almuerzo:{" "}
                  {dia.almuerzo === null ? "Sin asignar" : dia.almuerzo.nombre},
                  Merienda:{" "}
                  {dia.merienda === null ? "Sin asignar" : dia.merienda.nombre},
                  Cena: {dia.cena === null ? "Sin asignar" : dia.cena.nombre},
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
      <div>
        {formularioVisible && (
          <>
            <h3>Agregar Comida</h3>
            <select
              id="tipo-comida"
              value={comidaElegida}
              onChange={(e) => setComidaElegida(e.target.value)}
            >
              <option value="desayuno">Desayuno</option>
              <option value="almuerzo">Almuerzo</option>
              <option value="merienda">Merienda</option>
              <option value="cena">Cena</option>
            </select>
            <button id="agregar-btn" onClick={() => elegirReceta()}>
              Agregar
            </button>
            {recetasVisible && (
              <>
                <h3>Elegir receta:</h3>
                <ul>
                  {recetas.map((receta, indice) => (
                    <li key={indice} onClick={() => asignarReceta(receta)}>
                      {receta.nombre}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
