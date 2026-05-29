import Navbar from "../_components/home/Navbar";
import Footer from "../_components/home/Footer";
import PromoBanner from "./_components/PromoBanner";
import ProductCatalog from "./_components/ProductCatalog";

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
      <div className="bg-crema border-b-2 border-morado/10 py-10 sm:py-12 lg:py-14 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display uppercase text-[clamp(3rem,12vw,7.5rem)] text-tierra-dark leading-[0.88] tracking-tight">
            Del altar<br />a tu vida
          </h1>
          <p className="font-sans italic text-tierra/55 text-sm sm:text-base mt-3 sm:mt-4 max-w-md leading-relaxed">
            Cada pieza lleva el cuidado de una práctica real. No es decoración — es herramienta.
          </p>
        </div>
      </div>

      <div className="bg-crema min-h-screen">
        <ProductCatalog />
      </div>

      <Footer />
    </>
  );
}
