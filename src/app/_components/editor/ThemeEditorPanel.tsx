"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSession } from "next-auth/react";
import {
  Palette, X, RotateCcw, Copy, Check, Image as ImageIcon, MousePointerClick,
  Upload, Loader2, Trash2, Circle, CircleDot,
} from "lucide-react";
import { useThemeEditor, type SectionBg } from "./ThemeEditorContext";
import { COLOR_GROUPS, FONT_ROLES, FONT_OPTIONS, type ColorToken } from "./theme-tokens";

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

// ── Fila de color ──────────────────────────────────────────────────────────
function ColorRow({ token }: { token: ColorToken }) {
  const { getColor, setColor, resetColor, overrides } = useThemeEditor();
  const value = getColor(token.var, token.def);
  const overridden = token.var in overrides;
  const [text, setText] = useState(value);

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
      <span className="flex-1 font-sans text-[0.78rem] text-tierra-dark tracking-wide truncate">{token.label}</span>
      <input
        type="text"
        value={text}
        onChange={(e) => { const v = e.target.value; setText(v); if (HEX_RE.test(v)) setColor(token.var, v); }}
        spellCheck={false}
        className="w-[5.4rem] font-mono text-[0.72rem] text-tierra-dark bg-white border border-morado/25 px-2 py-1.5 focus:outline-none focus:border-morado uppercase"
      />
      <button
        type="button"
        onClick={() => resetColor(token.var)}
        disabled={!overridden}
        title="Restablecer"
        className={`shrink-0 w-7 h-7 flex items-center justify-center border transition-colors ${
          overridden ? "border-rosa/40 text-rosa hover:bg-rosa hover:text-crema" : "border-transparent text-tierra/20 cursor-default"
        }`}
      >
        <RotateCcw size={13} strokeWidth={2} />
      </button>
    </div>
  );
}

// ── Slider con etiqueta + reset ────────────────────────────────────────────
function Slider({ label, value, def, min, max, step = 1, unit = "", onChange }: {
  label: string; value: number; def: number; min: number; max: number; step?: number; unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="py-1.5">
      <div className="flex items-center justify-between mb-1">
        <span className="font-sans text-[0.72rem] text-tierra-dark tracking-wide">{label}</span>
        <button
          type="button"
          onClick={() => onChange(def)}
          className={`font-mono text-[0.68rem] tabular-nums px-1.5 py-0.5 transition-colors ${
            value !== def ? "text-morado hover:bg-morado/10" : "text-tierra/40 cursor-default"
          }`}
          title="Restablecer"
        >
          {value}{unit}
        </button>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-morado cursor-pointer"
      />
    </div>
  );
}

// ── Controles de una sección seleccionada ──────────────────────────────────
function SectionControls({ id }: { id: string }) {
  const { sectionBgs, setSectionBg, clearSectionBg, bgLibrary, addToLibrary, removeFromLibrary } = useThemeEditor();
  const cfg: SectionBg = sectionBgs[id] ?? {};
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { url?: string };
      if (data.url) { setSectionBg(id, { imageUrl: data.url }); addToLibrary(data.url); }
    } catch { /* ignore */ } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4 border-t-2 border-morado/15 pt-4 space-y-4">
      {/* Imagen */}
      <div>
        <p className="font-sans font-bold text-[0.68rem] text-morado-dark tracking-[0.2em] uppercase mb-2">Imagen de fondo</p>
        {cfg.imageUrl ? (
          <div className="relative h-24 border-2 border-morado-dark overflow-hidden mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cfg.imageUrl} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => setSectionBg(id, { imageUrl: undefined })}
              className="absolute top-1.5 right-1.5 bg-tierra-dark/80 text-white p-1.5 hover:bg-rosa transition-colors"
              title="Quitar imagen"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ) : (
          <div className="h-24 border-2 border-dashed border-morado/25 flex items-center justify-center mb-2 text-tierra/30">
            <ImageIcon size={20} />
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex-1 flex items-center justify-center gap-1.5 font-sans font-semibold text-[0.66rem] py-2 border-2 border-morado-dark text-tierra-dark hover:bg-dorado/20 transition-colors tracking-widest uppercase"
          >
            {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
            {uploading ? "Subiendo…" : "Subir"}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void upload(f); e.target.value = ""; }} />
        </div>

        {/* Galería de fondos reutilizables */}
        {bgLibrary.length > 0 && (
          <div className="mt-3">
            <p className="font-sans text-[0.64rem] text-tierra/55 tracking-[0.2em] uppercase mb-1.5">Galería de fondos</p>
            <div className="grid grid-cols-4 gap-1.5">
              {bgLibrary.map((url) => {
                const active = cfg.imageUrl === url;
                return (
                  <div key={url} className="relative group aspect-square">
                    <button
                      type="button"
                      onClick={() => setSectionBg(id, { imageUrl: url })}
                      className={`block w-full h-full overflow-hidden border-2 transition-colors ${
                        active ? "border-morado" : "border-morado/15 hover:border-morado/50"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </button>
                    {active && (
                      <span className="absolute top-0.5 left-0.5 bg-morado text-crema p-0.5 pointer-events-none">
                        <Check size={9} strokeWidth={3} />
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeFromLibrary(url)}
                      title="Quitar de la galería"
                      className="absolute top-0.5 right-0.5 bg-tierra-dark/80 text-white p-0.5 opacity-0 group-hover:opacity-100 hover:bg-rosa transition-all"
                    >
                      <X size={9} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {cfg.imageUrl && (
        <>
          {/* Encuadre */}
          <div>
            <p className="font-sans font-bold text-[0.68rem] text-morado-dark tracking-[0.2em] uppercase mb-2">Encuadre</p>
            <div className="flex gap-2 mb-1">
              {(["cover", "contain"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSectionBg(id, { size: s })}
                  className={`flex-1 font-sans font-semibold text-[0.64rem] py-1.5 border-2 tracking-widest uppercase transition-colors ${
                    (cfg.size ?? "cover") === s ? "bg-morado text-crema border-morado-dark" : "border-morado/25 text-tierra/60 hover:border-morado/50"
                  }`}
                >
                  {s === "cover" ? "Llenar" : "Contener"}
                </button>
              ))}
            </div>
            <Slider label="Posición horizontal" value={cfg.posX ?? 50} def={50} min={0} max={100} unit="%" onChange={(v) => setSectionBg(id, { posX: v })} />
            <Slider label="Posición vertical" value={cfg.posY ?? 50} def={50} min={0} max={100} unit="%" onChange={(v) => setSectionBg(id, { posY: v })} />
          </div>

          {/* Overlay */}
          <div>
            <p className="font-sans font-bold text-[0.68rem] text-morado-dark tracking-[0.2em] uppercase mb-2">Velo de color</p>
            <div className="flex items-center gap-2.5 mb-1">
              <label className="relative shrink-0 w-8 h-8 border-2 border-morado-dark overflow-hidden cursor-pointer" style={{ background: cfg.overlay ?? "#1e0a3c" }}>
                <input
                  type="color"
                  value={cfg.overlay ?? "#1e0a3c"}
                  onChange={(e) => setSectionBg(id, { overlay: e.target.value })}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
              <span className="flex-1 font-sans text-[0.72rem] text-tierra/60">Tinte sobre la imagen</span>
            </div>
            <Slider label="Opacidad del velo" value={cfg.overlayOpacity ?? 0} def={0} min={0} max={100} unit="%" onChange={(v) => setSectionBg(id, { overlayOpacity: v })} />
          </div>

          {/* Retoque */}
          <div>
            <p className="font-sans font-bold text-[0.68rem] text-morado-dark tracking-[0.2em] uppercase mb-2">Retoque de la foto</p>
            <Slider label="Brillo" value={cfg.brightness ?? 100} def={100} min={0} max={200} unit="%" onChange={(v) => setSectionBg(id, { brightness: v })} />
            <Slider label="Contraste" value={cfg.contrast ?? 100} def={100} min={0} max={200} unit="%" onChange={(v) => setSectionBg(id, { contrast: v })} />
            <Slider label="Saturación" value={cfg.saturate ?? 100} def={100} min={0} max={200} unit="%" onChange={(v) => setSectionBg(id, { saturate: v })} />
            <Slider label="Desenfoque" value={cfg.blur ?? 0} def={0} min={0} max={20} unit="px" onChange={(v) => setSectionBg(id, { blur: v })} />
          </div>

          <button
            type="button"
            onClick={() => clearSectionBg(id)}
            className="w-full flex items-center justify-center gap-1.5 font-sans font-semibold text-[0.66rem] py-2 border-2 border-rosa/40 text-rosa hover:bg-rosa hover:text-crema transition-colors tracking-widest uppercase"
          >
            <RotateCcw size={13} /> Restablecer fondo
          </button>
        </>
      )}
    </div>
  );
}

// ── Pestaña de fondos ──────────────────────────────────────────────────────
function FondosTab() {
  const { sections, sectionBgs, fondosMode, setFondosMode, selectedSection, selectSection } = useThemeEditor();

  return (
    <div>
      <button
        type="button"
        onClick={() => setFondosMode(!fondosMode)}
        className={`w-full flex items-center justify-center gap-2 font-sans font-bold text-[0.7rem] py-2.5 border-2 border-morado-dark tracking-widest uppercase transition-colors block-shadow-sm mb-4 ${
          fondosMode ? "bg-morado text-crema" : "bg-dorado text-tierra-dark hover:bg-dorado-light"
        }`}
      >
        <MousePointerClick size={14} />
        {fondosMode ? "Tocá una sección…" : "Elegir sección en la página"}
      </button>

      {sections.length === 0 ? (
        <p className="font-sans text-[0.72rem] text-tierra/55 italic text-center py-6">
          No hay secciones editables en esta página.
        </p>
      ) : (
        <div className="space-y-1">
          {sections.map((s) => {
            const active = selectedSection === s.id;
            const hasBg = !!sectionBgs[s.id]?.imageUrl;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => selectSection(active ? null : s.id)}
                className={`w-full flex items-center gap-2 px-2.5 py-2 border-2 text-left transition-colors ${
                  active ? "border-morado-dark bg-morado/10" : "border-morado/15 hover:border-morado/40"
                }`}
              >
                {hasBg
                  ? <CircleDot size={13} className="text-morado shrink-0" />
                  : <Circle size={13} className="text-tierra/25 shrink-0" />}
                <span className="flex-1 font-sans text-[0.74rem] text-tierra-dark tracking-wide truncate">{s.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {selectedSection && <SectionControls id={selectedSection} />}
    </div>
  );
}

// ── Pestaña de tipografías ─────────────────────────────────────────────────
function FuentesTab() {
  const { getColor, setColor, resetColor, overrides } = useThemeEditor();
  return (
    <div className="space-y-6">
      {FONT_ROLES.map((role) => {
        const current = getColor(role.var, role.def);
        const overridden = role.var in overrides;
        return (
          <div key={role.var}>
            <div className="flex items-baseline justify-between mb-2 border-b-2 border-morado/15 pb-1.5">
              <h3 className="font-sans font-bold text-[0.72rem] text-morado-dark tracking-[0.2em] uppercase">{role.label}</h3>
              <div className="flex items-center gap-2">
                <span className="font-sans italic text-[0.66rem] text-tierra/50">{role.hint}</span>
                {overridden && (
                  <button type="button" onClick={() => resetColor(role.var)} title="Restablecer" className="text-rosa hover:text-rosa-light transition-colors">
                    <RotateCcw size={12} strokeWidth={2} />
                  </button>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              {FONT_OPTIONS.map((opt) => {
                const active = current === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setColor(role.var, opt.value)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 border-2 text-left transition-colors ${
                      active ? "border-morado-dark bg-morado/10" : "border-morado/15 hover:border-morado/40"
                    }`}
                  >
                    <span className="text-xl text-tierra-dark leading-none truncate" style={{ fontFamily: opt.value }}>
                      La Reina
                    </span>
                    <span className={`font-sans text-[0.62rem] tracking-widest uppercase shrink-0 ${active ? "text-morado font-bold" : "text-tierra/40"}`}>
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Panel ──────────────────────────────────────────────────────────────────
export default function ThemeEditorPanel() {
  const { data: session } = useSession();
  const { open, setOpen, resetAll, isDirty, overrides, sectionBgs, setFondosMode } = useThemeEditor();
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<"colores" | "fuentes" | "fondos">("colores");
  const [copied, setCopied] = useState(false);

  useEffect(() => setMounted(true), []);
  // Al cerrar el panel, salir del modo selección
  useEffect(() => { if (!open) setFondosMode(false); }, [open, setFondosMode]);

  if (!mounted || !session?.user?.isAdmin) return null;

  const copyColors = async () => {
    const lines = Object.entries(overrides).map(([k, v]) => `  ${k}: ${v};`);
    await navigator.clipboard.writeText(`:root {\n${lines.join("\n")}\n}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  const copyFondos = async () => {
    await navigator.clipboard.writeText(JSON.stringify(sectionBgs, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const hasFondos = Object.keys(sectionBgs).length > 0;

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

      {/* Tabs */}
      <div className="flex shrink-0 border-b-2 border-morado-dark">
        {([["colores", "Colores"], ["fuentes", "Fuentes"], ["fondos", "Fondos"]] as const).map(([key, lbl]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`flex-1 font-sans font-bold text-[0.72rem] py-3 tracking-[0.2em] uppercase transition-colors ${
              tab === key ? "bg-dorado text-tierra-dark" : "bg-crema-dark/40 text-tierra/55 hover:text-tierra"
            }`}
          >
            {lbl}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto scroll-brand px-5 py-4">
        {tab === "colores" ? (
          <>
            <p className="font-sans text-[0.7rem] text-tierra/65 leading-relaxed tracking-wide mb-4">
              Editá los colores de la marca y mirá los cambios en vivo. Se guardan en este navegador
              como vista previa — usá <span className="font-semibold text-morado">Copiar CSS</span> para hacerlos definitivos.
            </p>
            {COLOR_GROUPS.map((group) => (
              <div key={group.id} className="mb-6 last:mb-2">
                <div className="flex items-baseline justify-between mb-1.5 border-b-2 border-morado/15 pb-1.5">
                  <h3 className="font-sans font-bold text-[0.72rem] text-morado-dark tracking-[0.2em] uppercase">{group.title}</h3>
                  {group.hint && <span className="font-sans italic text-[0.66rem] text-tierra/50">{group.hint}</span>}
                </div>
                {group.tokens.map((token) => <ColorRow key={token.var} token={token} />)}
              </div>
            ))}
          </>
        ) : null}
        {tab === "fuentes" && (
          <>
            <p className="font-sans text-[0.7rem] text-tierra/65 leading-relaxed tracking-wide mb-4">
              Elegí la fuente de cada rol y mirá el cambio en vivo en toda la web. Se guarda como
              vista previa en este navegador.
            </p>
            <FuentesTab />
          </>
        )}
        {tab === "fondos" && (
          <>
            <p className="font-sans text-[0.7rem] text-tierra/65 leading-relaxed tracking-wide mb-4">
              Poné una imagen de fondo a cualquier sección y ajustala. Elegí la sección desde la página
              o de la lista. Se guarda como vista previa en este navegador.
            </p>
            <FondosTab />
          </>
        )}
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t-2 border-morado-dark bg-crema-dark/60 px-5 py-3.5 flex items-center gap-2.5">
        {tab !== "fondos" ? (
          <>
            <button
              type="button"
              onClick={resetAll}
              disabled={!isDirty}
              className={`flex items-center gap-1.5 font-sans font-semibold text-[0.68rem] px-3 py-2.5 border-2 tracking-widest uppercase transition-colors ${
                isDirty ? "border-morado-dark text-tierra-dark hover:bg-rosa hover:text-crema hover:border-rosa" : "border-tierra/20 text-tierra/30 cursor-default"
              }`}
            >
              <RotateCcw size={13} strokeWidth={2} /> Restablecer
            </button>
            <button
              type="button"
              onClick={copyColors}
              disabled={!isDirty}
              className={`flex-1 flex items-center justify-center gap-1.5 font-sans font-bold text-[0.68rem] px-3 py-2.5 border-2 tracking-widest uppercase transition-colors block-shadow-sm ${
                isDirty ? "bg-dorado text-tierra-dark border-morado-dark hover:bg-dorado-light" : "bg-tierra/10 text-tierra/30 cursor-default border-tierra/20"
              }`}
            >
              {copied ? <><Check size={13} strokeWidth={2.5} /> ¡Copiado!</> : <><Copy size={13} strokeWidth={2} /> Copiar CSS</>}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={copyFondos}
            disabled={!hasFondos}
            className={`flex-1 flex items-center justify-center gap-1.5 font-sans font-bold text-[0.68rem] px-3 py-2.5 border-2 tracking-widest uppercase transition-colors block-shadow-sm ${
              hasFondos ? "bg-dorado text-tierra-dark border-morado-dark hover:bg-dorado-light" : "bg-tierra/10 text-tierra/30 cursor-default border-tierra/20"
            }`}
          >
            {copied ? <><Check size={13} strokeWidth={2.5} /> ¡Copiado!</> : <><Copy size={13} strokeWidth={2} /> Copiar config</>}
          </button>
        )}
      </div>
    </div>,
    document.body,
  );
}
