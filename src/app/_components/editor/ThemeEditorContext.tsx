"use client";

import {
  createContext, useContext, useEffect, useState, useCallback, type ReactNode,
} from "react";
import { STORAGE_KEY } from "./theme-tokens";
import ThemeEditorPanel from "./ThemeEditorPanel";

type Overrides = Record<string, string>; // { "--color-morado": "#abc123" }

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  overrides: Overrides;
  getColor: (cssVar: string, fallback: string) => string;
  setColor: (cssVar: string, value: string) => void;
  resetColor: (cssVar: string) => void;
  resetAll: () => void;
  isDirty: boolean;
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
  const [hydrated, setHydrated] = useState(false);

  // Cargar overrides guardados y aplicarlos
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Overrides;
        setOverrides(saved);
        Object.entries(saved).forEach(([k, v]) => applyVar(k, v));
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persistir
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (Object.keys(overrides).length === 0) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch {
      /* ignore */
    }
  }, [overrides, hydrated]);

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

  return (
    <ThemeEditorCtx.Provider
      value={{
        open, setOpen, overrides,
        getColor, setColor, resetColor, resetAll,
        isDirty: Object.keys(overrides).length > 0,
      }}
    >
      {children}
      <ThemeEditorPanel />
    </ThemeEditorCtx.Provider>
  );
}
