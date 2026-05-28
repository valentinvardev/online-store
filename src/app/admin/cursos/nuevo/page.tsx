"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "../../_components/AdminToast";
import { api } from "~/trpc/react";

const inputClass = "w-full bg-white border-2 border-morado/20 px-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/25 focus:outline-none focus:border-morado transition-colors";
const labelClass = "block font-sans text-[0.6rem] text-tierra/50 tracking-widest uppercase mb-1.5";
const hintClass = "font-sans text-xs text-tierra/35 tracking-wide mb-2";

const empty = {
  name: "", subtitle: "", description: "", price: "",
  durationWeeks: "", lessonsCount: "", level: "Todos los niveles",
  badge: "", imageUrl: "",
};

export default function NuevoCursoPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = useState(empty);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const create = api.admin.cursos.create.useMutation({
    onSuccess: (curso) => {
      toast(`"${curso.name}" publicado`);
      router.push("/admin/cursos");
    },
    onError: (err) => toast(err.message, "error"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate({
      name: form.name,
      subtitle: form.subtitle || undefined,
      description: form.description,
      price: parseFloat(form.price),
      durationWeeks: form.durationWeeks ? parseInt(form.durationWeeks) : undefined,
      lessonsCount: form.lessonsCount ? parseInt(form.lessonsCount) : undefined,
      level: form.level,
      badge: form.badge || undefined,
      imageUrl: form.imageUrl || undefined,
      active: true,
    });
  };

  const saving = create.isPending;

  return (
    <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

      <Link
        href="/admin/cursos"
        className="inline-flex items-center gap-2 font-sans text-[0.65rem] text-tierra/40 hover:text-tierra tracking-widest uppercase transition-colors"
      >
        <ArrowLeft size={13} /> Volver a cursos
      </Link>

      <div>
        <p className="font-sans text-[0.58rem] text-tierra/30 tracking-[0.35em] uppercase mb-1">Nuevo contenido</p>
        <h1 className="font-display text-5xl text-morado-dark tracking-wide uppercase leading-none">Nuevo Curso</h1>
        <p className="font-sans text-tierra/45 mt-2 tracking-wide text-sm">
          Completá los datos para publicar un curso en el sitio
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-5">

            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-morado/10">
                <BookOpen size={15} className="text-morado" strokeWidth={1.8} />
                <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase">Información del curso</h2>
              </div>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Título <span className="text-rosa">*</span></label>
                  <input className={inputClass} placeholder="Ej: Tarot desde Cero" value={form.name} onChange={(e) => set("name", e.target.value)} required />
                </div>
                <div>
                  <label className={labelClass}>Subtítulo</label>
                  <p className={hintClass}>Frase corta y evocadora que complementa el título</p>
                  <input className={inputClass} placeholder="Ej: Leé tu propio código sagrado" value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Descripción <span className="text-rosa">*</span></label>
                  <p className={hintClass}>Qué aprende la alumna, cómo se trabaja y qué la hace especial</p>
                  <textarea rows={6} className={`${inputClass} resize-none`} placeholder="Describí el curso con detalle y emoción..." value={form.description} onChange={(e) => set("description", e.target.value)} required />
                </div>
                <div>
                  <label className={labelClass}>URL de imagen</label>
                  <p className={hintClass}>Link directo a la imagen de portada del curso</p>
                  <input className={inputClass} placeholder="https://..." value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} />
                </div>
              </div>
            </div>

            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase mb-6 pb-5 border-b border-morado/10">
                Estructura del curso
              </h2>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Duración (semanas)</label>
                  <input type="number" min="1" className={inputClass} placeholder="Ej: 8" value={form.durationWeeks} onChange={(e) => set("durationWeeks", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Cantidad de clases</label>
                  <input type="number" min="1" className={inputClass} placeholder="Ej: 24" value={form.lessonsCount} onChange={(e) => set("lessonsCount", e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* Columna lateral */}
          <div className="space-y-5">
            <div className="bg-crema border-2 border-morado-dark block-shadow p-6">
              <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase mb-5 pb-4 border-b border-morado/10">
                Publicación
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Precio (ARS) <span className="text-rosa">*</span></label>
                  <input type="number" step="0.01" min="0" className={inputClass} placeholder="Ej: 15000" value={form.price} onChange={(e) => set("price", e.target.value)} required />
                </div>
                <div>
                  <label className={labelClass}>Nivel</label>
                  <select className={`${inputClass} cursor-pointer`} value={form.level} onChange={(e) => set("level", e.target.value)}>
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                    <option value="Todos los niveles">Todos los niveles</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Badge</label>
                  <p className={hintClass}>Etiqueta visible en la card</p>
                  <select className={`${inputClass} cursor-pointer`} value={form.badge} onChange={(e) => set("badge", e.target.value)}>
                    <option value="">Sin badge</option>
                    <option value="Nuevo">Nuevo</option>
                    <option value="Más vendido">Más vendido</option>
                    <option value="Últimos lugares">Últimos lugares</option>
                    <option value="Próximamente">Próximamente</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 w-full bg-morado-dark text-crema font-sans font-semibold text-[0.65rem] py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-morado transition-colors disabled:opacity-60"
              >
                {saving ? <Loader2 size={13} className="animate-spin" /> : "✦"}
                {saving ? "Publicando..." : "Publicar curso"}
              </button>
              <Link
                href="/admin/cursos"
                className="block w-full text-center font-sans text-[0.65rem] py-3 tracking-widest uppercase border-2 border-morado/20 text-tierra/50 hover:border-morado/50 hover:text-tierra transition-colors"
              >
                Cancelar
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
