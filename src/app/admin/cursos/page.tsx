"use client";

import { useState, useMemo } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Link from "next/link";
import AdminHeader from "../_components/AdminHeader";
import ConfirmModal from "../_components/ConfirmModal";
import AdminFormModal, { Field, Input, Textarea, Select } from "../_components/AdminFormModal";
import { useToast } from "../_components/AdminToast";

type Nivel = "Principiante" | "Intermedio" | "Todos los niveles";
type Badge = "Más vendido" | "Nuevo" | "Últimos lugares" | "";

interface Curso {
  id: number;
  title: string;
  subtitle: string;
  level: Nivel;
  price: string;
  duration: string;
  lessons: string;
  students: string;
  desc: string;
  badge: Badge;
  activo: boolean;
}

const inicial: Curso[] = [
  { id: 1, title: "Tarot desde Cero",       subtitle: "Leé tu propio código sagrado",      level: "Principiante",      price: "$89", duration: "8 semanas", lessons: "24 clases", students: "+340", desc: "Aprendé a leer el tarot con profundidad y claridad.", badge: "Más vendido", activo: true },
  { id: 2, title: "Rituales Lunares",        subtitle: "Vivir en sintonía con los ciclos",  level: "Todos los niveles", price: "$59", duration: "4 semanas", lessons: "12 clases", students: "+210", desc: "Diseñá rituales personales para cada fase lunar.", badge: "", activo: true },
  { id: 3, title: "Astrología Práctica",     subtitle: "Tu carta natal como mapa de vida",  level: "Intermedio",        price: "$75", duration: "6 semanas", lessons: "18 clases", students: "+175", desc: "Interpretá tu carta natal y tus tránsitos.", badge: "", activo: true },
  { id: 4, title: "Meditación y Presencia",  subtitle: "Silenciar el ruido, escuchar el alma", level: "Principiante",  price: "$39", duration: "3 semanas", lessons: "9 clases",  students: "+90",  desc: "Técnicas de meditación guiada para el día a día.", badge: "Nuevo", activo: true },
  { id: 5, title: "Tarot Avanzado",          subtitle: "Las capas ocultas del mazo",        level: "Intermedio",        price: "$95", duration: "6 semanas", lessons: "18 clases", students: "+120", desc: "Tiradas complejas y arcanos mayores en profundidad.", badge: "", activo: true },
  { id: 6, title: "Chakras: Mapa Interior",  subtitle: "Energía, cuerpo y conciencia",      level: "Todos los niveles", price: "$65", duration: "4 semanas", lessons: "12 clases", students: "+155", desc: "Explorá cada centro energético con herramientas prácticas.", badge: "", activo: true },
  { id: 7, title: "Sueños y Simbolismo",     subtitle: "Tu inconsciente te habla",          level: "Principiante",      price: "$45", duration: "3 semanas", lessons: "9 clases",  students: "+65",  desc: "Aprendé a interpretar y trabajar simbólicamente tus sueños.", badge: "Nuevo", activo: false },
  { id: 8, title: "Herbología y Rituales",   subtitle: "La magia que crece de la tierra",   level: "Todos los niveles", price: "$55", duration: "5 semanas", lessons: "15 clases", students: "+88",  desc: "Plantas medicinales, sahumerios y baños energéticos.", badge: "Últimos lugares", activo: true },
  { id: 9, title: "Numerología Esencial",    subtitle: "Los números que te definen",        level: "Principiante",      price: "$49", duration: "3 semanas", lessons: "9 clases",  students: "+50",  desc: "Calculá e interpretá tu número de vida y misión.", badge: "", activo: false },
];

const levelColors: Record<Nivel, string> = {
  "Principiante":      "bg-verde/15 text-verde border-verde/30",
  "Intermedio":        "bg-celeste/15 text-celeste border-celeste/30",
  "Todos los niveles": "bg-dorado/15 text-dorado-dark border-dorado/30",
};

const emptyForm = { title: "", subtitle: "", level: "Principiante" as Nivel, price: "", duration: "", lessons: "", desc: "", badge: "" as Badge };

export default function AdminCursos() {
  const { toast } = useToast();
  const [data, setData] = useState(inicial);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() =>
    data.filter((c) => c.title.toLowerCase().includes(search.toLowerCase())),
    [data, search]
  );

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));


  const openEdit = (c: Curso) => {
    setForm({ title: c.title, subtitle: c.subtitle, level: c.level, price: c.price, duration: c.duration, lessons: c.lessons, desc: c.desc, badge: c.badge });
    setEditId(c.id);
    setFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      setData((prev) => prev.map((c) => c.id === editId ? { ...c, ...form } : c));
      toast(`"${form.title}" actualizado`);
    } else {
      const nuevo: Curso = { ...form, id: Date.now(), students: "0", activo: true };
      setData((prev) => [...prev, nuevo]);
      toast(`"${form.title}" creado`);
    }
    setFormOpen(false);
  };

  const toggle = (id: number) => {
    setData((prev) => prev.map((c) => c.id === id ? { ...c, activo: !c.activo } : c));
    const c = data.find((c) => c.id === id);
    toast(c?.activo ? `"${c.title}" desactivado` : `"${c?.title}" activado`);
  };

  const confirmDelete = () => {
    const c = data.find((c) => c.id === deleteId);
    setData((prev) => prev.filter((c) => c.id !== deleteId));
    setDeleteId(null);
    toast(`"${c?.title}" eliminado`, "error");
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Cursos"
        subtitle={`${data.length} cursos en total`}
        action={
          <Link href="/admin/cursos/nuevo" className="flex items-center gap-2 bg-morado-dark text-crema font-sans text-[0.65rem] px-5 py-3 tracking-widest uppercase font-semibold border-2 border-morado-dark block-shadow hover:bg-morado transition-colors">
            <Plus size={13} /> Nuevo curso
          </Link>
        }
      />

      <div className="relative">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-tierra/35" />
        <input type="text" placeholder="Buscar curso..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-crema border-2 border-morado/20 pl-10 pr-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/30 focus:outline-none focus:border-morado transition-colors" />
      </div>

      <div className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-morado-dark bg-morado-dark">
              <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-6 py-4">Curso</th>
              <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Nivel</th>
              <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Precio</th>
              <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Alumnas</th>
              <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Activo</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-morado/10">
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-12 text-center font-sans text-sm text-tierra/35 tracking-wide">No se encontraron cursos</td></tr>
            ) : filtered.map((c) => (
              <tr key={c.id} className="hover:bg-dorado/5 transition-colors group">
                <td className="px-6 py-4">
                  <p className="font-sans font-semibold text-sm text-tierra-dark tracking-wide">{c.title}</p>
                  <p className="font-sans text-xs text-tierra/40 tracking-wide">{c.subtitle}</p>
                  {c.badge && <span className="font-sans text-[0.55rem] text-dorado-dark tracking-widest uppercase">✦ {c.badge}</span>}
                </td>
                <td className="px-4 py-4">
                  <span className={`font-sans text-[0.58rem] px-2.5 py-1 border tracking-widest uppercase ${levelColors[c.level]}`}>{c.level}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-display text-xl text-morado">{c.price}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-sans text-sm text-tierra/50">{c.students}</span>
                </td>
                <td className="px-4 py-4">
                  <button onClick={() => toggle(c.id)} className={`relative w-10 h-5 border-2 border-morado-dark transition-colors ${c.activo ? "bg-dorado" : "bg-tierra/10"}`}>
                    <span className={`absolute top-0.5 w-3.5 h-3.5 bg-morado-dark transition-all ${c.activo ? "left-4" : "left-0.5"}`} />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(c)} title="Editar" className="p-1.5 text-tierra/40 hover:text-morado transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => setDeleteId(c.id)} title="Eliminar" className="p-1.5 text-tierra/40 hover:text-rosa transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length > 0 && (
          <div className="px-6 py-3 border-t border-morado/10">
            <p className="font-sans text-[0.6rem] text-tierra/30 tracking-widest uppercase">Mostrando {filtered.length} de {data.length} cursos</p>
          </div>
        )}
      </div>

      {/* Modal nuevo/editar curso */}
      <AdminFormModal
        open={formOpen}
        title={editId ? "Editar curso" : "Nuevo curso"}
        subtitle={editId ? "Modificá los datos del curso" : "Completá los datos para agregar un curso nuevo"}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        submitLabel={editId ? "Guardar cambios" : "Crear curso"}
      >
        <form id="admin-form" onSubmit={handleSubmit} className="space-y-5">
          <Field label="Título del curso" required>
            <Input placeholder="Ej: Tarot desde Cero" value={form.title} onChange={(e) => set("title", e.target.value)} required />
          </Field>

          <Field label="Subtítulo" hint="Frase corta que complementa el título">
            <Input placeholder="Ej: Leé tu propio código sagrado" value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
          </Field>

          <Field label="Descripción" hint="Qué aprende la alumna en este curso" required>
            <Textarea placeholder="Describí el contenido y la propuesta del curso..." value={form.desc} onChange={(e) => set("desc", e.target.value)} required />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Precio" required>
              <Input placeholder="$89" value={form.price} onChange={(e) => set("price", e.target.value)} required />
            </Field>
            <Field label="Duración">
              <Input placeholder="8 semanas" value={form.duration} onChange={(e) => set("duration", e.target.value)} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Cantidad de clases">
              <Input placeholder="24 clases" value={form.lessons} onChange={(e) => set("lessons", e.target.value)} />
            </Field>
            <Field label="Nivel" required>
              <Select value={form.level} onChange={(e) => set("level", e.target.value)} required>
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Todos los niveles">Todos los niveles</option>
              </Select>
            </Field>
          </div>

          <Field label="Badge" hint="Etiqueta destacada (opcional)">
            <Select value={form.badge} onChange={(e) => set("badge", e.target.value)}>
              <option value="">Sin badge</option>
              <option value="Más vendido">Más vendido</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Últimos lugares">Últimos lugares</option>
            </Select>
          </Field>
        </form>
      </AdminFormModal>

      <ConfirmModal
        open={deleteId !== null}
        title="Eliminar curso"
        message={`¿Segura que querés eliminar "${data.find((c) => c.id === deleteId)?.title}"? Esta acción no se puede deshacer.`}
        confirmLabel="Sí, eliminar"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
