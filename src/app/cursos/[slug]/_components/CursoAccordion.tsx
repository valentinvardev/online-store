"use client";

import { useState } from "react";
import { ChevronDown, Lock, Play } from "lucide-react";
import type { Modulo } from "../../_data/cursos";

export default function CursoAccordion({ modules }: { modules: Modulo[] }) {
  const [open, setOpen] = useState<number | null>(0);

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div>
      {/* Encabezado resumen */}
      <div className="flex items-center justify-between mb-4">
        <p className="font-sans text-[0.6rem] text-tierra/35 tracking-[0.3em] uppercase">
          {modules.length} módulos · {totalLessons} clases
        </p>
        <button
          onClick={() => setOpen(open === null ? 0 : null)}
          className="font-sans text-[0.6rem] text-morado hover:text-morado-dark tracking-widest uppercase transition-colors"
        >
          {open === null ? "Expandir todo" : "Colapsar"}
        </button>
      </div>

      <div className="space-y-2">
        {modules.map((modulo, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={`border-2 transition-all duration-200 ${
                isOpen ? "border-morado-dark" : "border-morado/15 hover:border-morado/35"
              }`}
            >
              {/* Header del módulo */}
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left group"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-display text-3xl leading-none transition-colors ${
                      isOpen ? "text-morado" : "text-morado/20 group-hover:text-morado/40"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p
                      className={`font-sans font-semibold text-sm tracking-wide transition-colors ${
                        isOpen ? "text-tierra-dark" : "text-tierra/65 group-hover:text-tierra-dark"
                      }`}
                    >
                      {modulo.title}
                    </p>
                    <p className="font-sans text-[0.62rem] text-tierra/35 tracking-wide mt-0.5">
                      {modulo.lessons.length} clase{modulo.lessons.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-tierra/30 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-morado" : ""
                  }`}
                />
              </button>

              {/* Lista de clases */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border-t border-morado/10 mx-6" />
                <ul className="py-2">
                  {modulo.lessons.map((lesson, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-3 px-6 py-3 border-b border-morado/5 last:border-0 group/lesson hover:bg-morado/3 transition-colors"
                    >
                      {/* Ícono */}
                      <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                        {j === 0 && i === 0 ? (
                          <Play size={11} className="text-morado fill-morado" />
                        ) : (
                          <Lock size={11} className="text-tierra/20" />
                        )}
                      </div>

                      {/* Número */}
                      <span className="font-sans text-[0.58rem] text-tierra/25 w-5 shrink-0 tabular-nums">
                        {j + 1}
                      </span>

                      {/* Título */}
                      <span className="font-sans text-sm text-tierra/60 tracking-wide group-hover/lesson:text-tierra-dark transition-colors">
                        {lesson}
                      </span>

                      {/* Preview label en la primera clase */}
                      {j === 0 && i === 0 && (
                        <span className="ml-auto font-sans text-[0.55rem] text-verde tracking-widest uppercase border border-verde/25 px-2 py-0.5 shrink-0">
                          Preview
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
