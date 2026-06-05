"use client";

import { useState, useEffect, useRef } from "react";

/* Imágenes landscape — reemplazar src cuando estén los assets.
 * Por ahora uso gradientes como placeholder para que el slider funcione. */
const slides = [
  { src: "", alt: "Imagen 1", gradient: "from-morado via-rosa to-dorado" },
  { src: "", alt: "Imagen 2", gradient: "from-verde via-celeste to-morado-light" },
  { src: "", alt: "Imagen 3", gradient: "from-dorado via-naranja to-rosa" },
  { src: "", alt: "Imagen 4", gradient: "from-rosa via-morado to-morado-dark" },
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
        className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-morado-dark cursor-zoom-in group"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onClick={() => setLightboxOpen(true)}
        role="button"
        aria-label="Ampliar imagen"
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {s.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.src} alt={s.alt} className="w-full h-full object-cover" />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${s.gradient}`} />
            )}
          </div>
        ))}

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
          className="fixed inset-0 z-[100] bg-morado-dark/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10 cursor-zoom-out"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            aria-label="Cerrar"
            className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center bg-crema text-tierra-dark border-2 border-morado-dark hover:bg-dorado-light transition-colors font-display text-xl z-10 block-shadow-sm"
          >
            ✕
          </button>
          <div
            className="relative w-full max-w-6xl aspect-[16/9] border-4 border-crema block-shadow"
            onClick={(e) => e.stopPropagation()}
          >
            {currentSlide.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={currentSlide.src} alt={currentSlide.alt} className="w-full h-full object-contain bg-morado-dark" />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${currentSlide.gradient}`} />
            )}

            {/* Dots dentro del lightbox tambien */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
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
        </div>
      )}
    </>
  );
}
