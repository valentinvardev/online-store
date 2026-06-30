import RevealOnScroll from "./RevealOnScroll";
import Stickers from "../Stickers";
import EditableSection from "../editor/EditableSection";

type Product = {
  id: number;
  name: string;
  category: "Digital" | "Físico" | "Personalizado";
  price: string;
  desc: string;
  gradient: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Oráculo de la Reina",
    category: "Digital",
    price: "$25",
    desc: "Deck de 40 cartas digitales con guía de interpretación para tu práctica diaria.",
    gradient: "from-morado via-morado-light to-rosa",
  },
  {
    id: 2,
    name: "Kit de Inicio Ritual",
    category: "Físico",
    price: "$45",
    desc: "Cristales, hierbas secas y vela ritual seleccionados con intención para tu primer altar.",
    gradient: "from-verde via-celeste to-morado-light",
  },
  {
    id: 3,
    name: "Almanaque Lunar 2025",
    category: "Digital",
    price: "$12",
    desc: "PDF descargable con ciclos lunares, rituales sugeridos y afirmaciones para cada fase.",
    gradient: "from-morado-mid via-morado to-rosa",
  },
  {
    id: 4,
    name: "Vela Rituálica",
    category: "Personalizado",
    price: "$35",
    desc: "Elaborada a tu pedido con tus intenciones, hierbas específicas y color a elección.",
    gradient: "from-dorado via-rosa to-morado",
  },
];

export default function TiendaSection() {
  return (
    <EditableSection id="home-tienda" label="Inicio — Tienda" className="bg-dorado-light py-16 sm:py-20 lg:py-24 px-5 sm:px-6 overflow-hidden">
      <Stickers blend="multiply" items={[
        { id: "sticker-05", top: "5%",  left: "3%",  size: 124, opacity: 0.42, rotate: -12, anim: "float-slow" },
        { id: "sticker-07", top: "5%",  right: "3%", size: 117, opacity: 0.4,  rotate: 10,  anim: "spin", delay: 0.6 },
        { id: "sticker-16", bottom: "5%", right: "3%", size: 105, opacity: 0.4, rotate: -8, anim: "float", delay: 1.2 },
        { id: "sticker-18", bottom: "5%", left: "3%",  size: 124, opacity: 0.42, rotate: 14, anim: "float-slow", delay: 1.8 },
      ]} />
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll direction="up" delay={0}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 lg:mb-14 gap-4 text-center sm:text-left">
            <h2 className="font-display uppercase text-[clamp(2.75rem,7vw,4rem)] text-tierra-dark leading-[0.95] tracking-wide">
              Del altar<br />a tu vida
            </h2>
            <a href="/tienda" className="font-sans text-[13px] text-morado hover:text-morado-light transition-colors tracking-widest uppercase self-center sm:self-end shrink-0">
              Ver toda la tienda →
            </a>
          </div>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {products.map((product, i) => (
            <RevealOnScroll key={product.id} direction="up" delay={100 * i}>
              <article className="bg-white border-2 border-morado-dark overflow-hidden block-shadow cursor-pointer h-full group flex flex-col">
                <div className={`h-52 bg-gradient-to-br ${product.gradient} relative flex items-center justify-center shrink-0`}>
                  <div className="w-14 h-14 bg-white/20 border-2 border-white/60 flex items-center justify-center">
                    <span className="text-white text-xl">✦</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-sans font-bold text-xl text-tierra-dark mb-2 group-hover:text-morado transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="font-sans text-[15px] text-tierra-dark/85 mb-5 leading-relaxed tracking-wide flex-1">
                    {product.desc}
                  </p>
                  <a
                    href="/tienda"
                    className="inline-flex items-center gap-2 font-sans font-semibold text-[14px] text-morado hover:text-morado-dark transition-colors tracking-wide group/link mt-auto"
                  >
                    Ver producto
                    <span className="transition-transform group-hover/link:translate-x-1">→</span>
                  </a>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </EditableSection>
  );
}
