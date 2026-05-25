import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Header from "./components/Header";
import Contenido from "./components/Contenido";
import { Ingrediente, Receta, DiaCalendario, Seccion } from "./types";

let semana = [
  {
    nombre: "Lunes",
    menu: [],
  },
  {
    nombre: "Martes",
    menu: [],
  },
  {
    nombre: "Miercoles",
    menu: [],
  },
  {
    nombre: "Jueves",
    menu: [],
  },
  {
    nombre: "Viernes",
    menu: [],
  },
  {
    nombre: "Sabado",
    menu: [],
  },
  {
    nombre: "Domingo",
    menu: [],
  },
];

export default function App() {
  const [recetas, setRecetas] = useLocalStorage<Receta[]>("recetas", []);
  const [despensa, setDespensa] = useLocalStorage<Ingrediente[]>(
    "despensa",
    [],
  );
  const [calendario, setCalendario] = useLocalStorage<DiaCalendario[]>(
    "calendario",
    semana,
  );

  const [seccionActiva, setSeccionActiva] = useState<Seccion>("recetas");

  return (
    <>
      <Header
        seccionActiva={seccionActiva}
        onCambiarSeccion={setSeccionActiva}
      />

      <Contenido
        seccionActiva={seccionActiva}
        recetas={recetas}
        setRecetas={setRecetas}
        despensa={despensa}
        setDespensa={setDespensa}
        calendario={calendario}
        setCalendario={setCalendario}
      />
    </>
  );
}
