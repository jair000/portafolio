"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { progresoScroll, ruta } from "@/lib/ruta";

const Mundo = dynamic(() => import("@/components/scene/Mundo"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

let lenisGlobal: Lenis | null = null;

export function irA(id: string) {
  const destino = document.getElementById(id);
  if (!destino) return;
  if (lenisGlobal) lenisGlobal.scrollTo(destino, { offset: 0, duration: 1.6 });
  else destino.scrollIntoView({ behavior: "smooth" });
}

function calcularProgreso() {
  const secciones = ruta
    .map((p) => document.getElementById(p.id))
    .filter((s): s is HTMLElement => Boolean(s));
  if (secciones.length < 2) return 0;
  const centroVista = window.scrollY + window.innerHeight / 2;
  const centros = secciones.map((s) => s.offsetTop + s.offsetHeight / 2);
  if (centroVista <= centros[0]) return 0;
  const ultimo = centros.length - 1;
  if (centroVista >= centros[ultimo]) return 1;
  let k = 0;
  while (k < ultimo && centroVista > centros[k + 1]) k++;
  const local = (centroVista - centros[k]) / (centros[k + 1] - centros[k]);
  return (k + local) / ultimo;
}

export default function Experiencia() {
  const [activo, setActivo] = useState(0);
  const [mostrarMundo, setMostrarMundo] = useState(false);
  const activoRef = useRef(0);

  useEffect(() => {
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reducir ? null : new Lenis({ lerp: 0.085, smoothWheel: true });
    lenisGlobal = lenis;

    const actualizar = () => {
      const p = calcularProgreso();
      progresoScroll.valor = p;
      const indice = Math.round(p * (ruta.length - 1));
      if (indice !== activoRef.current) {
        activoRef.current = indice;
        setActivo(indice);
      }
    };

    const tick = (tiempo: number) => lenis?.raf(tiempo * 1000);
    if (lenis) {
      lenis.on("scroll", () => {
        ScrollTrigger.update();
        actualizar();
      });
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }
    window.addEventListener("scroll", actualizar, { passive: true });
    window.addEventListener("resize", actualizar);
    actualizar();

    const contexto = gsap.context(() => {
      if (reducir) return;
      gsap.utils.toArray<HTMLElement>("[data-revelar]").forEach((el) => {
        const hijos = el.querySelectorAll("[data-revelar-hijo]");
        gsap.from(hijos.length ? hijos : el, {
          y: 36,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        });
      });
    });

    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    idle(() => setMostrarMundo(true));

    return () => {
      contexto.revert();
      if (lenis) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenisGlobal = null;
      window.removeEventListener("scroll", actualizar);
      window.removeEventListener("resize", actualizar);
    };
  }, []);

  return (
    <>
      {mostrarMundo && <Mundo />}
      <nav
        aria-label="Mapa del recorrido"
        className="fixed bottom-5 right-5 z-30 hidden rounded-[22px] bg-white/95 px-4 py-3 shadow-[0_14px_40px_-18px_rgba(20,33,61,0.55)] md:block"
      >
        <ol className="flex items-center gap-1.5">
          {ruta.map((p, i) => (
            <li key={p.id} className="flex items-center gap-1.5">
              {i > 0 && (
                <span
                  aria-hidden
                  className={`h-0.5 w-4 rounded-full transition-colors duration-300 ${i <= activo ? "bg-[var(--moneda-oscura)]" : "bg-[var(--linea)]"}`}
                />
              )}
              <button
                type="button"
                onClick={() => irA(p.id)}
                aria-label={p.etiqueta}
                aria-current={i === activo ? "step" : undefined}
                className="group relative grid size-7 place-items-center"
              >
                <span
                  className={`block rounded-full transition-[width,height,background-color] duration-300 ${
                    i === activo
                      ? "size-4 bg-[var(--moneda)] ring-2 ring-[var(--tinta)]"
                      : i < activo
                        ? "size-2.5 bg-[var(--moneda-oscura)]"
                        : "size-2.5 bg-[var(--linea)]"
                  }`}
                />
                <span className="pointer-events-none absolute bottom-full mb-2 whitespace-nowrap rounded-lg bg-[var(--tinta)] px-2 py-1 font-mono text-[11px] text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {p.etiqueta}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <p className="mt-1 text-center font-mono text-[11px] tabular-nums text-[var(--tenue)]">
          {String(activo + 1).padStart(2, "0")} / {String(ruta.length).padStart(2, "0")} · {ruta[activo]?.etiqueta}
        </p>
      </nav>
    </>
  );
}
