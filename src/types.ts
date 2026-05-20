export type Ingrediente = {
  nombre: string;
  cantidad: number | null;
  unidad: string | null;
};

export type Receta = {
  nombre: string;
  ingredientes: Ingrediente[];
  instrucciones: string;
};

export type DiaCalendario = {
  nombre: string;
  desayuno: Receta | null;
  almuerzo: Receta | null;
  merienda: Receta | null;
  cena: Receta | null;
};
