"use client";

import { useEffect, useRef, useCallback } from "react";

const COLORS = ["#f5c842", "#f72585", "#a882d8", "#7ec8e3", "#f5c842", "#f5c842"];
const CHARS  = ["✦", "✧", "⋆", "✦", "·", "✦"];

let uid = 0;

export default function MagicCursor() {
  const wandRef  = useRef<HTMLDivElement>(null);
  const lastTime = useRef(0);

  const addSparkle = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastTime.current < 55) return;
    lastTime.current = now;

    const el = document.createElement("span");
    const size  = Math.random() * 10 + 8;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#f5c842";
    const char  = CHARS[Math.floor(Math.random() * CHARS.length)]  ?? "✦";

    el.textContent = char;
    el.style.cssText = [
      "position:fixed",
      `left:${x + (Math.random() - 0.5) * 22}px`,
      `top:${y + (Math.random() - 0.5) * 22}px`,
      "pointer-events:none",
      "z-index:9998",
      `font-size:${size}px`,
      `color:${color}`,
      "animation:sparkle-fade 0.75s ease-out forwards",
      "will-change:transform,opacity",
    ].join(";");

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 760);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (wandRef.current) {
        wandRef.current.style.left = `${e.clientX}px`;
        wandRef.current.style.top  = `${e.clientY}px`;
      }
      addSparkle(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [addSparkle]);

  return (
    <>
      {/* Ocultar cursor nativo solo en dispositivos con hover (desktop) */}
      <style>{`@media(hover:hover){*,*::before,*::after{cursor:none!important}}`}</style>

      {/* Varita */}
      <div
        ref={wandRef}
        style={{
          position: "fixed",
          left: -100,
          top: -100,
          pointerEvents: "none",
          zIndex: 9999,
          // Offset: pone la punta de la estrella en la posición exacta del cursor
          transform: "translate(-5px, -5px)",
          willChange: "left, top",
        }}
      >
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cuerpo de la varita — de la punta (7,7) al mango (30,30) */}
          <line x1="10" y1="10" x2="30" y2="30" stroke="#1e0a3c" strokeWidth="4"   strokeLinecap="round" />
          <line x1="10" y1="10" x2="30" y2="30" stroke="#8B5E3C" strokeWidth="2"   strokeLinecap="round" />
          <line x1="10" y1="10" x2="30" y2="30" stroke="#c49a6c" strokeWidth="0.7" strokeLinecap="round" strokeOpacity="0.6" />

          {/* Anillo del mango */}
          <line x1="26" y1="27" x2="27" y2="26" stroke="#f5c842" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" />

          {/* Estrella en la punta — diamante de 4 puntas */}
          <polygon points="7,1 9,7 7,13 5,7"  fill="#f5c842" />
          <polygon points="1,7 7,5 13,7 7,9"  fill="#f5c842" />

          {/* Brillo central */}
          <circle cx="7" cy="7" r="2.5" fill="#ffe066" opacity="0.6" />
        </svg>
      </div>
    </>
  );
}
