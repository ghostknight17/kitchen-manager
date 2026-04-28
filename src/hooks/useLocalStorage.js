import { useState } from "react";

// Custom hooks deben empezar con "use".
function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    const guardado = localStorage.getItem(clave);
    // Si hay algo en guardado, lo parsea y lo devuelve
    return guardado ? JSON.parse(guardado) : valorInicial;
  });

  // Ambas son necesarias para el cambio persista en localStorage
  // y el cambio se vea reflejado en la UI.
  function actualizarValor(nuevoValor) {
    setValor(nuevoValor);
    localStorage.setItem(clave, JSON.stringify(nuevoValor));
  }

  // El valor actual y la función para actualizarlo
  // ej. // const [recetario, setRecetario] = useLocalStorage('recetario', [])
  return [valor, actualizarValor];
}

export default useLocalStorage;