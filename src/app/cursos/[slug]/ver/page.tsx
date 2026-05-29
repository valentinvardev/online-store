import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
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

  // Check enrollment
  const hasAccess = session?.user?.id
    ? !!(await db.enrollment.findUnique({
        where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
      }))
    : false;

  if (!hasAccess) {
    return (
      <>
        <Navbar />
        <main className="min-h-[70vh] bg-crema flex items-center justify-center px-6 py-20">
          <div className="max-w-md w-full text-center">
            <span className="font-display text-6xl text-morado/15 block mb-8">✦</span>
            <h1 className="font-display uppercase text-[clamp(1.8rem,5vw,3rem)] text-tierra-dark leading-none tracking-wide mb-4">
              {course.name}
            </h1>
            <p className="font-sans text-tierra/50 text-sm leading-relaxed mb-8">
              {course.description}
            </p>
            {session ? (
              <div className="space-y-3">
                <p className="font-sans text-tierra/40 text-xs tracking-wide">
                  No tenés acceso a este curso todavía.
                </p>
                <Link
                  href="/cursos"
                  className="inline-block font-sans font-semibold text-xs px-8 py-4 bg-dorado text-tierra-dark border-2 border-morado-dark hover:bg-dorado-light transition-colors tracking-widest uppercase block-shadow"
                >
                  Inscribirme — ${course.price}
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="font-sans text-tierra/40 text-xs tracking-wide">
                  Iniciá sesión para ver si tenés acceso.
                </p>
                <Link
                  href="/login"
                  className="inline-block font-sans font-semibold text-xs px-8 py-4 bg-morado text-crema border-2 border-morado-dark hover:bg-morado-light transition-colors tracking-widest uppercase block-shadow"
                >
                  Iniciar sesión
                </Link>
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
              className="font-sans text-xs text-crema/40 hover:text-crema transition-colors tracking-widest uppercase mb-6 inline-block"
            >
              ← Volver a cursos
            </Link>
            <h1 className="font-display uppercase text-[clamp(2rem,6vw,4rem)] text-crema leading-none tracking-wide">
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
              <p className="font-sans text-tierra/40 text-sm tracking-wide">
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
                    <p className="font-sans text-xs text-tierra/40 tracking-widest uppercase mt-0.5">
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
                          <p className="font-sans text-xs text-tierra/50 leading-relaxed mt-2">
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
