import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, Sparkles, FileText, Video, Headphones, Image as ImageIcon } from "lucide-react";
import Navbar from "~/app/_components/home/Navbar";
import Footer from "~/app/_components/home/Footer";
import { api } from "~/trpc/server";
import { CIRCULO_CHECKOUT } from "~/lib/access";
import PostBody from "../_components/PostBody";

type Props = { params: Promise<{ slug: string }> };

const fmt = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "long", year: "numeric" });

const typeIcon: Record<string, React.ReactNode> = {
  TEXT: <FileText size={12} />,
  VIDEO: <Video size={12} />,
  AUDIO: <Headphones size={12} />,
  GALLERY: <ImageIcon size={12} />,
};
const typeLabel: Record<string, string> = {
  TEXT: "Lectura", VIDEO: "Video", AUDIO: "Audio", GALLERY: "Galería",
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await api.circulo.bySlug({ slug });
  return {
    title: post ? `${post.title} — El Círculo` : "El Círculo",
    description: post?.excerpt ?? undefined,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await api.circulo.bySlug({ slug });
  if (!post) notFound();

  return (
    <>
      <Navbar />

      <main className="bg-crema min-h-screen">
        {/* Breadcrumb */}
        <div className="border-b-2 border-morado/10 px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/circulo"
              className="inline-flex items-center gap-2 font-sans text-[0.75rem] text-tierra/60 hover:text-morado tracking-widest uppercase transition-colors"
            >
              <ArrowLeft size={11} /> El Círculo
            </Link>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-6 py-10">
          {/* Encabezado */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 font-sans text-[0.62rem] text-morado tracking-widest uppercase font-bold">
                {typeIcon[post.contentType]} {typeLabel[post.contentType]}
              </span>
              {post.publishedAt && (
                <span className="font-sans text-[0.7rem] text-tierra/45 tracking-wide">
                  {fmt.format(post.publishedAt)}
                </span>
              )}
            </div>
            <h1 className="font-display uppercase text-[clamp(2.25rem,6vw,3.5rem)] text-tierra-dark leading-[0.95] tracking-wide">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="font-sans italic text-tierra-dark/75 text-lg mt-4 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Cover */}
          {post.coverImageUrl && (
            <div className="relative border-2 border-morado-dark block-shadow mb-8 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImageUrl}
                alt=""
                className={`w-full object-cover ${post.locked ? "blur-md scale-105" : ""}`}
              />
            </div>
          )}

          {/* Contenido o paywall */}
          {post.locked ? (
            <div className="bg-dorado-light border-2 border-morado-dark block-shadow p-8 sm:p-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-morado-dark border-2 border-morado-dark mb-5">
                <Lock size={26} className="text-dorado" strokeWidth={1.8} />
              </div>
              <h2 className="font-display uppercase text-2xl sm:text-3xl text-tierra-dark tracking-wide leading-none mb-3">
                Contenido para miembras
              </h2>
              <p className="font-sans text-tierra-dark/80 text-[15px] leading-relaxed max-w-md mx-auto mb-7">
                Este contenido es parte del Círculo. Sumate y accedé a todos los rituales,
                meditaciones, lecturas y cursos — todos los meses.
              </p>
              <Link
                href={CIRCULO_CHECKOUT}
                className="inline-flex items-center gap-2 bg-morado-dark text-crema font-sans font-semibold text-[0.75rem] px-8 py-4 border-2 border-morado-dark hover:bg-morado transition-colors tracking-widest uppercase block-shadow"
              >
                <Sparkles size={14} /> Sumate al Círculo
              </Link>
              <p className="font-sans text-[0.7rem] text-tierra-dark/55 tracking-wide mt-4">
                ¿Ya sos miembra?{" "}
                <Link href="/login" className="text-morado-dark font-semibold underline underline-offset-2">
                  Iniciá sesión
                </Link>
              </p>
            </div>
          ) : (
            <PostBody post={post} />
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}
