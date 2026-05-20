import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Header from "./components/Header";
import Contenido from "./components/Contenido";
import { Ingrediente, Receta, DiaCalendario, Seccion } from "./types";

let semana = [
  {
    nombre: "Lunes",
    desayuno: null,
    almuerzo: null,
    merienda: null,
    cena: null,
  },
  {
    nombre: "Martes",
    desayuno: null,
    almuerzo: null,
    merienda: null,
    cena: null,
  },
  {
    nombre: "Miercoles",
    desayuno: null,
    almuerzo: null,
    merienda: null,
    cena: null,
  },
  {
    nombre: "Jueves",
    desayuno: null,
    almuerzo: null,
    merienda: null,
    cena: null,
  },
  {
    nombre: "Viernes",
    desayuno: null,
    almuerzo: null,
    merienda: null,
    cena: null,
  },
  {
    nombre: "Sabado",
    desayuno: null,
    almuerzo: null,
    merienda: null,
    cena: null,
  },
  {
    nombre: "Domingo",
    desayuno: null,
    almuerzo: null,
    merienda: null,
    cena: null,
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
