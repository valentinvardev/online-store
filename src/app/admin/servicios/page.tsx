"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import AdminHeader from "../_components/AdminHeader";

interface Servicio {
  id: number;
  title: string;
  price: string;
  duration: string;
  format: string;
  activo: boolean;
}

const servicios: Servicio[] = [
  { id: 1, title: "Lectura de Tarot",        price: "$45",  duration: "60 min", format: "Zoom",        activo: true },
  { id: 2, title: "Lectura Extendida",       price: "$75",  duration: "90 min", format: "Zoom",        activo: true },
  { id: 3, title: "Ritual Personalizado",    price: "$90",  duration: "75 min", format: "Zoom + guía", activo: true },
  { id: 4, title: "Consulta Astrológica",    price: "$65",  duration: "60 min", format: "Zoom",        activo: true },
  { id: 5, title: "Bundle Tarot + Ritual",   price: "$120", duration: "2.5 h",  format: "Zoom",        activo: true },
  { id: 6, title: "Sesión de Cierre",        price: "$55",  duration: "60 min", format: "Zoom",        activo: false },
];

export default function AdminServicios() {
  const [data, setData] = useState(servicios);

  const toggle = (id: number) =>
    setData((prev) => prev.map((s) => (s.id === id ? { ...s, activo: !s.activo } : s)));

  return (
    <div>
      <AdminHeader title="Servicios" subtitle={`${data.length} servicios configurados`} />

      <div className="flex justify-end mb-6">
        <button className="flex items-center gap-2 bg-morado-dark text-crema font-sans text-xs px-5 py-2.5 rounded-full tracking-widest uppercase font-semibold hover:bg-morado transition-colors">
          <Plus size={14} />
          Nuevo servicio
        </button>
      </div>

      <div className="bg-white border-2 border-morado/10 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-morado/8 bg-crema/60">
              <th className="text-left font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase px-6 py-4">Servicio</th>
              <th className="text-left font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase px-4 py-4">Precio</th>
              <th className="text-left font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase px-4 py-4">Duración</th>
              <th className="text-left font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase px-4 py-4">Formato</th>
              <th className="text-left font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase px-4 py-4">Estado</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-morado/6">
            {data.map((s) => (
              <tr key={s.id} className="hover:bg-crema/40 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-sans font-semibold text-sm text-tierra-dark tracking-wide">{s.title}</p>
                </td>
                <td className="px-4 py-4">
                  <span className="font-display text-lg text-morado">{s.price}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-sans text-sm text-tierra/60">{s.duration}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-sans text-xs text-tierra/50 bg-crema px-2 py-1 rounded-md border border-morado/10">{s.format}</span>
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => toggle(s.id)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${s.activo ? "bg-verde" : "bg-tierra/20"}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${s.activo ? "left-5" : "left-0.5"}`} />
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
