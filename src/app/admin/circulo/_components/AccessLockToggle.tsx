"use client";

import { Lock, LockOpen } from "lucide-react";

/* Switch de candado: libre (abierto) ↔ solo socias (cerrado). */
export default function AccessLockToggle({
  locked,
  onChange,
  className = "",
}: {
  locked: boolean;
  onChange: (locked: boolean) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!locked)}
      aria-pressed={locked}
      className={`group inline-flex items-center gap-3 select-none ${className}`}
    >
      {/* Switch */}
      <span
        className={`relative w-14 h-8 border-2 border-morado-dark shrink-0 transition-colors duration-200 ${
          locked ? "bg-morado-dark" : "bg-verde"
        }`}
      >
        <span
          className="absolute top-0.5 left-0.5 w-6 h-6 bg-crema flex items-center justify-center transition-transform duration-200 ease-out shadow-[1px_1px_0_0_rgba(0,0,0,0.25)]"
          style={{ transform: locked ? "translateX(28px)" : "translateX(0)" }}
        >
          {locked ? (
            <Lock size={12} className="text-morado-dark" strokeWidth={2.6} />
          ) : (
            <LockOpen size={12} className="text-verde" strokeWidth={2.6} />
          )}
        </span>
      </span>

      {/* Etiqueta */}
      <span className="text-left leading-tight">
        <span className={`block font-sans font-bold text-[0.72rem] tracking-widest uppercase ${locked ? "text-morado-dark" : "text-verde"}`}>
          {locked ? "Solo socias" : "Para todas"}
        </span>
        <span className="block font-sans text-[0.6rem] text-tierra/50 tracking-wide mt-0.5">
          {locked ? "Requiere membresía activa" : "Visible para cualquiera"}
        </span>
      </span>
    </button>
  );
}
