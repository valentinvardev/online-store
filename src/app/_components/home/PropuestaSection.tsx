import Image from "next/image";
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
    <section className="bg-verde py-24 px-6 relative overflow-hidden">
      {/* Degradado vertical con shimmer descendente */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0f3d24 0%, #1a4d2e 25%, #3d7a47 55%, #5fa569 80%, #6bae75 100%)" }} />
        <div className="absolute inset-0 animate-gradient-breathe" style={{ background: "linear-gradient(180deg, #1a4d2e 0%, #2d6a3e 30%, #5fa569 65%, #6bae75 90%, #7bc888 100%)" }} />
        <div className="absolute inset-x-0 h-[35%] animate-shimmer-fall" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }} />
        <div className="absolute inset-x-0 h-[45%] animate-shimmer-fall-slow" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(123,200,136,0.18) 50%, transparent 100%)" }} />

        {/* Estrellitas dispersas */}
        <span className="absolute top-[12%] right-[14%] font-display text-crema text-base select-none drop-shadow-[0_0_8px_rgba(251,245,230,0.7)]">✦</span>
        <span className="absolute top-[24%] left-[15%] font-display text-crema/90 text-[13px] select-none drop-shadow-[0_0_6px_rgba(251,245,230,0.6)]">⋆</span>
        <span className="absolute top-[38%] right-[20%] font-display text-crema text-sm select-none drop-shadow-[0_0_7px_rgba(251,245,230,0.7)]">✧</span>
        <span className="absolute top-[55%] left-[38%] font-display text-crema/85 text-base select-none drop-shadow-[0_0_8px_rgba(251,245,230,0.6)]">✦</span>
        <span className="absolute top-[70%] right-[10%] font-display text-crema/90 text-[0.8rem] select-none">⋆</span>
        <span className="absolute top-[82%] left-[55%] font-display text-crema text-sm select-none drop-shadow-[0_0_7px_rgba(251,245,230,0.7)]">✧</span>
        <span className="absolute top-[18%] left-[48%] font-display text-crema/75 text-[0.75rem] select-none">·</span>
        <span className="absolute top-[48%] right-[48%] font-display text-crema/70 text-[0.8rem] select-none">·</span>
        <span className="absolute top-[88%] right-[35%] font-display text-crema/80 text-[13px] select-none">⋆</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll direction="up" delay={0}>
          <div className="text-center mb-16">
            <h2 className="font-display uppercase text-[clamp(1.75rem,7vw,4.5rem)] text-crema leading-none tracking-wide">
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
                <p className="font-sans text-tierra/75 text-sm leading-relaxed mb-7 tracking-wide">
                  {p.desc}
                </p>
                <a href={p.href} className="inline-flex items-center gap-2 font-sans text-[13px] text-morado hover:text-morado-dark transition-colors tracking-widest uppercase group/link">
                  <span>{p.linkText}</span>
                  <span className="transition-transform group-hover/link:translate-x-1">→</span>
                </a>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
