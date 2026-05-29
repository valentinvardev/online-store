import { Clock, BookOpen } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import StarField from "./StarField";

type Curso = {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  lessons: string;
  level: string;
  price: string;
  imageUrl?: string;
  desc: string;
};

const cursos: Curso[] = [
  {
    id: 1,
    title: "Tarot desde Cero",
    subtitle: "Leé tu propio código sagrado",
    duration: "8 semanas",
    lessons: "24 clases",
    level: "Principiante",
    price: "$89",
    desc: "Aprendé a leer el tarot con profundidad y claridad. Sin memorizar, sin rigidez. Desde la intuición y la práctica viva.",
  },
  {
    id: 2,
    title: "Rituales Lunares",
    subtitle: "Vivir en sintonía con los ciclos",
    duration: "4 semanas",
    lessons: "12 clases",
    level: "Todos los niveles",
    price: "$59",
    desc: "Diseñá rituales personales para cada fase lunar: limpiezas energéticas, intenciones, gratitud y liberación.",
  },
  {
    id: 3,
    title: "Astrología Práctica",
    subtitle: "Tu carta natal como mapa de vida",
    duration: "6 semanas",
    lessons: "18 clases",
    level: "Intermedio",
    price: "$75",
    desc: "Interpretá tu carta natal, tus tránsitos y cómo usar la astrología como herramienta cotidiana real.",
  },
];

export default function CursosSection() {
  return (
    <section className="bg-morado-dark py-24 px-6 relative overflow-hidden">
      <StarField />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-morado opacity-20 blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-rosa opacity-10 blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll direction="up" delay={0}>
          <div className="text-center mb-16">
            <h2 className="font-display uppercase text-[clamp(1.75rem,7vw,4.5rem)] text-crema leading-none tracking-wide">
              Aprendé tu propio<br />lenguaje sagrado
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          {cursos.map((curso, i) => (
            <RevealOnScroll key={curso.id} direction="up" delay={180 * i}>
              <article className="border border-crema/20 overflow-hidden flex flex-col h-full group hover:border-crema/40 transition-colors">

                {/* Portada — imagen o placeholder */}
                <div className="relative h-56 overflow-hidden bg-morado-mid">
                  {curso.imageUrl ? (
                    <img
                      src={curso.imageUrl}
                      alt={curso.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border-b border-crema/10">
                      <span className="text-crema/15 font-sans text-[0.6rem] tracking-[0.3em] uppercase">Portada del curso</span>
                      <div className="w-10 h-px bg-crema/10" />
                      <span className="text-crema/10 text-3xl">✦</span>
                    </div>
                  )}
                  {/* Nivel */}
                  <div className="absolute top-4 left-4">
                    <span className="font-sans text-[0.6rem] text-crema/60 tracking-[0.3em] uppercase bg-morado-dark/60 px-2 py-1">
                      {curso.level}
                    </span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="bg-morado-mid p-6 flex flex-col flex-1">
                  <h3 className="font-sans font-bold uppercase text-xl text-crema leading-tight tracking-wide mb-1">
                    {curso.title}
                  </h3>
                  <p className="font-sans italic text-crema/50 text-sm mb-4">{curso.subtitle}</p>
                  <p className="font-sans text-crema/45 text-sm leading-relaxed mb-5 flex-1 tracking-wide">
                    {curso.desc}
                  </p>
                  <div className="flex gap-5 font-sans text-xs text-crema/30 mb-6 tracking-wide">
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} strokeWidth={1.5} />
                      {curso.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={12} strokeWidth={1.5} />
                      {curso.lessons}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-bold text-3xl text-dorado">{curso.price}</span>
                    <a href="/cursos" className="bg-dorado text-tierra-dark font-sans text-xs px-5 py-2.5 border-2 border-morado-dark hover:bg-dorado-light transition-colors font-semibold tracking-widest uppercase block-shadow-sm">
                      Inscribirme
                    </a>
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll direction="up" delay={200}>
          <div className="text-center mt-12">
            <a href="/cursos" className="font-sans text-xs text-crema/35 hover:text-crema transition-colors tracking-widest uppercase">
              Ver todos los cursos →
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
