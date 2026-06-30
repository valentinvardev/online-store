"use client";

import {
  createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode,
} from "react";
import { STORAGE_KEY } from "./theme-tokens";
import ThemeEditorPanel from "./ThemeEditorPanel";

type Overrides = Record<string, string>; // { "--color-morado": "#abc123" }

export type SectionBg = {
  imageUrl?: string;
  size?: "cover" | "contain";
  posX?: number;        // 0-100
  posY?: number;        // 0-100
  overlay?: string;     // hex
  overlayOpacity?: number; // 0-100
  brightness?: number;  // 0-200 (100 = normal)
  contrast?: number;    // 0-200
  saturate?: number;    // 0-200
  blur?: number;        // 0-20 px
};

export type SectionBgMap = Record<string, SectionBg>;
export type RegisteredSection = { id: string; label: string };

const SECTION_KEY = "rdb_section_bgs";

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;

  // ── Colores ──
  overrides: Overrides;
  getColor: (cssVar: string, fallback: string) => string;
  setColor: (cssVar: string, value: string) => void;
  resetColor: (cssVar: string) => void;
  resetAll: () => void;
  isDirty: boolean;

  // ── Fondos de sección ──
  sections: RegisteredSection[];
  registerSection: (id: string, label: string) => void;
  unregisterSection: (id: string) => void;
  sectionBgs: SectionBgMap;
  setSectionBg: (id: string, patch: Partial<SectionBg>) => void;
  clearSectionBg: (id: string) => void;
  fondosMode: boolean;
  setFondosMode: (v: boolean) => void;
  selectedSection: string | null;
  selectSection: (id: string | null) => void;
};

const ThemeEditorCtx = createContext<Ctx | null>(null);

export function useThemeEditor() {
  const ctx = useContext(ThemeEditorCtx);
  if (!ctx) throw new Error("useThemeEditor debe usarse dentro de ThemeEditorProvider");
  return ctx;
}

// Aplica/limpia una variable en el <html> (sobrescribe el :root del stylesheet)
function applyVar(cssVar: string, value: string | null) {
  const root = document.documentElement;
  if (value) root.style.setProperty(cssVar, value);
  else root.style.removeProperty(cssVar);
}

export default function ThemeEditorProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [overrides, setOverrides] = useState<Overrides>({});
  const [sectionBgs, setSectionBgs] = useState<SectionBgMap>({});
  const [sections, setSections] = useState<RegisteredSection[]>([]);
  const [fondosMode, setFondosMode] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const sectionsRef = useRef<Map<string, string>>(new Map());

  // Cargar overrides y fondos guardados
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Overrides;
        setOverrides(saved);
        Object.entries(saved).forEach(([k, v]) => applyVar(k, v));
      }
    } catch { /* ignore */ }
    try {
      const rawBg = localStorage.getItem(SECTION_KEY);
      if (rawBg) setSectionBgs(JSON.parse(rawBg) as SectionBgMap);
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  // Persistir colores
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (Object.keys(overrides).length === 0) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch { /* ignore */ }
  }, [overrides, hydrated]);

  // Persistir fondos
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (Object.keys(sectionBgs).length === 0) localStorage.removeItem(SECTION_KEY);
      else localStorage.setItem(SECTION_KEY, JSON.stringify(sectionBgs));
    } catch { /* ignore */ }
  }, [sectionBgs, hydrated]);

  // ── Colores ──
  const getColor = useCallback(
    (cssVar: string, fallback: string) => overrides[cssVar] ?? fallback,
    [overrides],
  );
  const setColor = useCallback((cssVar: string, value: string) => {
    applyVar(cssVar, value);
    setOverrides((prev) => ({ ...prev, [cssVar]: value }));
  }, []);
  const resetColor = useCallback((cssVar: string) => {
    applyVar(cssVar, null);
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[cssVar];
      return next;
    });
  }, []);
  const resetAll = useCallback(() => {
    setOverrides((prev) => {
      Object.keys(prev).forEach((k) => applyVar(k, null));
      return {};
    });
  }, []);

  // ── Registro de secciones ──
  const registerSection = useCallback((id: string, label: string) => {
    if (sectionsRef.current.get(id) === label) return;
    sectionsRef.current.set(id, label);
    setSections(Array.from(sectionsRef.current, ([sid, slabel]) => ({ id: sid, label: slabel })));
  }, []);
  const unregisterSection = useCallback((id: string) => {
    if (!sectionsRef.current.has(id)) return;
    sectionsRef.current.delete(id);
    setSections(Array.from(sectionsRef.current, ([sid, slabel]) => ({ id: sid, label: slabel })));
  }, []);

  // ── Fondos ──
  const setSectionBg = useCallback((id: string, patch: Partial<SectionBg>) => {
    setSectionBgs((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }, []);
  const clearSectionBg = useCallback((id: string) => {
    setSectionBgs((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);
  const selectSection = useCallback((id: string | null) => {
    setSelectedSection(id);
    if (id) setFondosMode(false);
  }, []);

  return (
    <ThemeEditorCtx.Provider
      value={{
        open, setOpen,
        overrides, getColor, setColor, resetColor, resetAll,
        isDirty: Object.keys(overrides).length > 0,
        sections, registerSection, unregisterSection,
        sectionBgs, setSectionBg, clearSectionBg,
        fondosMode, setFondosMode, selectedSection, selectSection,
      }}
    >
      {children}
      <ThemeEditorPanel />
    </ThemeEditorCtx.Provider>
  );
}
