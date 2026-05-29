"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import AdminHeader from "../_components/AdminHeader";
import ConfirmModal from "../_components/ConfirmModal";
import { useToast } from "../_components/AdminToast";
import { api } from "~/trpc/react";

const levelColors: Record<string, string> = {
  "Principiante":      "bg-verde/15 text-verde border-verde/30",
  "Intermedio":        "bg-celeste/15 text-celeste border-celeste/30",
  "Todos los niveles": "bg-dorado/15 text-dorado-dark border-dorado/30",
  "Avanzado":          "bg-morado/15 text-morado border-morado/30",
};

export default function AdminCursos() {
  const { toast } = useToast();
  const utils = api.useUtils();

  const { data: cursos = [], isLoading } = api.admin.cursos.list.useQuery();

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

  const filtered = useMemo(
    () => cursos.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [cursos, search]
  );

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
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-tierra/55" />
        <input
          type="text" placeholder="Buscar curso..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-crema border-2 border-morado/20 pl-10 pr-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/30 focus:outline-none focus:border-morado transition-colors"
        />
      </div>

      <div className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-tierra/60">
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
                  <td colSpan={6} className="px-6 py-12 text-center font-sans text-sm text-tierra/55 tracking-wide">
                    {cursos.length === 0 ? "No hay cursos cargados aún" : "No se encontraron cursos"}
                  </td>
                </tr>
              ) : filtered.map((c) => (
                <tr key={c.id} className="hover:bg-dorado/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {c.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.imageUrl} alt={c.name} className="w-10 h-10 object-cover border border-morado/15 shrink-0" />
                      )}
                      <div>
                        <p className="font-sans font-semibold text-sm text-tierra-dark tracking-wide">{c.name}</p>
                        {c.subtitle && <p className="font-sans text-xs text-tierra/60 tracking-wide">{c.subtitle}</p>}
                        {c.badge && <span className="font-sans text-[0.55rem] text-dorado-dark tracking-widest uppercase">✦ {c.badge}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`font-sans text-[0.58rem] px-2.5 py-1 border tracking-widest uppercase ${levelColors[c.level] ?? "bg-tierra/10 text-tierra/70 border-tierra/20"}`}>
                      {c.level}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-sans font-bold text-xl text-morado">${c.price}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-sans text-sm text-tierra/70">{c._count.enrollments}</span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => toggleMutation.mutate({ id: c.id, active: !c.active })}
                      className={`relative w-10 h-5 border-2 border-morado-dark transition-colors ${c.active ? "bg-dorado" : "bg-tierra/10"}`}
                    >
                      <span className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-morado-dark transition-all ${c.active ? "left-5" : "left-0.5"}`} />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/cursos/${c.id}`} title="Gestionar" className="p-1.5 text-tierra/60 hover:text-morado transition-colors"><Pencil size={14} /></Link>
                      <button onClick={() => setDeleteId(c.id)} title="Eliminar" className="p-1.5 text-tierra/60 hover:text-rosa transition-colors"><Trash2 size={14} /></button>
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

      <ConfirmModal
        open={deleteId !== null}
        title="Eliminar curso"
        message={`¿Segura que querés eliminar "${deleteTarget?.name}"? Se eliminarán todos sus módulos y clases.`}
        confirmLabel="Sí, eliminar"
        onConfirm={() => { if (deleteId) deleteMutation.mutate(deleteId); }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
