"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import AdminHeader from "../../_components/AdminHeader";
import { useToast } from "../../_components/AdminToast";

const inputClass = "w-full bg-white border-2 border-morado/20 px-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/25 focus:outline-none focus:border-morado transition-colors";
const labelClass = "block font-sans text-[0.6rem] text-tierra/50 tracking-widest uppercase mb-1.5";
const hintClass = "font-sans text-xs text-tierra/35 tracking-wide mb-2";

export default function NuevoProductoPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "", category: "Físico", price: "", priceOld: "", badge: "", desc: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast(`"${form.name}" creado exitosamente`);
    router.push("/admin/productos");
  };

  return (
    <div className="space-y-8">
      <Link href="/admin/productos" className="inline-flex items-center gap-2 font-sans text-[0.65rem] text-tierra/40 hover:text-tierra tracking-widest uppercase transition-colors">
        <ArrowLeft size={13} /> Volver a productos
      </Link>

      <AdminHeader
        title="Nuevo producto"
        subtitle="Completá los datos para agregar un producto a la tienda"
      />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-morado/10">
                <ShoppingBag size={16} className="text-morado" strokeWidth={1.8} />
                <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase">Información del producto</h2>
              </div>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Nombre <span className="text-rosa">*</span></label>
                  <input className={inputClass} placeholder="Ej: Kit de Inicio Ritual" value={form.name} onChange={(e) => set("name", e.target.value)} required />
                </div>
                <div>
                  <label className={labelClass}>Descripción <span className="text-rosa">*</span></label>
                  <p className={hintClass}>Qué incluye, para qué sirve y por qué lo va a querer</p>
                  <textarea rows={5} className={`${inputClass} resize-none`} placeholder="Describí el producto con detalle..." value={form.desc} onChange={(e) => set("desc", e.target.value)} required />
                </div>
                <div>
                  <label className={labelClass}>Categoría <span className="text-rosa">*</span></label>
                  <select className={inputClass} value={form.category} onChange={(e) => set("category", e.target.value)} required>
                    <option value="Físico">Físico — objeto enviado por correo</option>
                    <option value="Digital">Digital — descarga o acceso online</option>
                    <option value="Personalizado">Personalizado — hecho a medida</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Columna lateral */}
          <div className="space-y-5">
            <div className="bg-crema border-2 border-morado-dark block-shadow p-6">
              <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase mb-5 pb-4 border-b border-morado/10">Precio y estado</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Precio <span className="text-rosa">*</span></label>
                  <input className={inputClass} placeholder="$45" value={form.price} onChange={(e) => set("price", e.target.value)} required />
                </div>
                <div>
                  <label className={labelClass}>Precio anterior</label>
                  <p className={hintClass}>Solo si está en oferta</p>
                  <input className={inputClass} placeholder="$60" value={form.priceOld} onChange={(e) => set("priceOld", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Badge</label>
                  <p className={hintClass}>Etiqueta visible en la tienda</p>
                  <select className={inputClass} value={form.badge} onChange={(e) => set("badge", e.target.value)}>
                    <option value="">Sin badge</option>
                    <option value="Nuevo">Nuevo</option>
                    <option value="Oferta">Oferta</option>
                    <option value="Más vendido">Más vendido</option>
                    <option value="Agotado">Agotado</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button type="submit" className="w-full bg-morado-dark text-crema font-sans font-semibold text-[0.65rem] py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-morado transition-colors">
                ✦ Publicar producto
              </button>
              <Link href="/admin/productos" className="block w-full text-center font-sans text-[0.65rem] py-3 tracking-widest uppercase border-2 border-morado/20 text-tierra/50 hover:border-morado/50 hover:text-tierra transition-colors">
                Cancelar
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
