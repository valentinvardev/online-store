"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSession } from "next-auth/react";
import { Palette, X, RotateCcw, Copy, Check } from "lucide-react";
import { useThemeEditor } from "./ThemeEditorContext";
import { COLOR_GROUPS, ALL_TOKENS, type ColorToken } from "./theme-tokens";

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function ColorRow({ token }: { token: ColorToken }) {
  const { getColor, setColor, resetColor, overrides } = useThemeEditor();
  const value = getColor(token.var, token.def);
  const overridden = token.var in overrides;
  const [text, setText] = useState(value);

  // Sincronizar el campo de texto si cambia desde afuera (reset, etc.)
  useEffect(() => setText(value), [value]);

  return (
    <div className="flex items-center gap-2.5 py-1.5">
      <label className="relative shrink-0 w-8 h-8 border-2 border-morado-dark overflow-hidden cursor-pointer block-shadow-sm" style={{ background: value }}>
        <input
          type="color"
          value={HEX_RE.test(value) ? value : token.def}
          onChange={(e) => setColor(token.var, e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer"
          aria-label={token.label}
        />
      </label>

      <span className="flex-1 font-sans text-[0.78rem] text-tierra-dark tracking-wide truncate">
        {token.label}
      </span>

      <input
        type="text"
        value={text}
        onChange={(e) => {
          const v = e.target.value;
          setText(v);
          if (HEX_RE.test(v)) setColor(token.var, v);
        }}
        spellCheck={false}
        className="w-[5.4rem] font-mono text-[0.72rem] text-tierra-dark bg-white border border-morado/25 px-2 py-1.5 focus:outline-none focus:border-morado uppercase"
      />

      <button
        type="button"
        onClick={() => resetColor(token.var)}
        disabled={!overridden}
        title="Restablecer"
        className={`shrink-0 w-7 h-7 flex items-center justify-center border transition-colors ${
          overridden
            ? "border-rosa/40 text-rosa hover:bg-rosa hover:text-crema"
            : "border-transparent text-tierra/20 cursor-default"
        }`}
      >
        <RotateCcw size={13} strokeWidth={2} />
      </button>
    </div>
  );
}

export default function ThemeEditorPanel() {
  const { data: session } = useSession();
  const { open, setOpen, resetAll, isDirty, overrides } = useThemeEditor();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || !session?.user?.isAdmin) return null;

  const copyCss = async () => {
    const lines = ALL_TOKENS
      .filter((t) => t.var in overrides)
      .map((t) => `  ${t.var}: ${overrides[t.var]};`);
    const css = `:root {\n${lines.join("\n")}\n}`;
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return createPortal(
    <div
      className={`fixed top-0 right-0 z-[120] h-full w-full max-w-[360px] flex flex-col bg-crema border-l-2 border-morado-dark shadow-[-8px_0_40px_rgba(30,10,60,0.25)] transition-transform duration-300 ease-out ${
        open ? "translate-x-0" : "translate-x-full pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-5 h-16 bg-morado-dark shrink-0">
        <div className="flex items-center gap-2.5">
          <Palette size={18} className="text-dorado" strokeWidth={2} />
          <span className="font-display text-crema text-xl tracking-wider uppercase">Editor visual</span>
        </div>
        <button
          onClick={() => setOpen(false)}
          aria-label="Cerrar editor"
          className="w-9 h-9 flex items-center justify-center border-2 border-crema/40 text-crema hover:bg-crema hover:text-morado-dark transition-colors"
        >
          <X size={18} strokeWidth={2} />
        </button>
      </div>

      {/* Nota */}
      <p className="px-5 py-3 font-sans text-[0.7rem] text-tierra/65 leading-relaxed tracking-wide border-b border-morado/10 shrink-0">
        Editá los colores de la marca y mirá los cambios en vivo. Se guardan en este navegador como
        vista previa — usá <span className="font-semibold text-morado">Copiar CSS</span> para hacerlos definitivos.
      </p>

      {/* Grupos de color */}
      <div className="flex-1 overflow-y-auto scroll-brand px-5 py-4">
        {COLOR_GROUPS.map((group) => (
          <div key={group.id} className="mb-6 last:mb-2">
            <div className="flex items-baseline justify-between mb-1.5 border-b-2 border-morado/15 pb-1.5">
              <h3 className="font-sans font-bold text-[0.72rem] text-morado-dark tracking-[0.2em] uppercase">
                {group.title}
              </h3>
              {group.hint && (
                <span className="font-sans italic text-[0.66rem] text-tierra/50">{group.hint}</span>
              )}
            </div>
            {group.tokens.map((token) => (
              <ColorRow key={token.var} token={token} />
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t-2 border-morado-dark bg-crema-dark/60 px-5 py-3.5 flex items-center gap-2.5">
        <button
          type="button"
          onClick={resetAll}
          disabled={!isDirty}
          className={`flex items-center gap-1.5 font-sans font-semibold text-[0.68rem] px-3 py-2.5 border-2 tracking-widest uppercase transition-colors ${
            isDirty
              ? "border-morado-dark text-tierra-dark hover:bg-rosa hover:text-crema hover:border-rosa"
              : "border-tierra/20 text-tierra/30 cursor-default"
          }`}
        >
          <RotateCcw size={13} strokeWidth={2} /> Restablecer
        </button>
        <button
          type="button"
          onClick={copyCss}
          disabled={!isDirty}
          className={`flex-1 flex items-center justify-center gap-1.5 font-sans font-bold text-[0.68rem] px-3 py-2.5 border-2 border-morado-dark tracking-widest uppercase transition-colors block-shadow-sm ${
            isDirty
              ? "bg-dorado text-tierra-dark hover:bg-dorado-light"
              : "bg-tierra/10 text-tierra/30 cursor-default border-tierra/20"
          }`}
        >
          {copied ? <><Check size={13} strokeWidth={2.5} /> ¡Copiado!</> : <><Copy size={13} strokeWidth={2} /> Copiar CSS</>}
        </button>
      </div>
    </div>,
    document.body,
  );
}
