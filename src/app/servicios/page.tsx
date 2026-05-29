import Navbar from "../_components/home/Navbar";
import Footer from "../_components/home/Footer";
import ServiciosBanner from "./_components/ServiciosBanner";
import ServiciosGrid from "./_components/ServiciosGrid";
import ComoFunciona from "./_components/ComoFunciona";
import FAQ from "./_components/FAQ";
import ReservarCTA from "./_components/ReservarCTA";

export const metadata = {
  title: "Sesiones — La Reina de Bastos",
  description: "Lecturas de tarot, rituales personalizados y consultas astrológicas. Solo para vos.",
};

export default function ServiciosPage() {
  return (
    <>
      <Navbar />
      <ServiciosBanner />

      {/* Encabezado */}
      <div className="bg-crema border-b-2 border-morado/10 py-14 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-8 bg-morado/40" />
              <span className="font-sans text-[0.6rem] text-morado/65 tracking-[0.4em] uppercase">
                Solo para vos
              </span>
            </div>
            <h1 className="font-display uppercase text-[clamp(2rem,8vw,5rem)] text-tierra-dark leading-none tracking-wide">
              Sesiones<br />personales
            </h1>
          </div>
        </div>
      </div>

      <ServiciosGrid />
      <ComoFunciona />
      <FAQ />
      <ReservarCTA />
      <Footer />
    </>
  );
}
