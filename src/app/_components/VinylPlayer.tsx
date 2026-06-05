"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/* Reproductor de música ambiente con disco de vinilo en bottom-left.
 * - Arranca muted + spinning (autoplay) — los navegadores bloquean autoplay con sonido
 * - Primer gesto del usuario (pointerdown/scroll) desmutea automaticamente
 * - Click sobre el vinilo togglea mute
 * - Loop infinito, volumen 0.35
 *
 * Pista: ambient electronica via SoundHelix (CDN estable hace años).
 * Para cambiar la cancion: reemplazar TRACK_SRC por otra URL o por '/audio/foo.mp3'. */

const TRACK_SRC = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3";
const TRACK_TITLE = "Música del altar";

export default function VinylPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);
  const [unlocked, setUnlocked] = useState(false);

  // Intento de autoplay muted
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0.35;
    audio.muted = true;
    audio.play().catch(() => {});
  }, []);

  // Primera interacción del usuario → desmutea
  useEffect(() => {
    if (unlocked) return;
    const unlock = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.muted = false;
      audio.play().then(() => {
        setMuted(false);
        setUnlocked(true);
      }).catch(() => {
        audio.muted = true;
        setUnlocked(true);
      });
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("scroll", unlock, { once: true, passive: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("scroll", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [unlocked]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.muted) {
      audio.muted = false;
      audio.play().catch(() => {});
      setMuted(false);
    } else {
      audio.muted = true;
      setMuted(true);
    }
    setUnlocked(true);
  };

  const spinning = !muted;

  return (
    <>
      <audio ref={audioRef} src={TRACK_SRC} preload="auto" />

      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-end gap-3 group/vinyl pointer-events-none">
        {/* Vinilo */}
        <button
          onClick={toggle}
          aria-label={muted ? "Activar música" : "Silenciar música"}
          aria-pressed={!muted}
          className="relative w-16 h-16 sm:w-20 sm:h-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-morado-dark rounded-full pointer-events-auto"
        >
          {/* Disco con grooves — gira cuando suena */}
          <div
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,#1a0d12_0%,#0a0205_70%,#000_100%)] shadow-[0_6px_22px_rgba(0,0,0,0.45),inset_0_0_0_2px_rgba(255,255,255,0.04)] border-2 border-morado-dark overflow-hidden"
            style={{
              animation: spinning ? "spin 3.2s linear infinite" : "none",
            }}
          >
            {/* Grooves concéntricos */}
            <div className="absolute inset-[8%]  rounded-full border border-white/[0.07]" />
            <div className="absolute inset-[16%] rounded-full border border-white/[0.06]" />
            <div className="absolute inset-[24%] rounded-full border border-white/[0.06]" />
            <div className="absolute inset-[32%] rounded-full border border-white/[0.05]" />

            {/* Reflejo diagonal */}
            <div
              className="absolute inset-0 rounded-full opacity-25"
              style={{
                background:
                  "linear-gradient(135deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)",
              }}
            />

            {/* Label central — colores de marca */}
            <div className="absolute inset-[34%] rounded-full bg-[conic-gradient(from_0deg,#D45FA0,#F5C842,#7B5EA7,#E8845A,#D45FA0)] flex items-center justify-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.3)]">
              <div className="w-1.5 h-1.5 rounded-full bg-black ring-2 ring-black/30" />
            </div>
          </div>

          {/* Badge de estado abajo-derecha */}
          <div
            className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-2 border-morado-dark flex items-center justify-center transition-colors ${
              muted ? "bg-crema" : "bg-dorado-light"
            }`}
          >
            {muted ? (
              <VolumeX size={13} className="text-tierra-dark" strokeWidth={2.5} />
            ) : (
              <Volume2 size={13} className="text-tierra-dark" strokeWidth={2.5} />
            )}
          </div>
        </button>

        {/* Etiqueta tipo "now playing" — visible en hover desktop */}
        <div
          className="hidden sm:block bg-crema/95 backdrop-blur-sm border-2 border-morado-dark px-3.5 py-2.5 transition-all duration-300 origin-bottom-left
                     opacity-0 -translate-x-2 scale-95 group-hover/vinyl:opacity-100 group-hover/vinyl:translate-x-0 group-hover/vinyl:scale-100
                     shadow-[3px_3px_0_0_var(--color-morado-dark,#3a1f5e)] pointer-events-none mb-1"
          aria-hidden="true"
        >
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${
                spinning ? "bg-verde animate-pulse" : "bg-tierra-dark/40"
              }`}
            />
            <span className="font-sans text-[0.55rem] font-semibold text-tierra-dark/60 tracking-[0.3em] uppercase">
              {muted ? (unlocked ? "Pausado" : "Toca para activar") : "Sonando"}
            </span>
          </div>
          <div className="font-sans font-semibold text-[13px] text-tierra-dark leading-tight whitespace-nowrap">
            {TRACK_TITLE}
          </div>
        </div>
      </div>
    </>
  );
}
