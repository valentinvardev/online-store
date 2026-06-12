import Link from "next/link";
import { Lock, FileText, Video, Headphones, Image as ImageIcon, Sparkles, ArrowRight } from "lucide-react";
import Navbar from "~/app/_components/home/Navbar";
import Footer from "~/app/_components/home/Footer";
import { api } from "~/trpc/server";
import { CIRCULO_CHECKOUT } from "~/lib/access";

export const metadata = {
  title: "El Círculo — La Reina de Bastos",
  description: "Rituales, meditaciones, lecturas y comunidad. Todos los meses, directo a vos.",
};

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

export default async function CirculoPage() {
  const { isMember, posts } = await api.circulo.feed();

  return (
    <>
      <Navbar />

      <main className="bg-crema min-h-screen">
        {/* Hero */}
        <section className="bg-morado-dark relative overflow-hidden py-16 sm:py-20 px-6">
          <span className="absolute top-8 right-10 font-display text-dorado/10 text-[7rem] leading-none select-none pointer-events-none">✦</span>
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <span className="font-sans text-[0.7rem] text-dorado tracking-[0.45em] uppercase block mb-4">
              {isMember ? "Tu espacio de socia" : "Membresía mensual"}
            </span>
            <h1 className="font-display uppercase text-[clamp(3rem,9vw,6rem)] text-crema leading-none tracking-wide">
              El Círculo
            </h1>
            <p className="font-sans italic text-crema/70 text-lg sm:text-xl max-w-xl mx-auto mt-5 leading-relaxed">
              Rituales, meditaciones, lecturas y comunidad. Todos los meses, directo a vos.
            </p>
          </div>
        </section>

        {/* Banner de conversión (solo si no es socia) */}
        {!isMember && (
          <section className="bg-dorado-light border-b-4 border-morado-dark px-6 py-8">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
              <div>
                <h2 className="font-display uppercase text-2xl text-tierra-dark tracking-wide leading-none mb-1.5">
                  Sumate al Círculo
                </h2>
                <p className="font-sans text-tierra-dark/80 text-sm tracking-wide">
                  Desbloqueá todo el contenido + todos los cursos. Cancelás cuando quieras.
                </p>
              </div>
              <Link
                href={CIRCULO_CHECKOUT}
                className="shrink-0 inline-flex items-center gap-2 bg-morado-dark text-crema font-sans font-semibold text-[0.75rem] px-7 py-4 border-2 border-morado-dark hover:bg-morado transition-colors tracking-widest uppercase block-shadow"
              >
                <Sparkles size={14} /> Quiero entrar
              </Link>
            </div>
          </section>
        )}

        {/* Feed */}
        <section className="px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <span className="font-display text-5xl text-morado/15 block mb-4">✦</span>
                <p className="font-sans text-tierra/65 text-sm tracking-wide">
                  Todavía no hay publicaciones. Muy pronto.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/circulo/${p.slug}`}
                    className="group block bg-white border-2 border-morado-dark block-shadow overflow-hidden hover:translate-y-[-2px] transition-transform"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Cover */}
                      <div className="relative sm:w-56 shrink-0 aspect-[16/10] sm:aspect-auto bg-morado-mid overflow-hidden">
                        {p.coverImageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.coverImageUrl} alt="" className={`w-full h-full object-cover ${p.locked ? "blur-sm scale-105" : ""}`} />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-morado via-morado-mid to-rosa flex items-center justify-center">
                            <span className="font-display text-crema/20 text-5xl">✦</span>
                          </div>
                        )}
                        {p.locked && (
                          <div className="absolute inset-0 bg-morado-dark/55 flex items-center justify-center">
                            <Lock size={26} className="text-crema/90" strokeWidth={1.8} />
                          </div>
                        )}
                      </div>

                      {/* Texto */}
                      <div className="flex-1 p-5 sm:p-6 flex flex-col">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-flex items-center gap-1.5 font-sans text-[0.6rem] text-morado tracking-widest uppercase font-bold">
                            {typeIcon[p.contentType]} {typeLabel[p.contentType]}
                          </span>
                          {p.locked && (
                            <span className="inline-flex items-center gap-1 font-sans text-[0.6rem] text-tierra/50 tracking-widest uppercase">
                              <Lock size={9} /> Socias
                            </span>
                          )}
                          {p.publishedAt && (
                            <span className="font-sans text-[0.65rem] text-tierra/45 tracking-wide ml-auto">
                              {fmt.format(p.publishedAt)}
                            </span>
                          )}
                        </div>
                        <h3 className="font-sans font-bold text-lg sm:text-xl text-tierra-dark tracking-wide leading-snug mb-1.5 group-hover:text-morado transition-colors">
                          {p.title}
                        </h3>
                        {p.excerpt && (
                          <p className="font-sans text-tierra/70 text-[14px] leading-relaxed tracking-wide line-clamp-2">
                            {p.excerpt}
                          </p>
                        )}
                        <span className="mt-auto pt-4 inline-flex items-center gap-1.5 font-sans font-semibold text-[0.7rem] text-morado tracking-widest uppercase">
                          {p.locked ? "Desbloquear" : "Leer"}
                          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
