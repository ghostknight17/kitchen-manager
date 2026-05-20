import { useState } from "react";

export function useLocalStorage<T>(
  clave: string,
  valorInicial: T,
): [T, (nuevoValor: T) => void] {
  const [valor, setValor] = useState(() => {
    const guardado = localStorage.getItem(clave);
    return guardado ? JSON.parse(guardado) : valorInicial;
  });

  function actualizarValor(nuevoValor: T) {
    setValor(nuevoValor);
    localStorage.setItem(clave, JSON.stringify(nuevoValor));
  }

  return [valor, actualizarValor];
}
