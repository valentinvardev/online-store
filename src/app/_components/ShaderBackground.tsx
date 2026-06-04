"use client";

import { MeshGradient } from "@paper-design/shaders-react";

/* ── Paletas de marca para los fondos psicodélicos ── */
const palettes = {
  // Místico — morado, rosa, dorado (heros oscuros)
  mistico: ["#1e0a3c", "#7B5EA7", "#D45FA0", "#F5C842"],
  // Atardecer — naranja, rosa, dorado, morado (cálido)
  atardecer: ["#7B5EA7", "#E8845A", "#F5C842", "#D45FA0"],
  // Selva — verde, celeste, dorado (natural, fresco)
  selva: ["#1a3a2e", "#3D7A47", "#6BAE75", "#7EC8E3"],
  // Aurora — morado, celeste, rosa (etéreo)
  aurora: ["#1e0a3c", "#7B5EA7", "#7EC8E3", "#F07DC0"],
  // Crema — tonos suaves sobre fondo claro (sutil, para secciones claras)
  crema: ["#FBF5E6", "#FFE066", "#F07DC0", "#B0E0F5"],
} as const;

export type ShaderPalette = keyof typeof palettes;

interface Props {
  palette?: ShaderPalette;
  speed?: number;
  distortion?: number;
  swirl?: number;
  /** Grano superpuesto: textura de papel/film (0 a 1) */
  grain?: number;
  className?: string;
  /** Opacidad del shader (para suavizarlo bajo el contenido) */
  opacity?: number;
}

/**
 * Fondo animado con mesh gradient psicodélico usando los colores de la marca.
 * Pensado para ir detrás del contenido con `position: absolute inset-0`.
 */
export default function ShaderBackground({
  palette = "mistico",
  speed = 0.3,
  distortion = 0.8,
  swirl = 0.6,
  grain = 0.25,
  className = "",
  opacity = 1,
}: Props) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <MeshGradient
        colors={[...palettes[palette]]}
        speed={speed}
        distortion={distortion}
        swirl={swirl}
        grainOverlay={grain}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
