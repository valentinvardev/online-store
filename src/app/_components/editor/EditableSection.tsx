"use client";

import { useEffect, type CSSProperties, type ReactNode } from "react";
import { useThemeEditor } from "./ThemeEditorContext";

/**
 * Envuelve una sección para que el Editor visual pueda ponerle una imagen de
 * fondo y ajustarla. Mantené la className/estructura original — solo cambian
 * la etiqueta y se agregan `id`/`label`.
 *
 * La capa de fondo se pinta en `-z-10` (encima del color de fondo de la sección,
 * debajo del contenido) gracias a `isolate`, así no tapa el contenido.
 */
export default function EditableSection({
  id,
  label,
  className = "",
  style,
  children,
}: {
  id: string;
  label: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const {
    registerSection, unregisterSection,
    sectionBgs, fondosMode, selectedSection, selectSection, open,
  } = useThemeEditor();

  useEffect(() => {
    registerSection(id, label);
    return () => unregisterSection(id);
  }, [id, label, registerSection, unregisterSection]);

  const cfg = sectionBgs[id];
  const hasImg = !!cfg?.imageUrl;
  const selected = selectedSection === id;

  const size = cfg?.size ?? "cover";
  const posX = cfg?.posX ?? 50;
  const posY = cfg?.posY ?? 50;
  const brightness = cfg?.brightness ?? 100;
  const contrast = cfg?.contrast ?? 100;
  const saturate = cfg?.saturate ?? 100;
  const blur = cfg?.blur ?? 0;
  const overlay = cfg?.overlay ?? "#1e0a3c";
  const overlayOpacity = cfg?.overlayOpacity ?? 0;

  return (
    <section className={`relative isolate ${className}`} style={style} data-editable-section={id}>
      {/* Capa de fondo */}
      {hasImg && (
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: `url("${cfg.imageUrl}")`,
              backgroundSize: size,
              backgroundPosition: `${posX}% ${posY}%`,
              filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) blur(${blur}px)`,
              transform: blur > 0 ? "scale(1.08)" : undefined,
            }}
          />
          {overlayOpacity > 0 && (
            <div className="absolute inset-0" style={{ backgroundColor: overlay, opacity: overlayOpacity / 100 }} />
          )}
        </div>
      )}

      {children}

      {/* Selección en modo "Fondos" */}
      {fondosMode && (
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); selectSection(id); }}
          className={`absolute inset-0 z-[80] flex items-start justify-start p-3 transition-colors outline -outline-offset-2 ${
            selected
              ? "bg-morado/15 outline-2 outline-morado"
              : "bg-morado/0 hover:bg-morado/10 outline-2 outline-dashed outline-morado/50"
          }`}
          aria-label={`Editar fondo de ${label}`}
        >
          <span className="font-sans font-bold text-[0.6rem] tracking-widest uppercase bg-morado-dark text-crema px-2 py-1 pointer-events-none shadow-lg">
            {label}
          </span>
        </button>
      )}

      {/* Resalte de la sección seleccionada mientras el editor está abierto */}
      {open && selected && !fondosMode && (
        <div aria-hidden className="absolute inset-0 z-[80] pointer-events-none outline outline-2 outline-morado/70 -outline-offset-2" />
      )}
    </section>
  );
}
