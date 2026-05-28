"use client";

import { useState, useMemo } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Link from "next/link";
import AdminHeader from "../_components/AdminHeader";
import ConfirmModal from "../_components/ConfirmModal";
import AdminFormModal, { Field, Input, Textarea, Select } from "../_components/AdminFormModal";
import { useToast } from "../_components/AdminToast";

type Categoria = "Todos" | "Físico" | "Digital" | "Personalizado";
type Badge = "Nuevo" | "Oferta" | "Más vendido" | "Agotado" | "";

interface Producto {
  id: number;
  name: string;
  category: Exclude<Categoria, "Todos">;
  price: string;
  priceOld?: string;
  badge?: Badge;
  desc: string;
  activo: boolean;
}

const inicial: Producto[] = [
  { id: 1,  name: "Kit de Inicio Ritual",      category: "Físico",        price: "$45",  badge: "Más vendido", desc: "Todo lo necesario para comenzar tu práctica ritual: vela, cristal, incienso y guía.", activo: true },
  { id: 2,  name: "Vela Rituálica Protección", category: "Físico",        price: "$18",  badge: "",            desc: "Vela artesanal cargada con intención de protección y limpieza energética.", activo: true },
  { id: 3,  name: "Cristal Cuarzo Rosa",       category: "Físico",        price: "$22",  badge: "Nuevo",       desc: "Cuarzo rosa natural, ideal para rituales de amor propio y sanación.", activo: true },
  { id: 4,  name: "Hierbas Rituales Pack",     category: "Físico",        price: "$28",  badge: "",            desc: "Selección de hierbas sagradas para sahumerios, baños y rituales de limpieza.", activo: true },
  { id: 5,  name: "Incienso Sagrado x20",      category: "Físico",        price: "$12",  badge: "",            desc: "Pack de 20 varas de incienso en mezcla de palo santo, lavanda y sándalo.", activo: true },
  { id: 6,  name: "Piedras de Protección",     category: "Físico",        price: "$35",  badge: "Agotado",     desc: "Set de 4 piedras: obsidiana, turmalina negra, ónix y cuarzo ahumado.", activo: false },
  { id: 7,  name: "Oráculo de la Reina",       category: "Digital",       price: "$29",  badge: "Más vendido", desc: "Mazo de 44 cartas de oráculo en formato digital PDF listo para imprimir.", activo: true },
  { id: 8,  name: "Almanaque Lunar 2025",      category: "Digital",       price: "$15",  badge: "",            desc: "Calendario lunar con rituales, afirmaciones y guía para cada fase de la luna.", activo: true },
  { id: 9,  name: "Carta Astral PDF",          category: "Digital",       price: "$25",  badge: "Nuevo",       desc: "Tu carta natal interpretada en un PDF de 12 páginas con guía de tránsitos.", activo: true },
  { id: 10, name: "Agenda Espiritual",         category: "Digital",       price: "$19",  priceOld: "$25", badge: "Oferta", desc: "Agenda digital con rituals semanales, espacio para intenciones y luna.", activo: true },
  { id: 11, name: "Ritual Personalizado",      category: "Personalizado", price: "$80",  badge: "",            desc: "Ritual diseñado específicamente para vos según tu carta natal y momento de vida.", activo: true },
  { id: 12, name: "Kit Luna Nueva",            category: "Personalizado", price: "$55",  badge: "Agotado",     desc: "Kit completo para la luna nueva: intenciones, vela, cristal y ritual guiado.", activo: false },
];

const categorias: Categoria[] = ["Todos", "Físico", "Digital", "Personalizado"];

const catColors: Record<Exclude<Categoria, "Todos">, string> = {
  "Físico":        "bg-verde/15 text-verde border-verde/30",
  "Digital":       "bg-celeste/15 text-celeste border-celeste/30",
  "Personalizado": "bg-rosa/10 text-rosa border-rosa/25",
};

const badgeColors: Record<string, string> = {
  "Nuevo":       "text-celeste",
  "Oferta":      "text-naranja",
  "Más vendido": "text-dorado-dark",
  "Agotado":     "text-tierra/35",
};

const emptyForm = { name: "", category: "Físico" as Exclude<Categoria, "Todos">, price: "", priceOld: "", badge: "" as Badge, desc: "" };

export default function AdminProductos() {
  const { toast } = useToast();
  const [data, setData] = useState(inicial);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState<Categoria>("Todos");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() =>
    data
      .filter((p) => catFilter === "Todos" || p.category === catFilter)
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [data, search, catFilter]
  );

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const openEdit = (p: Producto) => {
    setForm({ name: p.name, category: p.category, price: p.price, priceOld: p.priceOld ?? "", badge: p.badge ?? "", desc: p.desc });
    setEditId(p.id);
    setFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      setData((prev) => prev.map((p) => p.id === editId ? { ...p, ...form } : p));
      toast(`"${form.name}" actualizado`);
    } else {
      setData((prev) => [...prev, { ...form, id: Date.now(), activo: true }]);
      toast(`"${form.name}" creado`);
    }
    setFormOpen(false);
  };

  const toggle = (id: number) => {
    setData((prev) => prev.map((p) => p.id === id ? { ...p, activo: !p.activo } : p));
    const p = data.find((p) => p.id === id);
    toast(p?.activo ? `"${p.name}" desactivado` : `"${p?.name}" activado`);
  };

  const confirmDelete = () => {
    const p = data.find((p) => p.id === deleteId);
    setData((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
    toast(`"${p?.name}" eliminado`, "error");
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Productos"
        subtitle={`${data.length} productos en total`}
        action={
          <Link href="/admin/productos/nuevo" className="flex items-center gap-2 bg-morado-dark text-crema font-sans text-[0.65rem] px-5 py-3 tracking-widest uppercase font-semibold border-2 border-morado-dark block-shadow hover:bg-morado transition-colors">
            <Plus size={13} /> Nuevo producto
          </Link>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-tierra/35" />
          <input type="text" placeholder="Buscar producto..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-crema border-2 border-morado/20 pl-10 pr-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/30 focus:outline-none focus:border-morado transition-colors" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categorias.map((cat) => (
            <button key={cat} onClick={() => setCatFilter(cat)}
              className={`px-4 py-2 font-sans text-[0.6rem] tracking-widest uppercase border-2 transition-colors ${catFilter === cat ? "bg-morado-dark text-crema border-morado-dark" : "bg-crema text-tierra/50 border-morado/20 hover:border-morado/50 hover:text-tierra"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
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
              <tr><td colSpan={5} className="px-6 py-12 text-center font-sans text-sm text-tierra/35 tracking-wide">No se encontraron productos</td></tr>
            ) : filtered.map((p) => (
              <tr key={p.id} className="hover:bg-dorado/5 transition-colors group">
                <td className="px-6 py-4">
                  <p className="font-sans font-semibold text-sm text-tierra-dark tracking-wide">{p.name}</p>
                  <p className="font-sans text-xs text-tierra/40 tracking-wide line-clamp-1">{p.desc}</p>
                  {p.badge && <span className={`font-sans text-[0.55rem] tracking-widest uppercase ${badgeColors[p.badge]}`}>✦ {p.badge}</span>}
                </td>
                <td className="px-4 py-4">
                  <span className={`font-sans text-[0.58rem] px-2.5 py-1 border tracking-widest uppercase ${catColors[p.category]}`}>{p.category}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-xl text-morado">{p.price}</span>
                    {p.priceOld && <span className="font-sans text-xs text-tierra/30 line-through">{p.priceOld}</span>}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <button onClick={() => toggle(p.id)} className={`relative w-10 h-5 border-2 border-morado-dark transition-colors ${p.activo ? "bg-dorado" : "bg-tierra/10"}`}>
                    <span className={`absolute top-0.5 w-3.5 h-3.5 bg-morado-dark transition-all ${p.activo ? "left-4" : "left-0.5"}`} />
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
        {filtered.length > 0 && (
          <div className="px-6 py-3 border-t border-morado/10">
            <p className="font-sans text-[0.6rem] text-tierra/30 tracking-widest uppercase">Mostrando {filtered.length} de {data.length} productos</p>
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
            <Textarea placeholder="Describí el producto con detalle..." value={form.desc} onChange={(e) => set("desc", e.target.value)} required />
          </Field>

          <Field label="Categoría" required>
            <Select value={form.category} onChange={(e) => set("category", e.target.value)} required>
              <option value="Físico">Físico</option>
              <option value="Digital">Digital</option>
              <option value="Personalizado">Personalizado</option>
            </Select>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Precio" required>
              <Input placeholder="$45" value={form.price} onChange={(e) => set("price", e.target.value)} required />
            </Field>
            <Field label="Precio anterior" hint="Solo si está en oferta">
              <Input placeholder="$60" value={form.priceOld} onChange={(e) => set("priceOld", e.target.value)} />
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
        message={`¿Segura que querés eliminar "${data.find((p) => p.id === deleteId)?.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Sí, eliminar"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
