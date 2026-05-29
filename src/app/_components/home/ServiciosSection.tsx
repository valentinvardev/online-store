import RevealOnScroll from "./RevealOnScroll";

type Servicio = {
  id: number;
  numero: string;
  title: string;
  desc: string;
  precio: string;
  tags: string[];
  cardClass: string;
  numClass: string;
};

const servicios: Servicio[] = [
  {
    id: 1,
    numero: "01",
    title: "Lectura de Tarot",
    desc: "Una hora de lectura personalizada donde las cartas hablan directo a lo que estás viviendo ahora. En vivo por videollamada, con grabación incluida.",
    precio: "desde $45",
    tags: ["1h vía Zoom", "Grabación incluida", "Recomendaciones escritas"],
    cardClass: "bg-morado-pale",
    numClass: "text-morado",
  },
  {
    id: 2,
    numero: "02",
    title: "Ritual Personalizado",
    desc: "Diseño un ritual específico para lo que estás atravesando: para soltar, para atraer, para sanar. Guía escrita detallada y acompañamiento durante 7 días.",
    precio: "desde $65",
    tags: ["Guía escrita", "Seguimiento 7 días", "Lista de elementos"],
    cardClass: "bg-rosa-pale",
    numClass: "text-rosa",
  },
  {
    id: 3,
    numero: "03",
    title: "Consulta Astrológica",
    desc: "Analizamos tu carta natal completa: motivaciones profundas, dones, desafíos y tránsitos actuales. Para tomar decisiones con más claridad.",
    precio: "desde $80",
    tags: ["Carta natal completa", "1h + informe PDF", "Tránsitos actuales"],
    cardClass: "bg-dorado-pale",
    numClass: "text-tierra",
  },
];

export default function ServiciosSection() {
  return (
    <section className="bg-crema py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll direction="right" delay={0}>
          <div className="mb-16">
            <h2 className="font-display uppercase text-[clamp(2.2rem,6vw,4rem)] text-tierra-dark leading-none tracking-wide mb-4">
              Solo para vos
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          {servicios.map((s, i) => (
            <RevealOnScroll key={s.id} direction="up" delay={150 * i}>
              <article className={`border-2 border-morado-dark p-8 ${s.cardClass} block-shadow flex flex-col h-full`}>
                <div className={`font-display text-7xl ${s.numClass} opacity-15 leading-none mb-4 select-none tracking-wide`}>
                  {s.numero}
                </div>
                <h3 className="font-sans font-bold uppercase text-xl text-tierra-dark mb-4 leading-tight tracking-wide">
                  {s.title}
                </h3>
                <p className="font-sans text-tierra/60 text-sm leading-relaxed mb-6 flex-1 tracking-wide">
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-7">
                  {s.tags.map((tag) => (
                    <span key={tag} className="font-sans text-[0.65rem] bg-white/60 border border-morado/20 text-tierra px-3 py-1 tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-3xl text-tierra-dark">{s.precio}</span>
                  <a href="/servicios" className="bg-morado text-crema font-sans text-xs px-5 py-2.5 border-2 border-morado-dark hover:bg-morado-light transition-colors tracking-widest uppercase block-shadow-sm">
                    Reservar
                  </a>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
