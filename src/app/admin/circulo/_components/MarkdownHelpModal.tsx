"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Info, X, ArrowDown } from "lucide-react";

const examples = [
  { label: "Negrita", md: "Texto **muy importante** acá." },
  { label: "Itálica", md: "Algo dicho *con suavidad*." },
  { label: "Título", md: "# El ritual del mes" },
  { label: "Subtítulo", md: "## Lo que vas a necesitar" },
  { label: "Lista", md: "- Una vela\n- Un cristal\n- Intención" },
  { label: "Lista numerada", md: "1. Encendé la vela\n2. Respirá hondo\n3. Soltá" },
  { label: "Enlace", md: "Mirá [esta meditación](https://ejemplo.com)." },
  { label: "Cita", md: "> La magia se vive en lo cotidiano." },
];

const mdComponents = {
  h1: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="font-sans font-bold text-lg text-tierra-dark leading-tight" {...p} />,
  h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h4 className="font-sans font-bold text-base text-tierra-dark leading-tight" {...p} />,
  p: (p: React.HTMLAttributes<HTMLParagraphElement>) => <p className="font-sans text-sm text-tierra-dark/85 leading-relaxed" {...p} />,
  ul: (p: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc pl-5 space-y-0.5 font-sans text-sm text-tierra-dark/85 marker:text-morado" {...p} />,
  ol: (p: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal pl-5 space-y-0.5 font-sans text-sm text-tierra-dark/85 marker:text-morado" {...p} />,
  a: (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-morado underline underline-offset-2" {...p} />,
  strong: (p: React.HTMLAttributes<HTMLElement>) => <strong className="font-bold text-tierra-dark" {...p} />,
  em: (p: React.HTMLAttributes<HTMLElement>) => <em className="italic" {...p} />,
  blockquote: (p: React.HTMLAttributes<HTMLQuoteElement>) => <blockquote className="border-l-4 border-dorado pl-3 italic text-tierra-dark/70 font-sans text-sm" {...p} />,
};

const reference = [
  { syntax: "**texto**", desc: "Negrita" },
  { syntax: "*texto*", desc: "Itálica" },
  { syntax: "# Título", desc: "Título grande" },
  { syntax: "## Subtítulo", desc: "Subtítulo" },
  { syntax: "- item", desc: "Lista con puntos" },
  { syntax: "1. item", desc: "Lista numerada" },
  { syntax: "[texto](url)", desc: "Enlace" },
  { syntax: "> texto", desc: "Cita" },
];

export default function MarkdownHelpModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => setMounted(true), []);

  // ESC + scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  // Animación de tipeo: escribe el ejemplo, pausa, pasa al siguiente
  useEffect(() => {
    if (!open) return;
    const example = examples[idx]!;
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (i <= example.md.length) {
        setTyped(example.md.slice(0, i));
        i++;
        t = setTimeout(tick, 50);
      } else {
        t = setTimeout(() => setIdx((p) => (p + 1) % examples.length), 1900);
      }
    };
    setTyped("");
    tick();
    return () => clearTimeout(t);
  }, [open, idx]);

  return (
    <>
      <button
        type="button"
        onClick={() => { setIdx(0); setOpen(true); }}
        className="inline-flex items-center gap-1 text-morado/70 hover:text-morado transition-colors"
        title="Cómo dar formato al texto"
        aria-label="Ayuda de formato"
      >
        <Info size={14} />
      </button>

      {open && mounted && createPortal(
        <div
          className="fixed inset-0 z-[100] bg-morado-dark/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-crema border-2 border-morado-dark block-shadow w-full max-w-lg max-h-[88vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-6 py-4 border-b-2 border-morado/10 sticky top-0 bg-crema">
              <div className="flex items-center gap-2">
                <Info size={16} className="text-morado" />
                <h2 className="font-sans font-bold text-tierra-dark tracking-wide">Cómo dar formato al texto</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="w-8 h-8 flex items-center justify-center border-2 border-morado-dark text-tierra-dark hover:bg-morado-dark hover:text-crema transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Demo animada */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-sans text-[0.6rem] text-morado tracking-[0.3em] uppercase font-bold">
                    {examples[idx]!.label}
                  </span>
                  <span className="font-sans text-[0.6rem] text-tierra/40 tracking-wide">· se escribe solo</span>
                </div>

                {/* Lo que escribís */}
                <div className="bg-morado-dark px-4 py-3 min-h-[3.5rem] flex items-center">
                  <code className="font-mono text-[13px] text-dorado-light whitespace-pre-wrap leading-relaxed">
                    {typed}
                    <span className="inline-block w-[2px] h-[1.05em] bg-dorado/80 align-middle ml-0.5 animate-pulse" />
                  </code>
                </div>

                {/* Flecha */}
                <div className="flex justify-center py-1.5">
                  <ArrowDown size={16} className="text-morado/40" />
                </div>

                {/* El resultado en vivo */}
                <div className="bg-white border-2 border-morado/15 px-4 py-3 min-h-[3.5rem] flex flex-col justify-center">
                  <span className="font-sans text-[0.55rem] text-tierra/35 tracking-[0.3em] uppercase mb-1.5">Así se ve</span>
                  <div className="space-y-1.5">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                      {typed || "​"}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>

              {/* Tabla de referencia */}
              <div>
                <p className="font-sans text-[0.6rem] text-tierra/50 tracking-[0.3em] uppercase font-bold mb-3">
                  Todos los formatos
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {reference.map((r) => (
                    <div key={r.syntax} className="flex items-center gap-2 bg-white border border-morado/12 px-3 py-2">
                      <code className="font-mono text-[12px] text-morado shrink-0">{r.syntax}</code>
                      <span className="font-sans text-[0.7rem] text-tierra/55 ml-auto">{r.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
