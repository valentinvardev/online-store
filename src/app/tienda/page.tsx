import Navbar from "../_components/home/Navbar";
import Footer from "../_components/home/Footer";
import PromoBanner from "./_components/PromoBanner";
import ProductCatalog from "./_components/ProductCatalog";
import Stickers from "../_components/Stickers";

export const metadata = {
  title: "Tienda — La Reina de Bastos",
  description: "Objetos cargados de intención. Cristales, kits rituales, velas, oráculos y más.",
};

export default function TiendaPage() {
  return (
    <>
      <Navbar />
      <PromoBanner />

      {/* Encabezado de sección */}
      <div className="bg-dorado-light border-b-2 border-morado-dark/20 py-10 sm:py-12 lg:py-14 px-5 sm:px-6 relative overflow-hidden">
        {/* Stickers — distribuidos lejos del titulo izquierda. Mobile: solo top-right + bottom-right */}
        <Stickers blend="multiply" items={[
          { id: "sticker-22", top: "8%",    right: "5%",  size: 170, opacity: 0.42, rotate: 8,   anim: "float-slow" },
          { id: "sticker-15", top: "48%",   right: "12%", size: 130, opacity: 0.36, rotate: 14,  anim: "spin", delay: 1.2, hideOnMobile: true },
          { id: "sticker-04", bottom: "8%", right: "4%",  size: 160, opacity: 0.34, rotate: -10, anim: "float", delay: 0.6 },
          { id: "sticker-09", bottom: "12%", left: "58%", size: 115, opacity: 0.36, rotate: 6,   anim: "float-slow", delay: 1.8, hideOnMobile: true },
        ]} />
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="font-display uppercase text-[clamp(3rem,12vw,7.5rem)] text-tierra-dark leading-[0.88] tracking-tight">
            Del altar<br />a tu vida
          </h1>
          <p className="font-sans italic text-tierra-dark/85 text-base sm:text-lg mt-3 sm:mt-4 max-w-md leading-relaxed">
            Cada pieza lleva el cuidado de una práctica real. No es decoración — es herramienta.
          </p>
        </div>
      </div>

      <div className="bg-dorado-light min-h-screen">
        <ProductCatalog />
      </div>

      <Footer />
    </>
  );
}
