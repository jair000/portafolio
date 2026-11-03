"use client";

import { irA } from "@/components/Experiencia";

export default function BotonIr({
  destino,
  className,
  children,
}: {
  destino: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`#${destino}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        irA(destino);
      }}
    >
      {children}
    </a>
  );
}
