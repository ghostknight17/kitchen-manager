import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Home from './components/Home';
import Recetas from './components/Recetas';
import Despensa from './components/Despensa';
import Calendario from './components/Calendario';

const SECCIONES = {
  home: 'home',
  recetas: 'recetas',
  despensa: 'despensa',
  calendario: 'calendario',
};

export default function App() {
  const [recetas, setRecetas] = useLocalStorage('recetas', []);
  const [despensa, setDespensa] = useLocalStorage('despensa', []);
  const [calendario, setCalendario] = useLocalStorage('calendario', semana());

  const [seccionActiva, setSeccionActiva] = useState(SECCIONES.home);

  return (
    <div>
      <Header
        seccionActiva={seccionActiva}
        onCambiarSeccion={setSeccionActiva}
      />

      <main>
        {seccionActiva === SECCIONES.home && <Home />}
        {seccionActiva === SECCIONES.recetas && (
          null
        )}
      </main>
    </div>
  );
}
