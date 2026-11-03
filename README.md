# Portafolio 3D · Jairo Perez

Portafolio interactivo: un mapa de niveles en 3D que la cámara recorre con el scroll.

## Stack

Next.js 16 (export estático) · React 19 · TypeScript · Tailwind CSS 4 · React Three Fiber (three.js) · GSAP + ScrollTrigger · Lenis · lucide-react · Playwright (capturas).

## Comandos

```bash
npm install
npm run dev      # desarrollo
npm run build    # genera /out para GitHub Pages
```

Se despliega en Vercel. `BASE_PATH` permite publicarlo en una subruta si hiciera falta.

## Agregar un trabajo nuevo

Todo el contenido vive en `src/data/perfil.ts`. Agrega un objeto al final de `trabajos`:

```ts
{
  empresa: "Nueva Empresa",
  cargo: "Desarrollador Frontend",
  periodo: "Ene. 2027 – Actualidad",
  logros: ["Logro concreto y medible."],
  stack: ["React", "TypeScript"],
  trofeo: "Opcional",
}
```

La isla, la tarjeta del nivel, el minimapa y el recorrido de la cámara se generan solos.

## Revisión visual

Con el sitio servido en `PREVIEW_URL`, `node scripts/capturas.mjs` guarda capturas de escritorio y móvil de cada sección en `.capturas/`.
