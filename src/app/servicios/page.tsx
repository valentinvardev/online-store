import Navbar from "../_components/home/Navbar";
import Footer from "../_components/home/Footer";
import Stickers from "../_components/Stickers";
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
      <div className="bg-crema border-b-2 border-morado/10 py-14 px-6 relative overflow-hidden">
        {/* Stickers — sin la planta en maceta (sticker-07), tamaños bumpeados en mobile */}
        <Stickers blend="multiply" items={[
          { id: "sticker-10", top: "8%",   left: "5%",    size: 140, opacity: 0.36, rotate: -8,  anim: "float", delay: 0.8 },
          { id: "sticker-16", top: "15%",  right: "6%",   size: 150, opacity: 0.38, rotate: 12,  anim: "float-slow", delay: 1.4 },
          { id: "sticker-18", bottom: "10%", right: "5%", size: 160, opacity: 0.38, rotate: 0,   anim: "float", delay: 0.4 },
          { id: "sticker-21", bottom: "12%", left: "8%",  size: 130, opacity: 0.36, rotate: -6,  anim: "float-slow", delay: 2 },
          { id: "sticker-02", top: "50%",  left: "48%",   size: 100, opacity: 0.32, rotate: 10,  anim: "spin", delay: 3, hideOnMobile: true },
        ]} />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
          <div>
            <h1 className="font-display uppercase text-[clamp(3rem,8vw,5rem)] text-tierra-dark leading-none tracking-wide">
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
