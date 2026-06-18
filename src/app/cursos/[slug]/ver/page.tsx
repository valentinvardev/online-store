import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { hasCourseAccess, CIRCULO_CHECKOUT } from "~/lib/access";
import Navbar from "~/app/_components/home/Navbar";
import Footer from "~/app/_components/home/Footer";
import CoursePlayer from "../_components/CoursePlayer";

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
                  ¿Ya sos socia?{" "}
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
      <CoursePlayer
        courseId={course.id}
        courseSlug={course.slug}
        courseName={course.name}
        modules={course.modules.map((m) => ({
          id: m.id,
          title: m.title,
          lessons: m.lessons.map((l) => ({
            id: l.id,
            title: l.title,
            content: l.content,
            videoUrl: l.videoUrl,
            attachments: l.attachments,
            publishedAt: l.publishedAt,
          })),
        }))}
      />
      <Footer />
    </>
  );
}
