"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminHeader from "../_components/AdminHeader";

type Categoria = "Físico" | "Digital" | "Personalizado";
type Badge = "Nuevo" | "Oferta" | "Más vendido" | "Agotado";

interface Producto {
  id: number;
  name: string;
  category: Categoria;
  price: string;
  priceOld?: string;
  badge?: Badge;
  activo: boolean;
}

const productos: Producto[] = [
  { id: 1,  name: "Kit de Inicio Ritual",      category: "Físico",        price: "$45",  badge: "Más vendido", activo: true },
  { id: 2,  name: "Vela Rituálica Protección", category: "Físico",        price: "$18",  activo: true },
  { id: 3,  name: "Cristal Cuarzo Rosa",       category: "Físico",        price: "$22",  badge: "Nuevo",       activo: true },
  { id: 4,  name: "Hierbas Rituales Pack",     category: "Físico",        price: "$28",  activo: true },
  { id: 5,  name: "Incienso Sagrado x20",      category: "Físico",        price: "$12",  activo: true },
  { id: 6,  name: "Piedras de Protección",     category: "Físico",        price: "$35",  badge: "Agotado",     activo: false },
  { id: 7,  name: "Oráculo de la Reina",       category: "Digital",       price: "$29",  badge: "Más vendido", activo: true },
  { id: 8,  name: "Almanaque Lunar 2025",      category: "Digital",       price: "$15",  activo: true },
  { id: 9,  name: "Carta Astral PDF",          category: "Digital",       price: "$25",  badge: "Nuevo",       activo: true },
  { id: 10, name: "Agenda Espiritual",         category: "Digital",       price: "$19",  priceOld: "$25", badge: "Oferta", activo: true },
  { id: 11, name: "Ritual Personalizado",      category: "Personalizado", price: "$80",  activo: true },
  { id: 12, name: "Kit Luna Nueva",            category: "Personalizado", price: "$55",  badge: "Agotado",     activo: false },
];

const catColors: Record<Categoria, string> = {
  "Físico":        "bg-verde/10 text-verde border-verde/25",
  "Digital":       "bg-celeste/15 text-celeste border-celeste/25",
  "Personalizado": "bg-rosa/10 text-rosa border-rosa/25",
};

const badgeColors: Record<Badge, string> = {
  "Nuevo":        "text-celeste",
  "Oferta":       "text-naranja",
  "Más vendido":  "text-dorado-dark",
  "Agotado":      "text-tierra/40",
};

export default function AdminProductos() {
  const [data, setData] = useState(productos);

  const toggle = (id: number) =>
    setData((prev) => prev.map((p) => (p.id === id ? { ...p, activo: !p.activo } : p)));

  return (
    <div>
      <AdminHeader title="Productos" subtitle={`${data.length} productos en total`} />

      <div className="flex justify-end mb-6">
        <button className="flex items-center gap-2 bg-morado-dark text-crema font-sans text-xs px-5 py-2.5 rounded-full tracking-widest uppercase font-semibold hover:bg-morado transition-colors">
          <Plus size={14} />
          Nuevo producto
        </button>
      </div>

      <div className="bg-white border-2 border-morado/10 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-morado/8 bg-crema/60">
              <th className="text-left font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase px-6 py-4">Producto</th>
              <th className="text-left font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase px-4 py-4">Categoría</th>
              <th className="text-left font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase px-4 py-4">Precio</th>
              <th className="text-left font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase px-4 py-4">Estado</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-morado/6">
            {data.map((p) => (
              <tr key={p.id} className="hover:bg-crema/40 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-sans font-semibold text-sm text-tierra-dark tracking-wide">{p.name}</p>
                  {p.badge && (
                    <span className={`font-sans text-[0.55rem] tracking-widest uppercase ${badgeColors[p.badge]}`}>{p.badge}</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <span className={`font-sans text-[0.6rem] px-2.5 py-1 border rounded-full tracking-widest uppercase ${catColors[p.category]}`}>
                    {p.category}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-lg text-morado">{p.price}</span>
                    {p.priceOld && <span className="font-sans text-xs text-tierra/30 line-through">{p.priceOld}</span>}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => toggle(p.id)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${p.activo ? "bg-verde" : "bg-tierra/20"}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${p.activo ? "left-5" : "left-0.5"}`} />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="p-1.5 text-tierra/30 hover:text-morado transition-colors"><Pencil size={15} /></button>
                    <button className="p-1.5 text-tierra/30 hover:text-rosa transition-colors"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
