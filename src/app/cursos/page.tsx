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
        {/* Aurora boreal — verde puro */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[5%] left-[5%] w-80 sm:w-[28rem] h-80 sm:h-[28rem] rounded-full bg-verde blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-[8%] right-[10%] w-80 sm:w-[30rem] h-80 sm:h-[30rem] rounded-full bg-verde-pale blur-3xl opacity-65 animate-blob" style={{ animationDelay: "3s" }} />
          <div className="absolute bottom-[5%] left-[15%] w-96 sm:w-[36rem] h-96 sm:h-[36rem] rounded-full bg-verde blur-3xl opacity-70 animate-blob" style={{ animationDelay: "6s" }} />
          <div className="absolute top-[35%] right-[8%] w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-verde blur-3xl opacity-60 animate-blob" style={{ animationDelay: "9s" }} />
          <div className="absolute top-[42%] left-[38%] w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-verde blur-3xl opacity-55 animate-blob" style={{ animationDelay: "4.5s" }} />
          <div className="absolute bottom-[12%] right-[20%] w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-verde-pale blur-3xl opacity-55 animate-blob" style={{ animationDelay: "7.5s" }} />
          <div className="absolute top-[18%] left-[50%] w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-verde-pale blur-3xl opacity-50 animate-blob" style={{ animationDelay: "1.5s" }} />

          {/* Estrellitas dispersas */}
          <span className="absolute top-[12%] right-[12%] font-display text-crema text-base select-none drop-shadow-[0_0_8px_rgba(251,245,230,0.7)]">✦</span>
          <span className="absolute top-[24%] left-[15%] font-display text-crema/90 text-xs select-none drop-shadow-[0_0_6px_rgba(251,245,230,0.6)]">⋆</span>
          <span className="absolute top-[38%] right-[18%] font-display text-crema text-sm select-none drop-shadow-[0_0_7px_rgba(251,245,230,0.7)]">✧</span>
          <span className="absolute top-[52%] left-[35%] font-display text-crema/85 text-base select-none drop-shadow-[0_0_8px_rgba(251,245,230,0.6)]">✦</span>
          <span className="absolute top-[68%] right-[8%] font-display text-crema/90 text-[0.7rem] select-none">⋆</span>
          <span className="absolute top-[78%] left-[60%] font-display text-crema text-sm select-none drop-shadow-[0_0_7px_rgba(251,245,230,0.7)]">✧</span>
          <span className="absolute top-[18%] left-[42%] font-display text-crema/75 text-[0.55rem] select-none">·</span>
          <span className="absolute top-[44%] right-[45%] font-display text-crema/70 text-[0.6rem] select-none">·</span>
          <span className="absolute top-[60%] right-[55%] font-display text-crema/80 text-xs select-none">⋆</span>
          <span className="absolute top-[85%] right-[25%] font-display text-crema/65 text-[0.55rem] select-none">·</span>
          <span className="absolute top-[30%] left-[5%] font-display text-crema/85 text-[0.7rem] select-none">⋆</span>
          <span className="absolute top-[88%] left-[8%] font-display text-crema text-xs select-none drop-shadow-[0_0_6px_rgba(251,245,230,0.7)]">✦</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-5">
            <span className="font-sans text-[0.6rem] text-crema/85 tracking-[0.4em] uppercase">
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
