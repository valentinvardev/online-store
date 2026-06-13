"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

function fmt(s: number) {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export default function AudioPlayer({ src, title }: { src: string; title?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCurrent(a.currentTime);
    const onMeta = () => { setDuration(a.duration); setReady(true); };
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { void a.play(); setPlaying(true); }
  };

  const restart = () => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    setCurrent(0);
    if (!playing) { void a.play(); setPlaying(true); }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    a.currentTime = frac * duration;
    setCurrent(a.currentTime);
  };

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <div className="relative bg-morado-dark border-2 border-morado-dark block-shadow overflow-hidden">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Sol decorativo que gira al reproducir */}
      <div
        className="absolute -right-6 -top-6 w-28 h-28 rounded-full opacity-[0.13] pointer-events-none"
        style={{
          background: "conic-gradient(from 0deg, #F5C842, #E8845A, #D45FA0, #7B5EA7, #F5C842)",
          animation: playing ? "spin 7s linear infinite" : "none",
        }}
      />

      <div className="relative flex items-center gap-4 p-4 sm:p-5">
        {/* Disco / botón play */}
        <button
          onClick={toggle}
          aria-label={playing ? "Pausar" : "Reproducir"}
          className="relative w-16 h-16 shrink-0 rounded-full border-2 border-crema/25 bg-[radial-gradient(circle_at_center,#1a0d12_0%,#0a0205_72%,#000_100%)] flex items-center justify-center group hover:border-dorado/60 transition-colors block-shadow-sm"
        >
          {/* Grooves del disco */}
          <span
            className="absolute inset-[10%] rounded-full border border-crema/[0.08]"
            style={{ animation: playing ? "spin 3.2s linear infinite" : "none" }}
          />
          <span
            className="absolute inset-[24%] rounded-full border border-crema/[0.06]"
            style={{ animation: playing ? "spin 3.2s linear infinite" : "none" }}
          />
          {/* Centro con color de marca */}
          <span className="absolute inset-[38%] rounded-full bg-[conic-gradient(from_0deg,#D45FA0,#F5C842,#7B5EA7,#E8845A,#D45FA0)]" />
          {/* Icono */}
          <span className="relative z-10 text-dorado">
            {playing ? <Pause size={20} className="fill-dorado" /> : <Play size={20} className="fill-dorado translate-x-[1px]" />}
          </span>
        </button>

        {/* Info + barra */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="font-sans text-[0.6rem] text-dorado tracking-[0.35em] uppercase truncate">
              {title ?? "Audio del Círculo"}
            </span>
            <button
              onClick={restart}
              aria-label="Volver al inicio"
              className="text-crema/40 hover:text-dorado transition-colors shrink-0"
              title="Desde el principio"
            >
              <RotateCcw size={13} />
            </button>
          </div>

          {/* Barra de progreso (clic para saltar) */}
          <div
            onClick={seek}
            className="group relative h-2.5 bg-crema/15 cursor-pointer border border-crema/10"
            role="slider"
            aria-valuemin={0}
            aria-valuemax={Math.floor(duration)}
            aria-valuenow={Math.floor(current)}
            tabIndex={0}
          >
            <div
              className="absolute inset-y-0 left-0 bg-dorado"
              style={{ width: `${pct}%` }}
            />
            {/* Cabezal */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-crema border-2 border-morado-dark opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${pct}%` }}
            />
          </div>

          {/* Tiempos */}
          <div className="flex items-center justify-between mt-1.5">
            <span className="font-sans text-[0.7rem] text-crema/70 tabular-nums tracking-wide">
              {fmt(current)}
            </span>
            <span className="font-sans text-[0.7rem] text-crema/40 tabular-nums tracking-wide">
              {ready ? fmt(duration) : "–:––"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
