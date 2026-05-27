"use client";

import { useState } from "react";
import { Clock, BookOpen, Users } from "lucide-react";

type Level = "Todos" | "Principiante" | "Intermedio" | "Todos los niveles";

type Curso = {
  id: number;
  title: string;
  subtitle: string;
  level: Exclude<Level, "Todos">;
  duration: string;
  lessons: string;
  students: string;
  price: string;
  priceOld?: string;
  badge?: "Nuevo" | "Más vendido" | "Últimos lugares";
  desc: string;
  includes: string[];
  imageUrl?: string;
};

const cursos: Curso[] = [
  {
    id: 1,
    title: "Tarot desde Cero",
    subtitle: "Leé tu propio código sagrado",
    level: "Principiante",
    duration: "8 semanas",
    lessons: "24 clases",
    students: "+340 alumnas",
    price: "$89",
    badge: "Más vendido",
    desc: "Aprendé a leer el tarot con profundidad y claridad. Sin memorizar, sin rigidez. Desde la intuición y la práctica viva.",
    includes: ["24 clases en video", "Guía de cartas descargable", "Comunidad privada"],
  },
  {
    id: 2,
    title: "Rituales Lunares",
    subtitle: "Vivir en sintonía con los ciclos",
    level: "Todos los niveles",
    duration: "4 semanas",
    lessons: "12 clases",
    students: "+210 alumnas",
    price: "$59",
    desc: "Diseñá rituales personales para cada fase lunar: limpiezas energéticas, intenciones, gratitud y liberación.",
    includes: ["12 clases en video", "Calendario lunar 2025", "Rituales en PDF"],
  },
  {
    id: 3,
    title: "Astrología Práctica",
    subtitle: "Tu carta natal como mapa de vida",
    level: "Intermedio",
    duration: "6 semanas",
    lessons: "18 clases",
    students: "+175 alumnas",
    price: "$75",
    desc: "Interpretá tu carta natal, tus tránsitos y cómo usar la astrología como herramienta cotidiana real.",
    includes: ["18 clases en video", "Lectura de tu carta natal", "Guía de tránsitos"],
  },
  {
    id: 4,
    title: "Meditación y Presencia",
    subtitle: "Silenciar el ruido, escuchar el alma",
    level: "Principiante",
    duration: "3 semanas",
    lessons: "9 clases",
    students: "+90 alumnas",
    price: "$39",
    badge: "Nuevo",
    desc: "Técnicas de meditación guiada para el día a día. Sin yoga ni espiritualidad de Instagram — real, concreta, tuya.",
    includes: ["9 clases en audio y video", "Meditaciones mp3", "Diario de práctica"],
  },
  {
    id: 5,
    title: "Tarot Avanzado",
    subtitle: "Las capas ocultas del mazo",
    level: "Intermedio",
    duration: "6 semanas",
    lessons: "18 clases",
    students: "+120 alumnas",
    price: "$95",
    priceOld: "$110",
    desc: "Tiradas complejas, arcanos mayores en profundidad, numerología aplicada y lecturas para otros con ética.",
    includes: ["18 clases en video", "Spreads exclusivos", "Sesión grupal en vivo"],
  },
  {
    id: 6,
    title: "Chakras: Mapa Interior",
    subtitle: "Energía, cuerpo y conciencia",
    level: "Todos los niveles",
    duration: "4 semanas",
    lessons: "12 clases",
    students: "+155 alumnas",
    price: "$65",
    desc: "Explorá cada centro energético con herramientas prácticas: movimiento, sonido, cristales y visualizaciones.",
    includes: ["12 clases en video", "Mapa de chakras descargable", "Playlist de sonidos"],
  },
  {
    id: 7,
    title: "Sueños y Simbolismo",
    subtitle: "Tu inconsciente te habla",
    level: "Principiante",
    duration: "3 semanas",
    lessons: "9 clases",
    students: "+65 alumnas",
    price: "$45",
    badge: "Nuevo",
    desc: "Aprendé a registrar, interpretar y trabajar simbólicamente con tus sueños como fuente de autoconocimiento.",
    includes: ["9 clases en video", "Diccionario de símbolos", "Diario de sueños PDF"],
  },
  {
    id: 8,
    title: "Herbología y Rituales",
    subtitle: "La magia que crece de la tierra",
    level: "Todos los niveles",
    duration: "5 semanas",
    lessons: "15 clases",
    students: "+88 alumnas",
    price: "$55",
    badge: "Últimos lugares",
    desc: "Plantas medicinales y rituales, sahumerios, baños energéticos, aceites y preparaciones con propósito.",
    includes: ["15 clases en video", "Guía de plantas sagradas", "Recetario ritual"],
  },
  {
    id: 9,
    title: "Numerología Esencial",
    subtitle: "Los números que te definen",
    level: "Principiante",
    duration: "3 semanas",
    lessons: "9 clases",
    students: "+50 alumnas",
    price: "$49",
    desc: "Calculá e interpretá tu número de vida, misión, alma y más. La numerología como espejo de tu propósito.",
    includes: ["9 clases en video", "Calculadora numerológica", "Guía completa PDF"],
  },
];

const levels: { value: Level; label: string; icon: string; color: string; activeColor: string }[] = [
  { value: "Todos",           label: "Todos",           icon: "✦", color: "text-morado/50 border-morado/15 hover:border-morado/40 hover:text-morado",         activeColor: "bg-morado-dark text-crema border-morado-dark shadow-lg" },
  { value: "Principiante",   label: "Principiante",   icon: "◎", color: "text-verde/60 border-verde/20 hover:border-verde/50 hover:text-verde",              activeColor: "bg-verde text-crema border-verde shadow-lg" },
  { value: "Intermedio",     label: "Intermedio",     icon: "◈", color: "text-celeste/60 border-celeste/20 hover:border-celeste/50 hover:text-celeste",      activeColor: "bg-celeste text-tierra-dark border-celeste shadow-lg" },
  { value: "Todos los niveles", label: "Todos los niveles", icon: "◉", color: "text-dorado/70 border-dorado/20 hover:border-dorado/50 hover:text-dorado-dark", activeColor: "bg-dorado text-tierra-dark border-dorado shadow-lg" },
];

const levelColors: Record<string, string> = {
  "Principiante":     "text-verde bg-verde/10 border-verde/25",
  "Intermedio":       "text-celeste bg-celeste/10 border-celeste/25",
  "Todos los niveles": "text-dorado bg-dorado/10 border-dorado/25",
};

const badgeColors: Record<string, string> = {
  "Más vendido":     "bg-dorado/20 text-tierra-dark border-dorado/40",
  "Nuevo":           "bg-celeste/20 text-celeste border-celeste/30",
  "Últimos lugares": "bg-rosa/15 text-rosa border-rosa/30",
};

export default function CursosCatalog() {
  const [active, setActive] = useState<Level>("Todos");

  const filtered = active === "Todos"
    ? cursos
    : cursos.filter((c) => c.level === active);

  const countFor = (lvl: Level) =>
    lvl === "Todos" ? cursos.length : cursos.filter((c) => c.level === lvl).length;

  return (
    <div>
      {/* Filtros sticky */}
      <div className="bg-crema/95 backdrop-blur-sm sticky top-0 z-10 border-b-2 border-morado/8">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="font-sans text-[0.6rem] text-tierra/30 tracking-[0.25em] uppercase mb-4">
            Filtrar por nivel
          </p>
          <div className="flex items-center gap-5 flex-wrap">
            {levels.map(({ value, label, icon, color, activeColor }) => {
              const isActive = active === value;
              const count = countFor(value);
              return (
                <button
                  key={value}
                  onClick={() => setActive(value)}
                  className={`group flex items-center gap-2.5 px-5 py-2.5 border-2 rounded-full transition-all duration-200 ${
                    isActive ? activeColor : `bg-transparent ${color}`
                  }`}
                >
                  <span className={`text-[0.7rem] transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                    {icon}
                  </span>
                  <span className="font-sans text-[0.65rem] tracking-widest uppercase font-semibold">
                    {label}
                  </span>
                  <span className={`font-sans text-[0.55rem] font-bold px-1.5 py-0.5 rounded-full transition-colors ${
                    isActive ? "bg-white/20 text-inherit" : "bg-morado/8 text-tierra/40"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grilla */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((curso) => (
            <article
              key={curso.id}
              className="border-2 border-morado-dark overflow-hidden flex flex-col group bg-white block-shadow"
            >
              {/* Portada */}
              <div className="relative h-52 bg-morado-mid shrink-0 overflow-hidden">
                {curso.imageUrl ? (
                  <img
                    src={curso.imageUrl}
                    alt={curso.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <span className="font-sans text-[0.55rem] text-crema/20 tracking-[0.3em] uppercase">
                      Portada del curso
                    </span>
                    <div className="w-8 h-px bg-crema/10" />
                    <span className="text-crema/10 text-3xl">✦</span>
                  </div>
                )}

                {/* Nivel */}
                <span className={`absolute top-3 left-3 font-sans text-[0.58rem] px-2.5 py-1 border tracking-widest uppercase ${levelColors[curso.level]}`}>
                  {curso.level}
                </span>

                {/* Badge */}
                {curso.badge && (
                  <span className={`absolute top-3 right-3 font-sans text-[0.58rem] px-2.5 py-1 border tracking-widest uppercase ${badgeColors[curso.badge]}`}>
                    {curso.badge}
                  </span>
                )}
              </div>

              {/* Contenido */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-sans font-bold uppercase text-xl text-tierra-dark leading-tight tracking-wide mb-1 group-hover:text-morado transition-colors">
                  {curso.title}
                </h3>
                <p className="font-sans italic text-tierra/45 text-sm mb-4">{curso.subtitle}</p>
                <p className="font-sans text-tierra/55 text-sm leading-relaxed mb-5 flex-1 tracking-wide">
                  {curso.desc}
                </p>

                {/* Includes */}
                <ul className="space-y-1.5 mb-5 border-t border-morado/10 pt-5">
                  {curso.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 font-sans text-[0.7rem] text-tierra/50 tracking-wide">
                      <span className="text-dorado text-[0.55rem] shrink-0">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Meta */}
                <div className="flex gap-5 font-sans text-xs text-tierra/35 mb-6 tracking-wide">
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} strokeWidth={1.5} />
                    {curso.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={12} strokeWidth={1.5} />
                    {curso.lessons}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={12} strokeWidth={1.5} />
                    {curso.students}
                  </span>
                </div>

                {/* Precio + CTA */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl text-morado tracking-wide">{curso.price}</span>
                    {curso.priceOld && (
                      <span className="font-sans text-xs text-tierra/35 line-through">{curso.priceOld}</span>
                    )}
                  </div>
                  <a
                    href="#"
                    className="font-sans font-semibold text-[0.65rem] px-5 py-2.5 bg-dorado text-tierra-dark border-2 border-morado-dark hover:bg-dorado-light transition-colors tracking-widest uppercase block-shadow-sm whitespace-nowrap"
                  >
                    Inscribirme
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
