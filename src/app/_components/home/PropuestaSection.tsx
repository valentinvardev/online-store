import { ShoppingBag, BookOpen, Wand2 } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import StarField from "./StarField";

const pillars = [
  {
    Icon: ShoppingBag,
    title: "Tienda",
    desc: "Objetos cargados de intención. Cada pieza lleva el cuidado de una práctica real para llevar lo sagrado a tu cotidiano.",
    href: "/tienda",
    linkText: "Ver productos",
  },
  {
    Icon: BookOpen,
    title: "Cursos",
    desc: "Aprende a leer el lenguaje sagrado de tu existencia. Tarot, astrología, rituales lunares y mucho más, a tu propio ritmo.",
    href: "/cursos",
    linkText: "Ver cursos",
  },
  {
    Icon: Wand2,
    title: "Servicios",
    desc: "Una lectura, un ritual diseñado solo para vos. Porque la espiritualidad más poderosa es la que te encuentra donde estás.",
    href: "/servicios",
    linkText: "Reservar",
  },
];

export default function PropuestaSection() {
  return (
    <section className="bg-morado py-24 px-6 relative overflow-hidden">
      <StarField />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-morado-light opacity-15 blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-rosa opacity-10 blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll direction="up" delay={0}>
          <div className="text-center mb-16">
            <h2 className="font-display uppercase text-[clamp(2.2rem,6vw,4.5rem)] text-crema leading-none tracking-wide">
              Todo en un solo lugar
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <RevealOnScroll key={p.title} direction="up" delay={150 * (i + 1)}>
              <div className="border-2 border-crema/30 p-8  group h-full hover:border-dorado/70 transition-colors">
                <div className="mb-5 group-hover:scale-110 transition-transform duration-300 w-fit">
                  <p.Icon size={32} className="text-dorado/70" strokeWidth={1.25} />
                </div>
                <h3 className="font-sans font-bold uppercase text-2xl text-crema mb-3 group-hover:text-dorado transition-colors duration-300 tracking-wide">
                  {p.title}
                </h3>
                <p className="font-sans text-crema/55 text-sm leading-relaxed mb-7 tracking-wide">
                  {p.desc}
                </p>
                <a href={p.href} className="inline-flex items-center gap-2 font-sans text-xs text-dorado/70 hover:text-dorado transition-colors tracking-widest uppercase group/link">
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
