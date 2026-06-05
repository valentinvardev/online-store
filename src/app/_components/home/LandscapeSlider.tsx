"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* Imágenes landscape — reemplazar src cuando estén los assets.
 * Por ahora uso gradientes como placeholder para que el slider funcione. */
const slides = [
  { src: "", alt: "Imagen 1", gradient: "from-morado via-rosa to-dorado", caption: "Comunidad que sostiene" },
  { src: "", alt: "Imagen 2", gradient: "from-verde via-celeste to-morado-light", caption: "Rituales que conectan" },
  { src: "", alt: "Imagen 3", gradient: "from-dorado via-naranja to-rosa", caption: "Espiritualidad encarnada" },
  { src: "", alt: "Imagen 4", gradient: "from-rosa via-morado to-morado-dark", caption: "Magia para la vida cotidiana" },
];

const AUTOPLAY_MS = 6000;

export default function LandscapeSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = (i: number) => setCurrent((i + slides.length) % slides.length);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, paused]);

  return (
    <section className="bg-crema py-12 sm:py-16 lg:py-20 px-5 sm:px-6 overflow-hidden">
      <div
        className="max-w-6xl mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative aspect-[16/7] border-4 border-morado-dark block-shadow overflow-hidden bg-morado-mid">
          {/* Slides */}
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
                <div className={`w-full h-full bg-gradient-to-br ${s.gradient} flex items-center justify-center`}>
                  <div className="text-center px-6">
                    <span className="font-display text-white/30 text-[clamp(3rem,8vw,6rem)] block leading-none mb-2 select-none">✦</span>
                    <p className="font-sans text-white/50 text-[0.8rem] tracking-[0.4em] uppercase">Imagen {i + 1}</p>
                  </div>
                </div>
              )}
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-morado-dark/90 via-morado-dark/40 to-transparent p-6 sm:p-8">
                <p className="font-display uppercase text-crema text-2xl sm:text-3xl lg:text-4xl tracking-wide leading-tight">
                  {s.caption}
                </p>
              </div>
            </div>
          ))}

          {/* Flechas */}
          <button
            onClick={prev}
            aria-label="Imagen anterior"
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-crema/90 hover:bg-crema text-tierra-dark border-2 border-morado-dark transition-colors block-shadow-sm"
          >
            <ChevronLeft size={22} strokeWidth={2.2} />
          </button>
          <button
            onClick={next}
            aria-label="Imagen siguiente"
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-crema/90 hover:bg-crema text-tierra-dark border-2 border-morado-dark transition-colors block-shadow-sm"
          >
            <ChevronRight size={22} strokeWidth={2.2} />
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir a imagen ${i + 1}`}
              className={`h-2 transition-all border border-morado-dark ${
                i === current ? "w-10 bg-morado" : "w-2 bg-morado/25 hover:bg-morado/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
