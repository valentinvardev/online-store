"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import AdminHeader from "../_components/AdminHeader";
import ConfirmModal from "../_components/ConfirmModal";
import AdminFormModal, { Field, Input, Textarea, Select } from "../_components/AdminFormModal";
import { useToast } from "../_components/AdminToast";
import { api } from "~/trpc/react";

const levelColors: Record<string, string> = {
  "Principiante":      "bg-verde/15 text-verde border-verde/30",
  "Intermedio":        "bg-celeste/15 text-celeste border-celeste/30",
  "Todos los niveles": "bg-dorado/15 text-dorado-dark border-dorado/30",
};

const emptyForm = {
  name: "", subtitle: "", level: "Principiante",
  price: "", durationWeeks: "", lessonsCount: "", description: "", badge: "",
};

export default function AdminCursos() {
  const { toast } = useToast();
  const utils = api.useUtils();

  const { data: cursos = [], isLoading } = api.admin.cursos.list.useQuery();

  const createMutation = api.admin.cursos.create.useMutation({
    onSuccess: (_, vars) => {
      void utils.admin.cursos.list.invalidate();
      toast(`"${vars.name}" creado`);
      setFormOpen(false);
    },
  });
  const updateMutation = api.admin.cursos.update.useMutation({
    onSuccess: () => {
      void utils.admin.cursos.list.invalidate();
      toast("Curso actualizado");
      setFormOpen(false);
    },
  });
  const deleteMutation = api.admin.cursos.delete.useMutation({
    onSuccess: () => {
      void utils.admin.cursos.list.invalidate();
      setDeleteId(null);
      toast("Curso eliminado", "error");
    },
  });
  const toggleMutation = api.admin.cursos.toggleActive.useMutation({
    onSuccess: () => void utils.admin.cursos.list.invalidate(),
  });

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(
    () => cursos.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [cursos, search]
  );

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const openCreate = () => { setForm(emptyForm); setEditId(null); setFormOpen(true); };
  const openEdit = (c: typeof cursos[0]) => {
    setForm({
      name: c.name,
      subtitle: c.subtitle ?? "",
      level: c.level,
      price: String(c.price),
      durationWeeks: c.durationWeeks ? String(c.durationWeeks) : "",
      lessonsCount: c.lessonsCount ? String(c.lessonsCount) : "",
      description: c.description,
      badge: c.badge ?? "",
    });
    setEditId(c.id);
    setFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      subtitle: form.subtitle || undefined,
      description: form.description,
      price: parseFloat(form.price),
      badge: form.badge || undefined,
      level: form.level,
      durationWeeks: form.durationWeeks ? parseInt(form.durationWeeks) : undefined,
      lessonsCount: form.lessonsCount ? parseInt(form.lessonsCount) : undefined,
      active: true,
    };
    if (editId) {
      updateMutation.mutate({ id: editId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const deleteTarget = cursos.find((c) => c.id === deleteId);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Cursos"
        subtitle={`${cursos.length} cursos en total`}
        action={
          <Link href="/admin/cursos/nuevo"
            className="flex items-center gap-2 bg-morado-dark text-crema font-sans text-[0.65rem] px-5 py-3 tracking-widest uppercase font-semibold border-2 border-morado-dark block-shadow hover:bg-morado transition-colors">
            <Plus size={13} /> Nuevo curso
          </Link>
        }
      />

      <div className="relative">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-tierra/35" />
        <input
          type="text" placeholder="Buscar curso..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-crema border-2 border-morado/20 pl-10 pr-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/30 focus:outline-none focus:border-morado transition-colors"
        />
      </div>

      <div className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-tierra/40">
            <Loader2 size={18} className="animate-spin" />
            <span className="font-sans text-sm tracking-wide">Cargando cursos...</span>
          </div>
        ) : (
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
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center font-sans text-sm text-tierra/35 tracking-wide">
                    {cursos.length === 0 ? "No hay cursos cargados aún" : "No se encontraron cursos"}
                  </td>
                </tr>
              ) : filtered.map((c) => (
                <tr key={c.id} className="hover:bg-dorado/5 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-sans font-semibold text-sm text-tierra-dark tracking-wide">{c.name}</p>
                    {c.subtitle && <p className="font-sans text-xs text-tierra/40 tracking-wide">{c.subtitle}</p>}
                    {c.badge && <span className="font-sans text-[0.55rem] text-dorado-dark tracking-widest uppercase">✦ {c.badge}</span>}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`font-sans text-[0.58rem] px-2.5 py-1 border tracking-widest uppercase ${levelColors[c.level] ?? "bg-tierra/10 text-tierra/50 border-tierra/20"}`}>
                      {c.level}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-sans font-bold text-xl text-morado">${c.price}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-sans text-sm text-tierra/50">{c._count.enrollments}</span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => toggleMutation.mutate({ id: c.id, active: !c.active })}
                      className={`relative w-10 h-5 border-2 border-morado-dark transition-colors ${c.active ? "bg-dorado" : "bg-tierra/10"}`}
                    >
                      <span className={`absolute top-0.5 w-3.5 h-3.5 bg-morado-dark transition-all ${c.active ? "left-4" : "left-0.5"}`} />
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
        )}
        {!isLoading && filtered.length > 0 && (
          <div className="px-6 py-3 border-t border-morado/10">
            <p className="font-sans text-[0.6rem] text-tierra/30 tracking-widest uppercase">Mostrando {filtered.length} de {cursos.length} cursos</p>
          </div>
        )}
      </div>

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
            <Input placeholder="Ej: Tarot desde Cero" value={form.name} onChange={(e) => set("name", e.target.value)} required />
          </Field>

          <Field label="Subtítulo" hint="Frase corta que complementa el título">
            <Input placeholder="Ej: Leé tu propio código sagrado" value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
          </Field>

          <Field label="Descripción" hint="Qué aprende la alumna en este curso" required>
            <Textarea placeholder="Describí el contenido y la propuesta del curso..." value={form.description} onChange={(e) => set("description", e.target.value)} required />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Precio (ARS)" required>
              <Input type="number" step="0.01" min="0" placeholder="89" value={form.price} onChange={(e) => set("price", e.target.value)} required />
            </Field>
            <Field label="Duración (semanas)">
              <Input type="number" min="1" placeholder="8" value={form.durationWeeks} onChange={(e) => set("durationWeeks", e.target.value)} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Cantidad de clases">
              <Input type="number" min="1" placeholder="24" value={form.lessonsCount} onChange={(e) => set("lessonsCount", e.target.value)} />
            </Field>
            <Field label="Nivel">
              <Select value={form.level} onChange={(e) => set("level", e.target.value)}>
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
        message={`¿Segura que querés eliminar "${deleteTarget?.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Sí, eliminar"
        onConfirm={() => { if (deleteId) deleteMutation.mutate(deleteId); }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
