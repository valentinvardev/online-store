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
      <div className="bg-crema border-b-2 border-morado/10 py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-8 bg-dorado" />
            <span className="font-sans text-[0.6rem] text-dorado tracking-[0.4em] uppercase">
              Objetos con intención
            </span>
          </div>
          <h1 className="font-display uppercase text-[clamp(2.5rem,7vw,5rem)] text-tierra-dark leading-none tracking-wide">
            Del altar<br />a tu vida
          </h1>
          <p className="font-sans italic text-tierra/55 text-base mt-4 max-w-md leading-relaxed">
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
