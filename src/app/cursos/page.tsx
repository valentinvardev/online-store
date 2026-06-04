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
        {/* Mesh breathing — gradientes radiales que respiran */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[10%] -left-[5%] w-[40rem] h-[40rem] animate-mesh" style={{ background: "radial-gradient(circle, rgba(15,61,36,0.7) 0%, transparent 60%)", animationDuration: "13s" }} />
          <div className="absolute -top-[5%] -right-[10%] w-[42rem] h-[42rem] animate-mesh-alt" style={{ background: "radial-gradient(circle, rgba(26,77,46,0.65) 0%, transparent 60%)", animationDuration: "17s", animationDelay: "2s" }} />
          <div className="absolute -bottom-[15%] left-[10%] w-[48rem] h-[48rem] animate-mesh" style={{ background: "radial-gradient(circle, rgba(61,122,71,0.7) 0%, transparent 60%)", animationDuration: "15s", animationDelay: "5s" }} />
          <div className="absolute top-[30%] -right-[5%] w-[36rem] h-[36rem] animate-mesh-alt" style={{ background: "radial-gradient(circle, rgba(45,106,62,0.6) 0%, transparent 60%)", animationDuration: "19s", animationDelay: "7s" }} />
          <div className="absolute top-[40%] left-[30%] w-[32rem] h-[32rem] animate-mesh" style={{ background: "radial-gradient(circle, rgba(15,61,36,0.55) 0%, transparent 60%)", animationDuration: "16s", animationDelay: "3s" }} />
          <div className="absolute -bottom-[10%] -right-[15%] w-[40rem] h-[40rem] animate-mesh-alt" style={{ background: "radial-gradient(circle, rgba(61,122,71,0.6) 0%, transparent 60%)", animationDuration: "14s", animationDelay: "6s" }} />

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
