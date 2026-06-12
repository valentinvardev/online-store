"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* Fotos reales de tarot al aire libre (public/landscape/).
 * Son verticales — el slider usa backdrop borroso + imagen contenida
 * para mostrarlas completas sin recorte. */
const slides = [
  { src: "/landscape/landscape-01.jpg", alt: "Caballero de Copas sobre un campo de lavanda al atardecer" },
  { src: "/landscape/landscape-02.jpg", alt: "Tres cartas estrelladas frente a una pileta al amanecer" },
  { src: "/landscape/landscape-03.jpg", alt: "Tres cartas con rosas rojas bajo un cielo azul" },
  { src: "/landscape/landscape-04.jpg", alt: "Tres cartas doradas con brújulas a contraluz dorada" },
  { src: "/landscape/landscape-05.jpg", alt: "Tres cartas florales verdes entre lavandas al atardecer" },
  { src: "/landscape/landscape-06.jpg", alt: "La carta del Sol sobre una terraza al atardecer" },
  { src: "/landscape/landscape-07.jpg", alt: "Un mazo de tarot desplegado sobre una roca en el bosque" },
  { src: "/landscape/landscape-08.jpg", alt: "La carta de La Estrella apoyada sobre una piedra" },
  { src: "/landscape/landscape-09.jpg", alt: "Seis de Bastos sobre un fondo verde desenfocado" },
];

const AUTOPLAY_MS = 5000;

export default function LandscapeSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = (i: number) => setCurrent((i + slides.length) % slides.length);

  useEffect(() => {
    if (paused || lightboxOpen) return;
    timerRef.current = setTimeout(() => goTo(current + 1), AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, paused, lightboxOpen]);

  // ESC cierra lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const currentSlide = slides[current]!;

  return (
    <>
      <section
        className="relative w-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9] overflow-hidden bg-morado-dark cursor-zoom-in group select-none"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onClick={() => setLightboxOpen(true)}
        role="button"
        aria-label="Ampliar imagen"
      >
        {slides.map((s, i) => {
          const active = i === current;
          return (
            <div
              key={s.src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                active ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Backdrop borroso (rellena la banda) */}
              <Image
                src={s.src}
                alt=""
                aria-hidden="true"
                fill
                sizes="100vw"
                quality={40}
                className="object-cover scale-110 blur-2xl brightness-75"
                priority={i === 0}
              />
              {/* Imagen contenida (la foto completa, sin recorte) */}
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="100vw"
                quality={75}
                className="object-contain"
                priority={i === 0}
              />
            </div>
          );
        })}

        {/* Hint de zoom (aparece en hover desktop) */}
        <div className="absolute top-4 right-4 z-10 bg-morado-dark/50 backdrop-blur-sm text-crema/90 font-sans text-[0.6rem] tracking-[0.3em] uppercase px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
          Click para ampliar
        </div>

        {/* Dots dentro de la imagen */}
        <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              aria-label={`Ir a imagen ${i + 1}`}
              className={`h-2 transition-all border border-crema/70 ${
                i === current ? "w-10 bg-crema" : "w-2 bg-crema/30 hover:bg-crema/60"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-morado-dark/95 backdrop-blur-sm flex flex-col items-center justify-center gap-5 p-4 sm:p-10 cursor-zoom-out"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            aria-label="Cerrar"
            className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center bg-crema text-tierra-dark border-2 border-morado-dark hover:bg-dorado-light transition-colors font-display text-xl z-10 block-shadow-sm"
          >
            ✕
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentSlide.src}
            alt={currentSlide.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[78vh] w-auto max-w-full object-contain border-4 border-crema block-shadow cursor-default"
          />

          {/* Dots dentro del lightbox */}
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); goTo(i); }}
                aria-label={`Ir a imagen ${i + 1}`}
                className={`h-2 transition-all border border-crema/70 ${
                  i === current ? "w-10 bg-crema" : "w-2 bg-crema/30 hover:bg-crema/60"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
