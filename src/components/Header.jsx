export default function Header({ seccionActiva, onCambiarSeccion }) {
  return (
    <header className="flex justify-around items-center px-4 py-8 bg-gray-900">
      <h1 className="text-2xl font-bold">Kitchen Manager</h1>
      {/* onClick={() => onCambiarSeccion("home")}*/}
      <nav className=" flex gap-4">
        <button
          id="btnRecetas"
          className={
            seccionActiva === "recetas"
              ? "px-1 py-2 text-white border-b-2 border-orange-500 hover:text-white hover:border-slate-500 transition-colors"
              : "px-1 py-2 text-slate-400 border-b-2 border-transparent hover:text-white hover:border-slate-500 transition-colors"
          }
          onClick={() => onCambiarSeccion("recetas")}
        >
          Recetas
        </button>
        <button
          id="btnDespensa"
          className={
            seccionActiva === "despensa"
              ? "px-1 py-2 text-white border-b-2 border-orange-500 hover:text-white hover:border-slate-500 transition-colors"
              : "px-1 py-2 text-slate-400 border-b-2 border-transparent hover:text-white hover:border-slate-500 transition-colors"
          }
          onClick={() => onCambiarSeccion("despensa")}
        >
          Despensa
        </button>
        <button
          id="btnCalendario"
          className={
            seccionActiva === "calendario"
              ? "px-1 py-2 text-white border-b-2 border-orange-500 hover:text-white hover:border-slate-500 transition-colors"
              : "px-1 py-2 text-slate-400 border-b-2 border-transparent hover:text-white hover:border-slate-500 transition-colors"
          }
          onClick={() => onCambiarSeccion("calendario")}
        >
          Calendario
        </button>
      </nav>
      <button>About</button>
    </header>
  );
}
