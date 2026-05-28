"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Wrench } from "lucide-react";
import Link from "next/link";
import AdminHeader from "../../_components/AdminHeader";
import { useToast } from "../../_components/AdminToast";

const inputClass = "w-full bg-white border-2 border-morado/20 px-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/25 focus:outline-none focus:border-morado transition-colors";
const labelClass = "block font-sans text-[0.6rem] text-tierra/50 tracking-widest uppercase mb-1.5";
const hintClass = "font-sans text-xs text-tierra/35 tracking-wide mb-2";

export default function NuevoServicioPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [form, setForm] = useState({
    title: "", subtitle: "", desc: "", price: "", duration: "", format: "Zoom",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast(`"${form.title}" creado exitosamente`);
    router.push("/admin/servicios");
  };

  return (
    <div className="space-y-8">
      <Link href="/admin/servicios" className="inline-flex items-center gap-2 font-sans text-[0.65rem] text-tierra/40 hover:text-tierra tracking-widest uppercase transition-colors">
        <ArrowLeft size={13} /> Volver a servicios
      </Link>

      <AdminHeader
        title="Nuevo servicio"
        subtitle="Completá los datos para agregar una sesión o servicio"
      />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-morado/10">
                <Wrench size={16} className="text-morado" strokeWidth={1.8} />
                <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase">Información del servicio</h2>
              </div>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Nombre del servicio <span className="text-rosa">*</span></label>
                  <input className={inputClass} placeholder="Ej: Lectura de Tarot" value={form.title} onChange={(e) => set("title", e.target.value)} required />
                </div>
                <div>
                  <label className={labelClass}>Subtítulo</label>
                  <p className={hintClass}>Frase corta que describe la esencia del servicio</p>
                  <input className={inputClass} placeholder="Ej: Una mirada profunda al momento presente" value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Descripción <span className="text-rosa">*</span></label>
                  <p className={hintClass}>Qué incluye la sesión, cómo funciona y qué puede esperar la clienta</p>
                  <textarea rows={5} className={`${inputClass} resize-none`} placeholder="Describí la sesión en detalle..." value={form.desc} onChange={(e) => set("desc", e.target.value)} required />
                </div>
              </div>
            </div>
          </div>

          {/* Columna lateral */}
          <div className="space-y-5">
            <div className="bg-crema border-2 border-morado-dark block-shadow p-6">
              <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase mb-5 pb-4 border-b border-morado/10">Detalles de la sesión</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Precio <span className="text-rosa">*</span></label>
                  <input className={inputClass} placeholder="$65" value={form.price} onChange={(e) => set("price", e.target.value)} required />
                </div>
                <div>
                  <label className={labelClass}>Duración <span className="text-rosa">*</span></label>
                  <input className={inputClass} placeholder="60 min" value={form.duration} onChange={(e) => set("duration", e.target.value)} required />
                </div>
                <div>
                  <label className={labelClass}>Formato <span className="text-rosa">*</span></label>
                  <p className={hintClass}>¿Cómo se realiza la sesión?</p>
                  <select className={inputClass} value={form.format} onChange={(e) => set("format", e.target.value)} required>
                    <option value="Zoom">Zoom</option>
                    <option value="Zoom + guía">Zoom + guía PDF</option>
                    <option value="Grabación">Solo grabación</option>
                    <option value="Presencial">Presencial</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button type="submit" className="w-full bg-morado-dark text-crema font-sans font-semibold text-[0.65rem] py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-morado transition-colors">
                ✦ Publicar servicio
              </button>
              <Link href="/admin/servicios" className="block w-full text-center font-sans text-[0.65rem] py-3 tracking-widest uppercase border-2 border-morado/20 text-tierra/50 hover:border-morado/50 hover:text-tierra transition-colors">
                Cancelar
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
