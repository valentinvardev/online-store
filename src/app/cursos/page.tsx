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
      <div className="bg-verde relative py-14 px-6 overflow-hidden">
        {/* SVG waves flowing — ondas orgánicas de verde */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 2400 400" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-[200%] h-[75%] animate-wave-slow">
            <path d="M0,200 C300,140 600,260 900,200 C1200,140 1500,260 1800,200 C2100,140 2400,260 2400,200 L2400,400 L0,400 Z" fill="#0f3d24" />
          </svg>
          <svg viewBox="0 0 2400 400" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-[200%] h-[55%] animate-wave-medium">
            <path d="M0,150 C400,80 800,220 1200,150 C1600,80 2000,220 2400,150 L2400,400 L0,400 Z" fill="#1a4d2e" />
          </svg>
          <svg viewBox="0 0 2400 400" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-[200%] h-[35%] animate-wave-fast">
            <path d="M0,100 C500,50 1000,150 1500,100 C2000,50 2400,150 2400,100 L2400,400 L0,400 Z" fill="#2d6a3e" />
          </svg>

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
          <h1 className="font-display uppercase text-[clamp(2rem,8vw,5rem)] text-crema leading-none tracking-wide">
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
