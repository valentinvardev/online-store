"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import AdminHeader from "../_components/AdminHeader";
import ConfirmModal from "../_components/ConfirmModal";
import AdminFormModal, { Field, Input, Textarea, Select } from "../_components/AdminFormModal";
import { useToast } from "../_components/AdminToast";

interface Servicio {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  duration: string;
  format: string;
  desc: string;
  activo: boolean;
}

const inicial: Servicio[] = [
  { id: 1, title: "Lectura de Tarot",        subtitle: "Una mirada profunda al momento presente",   price: "$45",  duration: "60 min", format: "Zoom",        desc: "Lectura personal del tarot orientada a tu situación actual. Se graba y envía.", activo: true },
  { id: 2, title: "Lectura Extendida",       subtitle: "Pasado, presente y futuro en profundidad",  price: "$75",  duration: "90 min", format: "Zoom",        desc: "Lectura completa con spreads complejos para situaciones que requieren mayor claridad.", activo: true },
  { id: 3, title: "Ritual Personalizado",    subtitle: "Un ritual diseñado solo para vos",          price: "$90",  duration: "75 min", format: "Zoom + guía", desc: "Diseño de un ritual a medida según tu carta natal, ciclo lunar y intención.", activo: true },
  { id: 4, title: "Consulta Astrológica",    subtitle: "Tu carta natal como espejo de vida",        price: "$65",  duration: "60 min", format: "Zoom",        desc: "Análisis de tu carta natal con énfasis en tránsitos actuales y próximos.", activo: true },
  { id: 5, title: "Bundle Tarot + Ritual",   subtitle: "La experiencia completa en una sesión",     price: "$120", duration: "2.5 h",  format: "Zoom",        desc: "Lectura de tarot seguida de ritual personalizado. La combinación más poderosa.", activo: true },
  { id: 6, title: "Sesión de Cierre",        subtitle: "Integrar y soltar lo que ya no sirve",      price: "$55",  duration: "60 min", format: "Zoom",        desc: "Sesión de integración y cierre para cerrar etapas, duelos o ciclos de vida.", activo: false },
];

const emptyForm = { title: "", subtitle: "", price: "", duration: "", format: "Zoom", desc: "" };

export default function AdminServicios() {
  const { toast } = useToast();
  const [data, setData] = useState(inicial);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const openEdit = (s: Servicio) => {
    setForm({ title: s.title, subtitle: s.subtitle, price: s.price, duration: s.duration, format: s.format, desc: s.desc });
    setEditId(s.id);
    setFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      setData((prev) => prev.map((s) => s.id === editId ? { ...s, ...form } : s));
      toast(`"${form.title}" actualizado`);
    } else {
      setData((prev) => [...prev, { ...form, id: Date.now(), activo: true }]);
      toast(`"${form.title}" creado`);
    }
    setFormOpen(false);
  };

  const toggle = (id: number) => {
    setData((prev) => prev.map((s) => s.id === id ? { ...s, activo: !s.activo } : s));
    const s = data.find((s) => s.id === id);
    toast(s?.activo ? `"${s.title}" desactivado` : `"${s?.title}" activado`);
  };

  const confirmDelete = () => {
    const s = data.find((s) => s.id === deleteId);
    setData((prev) => prev.filter((s) => s.id !== deleteId));
    setDeleteId(null);
    toast(`"${s?.title}" eliminado`, "error");
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Servicios"
        subtitle={`${data.length} servicios configurados`}
        action={
          <Link href="/admin/servicios/nuevo" className="flex items-center gap-2 bg-morado-dark text-crema font-sans text-[0.65rem] px-5 py-3 tracking-widest uppercase font-semibold border-2 border-morado-dark block-shadow hover:bg-morado transition-colors">
            <Plus size={13} /> Nuevo servicio
          </Link>
        }
      />

      <div className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-morado-dark bg-morado-dark">
              <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-6 py-4">Servicio</th>
              <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Precio</th>
              <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Duración</th>
              <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Formato</th>
              <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Activo</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-morado/10">
            {data.map((s) => (
              <tr key={s.id} className="hover:bg-dorado/5 transition-colors group">
                <td className="px-6 py-4">
                  <p className="font-sans font-semibold text-sm text-tierra-dark tracking-wide">{s.title}</p>
                  <p className="font-sans text-xs text-tierra/40 tracking-wide">{s.subtitle}</p>
                  <p className="font-sans text-xs text-tierra/30 tracking-wide line-clamp-1 mt-0.5">{s.desc}</p>
                </td>
                <td className="px-4 py-4">
                  <span className="font-display text-xl text-morado">{s.price}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-sans text-sm text-tierra/60">{s.duration}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-sans text-xs text-tierra/50 bg-crema-dark px-2.5 py-1 border border-morado/15">{s.format}</span>
                </td>
                <td className="px-4 py-4">
                  <button onClick={() => toggle(s.id)} className={`relative w-10 h-5 border-2 border-morado-dark transition-colors ${s.activo ? "bg-dorado" : "bg-tierra/10"}`}>
                    <span className={`absolute top-0.5 w-3.5 h-3.5 bg-morado-dark transition-all ${s.activo ? "left-4" : "left-0.5"}`} />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(s)} title="Editar" className="p-1.5 text-tierra/40 hover:text-morado transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => setDeleteId(s.id)} title="Eliminar" className="p-1.5 text-tierra/40 hover:text-rosa transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminFormModal
        open={formOpen}
        title={editId ? "Editar servicio" : "Nuevo servicio"}
        subtitle={editId ? "Modificá los datos del servicio" : "Completá los datos para agregar un servicio nuevo"}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        submitLabel={editId ? "Guardar cambios" : "Crear servicio"}
      >
        <form id="admin-form" onSubmit={handleSubmit} className="space-y-5">
          <Field label="Nombre del servicio" required>
            <Input placeholder="Ej: Lectura de Tarot" value={form.title} onChange={(e) => set("title", e.target.value)} required />
          </Field>

          <Field label="Subtítulo" hint="Frase corta que describe la esencia del servicio">
            <Input placeholder="Ej: Una mirada profunda al momento presente" value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
          </Field>

          <Field label="Descripción" hint="Qué incluye la sesión y qué puede esperar la clienta" required>
            <Textarea placeholder="Describí el servicio con detalle..." value={form.desc} onChange={(e) => set("desc", e.target.value)} required />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Precio" required>
              <Input placeholder="$65" value={form.price} onChange={(e) => set("price", e.target.value)} required />
            </Field>
            <Field label="Duración" required>
              <Input placeholder="60 min" value={form.duration} onChange={(e) => set("duration", e.target.value)} required />
            </Field>
          </div>

          <Field label="Formato" required>
            <Select value={form.format} onChange={(e) => set("format", e.target.value)} required>
              <option value="Zoom">Zoom</option>
              <option value="Zoom + guía">Zoom + guía PDF</option>
              <option value="Grabación">Solo grabación</option>
              <option value="Presencial">Presencial</option>
            </Select>
          </Field>
        </form>
      </AdminFormModal>

      <ConfirmModal
        open={deleteId !== null}
        title="Eliminar servicio"
        message={`¿Segura que querés eliminar "${data.find((s) => s.id === deleteId)?.title}"? Esta acción no se puede deshacer.`}
        confirmLabel="Sí, eliminar"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
