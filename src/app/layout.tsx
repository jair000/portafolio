import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { perfil } from "@/data/perfil";
import "./globals.css";

const display = localFont({ src: "../fonts/unbounded-latin-wght-normal.woff2", variable: "--fuente-display", weight: "200 900", display: "swap" });
const texto = localFont({ src: "../fonts/onest-latin-wght-normal.woff2", variable: "--fuente-texto", weight: "100 900", display: "swap" });
const mono = localFont({ src: "../fonts/jetbrains-mono-latin-wght-normal.woff2", variable: "--fuente-mono", weight: "100 800", display: "swap" });

export const metadata: Metadata = {
  title: `${perfil.nombre} · ${perfil.titulo}`,
  description: `${perfil.titulo} en Lima. ${perfil.stackPrincipal.join(", ")}. Portafolio interactivo en 3D.`,
};

export const viewport: Viewport = {
  themeColor: "#8fc6f3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${texto.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
