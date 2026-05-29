"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import AdminHeader from "../_components/AdminHeader";
import ConfirmModal from "../_components/ConfirmModal";
import { useToast } from "../_components/AdminToast";
import { api } from "~/trpc/react";

type CatFilter = "Todos" | "FISICO" | "DIGITAL" | "PERSONALIZADO";

const catLabel: Record<string, string> = { FISICO: "Físico", DIGITAL: "Digital", PERSONALIZADO: "Personalizado" };
const catColors: Record<string, string> = {
  FISICO: "bg-verde/15 text-verde border-verde/30",
  DIGITAL: "bg-celeste/15 text-celeste border-celeste/30",
  PERSONALIZADO: "bg-rosa/10 text-rosa border-rosa/25",
};
const badgeColors: Record<string, string> = {
  "Nuevo": "text-celeste", "Oferta": "text-naranja",
  "Más vendido": "text-dorado-dark", "Agotado": "text-tierra/55",
};

export default function AdminProductos() {
  const { toast } = useToast();
  const utils = api.useUtils();

  const { data: productos = [], isLoading } = api.admin.productos.list.useQuery();

  const deleteMutation = api.admin.productos.delete.useMutation({
    onSuccess: () => {
      void utils.admin.productos.list.invalidate();
      setDeleteId(null);
      toast("Producto eliminado", "error");
    },
  });
  const toggleMutation = api.admin.productos.toggleActive.useMutation({
    onSuccess: () => void utils.admin.productos.list.invalidate(),
  });

  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState<CatFilter>("Todos");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      productos
        .filter((p) => catFilter === "Todos" || p.type === catFilter)
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [productos, search, catFilter]
  );

  const deleteTarget = productos.find((p) => p.id === deleteId);
  const cats: CatFilter[] = ["Todos", "FISICO", "DIGITAL", "PERSONALIZADO"];

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Productos"
        subtitle={`${productos.length} productos en total`}
        action={
          <Link href="/admin/productos/nuevo"
            className="flex items-center gap-2 bg-morado-dark text-crema font-sans text-[0.65rem] px-5 py-3 tracking-widest uppercase font-semibold border-2 border-morado-dark block-shadow hover:bg-morado transition-colors">
            <Plus size={13} /> Nuevo producto
          </Link>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-tierra/55" />
          <input
            type="text" placeholder="Buscar producto..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-crema border-2 border-morado/20 pl-10 pr-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/30 focus:outline-none focus:border-morado transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {cats.map((cat) => (
            <button key={cat} onClick={() => setCatFilter(cat)}
              className={`px-4 py-2 font-sans text-[0.6rem] tracking-widest uppercase border-2 transition-colors ${catFilter === cat ? "bg-morado-dark text-crema border-morado-dark" : "bg-crema text-tierra/70 border-morado/20 hover:border-morado/50 hover:text-tierra"}`}>
              {cat === "Todos" ? "Todos" : catLabel[cat]}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-tierra/60">
            <Loader2 size={18} className="animate-spin" />
            <span className="font-sans text-sm tracking-wide">Cargando productos...</span>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-morado-dark bg-morado-dark">
                <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-6 py-4">Producto</th>
                <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Categoría</th>
                <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Precio</th>
                <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Activo</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-morado/10">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center font-sans text-sm text-tierra/55 tracking-wide">
                    {productos.length === 0 ? "No hay productos cargados aún" : "No se encontraron productos"}
                  </td>
                </tr>
              ) : filtered.map((p) => (
                <tr key={p.id} className="hover:bg-dorado/5 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-sans font-semibold text-sm text-tierra-dark tracking-wide">{p.name}</p>
                    <p className="font-sans text-xs text-tierra/60 tracking-wide line-clamp-1">{p.description}</p>
                    {p.badge && <span className={`font-sans text-[0.55rem] tracking-widest uppercase ${badgeColors[p.badge] ?? "text-tierra/70"}`}>✦ {p.badge}</span>}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`font-sans text-[0.58rem] px-2.5 py-1 border tracking-widest uppercase ${catColors[p.type]}`}>{catLabel[p.type]}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans font-bold text-xl text-morado">${p.price}</span>
                      {p.priceOld && <span className="font-sans text-xs text-tierra/30 line-through">${p.priceOld}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => toggleMutation.mutate({ id: p.id, active: !p.active })}
                      className={`relative w-10 h-5 border-2 border-morado-dark transition-colors ${p.active ? "bg-dorado" : "bg-tierra/10"}`}
                    >
                      <span className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-morado-dark transition-all ${p.active ? "left-5" : "left-0.5"}`} />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/productos/${p.id}`} title="Editar" className="p-1.5 text-tierra/60 hover:text-morado transition-colors"><Pencil size={14} /></Link>
                      <button onClick={() => setDeleteId(p.id)} title="Eliminar" className="p-1.5 text-tierra/60 hover:text-rosa transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!isLoading && filtered.length > 0 && (
          <div className="px-6 py-3 border-t border-morado/10">
            <p className="font-sans text-[0.6rem] text-tierra/30 tracking-widest uppercase">Mostrando {filtered.length} de {productos.length} productos</p>
          </div>
        )}
      </div>

      <ConfirmModal
        open={deleteId !== null}
        title="Eliminar producto"
        message={`¿Segura que querés eliminar "${deleteTarget?.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Sí, eliminar"
        onConfirm={() => { if (deleteId) deleteMutation.mutate(deleteId); }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
