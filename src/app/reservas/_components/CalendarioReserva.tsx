"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DIAS_SEMANA = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
const MESES = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
];

const HORARIOS = [
  "9:00",  "10:00", "11:00",
  "14:00", "15:00", "16:00",
  "17:00", "19:00", "20:00",
];

interface Props {
  fecha: string;       // "YYYY-MM-DD"
  hora: string;        // "HH:MM"
  onFecha: (d: string) => void;
  onHora:  (h: string) => void;
}

export default function CalendarioReserva({ fecha, hora, onFecha, onHora }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [animKey,   setAnimKey]   = useState(0);
  const [popDate,   setPopDate]   = useState<string>("");

  const goMonth = useCallback((delta: 1 | -1) => {
    setDirection(delta === 1 ? "right" : "left");
    setAnimKey((k) => k + 1);
    setViewMonth((m) => {
      const next = m + delta;
      if (next < 0)  { setViewYear((y) => y - 1); return 11; }
      if (next > 11) { setViewYear((y) => y + 1); return 0;  }
      return next;
    });
  }, []);

  // Primer día de la semana del mes (0=Dom → ajustamos a Lu=0)
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const offset   = (firstDay + 6) % 7; // 0=Lu … 6=Do
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const handleDate = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    if (d < today) return;
    const iso = `${viewYear}-${String(viewMonth + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    onFecha(iso);
    setPopDate(iso);
    setTimeout(() => setPopDate(""), 300);
  };

  const fmtSelected = fecha
    ? new Date(fecha + "T12:00:00").toLocaleDateString("es-AR", { weekday:"long", day:"numeric", month:"long" })
    : null;

  return (
    <div className="space-y-6">
      {/* ── Calendario ── */}
      <div className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">

        {/* Header del mes */}
        <div className="flex items-center justify-between px-5 py-4 bg-morado-dark">
          <button
            onClick={() => goMonth(-1)}
            className="w-8 h-8 flex items-center justify-center text-crema/50 hover:text-dorado hover:bg-white/10 transition-all"
            aria-label="Mes anterior"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="font-display text-crema tracking-widest uppercase text-lg">
            {MESES[viewMonth]} {viewYear}
          </span>

          <button
            onClick={() => goMonth(1)}
            className="w-8 h-8 flex items-center justify-center text-crema/50 hover:text-dorado hover:bg-white/10 transition-all"
            aria-label="Mes siguiente"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 border-b border-morado/10">
          {DIAS_SEMANA.map((d) => (
            <div key={d} className="py-2 text-center font-sans text-[0.55rem] text-tierra/35 tracking-widest uppercase">
              {d}
            </div>
          ))}
        </div>

        {/* Grilla de fechas — key fuerza re-mount para animación */}
        <div
          key={animKey}
          className={`grid grid-cols-7 p-3 gap-1 ${direction === "right" ? "cal-enter-right" : "cal-enter-left"}`}
        >
          {/* Celdas vacías iniciales */}
          {Array.from({ length: offset }).map((_, i) => (
            <div key={`e-${i}`} />
          ))}

          {/* Días del mes */}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const d = new Date(viewYear, viewMonth, day);
            const iso = `${viewYear}-${String(viewMonth + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
            const isPast    = d < today;
            const isToday   = d.getTime() === today.getTime();
            const isSelected = fecha === iso;
            const isDomingo = d.getDay() === 0;
            const isPopping = popDate === iso;

            return (
              <button
                key={day}
                onClick={() => handleDate(day)}
                disabled={isPast || isDomingo}
                className={[
                  "aspect-square flex items-center justify-center font-sans text-sm transition-all",
                  isPopping ? "date-pop" : "",
                  isSelected
                    ? "bg-dorado text-tierra-dark border-2 border-morado-dark font-bold"
                    : isToday
                    ? "border-2 border-morado text-morado font-semibold hover:bg-morado/10"
                    : isPast || isDomingo
                    ? "text-tierra/15 cursor-not-allowed"
                    : "text-tierra/70 hover:bg-morado/10 hover:text-morado-dark",
                ].join(" ")}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Leyenda */}
        <div className="flex items-center gap-5 px-5 py-3 border-t border-morado/8 bg-crema-dark">
          <span className="flex items-center gap-1.5 font-sans text-[0.55rem] text-tierra/40 tracking-wide">
            <span className="w-3 h-3 border border-morado inline-block" /> Hoy
          </span>
          <span className="flex items-center gap-1.5 font-sans text-[0.55rem] text-tierra/40 tracking-wide">
            <span className="w-3 h-3 bg-dorado inline-block" /> Seleccionado
          </span>
          <span className="flex items-center gap-1.5 font-sans text-[0.55rem] text-tierra/30 tracking-wide">
            <span className="w-3 h-3 bg-tierra/10 inline-block" /> No disponible
          </span>
        </div>
      </div>

      {/* ── Selector de hora (aparece al elegir fecha) ── */}
      {fecha && (
        <div className="reminder-in">
          <p className="font-sans text-[0.6rem] text-tierra/40 tracking-[0.3em] uppercase mb-3">
            Horario para el {fmtSelected}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {HORARIOS.map((h) => (
              <button
                key={h}
                onClick={() => onHora(h)}
                className={`py-2.5 font-sans text-[0.65rem] border-2 tracking-widest uppercase transition-all ${
                  hora === h
                    ? "bg-morado-dark text-crema border-morado-dark font-semibold"
                    : "border-morado/15 text-tierra/55 hover:border-morado/50 hover:text-tierra-dark"
                }`}
              >
                {h}hs
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
