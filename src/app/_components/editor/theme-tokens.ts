// ── Tokens de color de la marca, agrupados para el editor visual ──
// Los `var` coinciden con las variables CSS definidas en globals.css (@theme).
// `def` es el valor por defecto (para mostrar en el picker y para "restablecer").

export type ColorToken = {
  var: string;   // nombre de la variable CSS, ej. "--color-morado"
  label: string; // etiqueta legible
  def: string;   // hex por defecto
};

export type ColorGroup = {
  id: string;
  title: string;
  hint?: string;
  tokens: ColorToken[];
};

export const COLOR_GROUPS: ColorGroup[] = [
  {
    id: "morado",
    title: "Morado",
    hint: "Color primario de la marca",
    tokens: [
      { var: "--color-morado",       label: "Morado",        def: "#6d28d9" },
      { var: "--color-morado-light", label: "Morado claro",  def: "#8b5cf6" },
      { var: "--color-morado-mid",   label: "Morado medio",  def: "#4c1d95" },
      { var: "--color-morado-dark",  label: "Morado oscuro", def: "#1e0a3c" },
      { var: "--color-morado-pale",  label: "Morado pálido", def: "#ede9fe" },
    ],
  },
  {
    id: "dorado",
    title: "Dorado",
    hint: "Acento cálido",
    tokens: [
      { var: "--color-dorado",       label: "Dorado",        def: "#f5c842" },
      { var: "--color-dorado-light", label: "Dorado claro",  def: "#ffe066" },
      { var: "--color-dorado-pale",  label: "Dorado pálido", def: "#fdf3c5" },
    ],
  },
  {
    id: "secundarios",
    title: "Secundarios",
    tokens: [
      { var: "--color-rosa",         label: "Rosa",          def: "#f72585" },
      { var: "--color-rosa-light",   label: "Rosa claro",    def: "#ff4ecd" },
      { var: "--color-rosa-pale",    label: "Rosa pálido",   def: "#fde8f5" },
      { var: "--color-celeste",      label: "Celeste",       def: "#7ec8e3" },
      { var: "--color-celeste-pale", label: "Celeste pálido",def: "#e0f4fc" },
      { var: "--color-verde",        label: "Verde",         def: "#3d7a47" },
      { var: "--color-verde-light",  label: "Verde claro",   def: "#6bae75" },
      { var: "--color-verde-pale",   label: "Verde pálido",  def: "#d4ead8" },
    ],
  },
  {
    id: "neutros",
    title: "Neutros cálidos",
    hint: "Fondos y textos",
    tokens: [
      { var: "--color-crema",        label: "Crema",         def: "#fbf5e6" },
      { var: "--color-crema-dark",   label: "Crema oscuro",  def: "#f0e8d0" },
      { var: "--color-tierra",       label: "Tierra",        def: "#6b4226" },
      { var: "--color-tierra-dark",  label: "Tierra oscuro", def: "#3c1f0d" },
      { var: "--color-tierra-light", label: "Tierra claro",  def: "#c49a6c" },
    ],
  },
];

export const ALL_TOKENS: ColorToken[] = COLOR_GROUPS.flatMap((g) => g.tokens);

// ── Tipografías ──
// Roles de la marca (variables CSS que consumen las utilidades font-*).
export type FontRole = { var: string; label: string; hint: string; def: string };

export const FONT_ROLES: FontRole[] = [
  { var: "--font-display", label: "Títulos", hint: "Hero y encabezados", def: "var(--font-lostar), serif" },
  { var: "--font-serif",   label: "Acento",  hint: "Subtítulos y detalles", def: "var(--font-jost), ui-sans-serif, system-ui, sans-serif" },
  { var: "--font-sans",    label: "Cuerpo",  hint: "Texto y UI", def: "var(--font-jost), ui-sans-serif, system-ui, sans-serif" },
];

// Fuentes disponibles (ya cargadas vía next/font en el layout).
export type FontOption = { label: string; value: string };

export const FONT_OPTIONS: FontOption[] = [
  { label: "Lostar",        value: "var(--font-lostar), serif" },
  { label: "RetroMother",   value: "var(--font-tropi), serif" },
  { label: "Chevrola",      value: "var(--font-chevrola), serif" },
  { label: "Pretorian",     value: "var(--font-pretorian), serif" },
  { label: "Tropi Land",    value: "var(--font-tropiland), serif" },
  { label: "The Groovy",    value: "var(--font-thegroovy), serif" },
  { label: "Funky Groovy",  value: "var(--font-funky), serif" },
  { label: "Groovy Beach",  value: "var(--font-groovybeach), serif" },
  { label: "Groovy Beach X",value: "var(--font-groovybeachx), serif" },
  { label: "Groovy Clouds", value: "var(--font-groovyclouds), serif" },
  { label: "Groovy Day",    value: "var(--font-groovyday), serif" },
  { label: "Kong Groovy",   value: "var(--font-kong), serif" },
  { label: "Masa Groovy",   value: "var(--font-masa), serif" },
  { label: "Retro Groovy",  value: "var(--font-retrogroovy), serif" },
  { label: "Super Groovy",  value: "var(--font-super), serif" },
  { label: "Jost",          value: "var(--font-jost), sans-serif" },
  { label: "Sistema",       value: "ui-sans-serif, system-ui, sans-serif" },
];

export const STORAGE_KEY = "rdb_theme_overrides";
