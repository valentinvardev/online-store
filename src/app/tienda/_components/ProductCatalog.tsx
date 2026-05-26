"use client";

import { useState } from "react";
import { useCart } from "../../_components/cart/CartContext";

type Category = "Todos" | "Físico" | "Digital" | "Personalizado";

type Product = {
  id: number;
  name: string;
  category: Exclude<Category, "Todos">;
  price: string;
  priceOld?: string;
  badge?: "Nuevo" | "Oferta" | "Más vendido" | "Agotado";
  desc: string;
  gradient: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Kit de Inicio Ritual",
    category: "Físico",
    price: "$45",
    badge: "Más vendido",
    desc: "Cristales, hierbas secas y vela ritual seleccionados con intención para tu primer altar.",
    gradient: "from-verde via-celeste to-morado-light",
  },
  {
    id: 2,
    name: "Vela Rituálica",
    category: "Personalizado",
    price: "$35",
    desc: "Elaborada a tu pedido con tus intenciones, hierbas específicas y color a elección.",
    gradient: "from-dorado via-rosa to-morado",
  },
  {
    id: 3,
    name: "Cristal de Cuarzo Rosa",
    category: "Físico",
    price: "$22",
    badge: "Nuevo",
    desc: "Cuarzo rosa natural de alta calidad, ideal para rituales de amor propio y apertura del corazón.",
    gradient: "from-rosa via-morado-light to-celeste",
  },
  {
    id: 4,
    name: "Set de Hierbas Rituales",
    category: "Físico",
    price: "$18",
    priceOld: "$24",
    badge: "Oferta",
    desc: "Mezcla de lavanda, romero, manzanilla y salvia blanca. Perfectas para sahumerios y limpiezas.",
    gradient: "from-verde via-verde-light to-dorado",
  },
  {
    id: 5,
    name: "Incienso Sagrado",
    category: "Físico",
    price: "$14",
    desc: "Conos y varillas artesanales con fragancias de palo santo, mirra y nag champa.",
    gradient: "from-tierra-light via-dorado to-rosa",
  },
  {
    id: 6,
    name: "Piedras de Protección",
    category: "Físico",
    price: "$30",
    desc: "Set de obsidiana negra, ojo de tigre y turmalina negra. Escudo energético para tu espacio.",
    gradient: "from-morado-dark via-morado to-morado-light",
  },
  {
    id: 7,
    name: "Oráculo de la Reina",
    category: "Digital",
    price: "$25",
    desc: "Deck de 40 cartas digitales con guía de interpretación para tu práctica diaria.",
    gradient: "from-morado via-morado-light to-rosa",
  },
  {
    id: 8,
    name: "Almanaque Lunar 2025",
    category: "Digital",
    price: "$12",
    desc: "PDF descargable con ciclos lunares, rituales sugeridos y afirmaciones para cada fase.",
    gradient: "from-morado-mid via-morado to-rosa",
  },
  {
    id: 9,
    name: "Carta Astral PDF",
    category: "Digital",
    price: "$30",
    badge: "Nuevo",
    desc: "Interpretación completa de tu carta natal en PDF: planetas, casas, aspectos y tránsitos actuales.",
    gradient: "from-celeste via-morado to-rosa",
  },
  {
    id: 10,
    name: "Agenda Espiritual 2025",
    category: "Digital",
    price: "$15",
    priceOld: "$20",
    badge: "Oferta",
    desc: "Planificador digital con lunas, fechas de poder, rituales estacionales y espacio de reflexión.",
    gradient: "from-morado via-rosa to-dorado",
  },
  {
    id: 11,
    name: "Ritual Personalizado",
    category: "Personalizado",
    price: "$60",
    desc: "Diseño de un ritual completo a medida: propósito, elementos, guía paso a paso y seguimiento.",
    gradient: "from-dorado via-morado to-rosa",
  },
  {
    id: 12,
    name: "Kit Luna Nueva",
    category: "Físico",
    price: "$38",
    desc: "Todo lo necesario para tu ritual de luna nueva: vela, cristal, papel de intención y guía.",
    gradient: "from-morado-dark via-celeste to-morado-light",
  },
];

const categories: Category[] = ["Todos", "Físico", "Digital", "Personalizado"];

const badgeStyles: Record<string, string> = {
  "Nuevo":       "bg-celeste/20 text-celeste border-celeste/30",
  "Oferta":      "bg-rosa/15 text-rosa border-rosa/30",
  "Más vendido": "bg-dorado/20 text-tierra-dark border-dorado/40",
  "Agotado":     "bg-tierra/10 text-tierra/60 border-tierra/20",
};

export default function ProductCatalog() {
  const [active, setActive] = useState<Category>("Todos");
  const { addItem } = useCart();

  const filtered = active === "Todos"
    ? products
    : products.filter((p) => p.category === active);

  return (
    <div>
      {/* Header + filtros */}
      <div className="border-b-2 border-morado/10 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="font-sans text-xs text-tierra/40 tracking-widest uppercase">
            {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-sans text-[0.65rem] px-4 py-2 border-2 tracking-widest uppercase transition-colors ${
                  active === cat
                    ? "bg-morado-dark text-crema border-morado-dark"
                    : "border-morado/20 text-morado/60 hover:border-morado hover:text-morado"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grilla de productos */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <article
              key={product.id}
              className="bg-white border-2 border-morado-dark overflow-hidden block-shadow group cursor-pointer flex flex-col"
            >
              {/* Imagen / placeholder */}
              <div className={`h-52 bg-gradient-to-br ${product.gradient} relative flex items-center justify-center shrink-0`}>
                <div className="w-14 h-14 bg-white/20 border-2 border-white/50 flex items-center justify-center">
                  <span className="text-white text-xl">✦</span>
                </div>
                {product.badge && (
                  <span className={`absolute top-3 left-3 font-sans text-[0.58rem] px-2.5 py-1 border tracking-widest uppercase ${badgeStyles[product.badge]}`}>
                    {product.badge}
                  </span>
                )}
                <span className="absolute top-3 right-3 font-sans text-[0.55rem] text-white/50 tracking-[0.3em] uppercase bg-black/20 px-2 py-1">
                  {product.category}
                </span>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-sans font-semibold text-base text-tierra-dark mb-2 group-hover:text-morado transition-colors leading-snug">
                  {product.name}
                </h3>
                <p className="font-sans text-[0.72rem] text-tierra/50 mb-5 leading-relaxed tracking-wide flex-1">
                  {product.desc}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl text-morado tracking-wide">{product.price}</span>
                    {product.priceOld && (
                      <span className="font-sans text-xs text-tierra/35 line-through">{product.priceOld}</span>
                    )}
                  </div>
                  <button
                    disabled={product.badge === "Agotado"}
                    onClick={() => addItem({
                      id: product.id,
                      name: product.name,
                      category: product.category,
                      price: Number(product.price.replace(/[^0-9.]/g, "")),
                      priceLabel: product.price,
                      gradient: product.gradient,
                    })}
                    className="font-sans text-[0.65rem] px-4 py-2.5 border-2 border-morado-dark text-morado hover:bg-morado hover:text-crema transition-colors tracking-widest uppercase block-shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {product.badge === "Agotado" ? "Agotado" : "Agregar"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
