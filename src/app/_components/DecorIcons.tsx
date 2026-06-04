/* Decoración de fondo con íconos psicodélicos de la marca.
 * Server Component — solo renderiza <img> absolutos detrás del contenido.
 * Pensado para ir dentro de un contenedor `relative overflow-hidden`. */

type Icon =
  | "corona" | "ojo" | "flor-celeste" | "estrella-naranja" | "planta-verde"
  | "petalos-morado" | "ondas-rosa" | "flor-naranja" | "ola-morada"
  | "ola-verde" | "soles-morado" | "luna-celeste";

interface DecorItem {
  icon: Icon;
  /** posición en % o valores CSS */
  top?: string; left?: string; right?: string; bottom?: string;
  size: number;          // px
  opacity?: number;      // 0-1
  rotate?: number;       // deg
  anim?: "float" | "float-slow" | "spin" | "none";
  delay?: number;        // s
  hideOnMobile?: boolean;
}

const animClass: Record<NonNullable<DecorItem["anim"]>, string> = {
  "float": "decor-float",
  "float-slow": "decor-float-slow",
  "spin": "decor-spin",
  "none": "",
};

/* ── Presets de dispersión por sección ── */
const presets: Record<string, DecorItem[]> = {
  // Sutil — pocos íconos grandes tipo marca de agua + algunos chicos
  suave: [
    { icon: "corona",         top: "8%",   right: "6%",  size: 130, opacity: 0.08, rotate: 12,  anim: "float-slow", delay: 0 },
    { icon: "flor-celeste",   bottom: "10%", left: "4%", size: 90,  opacity: 0.1,  rotate: -10, anim: "float",      delay: 1.2, hideOnMobile: true },
    { icon: "estrella-naranja", top: "55%", right: "10%", size: 64, opacity: 0.12, rotate: 0,   anim: "spin",       delay: 0 },
    { icon: "petalos-morado", top: "20%",  left: "8%",   size: 70,  opacity: 0.09, rotate: 8,   anim: "float-slow", delay: 2, hideOnMobile: true },
  ],
  // Marca de agua grande — un ícono enorme muy tenue de fondo
  watermark: [
    { icon: "ojo",            top: "-6%",  right: "-4%", size: 320, opacity: 0.05, rotate: 0,   anim: "float-slow", delay: 0 },
    { icon: "flor-naranja",   bottom: "-8%", left: "-5%", size: 260, opacity: 0.05, rotate: 0,  anim: "spin",       delay: 0, hideOnMobile: true },
  ],
  // Festivo — varios íconos chicos repartidos (para secciones de contenido)
  festivo: [
    { icon: "estrella-naranja", top: "12%", left: "6%",  size: 54, opacity: 0.16, rotate: 0,   anim: "spin",       delay: 0 },
    { icon: "flor-celeste",   top: "70%",  left: "12%",  size: 60, opacity: 0.14, rotate: -8,  anim: "float",      delay: 0.8, hideOnMobile: true },
    { icon: "petalos-morado", top: "18%",  right: "10%", size: 58, opacity: 0.13, rotate: 10,  anim: "float-slow", delay: 1.4 },
    { icon: "ondas-rosa",     bottom: "14%", right: "7%", size: 64, opacity: 0.14, rotate: 0,  anim: "float",      delay: 0.4, hideOnMobile: true },
    { icon: "planta-verde",   bottom: "8%", left: "44%", size: 50, opacity: 0.12, rotate: -6,  anim: "float-slow", delay: 2 },
  ],
  // Místico — ojo, luna, corona (para heros espirituales)
  mistico: [
    { icon: "luna-celeste",   top: "14%",  left: "7%",   size: 76,  opacity: 0.14, rotate: -12, anim: "float",      delay: 0 },
    { icon: "ojo",            top: "60%",  right: "8%",  size: 70,  opacity: 0.13, rotate: 0,   anim: "float-slow", delay: 1, hideOnMobile: true },
    { icon: "corona",         top: "10%",  right: "12%", size: 84,  opacity: 0.12, rotate: 10,  anim: "float-slow", delay: 0.6 },
    { icon: "soles-morado",   bottom: "12%", left: "40%", size: 66, opacity: 0.1,  rotate: 0,   anim: "spin",       delay: 0, hideOnMobile: true },
  ],
};

interface Props {
  preset?: keyof typeof presets;
  items?: DecorItem[];
  className?: string;
}

export default function DecorIcons({ preset = "suave", items, className = "" }: Props) {
  const list = items ?? presets[preset] ?? presets.suave!;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`} aria-hidden="true">
      {list.map((d, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={`/decor/${d.icon}.svg`}
          alt=""
          className={`absolute ${d.anim && d.anim !== "none" ? animClass[d.anim] : ""} ${d.hideOnMobile ? "hidden sm:block" : ""}`}
          style={{
            top: d.top, left: d.left, right: d.right, bottom: d.bottom,
            width: d.size, height: d.size,
            opacity: d.opacity ?? 0.12,
            ["--rot" as string]: `${d.rotate ?? 0}deg`,
            transform: d.anim && d.anim !== "none" ? undefined : `rotate(${d.rotate ?? 0}deg)`,
            animationDelay: d.delay ? `${d.delay}s` : undefined,
          }}
        />
      ))}
    </div>
  );
}
