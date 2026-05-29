"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import AdminHeader from "../_components/AdminHeader";
import ConfirmModal from "../_components/ConfirmModal";
import { useToast } from "../_components/AdminToast";
import { api } from "~/trpc/react";

export default function AdminServicios() {
  const { toast } = useToast();
  const utils = api.useUtils();

  const { data: servicios = [], isLoading } = api.admin.servicios.list.useQuery();

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
  const deleteTarget = servicios.find((s) => s.id === deleteId);

  return (
    <div className="space-y-6">
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
                      <span className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-morado-dark transition-all ${s.active ? "left-5" : "left-0.5"}`} />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/servicios/${s.id}`} title="Editar" className="p-1.5 text-tierra/40 hover:text-morado transition-colors"><Pencil size={14} /></Link>
                      <button onClick={() => setDeleteId(s.id)} title="Eliminar" className="p-1.5 text-tierra/40 hover:text-rosa transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

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
