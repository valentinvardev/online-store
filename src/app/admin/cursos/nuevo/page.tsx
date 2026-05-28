"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import AdminHeader from "../../_components/AdminHeader";
import { useToast } from "../../_components/AdminToast";

const inputClass = "w-full bg-white border-2 border-morado/20 px-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/25 focus:outline-none focus:border-morado transition-colors";
const labelClass = "block font-sans text-[0.6rem] text-tierra/50 tracking-widest uppercase mb-1.5";
const hintClass = "font-sans text-xs text-tierra/35 tracking-wide mb-2";

export default function NuevoCursoPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [form, setForm] = useState({
    title: "", subtitle: "", desc: "", price: "",
    duration: "", lessons: "", level: "Principiante", badge: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast(`"${form.title}" creado exitosamente`);
    router.push("/admin/cursos");
  };

  return (
    <div className="space-y-8">
      {/* Back */}
      <Link href="/admin/cursos" className="inline-flex items-center gap-2 font-sans text-[0.65rem] text-tierra/40 hover:text-tierra tracking-widest uppercase transition-colors">
        <ArrowLeft size={13} /> Volver a cursos
      </Link>

      <AdminHeader
        title="Nuevo curso"
        subtitle="Completá los datos para publicar un curso nuevo"
      />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-5">

            {/* Card info básica */}
            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-morado/10">
                <BookOpen size={16} className="text-morado" strokeWidth={1.8} />
                <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase">Información del curso</h2>
              </div>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Título <span className="text-rosa">*</span></label>
                  <input className={inputClass} placeholder="Ej: Tarot desde Cero" value={form.title} onChange={(e) => set("title", e.target.value)} required />
                </div>
                <div>
                  <label className={labelClass}>Subtítulo</label>
                  <p className={hintClass}>Frase corta y evocadora que complementa el título</p>
                  <input className={inputClass} placeholder="Ej: Leé tu propio código sagrado" value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Descripción <span className="text-rosa">*</span></label>
                  <p className={hintClass}>Qué aprende la alumna, cómo se trabaja y qué la hace especial</p>
                  <textarea rows={5} className={`${inputClass} resize-none`} placeholder="Describí el curso con detalle y emoción..." value={form.desc} onChange={(e) => set("desc", e.target.value)} required />
                </div>
              </div>
            </div>

            {/* Card estructura */}
            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase mb-6 pb-5 border-b border-morado/10">Estructura del curso</h2>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Duración total</label>
                  <input className={inputClass} placeholder="Ej: 8 semanas" value={form.duration} onChange={(e) => set("duration", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Cantidad de clases</label>
                  <input className={inputClass} placeholder="Ej: 24 clases" value={form.lessons} onChange={(e) => set("lessons", e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* Columna lateral */}
          <div className="space-y-5">

            {/* Card publicación */}
            <div className="bg-crema border-2 border-morado-dark block-shadow p-6">
              <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase mb-5 pb-4 border-b border-morado/10">Publicación</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Precio <span className="text-rosa">*</span></label>
                  <input className={inputClass} placeholder="$89" value={form.price} onChange={(e) => set("price", e.target.value)} required />
                </div>
                <div>
                  <label className={labelClass}>Nivel <span className="text-rosa">*</span></label>
                  <select className={inputClass} value={form.level} onChange={(e) => set("level", e.target.value)} required>
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Todos los niveles">Todos los niveles</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Badge</label>
                  <p className={hintClass}>Etiqueta visible en la card del curso</p>
                  <select className={inputClass} value={form.badge} onChange={(e) => set("badge", e.target.value)}>
                    <option value="">Sin badge</option>
                    <option value="Más vendido">Más vendido</option>
                    <option value="Nuevo">Nuevo</option>
                    <option value="Últimos lugares">Últimos lugares</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="space-y-3">
              <button type="submit" className="w-full bg-morado-dark text-crema font-sans font-semibold text-[0.65rem] py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-morado transition-colors">
                ✦ Publicar curso
              </button>
              <Link href="/admin/cursos" className="block w-full text-center font-sans text-[0.65rem] py-3 tracking-widest uppercase border-2 border-morado/20 text-tierra/50 hover:border-morado/50 hover:text-tierra transition-colors">
                Cancelar
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
