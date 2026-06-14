"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX } from "lucide-react";

/* Reproductor de música ambiente con disco de vinilo arrastrable.
 * - Arranca muted + spinning (autoplay) — los navegadores bloquean autoplay con sonido
 * - Primer gesto del usuario desmutea automaticamente
 * - Click sobre el vinilo togglea mute; arrastrarlo lo reubica (posición persistida)
 * - No se muestra en el panel de admin
 *
 * Pista: ambient electronica via SoundHelix. Cambiar TRACK_SRC para otra. */

const TRACK_SRC = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3";
const TRACK_TITLE = "Música del altar";
const DRAG_THRESHOLD = 4; // px para considerar arrastre y no click
const POS_KEY = "rdb_vinyl_pos";

export default function VinylPlayer() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [muted, setMuted] = useState(true);
  const [unlocked, setUnlocked] = useState(false);

  // Posición libre (null = posición por defecto bottom-left vía CSS)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startY: 0, origX: 0, origY: 0 });

  // Restaurar posición guardada
  useEffect(() => {
    try {
      const saved = localStorage.getItem(POS_KEY);
      if (saved) setPos(JSON.parse(saved) as { x: number; y: number });
    } catch {}
  }, []);

  // Autoplay muted
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0.35;
    audio.muted = true;
    audio.play().catch(() => {});
  }, []);

  // Primera interacción → desmutea
  useEffect(() => {
    if (unlocked) return;
    const unlock = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.muted = false;
      audio.play().then(() => { setMuted(false); setUnlocked(true); })
        .catch(() => { audio.muted = true; setUnlocked(true); });
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

  // ── Drag ── (move/up definidos adentro: misma instancia para add/remove)
  const onPointerDown = (e: React.PointerEvent) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    drag.current = {
      active: true, moved: false,
      startX: e.clientX, startY: e.clientY,
      origX: rect.left, origY: rect.top,
    };

    const move = (ev: PointerEvent) => {
      const d = drag.current;
      if (!d.active) return;
      const dx = ev.clientX - d.startX;
      const dy = ev.clientY - d.startY;
      if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      d.moved = true;
      const w = el.offsetWidth, h = el.offsetHeight;
      const x = Math.min(Math.max(d.origX + dx, 4), window.innerWidth - w - 4);
      const y = Math.min(Math.max(d.origY + dy, 4), window.innerHeight - h - 4);
      const np = { x, y };
      lastPos.current = np;
      setPos(np);
    };
    const up = () => {
      drag.current.active = false;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      if (drag.current.moved && lastPos.current) {
        try { localStorage.setItem(POS_KEY, JSON.stringify(lastPos.current)); } catch {}
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Si fue arrastre, no togglear
    if (drag.current.moved) { drag.current.moved = false; return; }
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.muted) { audio.muted = false; audio.play().catch(() => {}); setMuted(false); }
    else { audio.muted = true; setMuted(true); }
    setUnlocked(true);
  };

  const spinning = !muted;

  // No mostrar el vinilo en el admin
  if (pathname?.startsWith("/admin")) return null;

  const positioned = pos !== null;

  return (
    <>
      <audio ref={audioRef} src={TRACK_SRC} preload="auto" />

      <div
        className={`fixed z-40 flex items-end gap-3 group/vinyl pointer-events-none ${
          positioned ? "" : "bottom-4 left-4 sm:bottom-6 sm:left-6"
        }`}
        style={positioned ? { left: pos.x, top: pos.y } : undefined}
      >
        {/* Vinilo */}
        <button
          ref={btnRef}
          onPointerDown={onPointerDown}
          onClick={toggle}
          aria-label={muted ? "Activar música" : "Silenciar música"}
          aria-pressed={!muted}
          style={{ touchAction: "none" }}
          className="relative w-16 h-16 sm:w-20 sm:h-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-morado-dark rounded-full pointer-events-auto cursor-grab active:cursor-grabbing"
        >
          {/* Disco con grooves — gira cuando suena */}
          <div
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,#1a0d12_0%,#0a0205_70%,#000_100%)] shadow-[0_6px_22px_rgba(0,0,0,0.45),inset_0_0_0_2px_rgba(255,255,255,0.04)] border-2 border-morado-dark overflow-hidden"
            style={{ animation: spinning ? "spin 3.2s linear infinite" : "none" }}
          >
            {/* Grooves concéntricos */}
            <div className="absolute inset-[8%]  rounded-full border border-white/[0.07]" />
            <div className="absolute inset-[16%] rounded-full border border-white/[0.06]" />
            <div className="absolute inset-[24%] rounded-full border border-white/[0.06]" />
            <div className="absolute inset-[32%] rounded-full border border-white/[0.05]" />

            {/* Reflejo diagonal */}
            <div
              className="absolute inset-0 rounded-full opacity-25"
              style={{ background: "linear-gradient(135deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)" }}
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
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${spinning ? "bg-verde animate-pulse" : "bg-tierra-dark/40"}`} />
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
