import Navbar from "../_components/home/Navbar";
import Footer from "../_components/home/Footer";
import CursosBanner from "./_components/CursosBanner";
import CursosCatalog from "./_components/CursosCatalog";

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
      <div className="bg-verde-light relative py-14 px-6 overflow-hidden">
        {/* Degradado de verdes claros con shimmer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #5fa569 0%, #6bae75 25%, #7bc888 55%, #6bae75 85%, #5fa569 100%)" }} />
          <div className="absolute inset-0 animate-gradient-breathe" style={{ background: "linear-gradient(180deg, #6bae75 0%, #7bc888 30%, #8fd4a0 65%, #7bc888 90%, #6bae75 100%)" }} />
          <div className="absolute inset-x-0 h-[35%] animate-shimmer-fall" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)" }} />
          <div className="absolute inset-x-0 h-[45%] animate-shimmer-fall-slow" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(143,212,160,0.28) 50%, transparent 100%)" }} />

          {/* Estrellitas dispersas */}
          <span className="absolute top-[12%] right-[12%] font-display text-crema text-base select-none drop-shadow-[0_0_8px_rgba(251,245,230,0.7)]">✦</span>
          <span className="absolute top-[24%] left-[15%] font-display text-crema/90 text-[13px] select-none drop-shadow-[0_0_6px_rgba(251,245,230,0.6)]">⋆</span>
          <span className="absolute top-[38%] right-[18%] font-display text-crema text-sm select-none drop-shadow-[0_0_7px_rgba(251,245,230,0.7)]">✧</span>
          <span className="absolute top-[52%] left-[35%] font-display text-crema/85 text-base select-none drop-shadow-[0_0_8px_rgba(251,245,230,0.6)]">✦</span>
          <span className="absolute top-[68%] right-[8%] font-display text-crema/90 text-[0.8rem] select-none">⋆</span>
          <span className="absolute top-[78%] left-[60%] font-display text-crema text-sm select-none drop-shadow-[0_0_7px_rgba(251,245,230,0.7)]">✧</span>
          <span className="absolute top-[18%] left-[42%] font-display text-crema/75 text-[0.75rem] select-none">·</span>
          <span className="absolute top-[44%] right-[45%] font-display text-crema/70 text-[0.8rem] select-none">·</span>
          <span className="absolute top-[60%] right-[55%] font-display text-crema/80 text-[13px] select-none">⋆</span>
          <span className="absolute top-[85%] right-[25%] font-display text-crema/65 text-[0.75rem] select-none">·</span>
          <span className="absolute top-[30%] left-[5%] font-display text-crema/85 text-[0.8rem] select-none">⋆</span>
          <span className="absolute top-[88%] left-[8%] font-display text-crema text-[13px] select-none drop-shadow-[0_0_6px_rgba(251,245,230,0.7)]">✦</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-5">
            <span className="font-sans text-[0.8rem] text-crema/85 tracking-[0.4em] uppercase">
              Aprendé a tu ritmo
            </span>
          </div>
          <h1 className="font-display uppercase text-[clamp(3rem,8vw,5rem)] text-crema leading-none tracking-wide" style={{ textShadow: "0 4px 16px rgba(15,61,36,0.5)" }}>
            Tu lenguaje<br />sagrado
          </h1>
          <p className="font-sans italic text-crema/85 text-base mt-4 max-w-md leading-relaxed">
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
