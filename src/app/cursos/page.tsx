import Navbar from "../_components/home/Navbar";
import Footer from "../_components/home/Footer";
import CursosBanner from "./_components/CursosBanner";
import CursosCatalog from "./_components/CursosCatalog";
import ReseñasScroll from "./_components/ReseñasScroll";

export const metadata = {
  title: "Cursos — La Reina de Bastos",
  description: "Aprendé tarot, astrología, rituales lunares y más. A tu ritmo, con profundidad real.",
};

export default function CursosPage() {
  return (
    <>
      <Navbar />
      <CursosBanner />

      {/* Encabezado */}
      <div className="bg-morado-dark py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-5">
            <span className="font-sans text-[0.6rem] text-dorado tracking-[0.4em] uppercase">
              Aprendé a tu ritmo
            </span>
          </div>
          <h1 className="font-display uppercase text-[clamp(2.5rem,7vw,5rem)] text-crema leading-none tracking-wide">
            Tu lenguaje<br />sagrado
          </h1>
          <p className="font-sans italic text-crema/45 text-base mt-4 max-w-md leading-relaxed">
            Tarot, astrología, rituales, chakras. Sin dogmas ni memorización — aprendés desde adentro.
          </p>
        </div>
      </div>

      <ReseñasScroll />

      <div className="bg-crema min-h-screen">
        <CursosCatalog />
      </div>

      <Footer />
    </>
  );
}
