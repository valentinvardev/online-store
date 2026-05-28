"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Wrench, Loader2, ImageIcon } from "lucide-react";
import Link from "next/link";
import { useToast } from "../../_components/AdminToast";
import { ImageGallery, useImageGallery } from "../../_components/ImageGallery";
import { api } from "~/trpc/react";

const inputClass = "w-full bg-white border-2 border-morado/20 px-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/25 focus:outline-none focus:border-morado transition-colors";
const labelClass = "block font-sans text-[0.6rem] text-tierra/50 tracking-widest uppercase mb-1.5";
const hintClass = "font-sans text-xs text-tierra/35 tracking-wide mb-2";

const formatos = [
  { value: "Zoom",        label: "Zoom",            desc: "Videollamada en vivo" },
  { value: "Zoom + guía", label: "Zoom + Guía PDF", desc: "Videollamada + material" },
  { value: "Grabación",   label: "Solo grabación",  desc: "Video enviado por email" },
  { value: "Presencial",  label: "Presencial",       desc: "Encuentro en persona" },
];

const empty = { name: "", subtitle: "", description: "", price: "", duration: "", format: "Zoom" };

export default function NuevoServicioPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = useState(empty);
  const gallery = useImageGallery();
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const create = api.admin.servicios.create.useMutation({
    onSuccess: (s) => { toast(`"${s.name}" publicado`); router.push("/admin/servicios"); },
    onError: (err) => toast(err.message, "error"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gallery.isUploading) { toast("Esperá a que terminen de subir todas las fotos", "error"); return; }
    create.mutate({
      name: form.name,
      subtitle: form.subtitle || undefined,
      description: form.description,
      price: parseFloat(form.price),
      duration: parseInt(form.duration),
      format: form.format,
      imageUrl: gallery.readyImages[0]?.url,
      images: gallery.readyImages.map((img) => img.url),
      active: true,
    });
  };

  const saving = create.isPending;

  return (
    <div className="space-y-8">
      <Link href="/admin/servicios" className="inline-flex items-center gap-2 font-sans text-[0.65rem] text-tierra/40 hover:text-tierra tracking-widest uppercase transition-colors">
        <ArrowLeft size={13} /> Volver a servicios
      </Link>

      <div>
        <p className="font-sans text-[0.58rem] text-tierra/30 tracking-[0.35em] uppercase mb-1">Nuevo contenido</p>
        <h1 className="font-display text-5xl text-morado-dark tracking-wide uppercase leading-none">Nuevo Servicio</h1>
        <p className="font-sans text-tierra/45 mt-2 tracking-wide text-sm">Completá los datos para agregar una sesión o servicio</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-5">

            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-morado/10">
                <Wrench size={15} className="text-morado" strokeWidth={1.8} />
                <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase">Información del servicio</h2>
              </div>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Nombre del servicio <span className="text-rosa">*</span></label>
                  <input className={inputClass} placeholder="Ej: Lectura de Tarot" value={form.name} onChange={(e) => set("name", e.target.value)} required />
                </div>
                <div>
                  <label className={labelClass}>Subtítulo</label>
                  <p className={hintClass}>Frase corta que describe la esencia del servicio</p>
                  <input className={inputClass} placeholder="Ej: Una mirada profunda al momento presente" value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Descripción <span className="text-rosa">*</span></label>
                  <p className={hintClass}>Qué incluye la sesión, cómo funciona y qué puede esperar la clienta</p>
                  <textarea rows={6} className={`${inputClass} resize-none`} placeholder="Describí la sesión en detalle..." value={form.description} onChange={(e) => set("description", e.target.value)} required />
                </div>
              </div>
            </div>

            {/* Formato */}
            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase mb-6 pb-5 border-b border-morado/10">Formato de la sesión</h2>
              <div className="grid grid-cols-2 gap-3">
                {formatos.map(({ value, label, desc }) => (
                  <button key={value} type="button" onClick={() => set("format", value)}
                    className={`py-4 px-4 border-2 text-left transition-colors ${form.format === value ? "bg-verde text-white border-verde" : "bg-white text-tierra/50 border-morado/15 hover:border-morado/40"}`}>
                    <p className={`font-sans text-[0.62rem] tracking-widest uppercase font-semibold ${form.format === value ? "text-white" : "text-tierra-dark"}`}>{label}</p>
                    <p className={`font-sans text-[0.58rem] mt-1 ${form.format === value ? "text-white/60" : "text-tierra/30"}`}>{desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Galería */}
            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-morado/10">
                <div className="flex items-center gap-3">
                  <ImageIcon size={15} className="text-morado" strokeWidth={1.8} />
                  <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase">Fotos del servicio</h2>
                </div>
                {gallery.readyImages.length > 0 && (
                  <span className="font-sans text-[0.58rem] text-tierra/35 tracking-widest uppercase">{gallery.readyImages.length} foto{gallery.readyImages.length !== 1 ? "s" : ""}</span>
                )}
              </div>
              <ImageGallery {...gallery} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-crema border-2 border-morado-dark block-shadow p-6">
              <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase mb-5 pb-4 border-b border-morado/10">Detalles de la sesión</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Precio (ARS) <span className="text-rosa">*</span></label>
                  <input type="number" step="0.01" min="0" className={inputClass} placeholder="Ej: 12000" value={form.price} onChange={(e) => set("price", e.target.value)} required />
                </div>
                <div>
                  <label className={labelClass}>Duración (minutos) <span className="text-rosa">*</span></label>
                  <p className={hintClass}>Solo el número, ej: 60</p>
                  <input type="number" min="1" className={inputClass} placeholder="60" value={form.duration} onChange={(e) => set("duration", e.target.value)} required />
                  {form.duration && (
                    <p className="font-sans text-xs text-tierra/35 mt-1.5">
                      = {parseInt(form.duration) >= 60
                        ? `${Math.floor(parseInt(form.duration) / 60)}h${parseInt(form.duration) % 60 > 0 ? ` ${parseInt(form.duration) % 60}min` : ""}`
                        : `${form.duration} min`}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {gallery.readyImages[0] && (
              <div className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={gallery.readyImages[0].url} alt="Portada" className="w-full aspect-video object-cover" />
                <div className="px-4 py-3">
                  {form.name && <p className="font-sans font-semibold text-sm text-tierra-dark">{form.name}</p>}
                  {form.subtitle && <p className="font-sans text-xs text-tierra/45 mt-0.5 italic">{form.subtitle}</p>}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button type="submit" disabled={saving || gallery.isUploading}
                className="flex items-center justify-center gap-2 w-full bg-morado-dark text-crema font-sans font-semibold text-[0.65rem] py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-morado transition-colors disabled:opacity-60">
                {saving ? <Loader2 size={13} className="animate-spin" /> : "✦"}
                {saving ? "Publicando..." : gallery.isUploading ? "Subiendo fotos..." : "Publicar servicio"}
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
