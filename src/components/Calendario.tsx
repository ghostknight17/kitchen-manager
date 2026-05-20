import { useState } from "react";
import { Fragment } from "react";

export default function Calendario({ calendario, setCalendario, recetas }) {
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [diaElegido, setDiaElegido] = useState(null);
  const [comidaElegida, setComidaElegida] = useState("desayuno");
  const [recetaElegida, setRecetaElegida] = useState(null);

  function elegirDia(indice) {
    setFormularioVisible(true);
    setDiaElegido(indice);
  }

  function asignarReceta() {
    if (diaElegido === null || !comidaElegida || !recetaElegida) {
      alert("Por favor elige un día, tipo de comida y una receta.");
      return;
    }

    const nuevoCalendario = calendario.map((dia, indice) => {
      if (indice === diaElegido) {
        return {
          ...dia,
          [comidaElegida]: recetaElegida,
        };
      }
      return dia;
    });
    setCalendario(nuevoCalendario);
    setFormularioVisible(false);
    setRecetaElegida(null);
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
                <li onClick={() => elegirDia(indice)}>
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
            <>
              <h3>Elegir receta:</h3>
              <div>
                {recetas.map((receta, indice) => (
                  <li key={indice}>
                    <input
                      type="radio"
                      name="receta"
                      onChange={() => setRecetaElegida(receta)}
                    />
                    <label> {receta.nombre} </label>
                  </li>
                ))}
              </div>
              <button id="agregar-btn" onClick={() => asignarReceta()}>
                Asignar
              </button>
            </>
          </>
        )}
      </div>
    </>
  );
}
