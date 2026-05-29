"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import { ShoppingBag, Check, ArrowLeft, Package, Zap, Sparkles } from "lucide-react";
import Navbar from "~/app/_components/home/Navbar";
import Footer from "~/app/_components/home/Footer";
import { productos } from "../_data/productos";
import { useCart } from "~/app/_components/cart/CartContext";

const badgeStyles: Record<string, string> = {
  "Nuevo":       "bg-celeste/20 text-celeste border-celeste/30",
  "Oferta":      "bg-rosa/15 text-rosa border-rosa/30",
  "Más vendido": "bg-dorado/20 text-tierra-dark border-dorado/40",
  "Agotado":     "bg-tierra/10 text-tierra/60 border-tierra/20",
};

const categoryIcons: Record<string, React.ReactNode> = {
  "Físico":        <Package size={13} strokeWidth={1.5} />,
  "Digital":       <Zap size={13} strokeWidth={1.5} />,
  "Personalizado": <Sparkles size={13} strokeWidth={1.5} />,
};

const categoryColors: Record<string, string> = {
  "Físico":        "text-verde bg-verde/10 border-verde/25",
  "Digital":       "text-celeste bg-celeste/10 border-celeste/25",
  "Personalizado": "text-rosa bg-rosa/8 border-rosa/20",
};

export default function ProductoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { addItem } = useCart();

  const producto = productos.find((p) => p.slug === slug);
  if (!producto) notFound();

  const relacionados = productos
    .filter((p) => p.category === producto.category && p.id !== producto.id)
    .slice(0, 3);

  const isAgotado = producto.badge === "Agotado";

  return (
    <>
      <Navbar />

      {/* Barra breadcrumb */}
      <div className="bg-crema border-b border-morado/8">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 font-sans text-[0.6rem] text-tierra/35 tracking-widest uppercase">
          <Link href="/tienda" className="hover:text-morado transition-colors flex items-center gap-1.5">
            <ArrowLeft size={11} /> Tienda
          </Link>
          <span>/</span>
          <span className="text-tierra/55">{producto.name}</span>
        </div>
      </div>

      {/* ── HERO PRODUCTO ── */}
      <section className="bg-crema py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Visual del producto */}
            <div className="space-y-4">
              <div className={`relative bg-gradient-to-br ${producto.gradient} border-4 border-morado-dark block-shadow overflow-hidden`}
                style={{ aspectRatio: "4/3" }}>
                {/* Ornamentos de fondo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-white/10 text-[12rem] leading-none select-none">✦</span>
                </div>
                {/* Ícono central */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 bg-white/20 border-2 border-white/40 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white text-3xl">✦</span>
                  </div>
                  <p className="font-sans text-[0.55rem] text-white/40 tracking-[0.35em] uppercase">
                    {producto.category}
                  </p>
                </div>
                {/* Badge */}
                {producto.badge && (
                  <span className={`absolute top-4 left-4 font-sans text-[0.6rem] px-3 py-1.5 border tracking-widest uppercase ${badgeStyles[producto.badge]}`}>
                    {producto.badge}
                  </span>
                )}
              </div>

              {/* Mini thumbnails decorativos */}
              <div className="grid grid-cols-3 gap-3">
                {[0.6, 0.4, 0.8].map((op, i) => (
                  <div key={i}
                    className={`bg-gradient-to-br ${producto.gradient} border-2 border-morado/20 h-20 flex items-center justify-center`}
                    style={{ opacity: op }}>
                    <span className="text-white/50 text-lg">✦</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              {/* Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`flex items-center gap-1.5 font-sans text-[0.6rem] px-2.5 py-1 border tracking-widest uppercase ${categoryColors[producto.category]}`}>
                  {categoryIcons[producto.category]}
                  {producto.category}
                </span>
                {producto.badge && producto.badge !== "Agotado" && (
                  <span className={`font-sans text-[0.6rem] px-2.5 py-1 border tracking-widest uppercase ${badgeStyles[producto.badge]}`}>
                    {producto.badge}
                  </span>
                )}
              </div>

              {/* Nombre */}
              <div>
                <h1 className="font-display uppercase text-[clamp(2rem,5vw,3.8rem)] text-tierra-dark leading-none tracking-wide">
                  {producto.name}
                </h1>
                <p className="font-sans text-tierra/50 text-sm mt-3 leading-relaxed tracking-wide max-w-md">
                  {producto.desc}
                </p>
              </div>

              {/* Precio */}
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl text-morado">{producto.price}</span>
                {producto.priceOld && (
                  <span className="font-sans text-base text-tierra/30 line-through">{producto.priceOld}</span>
                )}
                {producto.priceOld && (
                  <span className="font-sans text-[0.6rem] text-rosa tracking-widest uppercase border border-rosa/30 px-2 py-1">
                    Oferta
                  </span>
                )}
              </div>

              {/* Features rápidas */}
              <ul className="space-y-2">
                {producto.features.slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 font-sans text-sm text-tierra/65 tracking-wide">
                    <Check size={13} className="text-verde shrink-0" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="space-y-3 pt-2">
                <button
                  disabled={isAgotado}
                  onClick={() => addItem({
                    id: producto.id,
                    name: producto.name,
                    category: producto.category,
                    itemType: "product",
                    price: producto.priceNum,
                    priceLabel: producto.price,
                    gradient: producto.gradient,
                  })}
                  className="w-full flex items-center justify-center gap-2.5 bg-morado-dark text-crema font-sans font-semibold text-[0.7rem] py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-morado transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShoppingBag size={15} strokeWidth={1.8} />
                  {isAgotado ? "Agotado" : "Agregar al carrito"}
                </button>
                <Link
                  href="/tienda"
                  className="block w-full text-center font-sans text-[0.65rem] py-3 tracking-widest uppercase border-2 border-morado/15 text-tierra/40 hover:border-morado/40 hover:text-tierra transition-colors"
                >
                  Seguir comprando
                </Link>
              </div>

              {/* Detalles */}
              <div className="border-t border-morado/10 pt-5 space-y-3">
                {producto.details.map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="font-sans text-[0.65rem] text-tierra/40 tracking-widest uppercase">{label}</span>
                    <span className="font-sans text-sm text-tierra-dark font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESCRIPCIÓN COMPLETA ── */}
      <section className="bg-crema-dark border-t border-morado/8 py-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[3fr_2fr] gap-14">

          {/* Descripción */}
          <div>
            <h2 className="font-display uppercase text-[clamp(1.6rem,4vw,2.5rem)] text-tierra-dark leading-none tracking-wide mb-6">
              Sobre este producto
            </h2>
            <div className="bg-crema border-2 border-morado/10 p-8">
              <p className="font-sans text-tierra/65 text-sm leading-relaxed tracking-wide">
                {producto.descLong}
              </p>
            </div>
          </div>

          {/* Todo lo que incluye */}
          <div>
            <h2 className="font-display uppercase text-[clamp(1.6rem,4vw,2.5rem)] text-tierra-dark leading-none tracking-wide mb-6">
              Qué incluye
            </h2>
            <div className="bg-crema border-2 border-morado-dark block-shadow p-6 space-y-3">
              {producto.features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-morado/8 last:border-0">
                  <span className="text-dorado text-sm shrink-0 mt-0.5">✦</span>
                  <span className="font-sans text-sm text-tierra/70 tracking-wide">{f}</span>
                </div>
              ))}
            </div>

            {/* CTA lateral */}
            <button
              disabled={isAgotado}
              onClick={() => addItem({
                id: producto.id,
                name: producto.name,
                category: producto.category,
                itemType: "product",
                price: producto.priceNum,
                priceLabel: producto.price,
                gradient: producto.gradient,
              })}
              className="w-full mt-4 flex items-center justify-center gap-2.5 bg-dorado text-tierra-dark font-sans font-semibold text-[0.7rem] py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-dorado-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={15} strokeWidth={1.8} />
              {isAgotado ? "Agotado" : `Agregar — ${producto.price}`}
            </button>
          </div>
        </div>
      </section>

      {/* ── PRODUCTOS RELACIONADOS ── */}
      {relacionados.length > 0 && (
        <section className="bg-crema py-16 px-6 border-t border-morado/8">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display uppercase text-[clamp(1.6rem,4vw,2.5rem)] text-tierra-dark leading-none tracking-wide mb-10">
              También te puede interesar
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relacionados.map((p) => (
                <Link
                  key={p.id}
                  href={`/tienda/${p.slug}`}
                  className="bg-white border-2 border-morado-dark block-shadow group overflow-hidden flex flex-col hover:translate-y-[-2px] transition-all duration-200"
                >
                  <div className={`h-40 bg-gradient-to-br ${p.gradient} flex items-center justify-center relative`}>
                    <span className="text-white/40 text-3xl">✦</span>
                    {p.badge && (
                      <span className={`absolute top-3 left-3 font-sans text-[0.55rem] px-2 py-1 border tracking-widest uppercase ${badgeStyles[p.badge]}`}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-sans font-semibold text-sm text-tierra-dark group-hover:text-morado transition-colors mb-1">{p.name}</h3>
                    <p className="font-sans text-[0.68rem] text-tierra/45 leading-relaxed flex-1 mb-4">{p.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl text-morado">{p.price}</span>
                      <span className="font-sans text-[0.62rem] text-morado border border-morado/30 px-3 py-1.5 tracking-widest uppercase group-hover:bg-morado group-hover:text-crema transition-colors">
                        Ver →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
