// se importa el built in-hook useState
import { useState } from "react";

// se declara la función useLocalStorage dentro de este custom hook
export function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    const guardado = localStorage.getItem(clave);
    return guardado ? JSON.parse(guardado) : valorInicial;
  });

  function actualizarValor(nuevoValor) {
    setValor(nuevoValor);
    localStorage.setItem(clave, JSON.stringify(nuevoValor));
  }

  return [valor, actualizarValor];
}
