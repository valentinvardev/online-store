"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useCart } from "../../_components/cart/CartContext";
import { productos } from "../_data/productos";
import type { Category } from "../_data/productos";

type Filter = "Todos" | Category;

const badgeStyles: Record<string, string> = {
  "Nuevo":       "bg-celeste/20 text-celeste border-celeste/30",
  "Oferta":      "bg-rosa/15 text-rosa border-rosa/30",
  "Más vendido": "bg-dorado/20 text-tierra-dark border-dorado/40",
  "Agotado":     "bg-tierra/10 text-tierra/60 border-tierra/20",
};

const categories: { value: Filter; label: string; icon: string; color: string; activeColor: string }[] = [
  { value: "Todos",         label: "Todos",        icon: "✦", color: "text-morado/50 border-morado/15 hover:border-morado/40 hover:text-morado",    activeColor: "bg-morado-dark text-crema border-morado-dark shadow-lg" },
  { value: "Físico",        label: "Físico",        icon: "◎", color: "text-verde/60 border-verde/20 hover:border-verde/50 hover:text-verde",         activeColor: "bg-verde text-crema border-verde shadow-lg" },
  { value: "Digital",       label: "Digital",       icon: "◈", color: "text-celeste/60 border-celeste/20 hover:border-celeste/50 hover:text-celeste", activeColor: "bg-celeste text-tierra-dark border-celeste shadow-lg" },
  { value: "Personalizado", label: "Personalizado", icon: "◉", color: "text-rosa/70 border-rosa/20 hover:border-rosa/50 hover:text-rosa",            activeColor: "bg-rosa text-crema border-rosa shadow-lg" },
];

export default function ProductCatalog() {
  const [active, setActive] = useState<Filter>("Todos");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  const filtered = active === "Todos"
    ? productos
    : productos.filter((p) => p.category === active);

  const countFor = (cat: Filter) =>
    cat === "Todos" ? productos.length : productos.filter((p) => p.category === cat).length;

  // Cerrar dropdown al click afuera
  useEffect(() => {
    if (!dropdownOpen) return;
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [dropdownOpen]);

  const activeCategory = categories.find((c) => c.value === active)!;

  // Pill reutilizable — mismo estilo en trigger y opciones
  const renderPill = (
    { value, label, icon, color, activeColor }: typeof categories[number],
    opts?: { onClick?: () => void; withChevron?: boolean; isOpen?: boolean }
  ) => {
    const isActive = active === value;
    const count = countFor(value);
    return (
      <button
        key={value}
        type="button"
        onClick={opts?.onClick ?? (() => setActive(value))}
        className={`group flex items-center gap-2.5 px-4 sm:px-5 py-2.5 border-2 rounded-full transition-all duration-200 ${
          isActive ? activeColor : `bg-transparent ${color}`
        } ${opts?.withChevron ? "w-full justify-between" : ""}`}
      >
        <span className="flex items-center gap-2.5 min-w-0">
          <span className={`text-[0.7rem] transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
            {icon}
          </span>
          <span className="font-sans text-[0.65rem] tracking-widest uppercase font-semibold whitespace-nowrap">
            {label}
          </span>
          <span className={`font-sans text-[0.55rem] font-bold px-1.5 py-0.5 rounded-full transition-colors ${
            isActive ? "bg-white/20 text-inherit" : "bg-morado/8 text-tierra/40"
          }`}>
            {count}
          </span>
        </span>
        {opts?.withChevron && (
          <ChevronDown size={14} className={`shrink-0 transition-transform ${opts.isOpen ? "rotate-180" : ""}`} />
        )}
      </button>
    );
  };

  return (
    <div>
      {/* Filtros sticky */}
      <div className="bg-crema/95 backdrop-blur-sm sticky top-0 z-10 border-b-2 border-morado/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-5 sm:py-6">
          <p className="font-sans text-[0.6rem] text-tierra/30 tracking-[0.25em] uppercase mb-3 sm:mb-4">
            Filtrar por categoría
          </p>

          {/* Mobile: dropdown */}
          <div ref={dropdownRef} className="sm:hidden relative">
            {renderPill(activeCategory, {
              onClick: () => setDropdownOpen(!dropdownOpen),
              withChevron: true,
              isOpen: dropdownOpen,
            })}
            {dropdownOpen && (
              <div className="absolute left-0 right-0 mt-2 bg-crema border-2 border-morado-dark block-shadow-sm z-20 p-3 space-y-2">
                {categories.map((cat) =>
                  renderPill(cat, {
                    onClick: () => { setActive(cat.value); setDropdownOpen(false); },
                  })
                )}
              </div>
            )}
          </div>

          {/* Desktop: pills horizontales sin wrap */}
          <div className="hidden sm:flex items-center gap-3 lg:gap-5 overflow-x-auto -mx-1 px-1">
            {categories.map((cat) => (
              <div key={cat.value} className="shrink-0">
                {renderPill(cat)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grilla */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <Link
              key={product.id}
              href={`/tienda/${product.slug}`}
              className="bg-white border-2 border-morado-dark overflow-hidden block-shadow group flex flex-col hover:translate-y-[-2px] transition-all duration-200"
            >
              {/* Imagen */}
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
                    <span className="font-sans font-bold text-2xl text-morado">{product.price}</span>
                    {product.priceOld && (
                      <span className="font-sans text-xs text-tierra/35 line-through">{product.priceOld}</span>
                    )}
                  </div>
                  <button
                    disabled={product.badge === "Agotado"}
                    onClick={(e) => {
                      e.preventDefault();
                      addItem({
                        id: product.id,
                        name: product.name,
                        category: product.category,
                        itemType: "product",
                        price: product.priceNum,
                        priceLabel: product.price,
                        gradient: product.gradient,
                      });
                    }}
                    className="font-sans text-[0.65rem] px-4 py-2.5 border-2 border-morado-dark text-morado hover:bg-morado hover:text-crema transition-colors tracking-widest uppercase block-shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {product.badge === "Agotado" ? "Agotado" : "Agregar"}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
