import { trabajos } from "@/data/perfil";

export type TipoParada = "inicio" | "trabajo" | "taller" | "puerto" | "meta";

export type Parada = {
  id: string;
  tipo: TipoParada;
  etiqueta: string;
  indiceTrabajo?: number;
  posicion: [number, number, number];
};

const SEPARACION = 16;
const ONDULACION = 7;

function posicionDe(i: number): [number, number, number] {
  return [i * SEPARACION, 0, Math.sin(i * 1.1) * ONDULACION];
}

export function construirRuta(): Parada[] {
  const base: Omit<Parada, "posicion">[] = [
    { id: "inicio", tipo: "inicio", etiqueta: "Inicio" },
    ...trabajos.map((t, i) => ({
      id: `nivel-${i + 1}`,
      tipo: "trabajo" as const,
      etiqueta: t.empresa,
      indiceTrabajo: i,
    })),
    { id: "inventario", tipo: "taller", etiqueta: "Inventario" },
    { id: "proyectos", tipo: "puerto", etiqueta: "Proyectos" },
    { id: "contacto", tipo: "meta", etiqueta: "Siguiente nivel" },
  ];
  return base.map((p, i) => ({ ...p, posicion: posicionDe(i) }));
}

export const ruta = construirRuta();

export const progresoScroll = { valor: 0 };

export function rutaAsset(ruta: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${ruta}`;
}
