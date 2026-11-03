import { ArrowDown, ArrowUpRight, Check, Download, BriefcaseBusiness, FolderGit2, Mail, MessageCircle, Trophy } from "lucide-react";
import Experiencia from "@/components/Experiencia";
import BotonIr from "@/components/hud/BotonIr";
import { educacion, habilidades, perfil, proyectos, trabajos } from "@/data/perfil";
import { rutaAsset } from "@/lib/ruta";

const seccion =
  "relative flex min-h-[100svh] items-end px-4 pb-8 pt-[42svh] sm:px-8 md:items-center md:px-14 md:py-28 lg:px-24";

export default function Inicio() {
  return (
    <>
      <Experiencia />

      <header className="fixed inset-x-0 top-0 z-30 px-4 pt-4 sm:px-8 md:px-14 lg:px-24">
        <div className="flex items-center justify-between gap-4 rounded-[22px] bg-white/95 py-2 pl-4 pr-2 shadow-[0_14px_40px_-18px_rgba(20,33,61,0.55)]">
          <BotonIr destino="inicio" className="font-display text-lg font-extrabold tracking-tight">
            JP<span className="text-[var(--moneda-oscura)]">.</span>
          </BotonIr>
          <nav aria-label="Secciones" className="hidden items-center gap-1 text-sm font-semibold lg:flex">
            {[
              ["nivel-1", "Experiencia"],
              ["inventario", "Habilidades"],
              ["proyectos", "Proyectos"],
              ["contacto", "Contacto"],
            ].map(([id, texto]) => (
              <BotonIr key={id} destino={id} className="rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-[#eef3fb]">
                {texto}
              </BotonIr>
            ))}
          </nav>
          <a href={rutaAsset(perfil.cv)} target="_blank" rel="noopener noreferrer" className="boton boton-moneda !min-h-10 !rounded-[14px] !px-4 text-sm">
            <Download size={16} strokeWidth={2.2} aria-hidden />
            CV
          </a>
        </div>
      </header>

      <main>
        <section id="inicio" className={seccion}>
          <div data-revelar className="max-w-2xl max-md:panel max-md:p-6">
            <div data-revelar-hijo className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/90 py-1.5 pl-1.5 pr-4 text-sm font-semibold shadow-[0_8px_20px_-12px_rgba(20,33,61,0.5)]">
              <img src={rutaAsset(perfil.foto)} alt="" width={28} height={28} className="imagen-borde size-7 rounded-full object-cover" />
              {perfil.ubicacion}
            </div>
            <h1 data-revelar-hijo className="font-display text-[clamp(2.6rem,7.5vw,5.6rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
              {perfil.nombre}
            </h1>
            <p data-revelar-hijo className="mt-4 font-display text-[clamp(1.15rem,2.4vw,1.7rem)] font-medium">
              {perfil.titulo}
            </p>
            <ul data-revelar-hijo className="mt-4 flex flex-wrap gap-2" aria-label="Stack principal">
              {perfil.stackPrincipal.map((s) => (
                <li key={s} className="ficha md:!bg-white/90">
                  {s}
                </li>
              ))}
            </ul>
            <p data-revelar-hijo className="mt-6 max-w-[52ch] text-lg leading-relaxed text-[var(--tinta)]/85">
              {perfil.resumen}
            </p>
            <div data-revelar-hijo className="mt-8 flex flex-wrap gap-3">
              <BotonIr destino="nivel-1" className="boton boton-moneda">
                Iniciar recorrido
                <ArrowDown size={18} strokeWidth={2.2} aria-hidden />
              </BotonIr>
              <a href={rutaAsset(perfil.cv)} target="_blank" rel="noopener noreferrer" className="boton boton-claro">
                <Download size={18} strokeWidth={2.2} aria-hidden />
                Descargar CV
              </a>
            </div>
          </div>
        </section>

        {trabajos.map((t, i) => (
          <section key={t.empresa} id={`nivel-${i + 1}`} className={seccion} aria-labelledby={`titulo-nivel-${i + 1}`}>
            <article data-revelar className="panel w-full max-w-xl p-6 sm:p-8">
              <div data-revelar-hijo className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <span className="rounded-lg bg-[var(--tinta)] px-2.5 py-1.5 font-semibold text-white">
                  Nivel {i + 1} de {trabajos.length}
                </span>
                <span className="tabular-nums text-[var(--tenue)]">{t.periodo}</span>
              </div>
              <h2 id={`titulo-nivel-${i + 1}`} data-revelar-hijo className="mt-5 font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold leading-tight tracking-[-0.02em]">
                {t.empresa}
              </h2>
              <p data-revelar-hijo className="mt-1 font-semibold text-[var(--tenue)]">{t.cargo}</p>
              <ul className="mt-5 space-y-3">
                {t.logros.map((l) => (
                  <li key={l} data-revelar-hijo className="flex gap-3 leading-relaxed">
                    <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-md bg-[var(--pasto)] text-white">
                      <Check size={13} strokeWidth={3} aria-hidden />
                    </span>
                    {l}
                  </li>
                ))}
              </ul>
              <ul data-revelar-hijo className="mt-6 flex flex-wrap gap-2" aria-label="Tecnologías usadas">
                {t.stack.map((s) => (
                  <li key={s} className="ficha">
                    {s}
                  </li>
                ))}
              </ul>
              {t.trofeo && (
                <p data-revelar-hijo className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#fff4d1] px-3 py-2 text-sm font-semibold">
                  <Trophy size={16} strokeWidth={2.2} className="text-[var(--moneda-oscura)]" aria-hidden />
                  Logro desbloqueado: {t.trofeo}
                </p>
              )}
            </article>
          </section>
        ))}

        <section id="inventario" className={seccion} aria-labelledby="titulo-inventario">
          <div data-revelar className="panel w-full max-w-2xl p-6 sm:p-8">
            <h2 id="titulo-inventario" data-revelar-hijo className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold tracking-[-0.02em]">
              Inventario
            </h2>
            <p data-revelar-hijo className="mt-2 text-[var(--tenue)]">Las herramientas que llevo a cada nivel.</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {habilidades.map((g) => (
                <div key={g.nombre} data-revelar-hijo>
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--tenue)]">{g.nombre}</h3>
                  <ul className="mt-2.5 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li key={s} className="ficha">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div data-revelar-hijo className="mt-7 border-t border-[var(--linea)] pt-5">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--tenue)]">Entrenamiento</h3>
              <ul className="mt-3 space-y-2">
                {educacion.map((e) => (
                  <li key={e.lugar} className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <span>
                      <strong className="font-semibold">{e.programa}</strong> · {e.lugar}
                    </span>
                    {e.estado && <span className="font-mono text-xs text-[var(--tenue)]">{e.estado}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="proyectos" className={seccion} aria-labelledby="titulo-proyectos">
          <div data-revelar className="w-full max-w-3xl">
            <h2 id="titulo-proyectos" data-revelar-hijo className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.02em] [text-shadow:0_2px_16px_rgba(255,255,255,0.6)]">
              Misiones secundarias
            </h2>
            <ul className="mt-6 grid items-start gap-4 sm:grid-cols-2">
              {proyectos.map((p) => (
                <li key={p.nombre} data-revelar-hijo className="panel flex flex-col overflow-hidden !rounded-[26px]">
                  {p.imagen && (
                    <img
                      src={rutaAsset(p.imagen)}
                      alt={`Captura de ${p.nombre}`}
                      loading="lazy"
                      className="imagen-borde aspect-[16/9] w-full object-cover object-top"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <span className="w-fit rounded-md bg-[#eef3fb] px-2 py-1 font-mono text-[11px] text-[var(--tenue)]">{p.estado}</span>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug">{p.nombre}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--tenue)]">{p.descripcion}</p>
                    <p className="mt-3 font-mono text-xs text-[var(--tinta)]">{p.stack.join(" · ")}</p>
                    {p.enlace && (
                      <a href={p.enlace} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-fit items-center gap-1.5 font-semibold underline decoration-[var(--moneda)] decoration-2">
                        Ver proyecto
                        <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contacto" className={seccion} aria-labelledby="titulo-contacto">
          <div data-revelar className="panel w-full max-w-xl p-6 sm:p-8">
            <div data-revelar-hijo className="flex items-center gap-4">
              <img src={rutaAsset(perfil.foto)} alt={`Foto de ${perfil.nombre}`} width={72} height={72} className="imagen-borde size-[72px] rounded-[20px] object-cover" />
              <div>
                <p className="font-mono text-xs text-[var(--tenue)]">Jugador disponible</p>
                <p className="font-display text-xl font-bold">{perfil.nombre}</p>
              </div>
            </div>
            <h2 id="titulo-contacto" data-revelar-hijo className="mt-6 font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold leading-tight tracking-[-0.02em]">
              El siguiente nivel puede ser tu equipo.
            </h2>
            <p data-revelar-hijo className="mt-3 leading-relaxed text-[var(--tenue)]">
              Busco mi próximo reto como desarrollador frontend o full stack, remoto o presencial en Lima. Escríbeme y conversamos.
            </p>
            <div data-revelar-hijo className="mt-7 flex flex-wrap gap-3">
              <a href={`mailto:${perfil.correo}`} className="boton boton-moneda">
                <Mail size={18} strokeWidth={2.2} aria-hidden />
                Escríbeme
              </a>
              <a href={`https://wa.me/${perfil.whatsapp}`} target="_blank" rel="noopener noreferrer" className="boton boton-claro">
                <MessageCircle size={18} strokeWidth={2.2} aria-hidden />
                WhatsApp
              </a>
            </div>
            <div data-revelar-hijo className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <a href={perfil.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 py-2 hover:underline">
                <BriefcaseBusiness size={16} strokeWidth={2.2} aria-hidden />
                LinkedIn
              </a>
              <a href={perfil.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 py-2 hover:underline">
                <FolderGit2 size={16} strokeWidth={2.2} aria-hidden />
                GitHub
              </a>
              <a href={rutaAsset(perfil.cv)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 py-2 hover:underline">
                <Download size={16} strokeWidth={2.2} aria-hidden />
                CV en PDF
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-4 pb-8 text-center font-mono text-xs text-[var(--tinta)]/70 sm:px-8">
        Construido con Next.js, React Three Fiber, GSAP y Lenis · {new Date().getFullYear()}
      </footer>
    </>
  );
}
