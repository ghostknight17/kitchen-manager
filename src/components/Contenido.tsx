import { Ingrediente, Receta, DiaCalendario } from "../types";
import Recetas from "./Recetas";
import Despensa from "./Despensa";
import Calendario from "./Calendario";
// import Home from './components/Home';

type Props = {
  seccionActiva: string;
  recetas: Receta[];
  setRecetas: (receta: Receta[]) => void;
  despensa: Ingrediente[];
  setDespensa: (despensa: Ingrediente[]) => void;
  calendario: DiaCalendario[];
  setCalendario: (calendario: DiaCalendario[]) => void;
};

export default function Contenido({
  seccionActiva,
  recetas,
  setRecetas,
  despensa,
  setDespensa,
  calendario,
  setCalendario,
}: Props) {
  if (seccionActiva === "recetas") {
    return (
      <Recetas recetas={recetas} setRecetas={setRecetas} despensa={despensa} />
    );
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
