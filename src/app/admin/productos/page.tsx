"use client";

import { useState, useMemo } from "react";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import AdminHeader from "../_components/AdminHeader";
import ConfirmModal from "../_components/ConfirmModal";
import AdminFormModal, { Field, Input, Textarea, Select } from "../_components/AdminFormModal";
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
  "Más vendido": "text-dorado-dark", "Agotado": "text-tierra/35",
};

const emptyForm = {
  name: "", type: "FISICO" as "FISICO" | "DIGITAL" | "PERSONALIZADO",
  price: "", priceOld: "", badge: "", description: "",
};

export default function AdminProductos() {
  const { toast } = useToast();
  const utils = api.useUtils();

  const { data: productos = [], isLoading } = api.admin.productos.list.useQuery();

  const createMutation = api.admin.productos.create.useMutation({
    onSuccess: (_, vars) => {
      void utils.admin.productos.list.invalidate();
      toast(`"${vars.name}" creado`);
      setFormOpen(false);
    },
  });
  const updateMutation = api.admin.productos.update.useMutation({
    onSuccess: () => {
      void utils.admin.productos.list.invalidate();
      toast("Producto actualizado");
      setFormOpen(false);
    },
  });
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
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(
    () =>
      productos
        .filter((p) => catFilter === "Todos" || p.type === catFilter)
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [productos, search, catFilter]
  );

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const openCreate = () => { setForm(emptyForm); setEditId(null); setFormOpen(true); };
  const openEdit = (p: typeof productos[0]) => {
    setForm({
      name: p.name,
      type: p.type,
      price: String(p.price),
      priceOld: p.priceOld ? String(p.priceOld) : "",
      badge: p.badge ?? "",
      description: p.description,
    });
    setEditId(p.id);
    setFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      priceOld: form.priceOld ? parseFloat(form.priceOld) : undefined,
      type: form.type,
      badge: form.badge || undefined,
      active: true,
    };
    if (editId) {
      updateMutation.mutate({ id: editId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const deleteTarget = productos.find((p) => p.id === deleteId);
  const cats: CatFilter[] = ["Todos", "FISICO", "DIGITAL", "PERSONALIZADO"];

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Productos"
        subtitle={`${productos.length} productos en total`}
        action={
          <button onClick={openCreate}
            className="flex items-center gap-2 bg-morado-dark text-crema font-sans text-[0.65rem] px-5 py-3 tracking-widest uppercase font-semibold border-2 border-morado-dark block-shadow hover:bg-morado transition-colors">
            <Plus size={13} /> Nuevo producto
          </button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-tierra/35" />
          <input
            type="text" placeholder="Buscar producto..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-crema border-2 border-morado/20 pl-10 pr-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/30 focus:outline-none focus:border-morado transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {cats.map((cat) => (
            <button key={cat} onClick={() => setCatFilter(cat)}
              className={`px-4 py-2 font-sans text-[0.6rem] tracking-widest uppercase border-2 transition-colors ${catFilter === cat ? "bg-morado-dark text-crema border-morado-dark" : "bg-crema text-tierra/50 border-morado/20 hover:border-morado/50 hover:text-tierra"}`}>
              {cat === "Todos" ? "Todos" : catLabel[cat]}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-tierra/40">
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
                  <td colSpan={5} className="px-6 py-12 text-center font-sans text-sm text-tierra/35 tracking-wide">
                    {productos.length === 0 ? "No hay productos cargados aún" : "No se encontraron productos"}
                  </td>
                </tr>
              ) : filtered.map((p) => (
                <tr key={p.id} className="hover:bg-dorado/5 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-sans font-semibold text-sm text-tierra-dark tracking-wide">{p.name}</p>
                    <p className="font-sans text-xs text-tierra/40 tracking-wide line-clamp-1">{p.description}</p>
                    {p.badge && <span className={`font-sans text-[0.55rem] tracking-widest uppercase ${badgeColors[p.badge] ?? "text-tierra/50"}`}>✦ {p.badge}</span>}
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
                      <span className={`absolute top-0.5 w-3.5 h-3.5 bg-morado-dark transition-all ${p.active ? "left-4" : "left-0.5"}`} />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(p)} title="Editar" className="p-1.5 text-tierra/40 hover:text-morado transition-colors"><Pencil size={14} /></button>
                      <button onClick={() => setDeleteId(p.id)} title="Eliminar" className="p-1.5 text-tierra/40 hover:text-rosa transition-colors"><Trash2 size={14} /></button>
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

      <AdminFormModal
        open={formOpen}
        title={editId ? "Editar producto" : "Nuevo producto"}
        subtitle={editId ? "Modificá los datos del producto" : "Completá los datos para agregar un producto nuevo"}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        submitLabel={editId ? "Guardar cambios" : "Crear producto"}
      >
        <form id="admin-form" onSubmit={handleSubmit} className="space-y-5">
          <Field label="Nombre del producto" required>
            <Input placeholder="Ej: Kit de Inicio Ritual" value={form.name} onChange={(e) => set("name", e.target.value)} required />
          </Field>

          <Field label="Descripción" hint="Qué incluye y para qué sirve el producto" required>
            <Textarea placeholder="Describí el producto con detalle..." value={form.description} onChange={(e) => set("description", e.target.value)} required />
          </Field>

          <Field label="Categoría" required>
            <Select value={form.type} onChange={(e) => set("type", e.target.value)} required>
              <option value="FISICO">Físico</option>
              <option value="DIGITAL">Digital</option>
              <option value="PERSONALIZADO">Personalizado</option>
            </Select>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Precio (ARS)" required>
              <Input type="number" step="0.01" min="0" placeholder="45" value={form.price} onChange={(e) => set("price", e.target.value)} required />
            </Field>
            <Field label="Precio anterior" hint="Solo si está en oferta">
              <Input type="number" step="0.01" min="0" placeholder="60" value={form.priceOld} onChange={(e) => set("priceOld", e.target.value)} />
            </Field>
          </div>

          <Field label="Badge" hint="Etiqueta destacada (opcional)">
            <Select value={form.badge} onChange={(e) => set("badge", e.target.value)}>
              <option value="">Sin badge</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Oferta">Oferta</option>
              <option value="Más vendido">Más vendido</option>
              <option value="Agotado">Agotado</option>
            </Select>
          </Field>
        </form>
      </AdminFormModal>

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
