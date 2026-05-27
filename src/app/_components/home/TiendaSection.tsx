"use client";

import RevealOnScroll from "./RevealOnScroll";
import { useCart } from "../cart/CartContext";

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
  const { addItem } = useCart();
  return (
    <section className="bg-crema py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll direction="left" delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <h2 className="font-display uppercase text-[clamp(2.2rem,6vw,4rem)] text-tierra-dark leading-none tracking-wide">
                Del altar<br />a tu vida
              </h2>
            </div>
            <a href="/tienda" className="font-sans text-xs text-morado hover:text-morado-light transition-colors tracking-widest uppercase self-start md:self-end">
              Ver toda la tienda →
            </a>
          </div>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <RevealOnScroll key={product.id} direction="up" delay={100 * i}>
              <article className="bg-white border-2 border-morado-dark overflow-hidden block-shadow cursor-pointer h-full group">
                <div className={`h-52 bg-gradient-to-br ${product.gradient} relative flex items-center justify-center`}>
                  <div className="w-14 h-14 bg-white/20 border-2 border-white/60 flex items-center justify-center">
                    <span className="text-white text-xl">✦</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase mb-1">{product.category}</p>
                  <h3 className="font-sans font-semibold text-lg text-tierra-dark mb-2 group-hover:text-morado transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="font-sans text-[0.72rem] text-tierra/50 mb-4 leading-relaxed tracking-wide">
                    {product.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-bold text-2xl text-morado">{product.price}</span>
                    <button
                      onClick={() => addItem({
                        id: product.id,
                        name: product.name,
                        category: product.category,
                        price: Number(product.price.replace(/[^0-9.]/g, "")),
                        priceLabel: product.price,
                        gradient: product.gradient,
                      })}
                      className="font-sans text-[0.7rem] px-4 py-2 border-2 border-morado-dark text-morado hover:bg-morado hover:text-crema transition-colors tracking-widest uppercase block-shadow-sm"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
