import RevealOnScroll from "./RevealOnScroll";
import Stickers from "../Stickers";

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
    cardClass: "bg-dorado-light",
    numClass: "text-tierra-dark",
  },
  {
    id: 2,
    numero: "02",
    title: "Ritual Personalizado",
    desc: "Diseño un ritual específico para lo que estás atravesando: para soltar, para atraer, para sanar. Guía escrita detallada y acompañamiento durante 7 días.",
    precio: "desde $65",
    tags: ["Guía escrita", "Seguimiento 7 días", "Lista de elementos"],
    cardClass: "bg-dorado-light",
    numClass: "text-tierra-dark",
  },
  {
    id: 3,
    numero: "03",
    title: "Consulta Astrológica",
    desc: "Analizamos tu carta natal completa: motivaciones profundas, dones, desafíos y tránsitos actuales. Para tomar decisiones con más claridad.",
    precio: "desde $80",
    tags: ["Carta natal completa", "1h + informe PDF", "Tránsitos actuales"],
    cardClass: "bg-dorado-light",
    numClass: "text-tierra-dark",
  },
];

export default function ServiciosSection() {
  return (
    <section className="bg-crema py-16 sm:py-20 lg:py-24 px-5 sm:px-6 overflow-hidden relative">
      <Stickers blend="multiply" items={[
        { id: "sticker-17", top: "5%",   right: "3%", size: 110, opacity: 0.38, rotate: 8,   anim: "float-slow" },
        { id: "sticker-09", bottom: "5%", left: "3%", size: 130, opacity: 0.4,  rotate: -12, anim: "float", delay: 1.2 },
        { id: "sticker-08", top: "40%",   left: "3%",  size: 70, opacity: 0.32, rotate: 0,   anim: "spin", delay: 0.6, hideOnMobile: true },
      ]} />
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll direction="up" delay={0}>
          <div className="mb-10 sm:mb-12 lg:mb-16 text-center lg:text-left">
            <h2 className="font-display uppercase text-[clamp(3rem,8vw,4rem)] text-tierra-dark leading-[0.95] tracking-wide">
              Solo para vos
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicios.map((s, i) => (
            <RevealOnScroll key={s.id} direction="up" delay={150 * i}>
              <article className={`border-2 border-morado-dark p-8 ${s.cardClass} block-shadow flex flex-col h-full`}>
                <div className={`font-display text-7xl ${s.numClass} opacity-25 leading-none mb-4 select-none tracking-wide`}>
                  {s.numero}
                </div>
                <h3 className="font-sans font-bold uppercase text-xl text-tierra-dark mb-4 leading-tight tracking-wide">
                  {s.title}
                </h3>
                <p className="font-sans text-tierra-dark/85 text-[17px] leading-relaxed mb-6 flex-1 tracking-wide">
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-7">
                  {s.tags.map((tag) => (
                    <span key={tag} className="font-sans text-[0.78rem] bg-white/70 border border-morado/30 text-tierra-dark px-3 py-1 tracking-wide font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end mt-auto">
                  <a href="/servicios" className="bg-morado text-crema font-sans text-[13px] px-5 py-2.5 border-2 border-morado-dark hover:bg-morado-light transition-colors tracking-widest uppercase block-shadow-sm">
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
