import Navbar from "../_components/home/Navbar";
import Footer from "../_components/home/Footer";
import CursosBanner from "./_components/CursosBanner";
import CursosCatalog from "./_components/CursosCatalog";
import Stickers from "../_components/Stickers";

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
      <div className="bg-dorado-light relative py-14 px-6 overflow-hidden">
        {/* Degradado de amarillos con shimmer */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #f5c842 0%, #ffe066 30%, #fdf3c5 60%, #ffe066 85%, #f5c842 100%)" }} />
        <div className="absolute inset-0 animate-gradient-breathe" style={{ background: "linear-gradient(180deg, #ffe066 0%, #fdf3c5 35%, #fef7e0 65%, #fdf3c5 90%, #ffe066 100%)" }} />
        <div className="absolute inset-x-0 h-[40%] animate-shimmer-fall" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)" }} />
        <div className="absolute inset-x-0 h-[45%] animate-shimmer-fall-slow" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(253,243,197,0.4) 50%, transparent 100%)" }} />
        {/* Stickers decorativos */}
        <Stickers preset="solar" blend="multiply" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-5">
            <span className="font-sans font-semibold text-[0.85rem] text-tierra-dark tracking-[0.4em] uppercase">
              Aprendé a tu ritmo
            </span>
          </div>
          <h1 className="font-display uppercase text-[clamp(3rem,8vw,5rem)] text-tierra-dark leading-none tracking-wide">
            Tu lenguaje<br />sagrado
          </h1>
          <p className="font-sans italic text-tierra-dark/85 text-base sm:text-lg mt-4 max-w-md leading-relaxed">
            Tarot, astrología, rituales, chakras. Sin dogmas ni memorización — aprendés desde adentro.
          </p>
        </div>
      </div>

      <div className="bg-crema min-h-screen">
        <CursosCatalog />
      </div>

      <Footer />
    </>
  );
}
