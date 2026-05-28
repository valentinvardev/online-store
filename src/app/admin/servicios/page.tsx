"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import AdminHeader from "../_components/AdminHeader";
import ConfirmModal from "../_components/ConfirmModal";
import AdminFormModal, { Field, Input, Textarea, Select } from "../_components/AdminFormModal";
import { useToast } from "../_components/AdminToast";
import { api } from "~/trpc/react";

const emptyForm = { name: "", subtitle: "", price: "", duration: "", format: "Zoom", description: "" };

export default function AdminServicios() {
  const { toast } = useToast();
  const utils = api.useUtils();

  const { data: servicios = [], isLoading } = api.admin.servicios.list.useQuery();

  const createMutation = api.admin.servicios.create.useMutation({
    onSuccess: (_, vars) => {
      void utils.admin.servicios.list.invalidate();
      toast(`"${vars.name}" creado`);
      setFormOpen(false);
    },
  });
  const updateMutation = api.admin.servicios.update.useMutation({
    onSuccess: () => {
      void utils.admin.servicios.list.invalidate();
      toast("Servicio actualizado");
      setFormOpen(false);
    },
  });
  const deleteMutation = api.admin.servicios.delete.useMutation({
    onSuccess: () => {
      void utils.admin.servicios.list.invalidate();
      setDeleteId(null);
      toast("Servicio eliminado", "error");
    },
  });
  const toggleMutation = api.admin.servicios.toggleActive.useMutation({
    onSuccess: () => void utils.admin.servicios.list.invalidate(),
  });

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const openCreate = () => { setForm(emptyForm); setEditId(null); setFormOpen(true); };
  const openEdit = (s: typeof servicios[0]) => {
    setForm({
      name: s.name,
      subtitle: s.subtitle ?? "",
      price: String(s.price),
      duration: String(s.duration),
      format: s.format,
      description: s.description,
    });
    setEditId(s.id);
    setFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      subtitle: form.subtitle || undefined,
      description: form.description,
      price: parseFloat(form.price),
      duration: parseInt(form.duration),
      format: form.format,
      active: true,
    };
    if (editId) {
      updateMutation.mutate({ id: editId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const deleteTarget = servicios.find((s) => s.id === deleteId);

  return (
    <div className="max-w-5xl mx-auto px-8 py-10 space-y-6">
      <AdminHeader
        title="Servicios"
        subtitle={`${servicios.length} servicios configurados`}
        action={
          <Link href="/admin/servicios/nuevo"
            className="flex items-center gap-2 bg-morado-dark text-crema font-sans text-[0.65rem] px-5 py-3 tracking-widest uppercase font-semibold border-2 border-morado-dark block-shadow hover:bg-morado transition-colors">
            <Plus size={13} /> Nuevo servicio
          </Link>
        }
      />

      <div className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-tierra/40">
            <Loader2 size={18} className="animate-spin" />
            <span className="font-sans text-sm tracking-wide">Cargando servicios...</span>
          </div>
        ) : (
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
              {servicios.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center font-sans text-sm text-tierra/35 tracking-wide">
                    No hay servicios cargados aún
                  </td>
                </tr>
              ) : servicios.map((s) => (
                <tr key={s.id} className="hover:bg-dorado/5 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-sans font-semibold text-sm text-tierra-dark tracking-wide">{s.name}</p>
                    {s.subtitle && <p className="font-sans text-xs text-tierra/40 tracking-wide">{s.subtitle}</p>}
                    <p className="font-sans text-xs text-tierra/30 tracking-wide line-clamp-1 mt-0.5">{s.description}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-sans font-bold text-xl text-morado">${s.price}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-sans text-sm text-tierra/60">{s.duration} min</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-sans text-xs text-tierra/50 bg-crema-dark px-2.5 py-1 border border-morado/15">{s.format}</span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => toggleMutation.mutate({ id: s.id, active: !s.active })}
                      className={`relative w-10 h-5 border-2 border-morado-dark transition-colors ${s.active ? "bg-dorado" : "bg-tierra/10"}`}
                    >
                      <span className={`absolute top-0.5 w-3.5 h-3.5 bg-morado-dark transition-all ${s.active ? "left-4" : "left-0.5"}`} />
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
        )}
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
            <Input placeholder="Ej: Lectura de Tarot" value={form.name} onChange={(e) => set("name", e.target.value)} required />
          </Field>

          <Field label="Subtítulo" hint="Frase corta que describe la esencia del servicio">
            <Input placeholder="Ej: Una mirada profunda al momento presente" value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
          </Field>

          <Field label="Descripción" hint="Qué incluye la sesión y qué puede esperar la clienta" required>
            <Textarea placeholder="Describí el servicio con detalle..." value={form.description} onChange={(e) => set("description", e.target.value)} required />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Precio (ARS)" required>
              <Input type="number" step="0.01" min="0" placeholder="65" value={form.price} onChange={(e) => set("price", e.target.value)} required />
            </Field>
            <Field label="Duración (minutos)" required>
              <Input type="number" min="1" placeholder="60" value={form.duration} onChange={(e) => set("duration", e.target.value)} required />
            </Field>
          </div>

          <Field label="Formato">
            <Select value={form.format} onChange={(e) => set("format", e.target.value)}>
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
        message={`¿Segura que querés eliminar "${deleteTarget?.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Sí, eliminar"
        onConfirm={() => { if (deleteId) deleteMutation.mutate(deleteId); }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
