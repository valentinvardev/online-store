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

  // Item rectangular tipo lista — mismo estilo en trigger y opciones del dropdown
  const renderListItem = (
    { value, label, icon }: typeof categories[number],
    opts?: { onClick?: () => void; withChevron?: boolean; isOpen?: boolean; isTrigger?: boolean }
  ) => {
    const isActive = active === value;
    const count = countFor(value);
    return (
      <button
        key={value}
        type="button"
        onClick={opts?.onClick ?? (() => setActive(value))}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
          opts?.isTrigger
            ? "bg-white/60 text-tierra-dark border-2 border-tierra-dark/30"
            : isActive
              ? "bg-tierra-dark/10 text-tierra-dark"
              : "text-tierra-dark hover:bg-tierra-dark/5"
        }`}
      >
        <span className="text-[0.85rem]">{icon}</span>
        <span className="font-sans text-[0.85rem] tracking-widest uppercase font-bold flex-1">
          {label}
        </span>
        <span className={`font-sans text-[0.75rem] font-bold px-2 py-0.5 rounded-full ${
          opts?.isTrigger || isActive ? "bg-tierra-dark/20 text-tierra-dark" : "bg-tierra-dark/10 text-tierra-dark/85"
        }`}>
          {count}
        </span>
        {opts?.withChevron && (
          <ChevronDown size={16} className={`shrink-0 transition-transform ${opts.isOpen ? "rotate-180" : ""}`} strokeWidth={2.2} />
        )}
      </button>
    );
  };

  return (
    <div>
      {/* Filtros sticky */}
      <div className="bg-dorado-light/95 backdrop-blur-sm sticky top-0 z-10 border-b-2 border-morado-dark/15">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-5 sm:py-6">
          <p className="font-sans font-semibold text-[0.85rem] text-tierra-dark tracking-[0.25em] uppercase mb-3 sm:mb-4">
            Filtrar por categoría
          </p>

          {/* Dropdown estilo lista — siempre visible */}
          <div ref={dropdownRef} className="relative max-w-xs">
            {renderListItem(activeCategory, {
              onClick: () => setDropdownOpen(!dropdownOpen),
              withChevron: true,
              isOpen: dropdownOpen,
              isTrigger: true,
            })}
            {dropdownOpen && (
              <ul className="absolute left-0 right-0 mt-2 bg-crema border-2 border-tierra-dark block-shadow-sm z-20 overflow-hidden">
                {categories.map((cat) => (
                  <li key={cat.value} className="border-b border-tierra-dark/15 last:border-0">
                    {renderListItem(cat, {
                      onClick: () => { setActive(cat.value); setDropdownOpen(false); },
                    })}
                  </li>
                ))}
              </ul>
            )}
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
                  <span className={`absolute top-3 left-3 font-sans text-[0.78rem] px-2.5 py-1 border tracking-widest uppercase ${badgeStyles[product.badge]}`}>
                    {product.badge}
                  </span>
                )}
                <span className="absolute top-3 right-3 font-sans text-[0.75rem] text-white/50 tracking-[0.3em] uppercase bg-black/20 px-2 py-1">
                  {product.category}
                </span>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-sans font-semibold text-base text-tierra-dark mb-2 group-hover:text-morado transition-colors leading-snug">
                  {product.name}
                </h3>
                <p className="font-sans text-[0.82rem] text-tierra/75 mb-5 leading-relaxed tracking-wide flex-1">
                  {product.desc}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-baseline gap-2">
                    <span className="font-sans font-bold text-2xl text-morado">{product.price}</span>
                    {product.priceOld && (
                      <span className="font-sans text-[13px] text-tierra/60 line-through">{product.priceOld}</span>
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
                    className="font-sans text-[0.75rem] px-4 py-2.5 border-2 border-morado-dark text-morado hover:bg-morado hover:text-crema transition-colors tracking-widest uppercase block-shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
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
