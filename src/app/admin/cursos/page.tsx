"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import AdminHeader from "../_components/AdminHeader";

type Nivel = "Principiante" | "Intermedio" | "Todos los niveles";

interface Curso {
  id: number;
  title: string;
  level: Nivel;
  price: string;
  students: string;
  badge?: string;
  activo: boolean;
}

const cursos: Curso[] = [
  { id: 1, title: "Tarot desde Cero",        level: "Principiante",     price: "$89", students: "+340", badge: "Más vendido", activo: true },
  { id: 2, title: "Rituales Lunares",         level: "Todos los niveles", price: "$59", students: "+210", activo: true },
  { id: 3, title: "Astrología Práctica",      level: "Intermedio",       price: "$75", students: "+175", activo: true },
  { id: 4, title: "Meditación y Presencia",   level: "Principiante",     price: "$39", students: "+90",  badge: "Nuevo", activo: true },
  { id: 5, title: "Tarot Avanzado",           level: "Intermedio",       price: "$95", students: "+120", activo: true },
  { id: 6, title: "Chakras: Mapa Interior",   level: "Todos los niveles", price: "$65", students: "+155", activo: true },
  { id: 7, title: "Sueños y Simbolismo",      level: "Principiante",     price: "$45", students: "+65",  badge: "Nuevo", activo: false },
  { id: 8, title: "Herbología y Rituales",    level: "Todos los niveles", price: "$55", students: "+88",  badge: "Últimos lugares", activo: true },
  { id: 9, title: "Numerología Esencial",     level: "Principiante",     price: "$49", students: "+50",  activo: false },
];

const levelColors: Record<Nivel, string> = {
  "Principiante":     "bg-verde/10 text-verde border-verde/25",
  "Intermedio":       "bg-celeste/15 text-celeste border-celeste/25",
  "Todos los niveles": "bg-dorado/15 text-dorado-dark border-dorado/30",
};

export default function AdminCursos() {
  const [data, setData] = useState(cursos);

  const toggle = (id: number) =>
    setData((prev) => prev.map((c) => (c.id === id ? { ...c, activo: !c.activo } : c)));

  return (
    <div>
      <AdminHeader title="Cursos" subtitle={`${data.length} cursos en total`} />

      <div className="flex justify-end mb-6">
        <button className="flex items-center gap-2 bg-morado-dark text-crema font-sans text-xs px-5 py-2.5 rounded-full tracking-widest uppercase font-semibold hover:bg-morado transition-colors">
          <Plus size={14} />
          Nuevo curso
        </button>
      </div>

      <div className="bg-white border-2 border-morado/10 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-morado/8 bg-crema/60">
              <th className="text-left font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase px-6 py-4">Curso</th>
              <th className="text-left font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase px-4 py-4">Nivel</th>
              <th className="text-left font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase px-4 py-4">Precio</th>
              <th className="text-left font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase px-4 py-4">Alumnas</th>
              <th className="text-left font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase px-4 py-4">Estado</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-morado/6">
            {data.map((curso) => (
              <tr key={curso.id} className="hover:bg-crema/40 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-sans font-semibold text-sm text-tierra-dark tracking-wide">{curso.title}</p>
                  {curso.badge && (
                    <span className="font-sans text-[0.55rem] text-dorado-dark tracking-widest uppercase">{curso.badge}</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <span className={`font-sans text-[0.6rem] px-2.5 py-1 border rounded-full tracking-widest uppercase ${levelColors[curso.level]}`}>
                    {curso.level}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-display text-lg text-morado">{curso.price}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-sans text-sm text-tierra/60">{curso.students}</span>
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => toggle(curso.id)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${curso.activo ? "bg-verde" : "bg-tierra/20"}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${curso.activo ? "left-5" : "left-0.5"}`} />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="p-1.5 text-tierra/30 hover:text-celeste transition-colors"><Eye size={15} /></button>
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
