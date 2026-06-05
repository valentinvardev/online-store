/* Decoración de fondo con ilustraciones tipo stickers (PNG).
 * Server Component — render absoluto detrás del contenido.
 * Usar dentro de un contenedor `relative overflow-hidden`.
 *
 * tintMode controla cómo se mezclan con el color del fondo de la sección:
 * - "multiply": oscurece el sticker para que tome el tono del fondo
 * - "luminosity": deja la luminancia del sticker pero adopta el color del fondo
 * - "soft-light": fusión suave (default)
 */

type Sticker = {
  id: string;                    // archivo: /stickers/{id}.png
  top?: string; left?: string; right?: string; bottom?: string;
  size: number;                  // px
  opacity?: number;              // 0-1
  rotate?: number;               // deg
  anim?: "float" | "float-slow" | "spin" | "none";
  delay?: number;                // s
  hideOnMobile?: boolean;
};

const animClass: Record<NonNullable<Sticker["anim"]>, string> = {
  "float": "decor-float",
  "float-slow": "decor-float-slow",
  "spin": "decor-spin",
  "none": "",
};

/* ── Presets de dispersión ── */
const presets: Record<string, Sticker[]> = {
  // Pocos stickers grandes tipo marca de agua
  suave: [
    { id: "sticker-03", top: "8%",   right: "5%",   size: 180, opacity: 0.32, rotate: 14,  anim: "float-slow" },
    { id: "sticker-14", bottom: "8%", left: "4%",   size: 200, opacity: 0.34, rotate: -12, anim: "float", delay: 1.2, hideOnMobile: true },
    { id: "sticker-20", top: "55%",  right: "12%",  size: 110, opacity: 0.32, rotate: 8,   anim: "spin", delay: 0.5 },
    { id: "sticker-05", top: "20%",  left: "10%",   size: 100, opacity: 0.28, rotate: -8,  anim: "float-slow", delay: 2, hideOnMobile: true },
  ],
  // Varios stickers chicos esparcidos
  festivo: [
    { id: "sticker-07", top: "10%",  left: "6%",    size: 90,  opacity: 0.38, rotate: 0,   anim: "spin" },
    { id: "sticker-10", top: "65%",  left: "14%",   size: 110, opacity: 0.32, rotate: -8,  anim: "float", delay: 0.8, hideOnMobile: true },
    { id: "sticker-16", top: "18%",  right: "10%",  size: 100, opacity: 0.35, rotate: 12,  anim: "float-slow", delay: 1.4 },
    { id: "sticker-18", bottom: "12%", right: "8%", size: 120, opacity: 0.35, rotate: 0,   anim: "float", delay: 0.4, hideOnMobile: true },
    { id: "sticker-21", bottom: "18%", left: "40%", size: 80,  opacity: 0.32, rotate: -6,  anim: "float-slow", delay: 2 },
    { id: "sticker-02", top: "45%",  left: "50%",   size: 70,  opacity: 0.28, rotate: 10,  anim: "spin", delay: 3, hideOnMobile: true },
  ],
  // Marca de agua enorme tenue
  watermark: [
    { id: "sticker-01", top: "8%",   right: "5%",   size: 380, opacity: 0.2,  rotate: 0,  anim: "float-slow" },
    { id: "sticker-12", bottom: "8%", left: "5%",   size: 320, opacity: 0.18, rotate: 0, anim: "spin", hideOnMobile: true },
  ],
  // Para banner verde — tonalidades que blendean con verde claro
  bosque: [
    { id: "sticker-13", top: "10%",  left: "5%",    size: 160, opacity: 0.48, rotate: -10, anim: "float-slow" },
    { id: "sticker-17", top: "18%",  right: "8%",   size: 140, opacity: 0.42, rotate: 8,   anim: "float", delay: 1 },
    { id: "sticker-04", bottom: "12%", left: "10%", size: 180, opacity: 0.45, rotate: 14,  anim: "float-slow", delay: 2, hideOnMobile: true },
    { id: "sticker-19", bottom: "15%", right: "18%", size: 110, opacity: 0.42, rotate: -8, anim: "spin", delay: 0.5 },
    { id: "sticker-08", top: "50%",  left: "42%",   size: 100, opacity: 0.38, rotate: 0,   anim: "float", delay: 1.5, hideOnMobile: true },
  ],
  // Para fondos amarillos — colores que se entonan con dorado
  solar: [
    { id: "sticker-15", top: "10%",  right: "6%",   size: 160, opacity: 0.38, rotate: 12,  anim: "spin" },
    { id: "sticker-04", bottom: "8%", left: "5%",   size: 180, opacity: 0.32, rotate: -10, anim: "float-slow", delay: 1.5 },
    { id: "sticker-09", top: "55%",  right: "10%",  size: 120, opacity: 0.35, rotate: 0,   anim: "float", delay: 0.5, hideOnMobile: true },
    { id: "sticker-22", top: "20%",  left: "8%",    size: 140, opacity: 0.36, rotate: 8,   anim: "float-slow", delay: 2 },
  ],
  // Para hero/banner morado/rosa — flores místicas
  mistico: [
    { id: "sticker-02", top: "12%",  left: "7%",    size: 160, opacity: 0.35, rotate: -12, anim: "float-slow" },
    { id: "sticker-11", top: "55%",  right: "10%",  size: 130, opacity: 0.32, rotate: 0,   anim: "float", delay: 1, hideOnMobile: true },
    { id: "sticker-06", top: "8%",   right: "8%",   size: 140, opacity: 0.32, rotate: 10,  anim: "float-slow", delay: 0.6 },
    { id: "sticker-19", bottom: "10%", left: "44%", size: 110, opacity: 0.3,  rotate: 0,   anim: "spin", hideOnMobile: true },
  ],
};

interface Props {
  preset?: keyof typeof presets;
  items?: Sticker[];
  /** Modo de mezcla CSS — multiply oscurece, soft-light fusiona, screen aclara (para fondos oscuros), luminosity adopta el color del fondo */
  blend?: "multiply" | "soft-light" | "luminosity" | "overlay" | "normal" | "screen";
  className?: string;
}

export default function Stickers({ preset = "suave", items, blend = "soft-light", className = "" }: Props) {
  const list = items ?? presets[preset] ?? presets.suave!;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`} aria-hidden="true">
      {list.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={`/stickers/${s.id}.png`}
          alt=""
          className={`absolute ${s.anim && s.anim !== "none" ? animClass[s.anim] : ""} ${s.hideOnMobile ? "hidden sm:block" : ""}`}
          style={{
            top: s.top, left: s.left, right: s.right, bottom: s.bottom,
            width: s.size,
            height: "auto",
            opacity: s.opacity ?? 0.18,
            mixBlendMode: blend,
            ["--rot" as string]: `${s.rotate ?? 0}deg`,
            transform: s.anim && s.anim !== "none" ? undefined : `rotate(${s.rotate ?? 0}deg)`,
            animationDelay: s.delay ? `${s.delay}s` : undefined,
          }}
        />
      ))}
    </div>
  );
}
