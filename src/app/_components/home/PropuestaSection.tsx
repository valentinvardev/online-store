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
    <section className="bg-verde-light py-24 px-6 relative overflow-hidden">
      {/* Aurora boreal — verde puro */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] left-[5%] w-80 sm:w-[28rem] h-80 sm:h-[28rem] rounded-full bg-verde blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-[8%] right-[10%] w-80 sm:w-[30rem] h-80 sm:h-[30rem] rounded-full bg-verde-pale blur-3xl opacity-65 animate-blob" style={{ animationDelay: "3s" }} />
        <div className="absolute bottom-[5%] left-[15%] w-96 sm:w-[36rem] h-96 sm:h-[36rem] rounded-full bg-verde blur-3xl opacity-70 animate-blob" style={{ animationDelay: "6s" }} />
        <div className="absolute top-[35%] right-[8%] w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-verde blur-3xl opacity-60 animate-blob" style={{ animationDelay: "9s" }} />
        <div className="absolute top-[42%] left-[38%] w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-verde blur-3xl opacity-55 animate-blob" style={{ animationDelay: "4.5s" }} />
        <div className="absolute bottom-[12%] right-[20%] w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-verde-pale blur-3xl opacity-55 animate-blob" style={{ animationDelay: "7.5s" }} />
        <div className="absolute top-[18%] left-[50%] w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-verde-pale blur-3xl opacity-50 animate-blob" style={{ animationDelay: "1.5s" }} />

        {/* Estrellitas dispersas */}
        <span className="absolute top-[12%] right-[14%] font-display text-crema text-base select-none drop-shadow-[0_0_8px_rgba(251,245,230,0.7)]">✦</span>
        <span className="absolute top-[24%] left-[15%] font-display text-crema/90 text-xs select-none drop-shadow-[0_0_6px_rgba(251,245,230,0.6)]">⋆</span>
        <span className="absolute top-[38%] right-[20%] font-display text-crema text-sm select-none drop-shadow-[0_0_7px_rgba(251,245,230,0.7)]">✧</span>
        <span className="absolute top-[55%] left-[38%] font-display text-crema/85 text-base select-none drop-shadow-[0_0_8px_rgba(251,245,230,0.6)]">✦</span>
        <span className="absolute top-[70%] right-[10%] font-display text-crema/90 text-[0.7rem] select-none">⋆</span>
        <span className="absolute top-[82%] left-[55%] font-display text-crema text-sm select-none drop-shadow-[0_0_7px_rgba(251,245,230,0.7)]">✧</span>
        <span className="absolute top-[18%] left-[48%] font-display text-crema/75 text-[0.55rem] select-none">·</span>
        <span className="absolute top-[48%] right-[48%] font-display text-crema/70 text-[0.6rem] select-none">·</span>
        <span className="absolute top-[88%] right-[35%] font-display text-crema/80 text-xs select-none">⋆</span>
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
                <a href={p.href} className="inline-flex items-center gap-2 font-sans text-xs text-morado hover:text-morado-dark transition-colors tracking-widest uppercase group/link">
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
