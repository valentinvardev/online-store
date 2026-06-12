import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { hasCourseAccess, CIRCULO_CHECKOUT } from "~/lib/access";
import Navbar from "~/app/_components/home/Navbar";
import Footer from "~/app/_components/home/Footer";

type Props = { params: Promise<{ slug: string }> };

export default async function CourseViewerPage({ params }: Props) {
  const { slug } = await params;

  const course = await db.course.findUnique({
    where: { slug, active: true },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: { lessons: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!course) notFound();

  const session = await auth();

  // Con membresía única: el acceso al curso lo da la membresía activa
  // (o un Enrollment viejo, para backward-compat).
  const hasAccess = await hasCourseAccess(session?.user?.id, course.id);

  if (!hasAccess) {
    return (
      <>
        <Navbar />
        <main className="min-h-[70vh] bg-crema flex items-center justify-center px-6 py-20">
          <div className="max-w-md w-full text-center">
            <span className="font-display text-6xl text-morado/15 block mb-8">✦</span>
            <span className="font-sans text-[0.65rem] text-morado/70 tracking-[0.4em] uppercase block mb-4">
              Contenido del Círculo
            </span>
            <h1 className="font-display uppercase text-[clamp(2.75rem,5vw,3rem)] text-tierra-dark leading-none tracking-wide mb-4">
              {course.name}
            </h1>
            <p className="font-sans text-tierra/75 text-sm leading-relaxed mb-8">
              Este curso está incluido en la membresía del Círculo. Sumate y accedé a
              todos los cursos, rituales y contenidos — todos los meses.
            </p>
            {session ? (
              <Link
                href={CIRCULO_CHECKOUT}
                className="inline-block font-sans font-semibold text-[13px] px-8 py-4 bg-dorado text-tierra-dark border-2 border-morado-dark hover:bg-dorado-light transition-colors tracking-widest uppercase block-shadow"
              >
                ✦ Sumate al Círculo
              </Link>
            ) : (
              <div className="space-y-3">
                <Link
                  href={CIRCULO_CHECKOUT}
                  className="inline-block font-sans font-semibold text-[13px] px-8 py-4 bg-dorado text-tierra-dark border-2 border-morado-dark hover:bg-dorado-light transition-colors tracking-widest uppercase block-shadow"
                >
                  ✦ Sumate al Círculo
                </Link>
                <p className="font-sans text-tierra/55 text-[12px] tracking-wide">
                  ¿Ya sos miembra?{" "}
                  <Link href="/login" className="text-morado hover:text-morado-dark font-semibold">
                    Iniciá sesión
                  </Link>
                </p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-crema min-h-screen">
        {/* Header */}
        <div className="bg-morado-dark py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/cursos"
              className="font-sans text-[13px] text-crema/40 hover:text-crema transition-colors tracking-widest uppercase mb-6 inline-block"
            >
              ← Volver a cursos
            </Link>
            <h1 className="font-display uppercase text-[clamp(3rem,6vw,4rem)] text-crema leading-none tracking-wide">
              {course.name}
            </h1>
            <p className="font-sans text-crema/50 text-sm mt-3 leading-relaxed max-w-xl">
              {course.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          {course.modules.length === 0 ? (
            <div className="text-center py-20">
              <span className="font-display text-5xl text-morado/15 block mb-4">✦</span>
              <p className="font-sans text-tierra/65 text-sm tracking-wide">
                El contenido de este curso estará disponible pronto.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {course.modules.map((mod) => (
                <div key={mod.id} className="bg-white border-2 border-morado/10 overflow-hidden">
                  <div className="bg-morado/5 border-b-2 border-morado/10 px-6 py-4">
                    <h2 className="font-sans font-bold text-base text-tierra-dark tracking-wide">
                      {mod.title}
                    </h2>
                    <p className="font-sans text-[13px] text-tierra/65 tracking-widest uppercase mt-0.5">
                      {mod.lessons.length} lección{mod.lessons.length !== 1 ? "es" : ""}
                    </p>
                  </div>
                  <ul className="divide-y-2 divide-morado/5">
                    {mod.lessons.map((lesson) => (
                      <li key={lesson.id} className="px-6 py-4 hover:bg-morado/3 transition-colors">
                        <h3 className="font-sans font-semibold text-sm text-tierra-dark mb-1">
                          {lesson.title}
                        </h3>
                        {lesson.videoUrl && (
                          <div className="mt-3 aspect-video bg-morado-dark/5 border border-morado/10">
                            <iframe
                              src={lesson.videoUrl}
                              className="w-full h-full"
                              allowFullScreen
                            />
                          </div>
                        )}
                        {lesson.content && (
                          <p className="font-sans text-[13px] text-tierra/75 leading-relaxed mt-2">
                            {lesson.content}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
