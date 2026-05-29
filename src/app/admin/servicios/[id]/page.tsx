"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Wrench, Loader2, ImageIcon, Video, AlertCircle, FileText } from "lucide-react";
import Link from "next/link";
import { useToast } from "../../_components/AdminToast";
import { ImageGallery, useImageGallery } from "../../_components/ImageGallery";
import { PdfGallery, usePdfGallery } from "../../_components/PdfGallery";
import { api } from "~/trpc/react";

function parseVimeo(input: string): string | null {
  const s = input.trim();
  const player = s.match(/player\.vimeo\.com\/video\/(\d+)(?:\?h=([a-f0-9]+))?/);
  if (player) return s;
  const withHash = s.match(/vimeo\.com\/(\d+)\/([a-f0-9]+)/);
  if (withHash) return `https://player.vimeo.com/video/${withHash[1]}?h=${withHash[2]}`;
  const simple = s.match(/vimeo\.com\/(\d+)/);
  if (simple) return `https://player.vimeo.com/video/${simple[1]}`;
  if (/^\d+$/.test(s)) return `https://player.vimeo.com/video/${s}`;
  return null;
}

const inputClass = "w-full bg-white border-2 border-morado/20 px-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/25 focus:outline-none focus:border-morado transition-colors";
const labelClass = "block font-sans text-[0.6rem] text-tierra/70 tracking-widest uppercase mb-1.5";
const hintClass = "font-sans text-xs text-tierra/55 tracking-wide mb-2";

const formatos = [
  { value: "Zoom",        label: "Zoom",            desc: "Videollamada en vivo" },
  { value: "Zoom + guía", label: "Zoom + Guía PDF", desc: "Videollamada + material" },
  { value: "Grabación",   label: "Solo grabación",  desc: "Video enviado por email" },
  { value: "Presencial",  label: "Presencial",       desc: "Encuentro en persona" },
];

export default function EditarServicioPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();

  const { data: servicio, isLoading } = api.admin.servicios.getById.useQuery(id, { enabled: !!id });

  const [form, setForm] = useState({
    name: "", subtitle: "", description: "", price: "", duration: "", format: "Zoom", videoUrl: "",
  });
  const [initialized, setInitialized] = useState(false);
  const gallery = useImageGallery();
  const pdfs = usePdfGallery();
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (servicio && !initialized) {
      setForm({
        name: servicio.name,
        subtitle: servicio.subtitle ?? "",
        description: servicio.description,
        price: String(servicio.price),
        duration: String(servicio.duration),
        format: servicio.format,
        videoUrl: servicio.videoUrl ?? "",
      });
      if (servicio.images?.length) {
        gallery.setInitialImages(servicio.images.map((url: string) => ({ url, uploading: false })));
      }
      if (servicio.attachments?.length) {
        pdfs.setInitialPdfs(
          servicio.attachments.map((url: string) => ({
            url,
            name: url.split("/").pop() ?? "archivo.pdf",
            uploading: false,
          }))
        );
      }
      setInitialized(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicio, initialized]);

  const vimeoEmbed = parseVimeo(form.videoUrl);

  const update = api.admin.servicios.update.useMutation({
    onSuccess: () => { toast("Servicio actualizado"); router.push("/admin/servicios"); },
    onError: (err) => toast(err.message, "error"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gallery.isUploading) { toast("Esperá a que terminen de subir todas las fotos", "error"); return; }
    if (pdfs.isUploading) { toast("Esperá a que terminen de subir todos los PDFs", "error"); return; }
    if (form.videoUrl && !vimeoEmbed) { toast("El link de Vimeo no es válido", "error"); return; }
    update.mutate({
      id,
      data: {
        name: form.name,
        subtitle: form.subtitle || undefined,
        description: form.description,
        price: parseFloat(form.price),
        duration: parseInt(form.duration),
        format: form.format,
        imageUrl: gallery.readyImages[0]?.url,
        images: gallery.readyImages.map((img) => img.url),
        videoUrl: vimeoEmbed ?? undefined,
        attachments: pdfs.readyPdfs.map((p) => p.url),
      },
    });
  };

  const saving = update.isPending;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 gap-3 text-tierra/60">
        <Loader2 size={18} className="animate-spin" />
        <span className="font-sans text-sm tracking-wide">Cargando servicio...</span>
      </div>
    );
  }

  if (!servicio) {
    return (
      <div className="py-24 text-center">
        <p className="font-sans text-tierra/60 text-sm">Servicio no encontrado</p>
        <Link href="/admin/servicios" className="font-sans text-morado text-sm hover:underline mt-4 block">
          ← Volver a servicios
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link href="/admin/servicios" className="inline-flex items-center gap-2 font-sans text-[0.65rem] text-tierra/60 hover:text-tierra tracking-widest uppercase transition-colors">
        <ArrowLeft size={13} /> Volver a servicios
      </Link>

      <div>
        <p className="font-sans text-[0.58rem] text-tierra/30 tracking-[0.35em] uppercase mb-1">Editando servicio</p>
        <h1 className="font-display text-5xl text-morado-dark tracking-wide uppercase leading-none">
          {servicio.name}
        </h1>
        <p className="font-sans text-tierra/65 mt-2 tracking-wide text-sm">Modificá los datos del servicio</p>
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
                    className={`py-4 px-4 border-2 text-left transition-colors ${form.format === value ? "bg-verde text-white border-verde" : "bg-white text-tierra/70 border-morado/15 hover:border-morado/40"}`}>
                    <p className={`font-sans text-[0.62rem] tracking-widest uppercase font-semibold ${form.format === value ? "text-white" : "text-tierra-dark"}`}>{label}</p>
                    <p className={`font-sans text-[0.58rem] mt-1 ${form.format === value ? "text-white/60" : "text-tierra/30"}`}>{desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* PDFs de guía */}
            {form.format === "Zoom + guía" && (
              <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
                <div className="flex items-center justify-between mb-6 pb-5 border-b border-morado/10">
                  <div className="flex items-center gap-3">
                    <FileText size={15} className="text-morado" strokeWidth={1.8} />
                    <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase">Material de la sesión</h2>
                  </div>
                  {pdfs.readyPdfs.length > 0 && (
                    <span className="font-sans text-[0.58rem] text-tierra/55 tracking-widest uppercase">
                      {pdfs.readyPdfs.length} PDF{pdfs.readyPdfs.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <p className="font-sans text-xs text-tierra/60 tracking-wide mb-4">
                  Estos PDFs se entregan a la clienta al completar el pago. Podés subir guías, resúmenes, ejercicios o cualquier material complementario.
                </p>
                <PdfGallery pdfs={pdfs.pdfs} uploadFiles={pdfs.uploadFiles} removePdf={pdfs.removePdf} />
              </div>
            )}

            {/* Video Vimeo */}
            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-morado/10">
                <Video size={15} className="text-morado" strokeWidth={1.8} />
                <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase">Video de presentación</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Link de Vimeo</label>
                  <p className={hintClass}>Video de bienvenida, descripción o muestra del servicio</p>
                  <input
                    className={`${inputClass} ${form.videoUrl && !vimeoEmbed ? "border-rosa" : ""}`}
                    placeholder="https://vimeo.com/123456789 o https://vimeo.com/123456789/hashprivado"
                    value={form.videoUrl}
                    onChange={(e) => set("videoUrl", e.target.value)}
                  />
                  {form.videoUrl && !vimeoEmbed && (
                    <p className="flex items-center gap-1.5 font-sans text-xs text-rosa mt-1.5">
                      <AlertCircle size={12} /> Link inválido — debe ser una URL de Vimeo
                    </p>
                  )}
                </div>
                {vimeoEmbed && (
                  <div className="aspect-video w-full overflow-hidden border-2 border-morado/15">
                    <iframe
                      src={`${vimeoEmbed}&color=7B5EA7&title=0&byline=0&portrait=0`}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
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
                  <span className="font-sans text-[0.58rem] text-tierra/55 tracking-widest uppercase">{gallery.readyImages.length} foto{gallery.readyImages.length !== 1 ? "s" : ""}</span>
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
                    <p className="font-sans text-xs text-tierra/55 mt-1.5">
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
                  {form.subtitle && <p className="font-sans text-xs text-tierra/65 mt-0.5 italic">{form.subtitle}</p>}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button type="submit" disabled={saving || gallery.isUploading || pdfs.isUploading}
                className="flex items-center justify-center gap-2 w-full bg-morado-dark text-crema font-sans font-semibold text-[0.65rem] py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-morado transition-colors disabled:opacity-60">
                {saving ? <Loader2 size={13} className="animate-spin" /> : "✦"}
                {saving ? "Guardando..." : gallery.isUploading ? "Subiendo fotos..." : pdfs.isUploading ? "Subiendo PDFs..." : "Guardar cambios"}
              </button>
              <Link href="/admin/servicios" className="block w-full text-center font-sans text-[0.65rem] py-3 tracking-widest uppercase border-2 border-morado/20 text-tierra/70 hover:border-morado/50 hover:text-tierra transition-colors">
                Cancelar
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
