import Link from "next/link";
import Navbar from "~/app/_components/home/Navbar";
import Footer from "~/app/_components/home/Footer";

export default function PagoPendientePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-crema flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-dorado/10 border-2 border-dorado/30 flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl">◐</span>
          </div>
          <h1 className="font-display uppercase text-[clamp(2rem,6vw,3.5rem)] text-tierra-dark leading-none tracking-wide mb-4">
            Pago pendiente
          </h1>
          <p className="font-sans text-tierra/55 text-base leading-relaxed mb-2">
            Tu pago está siendo procesado.
          </p>
          <p className="font-sans text-tierra/40 text-sm leading-relaxed mb-10">
            Esto puede tardar unos minutos. Te avisamos por email cuando se confirme.
          </p>
          <Link
            href="/"
            className="inline-block font-sans font-semibold text-xs px-8 py-4 border-2 border-morado text-morado hover:bg-morado/5 transition-colors tracking-widest uppercase block-shadow-sm"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
