import Link from "next/link";
import { Sparkles } from "lucide-react";
import Navbar from "~/app/_components/home/Navbar";
import Footer from "~/app/_components/home/Footer";
import { api } from "~/trpc/server";
import { CIRCULO_CHECKOUT } from "~/lib/access";
import FeedPost from "./_components/FeedPost";

export const metadata = {
  title: "El Círculo — La Reina de Bastos",
  description: "Rituales, meditaciones, lecturas y comunidad. Todos los meses, directo a vos.",
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
                <h2 className="font-sans font-bold text-xl sm:text-2xl text-tierra-dark tracking-wide leading-tight mb-1.5">
                  Sumate al Círculo
                </h2>
                <p className="font-sans text-tierra-dark/80 text-sm tracking-wide">
                  Desbloqueá todo el contenido + todos los cursos. Cancelás cuando quieras.
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-center sm:items-end gap-2">
                <Link
                  href={CIRCULO_CHECKOUT}
                  className="inline-flex items-center gap-2 bg-morado-dark text-crema font-sans font-semibold text-[0.75rem] px-7 py-4 border-2 border-morado-dark hover:bg-morado transition-colors tracking-widest uppercase block-shadow"
                >
                  <Sparkles size={14} /> Quiero entrar
                </Link>
                <Link
                  href="/suscripciones"
                  className="font-sans text-[0.7rem] text-tierra-dark/70 hover:text-morado-dark underline underline-offset-2 tracking-wide transition-colors"
                >
                  Ver todo lo que incluye →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Feed */}
        <section className="px-5 sm:px-6 py-12">
          <div className="max-w-2xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <span className="font-display text-5xl text-morado/15 block mb-4">✦</span>
                <p className="font-sans text-tierra/65 text-sm tracking-wide">
                  Todavía no hay publicaciones. Muy pronto.
                </p>
              </div>
            ) : (
              <div className="space-y-7">
                {posts.map((p) => (
                  <FeedPost key={p.id} post={p} />
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
