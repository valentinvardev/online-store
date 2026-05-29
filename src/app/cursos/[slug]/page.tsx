import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, BookOpen, Users, Check, Star } from "lucide-react";
import Navbar from "~/app/_components/home/Navbar";
import Footer from "~/app/_components/home/Footer";
import { cursos } from "../_data/cursos";
import CursoAccordion from "./_components/CursoAccordion";

const levelColors: Record<string, string> = {
  "Principiante":      "text-verde bg-verde/15 border-verde/30",
  "Intermedio":        "text-celeste bg-celeste/15 border-celeste/30",
  "Todos los niveles": "text-dorado-dark bg-dorado/15 border-dorado/30",
};

const badgeColors: Record<string, string> = {
  "Más vendido":     "bg-dorado/20 text-tierra-dark border-dorado/40",
  "Nuevo":           "bg-celeste/20 text-celeste border-celeste/30",
  "Últimos lugares": "bg-rosa/15 text-rosa border-rosa/25",
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return cursos.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const curso = cursos.find((c) => c.slug === slug);
  return {
    title: curso ? `${curso.title} — La Reina de Bastos` : "Curso",
    description: curso?.desc,
  };
}

export default async function CursoInfoPage({ params }: Props) {
  const { slug } = await params;
  const curso = cursos.find((c) => c.slug === slug);
  if (!curso) notFound();

  const totalLessons = curso.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-morado-dark relative overflow-hidden">
        {/* Ornamentos de fondo */}
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute top-8 right-12 font-display text-dorado/8 text-[8rem] leading-none select-none">✦</span>
          <span className="absolute bottom-4 left-8 font-display text-crema/4 text-[6rem] leading-none select-none">◉</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 font-sans text-[0.62rem] text-crema/35 hover:text-dorado tracking-widest uppercase transition-colors"
          >
            ← Volver a cursos
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-16 relative z-10">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-start">

            {/* Columna izquierda — info */}
            <div className="space-y-6">
              {/* Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`font-sans text-[0.6rem] px-2.5 py-1 border tracking-widest uppercase ${levelColors[curso.level]}`}>
                  {curso.level}
                </span>
                {curso.badge && (
                  <span className={`font-sans text-[0.6rem] px-2.5 py-1 border tracking-widest uppercase ${badgeColors[curso.badge]}`}>
                    {curso.badge}
                  </span>
                )}
              </div>

              {/* Título */}
              <div>
                <h1 className="font-display uppercase text-[clamp(2.8rem,7vw,5.5rem)] text-crema leading-none tracking-wide">
                  {curso.title}
                </h1>
                <p className="font-sans italic text-crema/45 text-lg mt-3 leading-snug max-w-lg">
                  {curso.subtitle}
                </p>
              </div>

              {/* Descripción corta */}
              <p className="font-sans text-crema/60 text-sm leading-relaxed tracking-wide max-w-xl">
                {curso.desc}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 font-sans text-xs text-crema/40 tracking-wide pt-2">
                <span className="flex items-center gap-2">
                  <Clock size={13} strokeWidth={1.5} />
                  {curso.duration}
                </span>
                <span className="flex items-center gap-2">
                  <BookOpen size={13} strokeWidth={1.5} />
                  {totalLessons} clases
                </span>
                <span className="flex items-center gap-2">
                  <Users size={13} strokeWidth={1.5} />
                  {curso.students}
                </span>
                <span className="flex items-center gap-2">
                  <Star size={13} strokeWidth={1.5} className="text-dorado" />
                  <span className="text-dorado">4.9</span>
                  <span className="text-crema/25">(128 reseñas)</span>
                </span>
              </div>
            </div>

            {/* Columna derecha — card de inscripción */}
            <div>
              <div className="bg-crema border-4 border-dorado block-shadow p-7 space-y-5">
                {/* Precio */}
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-5xl text-morado">{curso.price}</span>
                  {curso.priceOld && (
                    <span className="font-sans text-sm text-tierra/35 line-through">{curso.priceOld}</span>
                  )}
                </div>

                {/* CTA */}
                <button className="w-full bg-dorado text-tierra-dark font-sans font-semibold text-[0.7rem] py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-dorado-light transition-colors">
                  ✦ Inscribirme ahora
                </button>
                <button className="w-full border-2 border-morado/25 text-tierra font-sans text-[0.65rem] py-3 tracking-widest uppercase hover:border-morado/50 transition-colors">
                  Ver programa completo ↓
                </button>

                {/* Garantía */}
                <p className="font-sans text-[0.6rem] text-tierra/40 text-center tracking-wide">
                  ✦ 7 días de garantía de devolución
                </p>

                {/* Incluye */}
                <div className="border-t border-morado/10 pt-5 space-y-2.5">
                  <p className="font-sans text-[0.58rem] text-tierra/35 tracking-[0.3em] uppercase mb-3">Este curso incluye</p>
                  {curso.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <Check size={12} className="text-verde shrink-0" strokeWidth={2.5} />
                      <span className="font-sans text-xs text-tierra/60 tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Borde inferior */}
        <div className="h-px bg-gradient-to-r from-transparent via-dorado/40 to-transparent" />
      </section>

      {/* ── CUERPO ── */}
      <div className="bg-crema">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-16 items-start">

            {/* Columna principal */}
            <div className="space-y-14">

              {/* Video de presentación */}
              {curso.videoId && (
                <section>
                  <h2 className="font-display uppercase text-[clamp(1.8rem,4vw,2.8rem)] text-tierra-dark leading-none tracking-wide mb-6">
                    Video de presentación
                  </h2>
                  <div
                    className="relative border-4 border-morado-dark block-shadow overflow-hidden bg-morado-dark"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <iframe
                      src={`https://player.vimeo.com/video/${curso.videoId}?title=0&byline=0&portrait=0&color=7B5EA7`}
                      className="absolute inset-0 w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={`Presentación — ${curso.title}`}
                    />
                  </div>
                </section>
              )}

              {/* ¿Para quién es? */}
              <section>
                <h2 className="font-display uppercase text-[clamp(1.8rem,4vw,2.8rem)] text-tierra-dark leading-none tracking-wide mb-6">
                  ¿Para quién es?
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Querés aprender de manera profunda, no superficial",
                    "Buscás una práctica espiritual que se adapte a tu vida real",
                    "Te interesa ir más allá de los significados de manual",
                    "Querés resultados concretos y aplicables desde la primera clase",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white border border-morado/10 p-4">
                      <span className="text-dorado text-sm shrink-0 mt-0.5">✦</span>
                      <p className="font-sans text-sm text-tierra/65 tracking-wide leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Descripción larga */}
              <section>
                <h2 className="font-display uppercase text-[clamp(1.8rem,4vw,2.8rem)] text-tierra-dark leading-none tracking-wide mb-6">
                  Sobre este curso
                </h2>
                <div className="bg-white border-2 border-morado/10 p-8">
                  <p className="font-sans text-tierra/65 text-sm leading-relaxed tracking-wide">
                    {curso.descLong}
                  </p>
                </div>
              </section>

              {/* Currículum */}
              <section>
                <h2 className="font-display uppercase text-[clamp(1.8rem,4vw,2.8rem)] text-tierra-dark leading-none tracking-wide mb-8">
                  Contenido del curso
                </h2>
                <CursoAccordion modules={curso.modules} />
              </section>

            </div>

            {/* Sidebar sticky */}
            <aside>
              <div className="sticky top-6 space-y-5">

                {/* Card de precio (desktop) */}
                <div className="bg-crema border-2 border-morado-dark block-shadow p-7 space-y-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-5xl text-morado">{curso.price}</span>
                    {curso.priceOld && (
                      <span className="font-sans text-sm text-tierra/35 line-through">{curso.priceOld}</span>
                    )}
                  </div>
                  <button className="w-full bg-morado-dark text-crema font-sans font-semibold text-[0.7rem] py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-morado transition-colors">
                    ✦ Inscribirme ahora
                  </button>
                  <p className="font-sans text-[0.6rem] text-tierra/35 text-center tracking-wide">
                    ✦ 7 días de garantía de devolución
                  </p>
                  <div className="border-t border-morado/10 pt-4 space-y-2.5">
                    {curso.includes.map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <Check size={12} className="text-verde shrink-0" strokeWidth={2.5} />
                        <span className="font-sans text-xs text-tierra/55 tracking-wide">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detalles del curso */}
                <div className="bg-crema border border-morado/15 p-6 space-y-4">
                  <p className="font-sans text-[0.58rem] text-tierra/30 tracking-[0.3em] uppercase">Detalles</p>
                  {[
                    { icon: <Clock size={13} strokeWidth={1.5} />, label: "Duración", val: curso.duration },
                    { icon: <BookOpen size={13} strokeWidth={1.5} />, label: "Clases", val: `${totalLessons} clases` },
                    { icon: <Users size={13} strokeWidth={1.5} />, label: "Alumnas", val: curso.students },
                  ].map(({ icon, label, val }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="flex items-center gap-2 font-sans text-xs text-tierra/45 tracking-wide">
                        {icon} {label}
                      </span>
                      <span className="font-sans text-xs font-semibold text-tierra-dark">{val}</span>
                    </div>
                  ))}
                </div>

              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ── CTA FINAL ── */}
      <section className="bg-rosa border-t-4 border-dorado/40">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
          <span className="font-display text-dorado text-6xl block">✦</span>
          <h2 className="font-display uppercase text-[clamp(2rem,5vw,3.5rem)] text-crema leading-none tracking-wide">
            ¿Lista para empezar?
          </h2>
          <p className="font-sans text-crema/40 text-sm tracking-wide max-w-sm mx-auto leading-relaxed">
            Unite a {curso.students} que ya transitaron este camino.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-dorado text-tierra-dark font-sans font-semibold text-[0.7rem] px-10 py-4 tracking-widest uppercase border-2 border-crema/20 block-shadow hover:bg-dorado-light transition-colors">
              ✦ Inscribirme a {curso.title}
            </button>
            <Link
              href="/cursos"
              className="border-2 border-crema/15 text-crema/40 font-sans text-[0.7rem] px-8 py-4 tracking-widest uppercase hover:border-crema/35 hover:text-crema/60 transition-colors"
            >
              Ver otros cursos
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
