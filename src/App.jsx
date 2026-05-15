import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Header from "./components/Header";
// import Home from './components/Home';
import Recetas from "./components/Recetas";
import Despensa from "./components/Despensa";
import Calendario from "./components/Calendario";

const SECCIONES = {
  // home: 'home',
  recetas: "recetas",
  despensa: "despensa",
  calendario: "calendario",
};

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
  const [recetas, setRecetas] = useLocalStorage("recetas", []);
  const [despensa, setDespensa] = useLocalStorage("despensa", []);
  const [calendario, setCalendario] = useLocalStorage("calendario", semana);

  const [seccionActiva, setSeccionActiva] = useState(SECCIONES.despensa);

  function Contenido({ seccionActiva }) {
    if (seccionActiva === "recetas") {
      return <Recetas recetas={recetas} setRecetas={setRecetas} />;
    } else if (seccionActiva === "despensa") {
      return <Despensa despensa={despensa} setDespensa={setDespensa} />;
    } else if (seccionActiva === "calendario") {
      return (
        <Calendario
          calendario={calendario}
          setCalendario={setCalendario}
          recetas={recetas}
        />
      );
    }
    // } else {
    //   return <Home />;
    // }
  }

  return (
    <>
      <Header
        seccionActiva={seccionActiva}
        onCambiarSeccion={setSeccionActiva}
      />

      <Contenido seccionActiva={seccionActiva} />
    </>
  );
}
