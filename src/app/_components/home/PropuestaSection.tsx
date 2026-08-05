import Image from "next/image";
import Sticker from "../Sticker";
import EditableSection from "../editor/EditableSection";
import RevealOnScroll from "./RevealOnScroll";

const pillars = [
  {
    icon: "/cart.png",
    title: "Tienda",
    desc: "Objetos cargados de intención. Cada pieza lleva el cuidado de una práctica real para llevar lo sagrado a tu cotidiano.",
    href: "/tienda",
    linkText: "Ver productos",
  },
  {
    icon: "/book.png",
    title: "Cursos",
    desc: "Aprende a leer el lenguaje sagrado de tu existencia. Tarot, astrología, rituales lunares y mucho más, a tu propio ritmo.",
    href: "/cursos",
    linkText: "Ver cursos",
  },
  {
    icon: "/crown.png",
    title: "Servicios",
    desc: "Una lectura, un ritual diseñado solo para vos. Porque la espiritualidad más poderosa es la que te encuentra donde estás.",
    href: "/servicios",
    linkText: "Reservar",
  },
];

export default function PropuestaSection() {
  return (
    <EditableSection id="home-propuesta" label="Inicio — Propuesta" className="bg-verde-light py-24 px-6 overflow-hidden">
      {/* Degradado de verdes claros con shimmer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #5fa569 0%, #6bae75 25%, #7bc888 55%, #6bae75 85%, #5fa569 100%)" }} />
        <div className="absolute inset-0 animate-gradient-breathe" style={{ background: "linear-gradient(180deg, #6bae75 0%, #7bc888 30%, #8fd4a0 65%, #7bc888 90%, #6bae75 100%)" }} />
        <div className="absolute inset-x-0 h-[35%] animate-shimmer-fall" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)" }} />
        <div className="absolute inset-x-0 h-[45%] animate-shimmer-fall-slow" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(143,212,160,0.28) 50%, transparent 100%)" }} />

        {/* Estrellitas dispersas */}
        <Sticker name="destello" size={22} className="absolute top-[12%] right-[14%] drop-shadow-[0_0_8px_rgba(251,245,230,0.5)]" />
        <span className="absolute top-[24%] left-[15%] font-display text-crema/90 text-[13px] select-none drop-shadow-[0_0_6px_rgba(251,245,230,0.6)]">⋆</span>
        <Sticker name="estrella-2" size={18} className="absolute top-[38%] right-[20%] drop-shadow-[0_0_7px_rgba(251,245,230,0.4)]" />
        <Sticker name="destello" size={24} className="absolute top-[55%] left-[38%] drop-shadow-[0_0_8px_rgba(251,245,230,0.4)]" />
        <span className="absolute top-[70%] right-[10%] font-display text-crema/90 text-[0.8rem] select-none">⋆</span>
        <Sticker name="estrella" size={18} className="absolute top-[82%] left-[55%] drop-shadow-[0_0_7px_rgba(251,245,230,0.4)]" />
        <span className="absolute top-[18%] left-[48%] font-display text-crema/75 text-[0.75rem] select-none">·</span>
        <span className="absolute top-[48%] right-[48%] font-display text-crema/70 text-[0.8rem] select-none">·</span>
        <span className="absolute top-[88%] right-[35%] font-display text-crema/80 text-[13px] select-none">⋆</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll direction="up" delay={0}>
          <div className="text-center mb-16">
            <h2 className="font-display uppercase text-[clamp(2.75rem,7vw,4.5rem)] text-crema leading-none tracking-wide">
              Todo en un solo lugar
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <RevealOnScroll key={p.title} direction="up" delay={150 * (i + 1)}>
              <div className="bg-crema border-2 border-morado-dark block-shadow p-8 group h-full hover:border-morado transition-colors">
                <div className="mb-5 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  <Image
                    src={p.icon}
                    alt={p.title}
                    width={180}
                    height={180}
                    className="w-44 h-44 object-contain"
                  />
                </div>
                <h3 className="font-sans font-bold uppercase text-2xl text-tierra-dark mb-3 group-hover:text-morado transition-colors duration-300 tracking-wide">
                  {p.title}
                </h3>
                <p className="font-sans text-tierra-dark/90 text-[16px] leading-relaxed mb-7 tracking-wide">
                  {p.desc}
                </p>
                <a href={p.href} className="inline-flex items-center gap-2 font-sans font-semibold text-[14px] text-morado hover:text-morado-dark transition-colors tracking-widest uppercase group/link">
                  <span>{p.linkText}</span>
                  <span className="transition-transform group-hover/link:translate-x-1">→</span>
                </a>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </EditableSection>
  );
}
