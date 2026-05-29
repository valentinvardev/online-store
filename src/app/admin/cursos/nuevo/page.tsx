"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, Loader2, ImageIcon, Video, AlertCircle, Upload, X, Star } from "lucide-react";
import Link from "next/link";
import { useToast } from "../../_components/AdminToast";
import { ImageGallery, useImageGallery } from "../../_components/ImageGallery";
import { api } from "~/trpc/react";

const inputClass = "w-full bg-white border-2 border-morado/20 px-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/25 focus:outline-none focus:border-morado transition-colors";
const labelClass = "block font-sans text-[0.6rem] text-tierra/70 tracking-widest uppercase mb-1.5";
const hintClass = "font-sans text-xs text-tierra/55 tracking-wide mb-2";

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

const levelColors: Record<string, string> = {
  "Principiante":      "bg-verde text-white",
  "Intermedio":        "bg-celeste text-tierra-dark",
  "Avanzado":          "bg-morado text-white",
  "Todos los niveles": "bg-dorado text-tierra-dark",
};
const badgeStyles: Record<string, string> = {
  "Nuevo":            "bg-celeste/20 text-celeste border-celeste/30",
  "Más vendido":      "bg-dorado/20 text-tierra-dark border-dorado/40",
  "Últimos lugares":  "bg-rosa/15 text-rosa border-rosa/30",
  "Próximamente":     "bg-morado/15 text-morado border-morado/30",
};

// ── Portada single-image uploader ─────────────────────────────────────────────
function CoverUpload({ url, uploading, onFile, onRemove }: {
  url: string | null; uploading: boolean;
  onFile: (f: File) => void; onRemove: () => void;
}) {
  const [drag, setDrag] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const handle = (files: FileList | null) => {
    const f = Array.from(files ?? []).find((f) => f.type.startsWith("image/"));
    if (f) onFile(f);
  };
  if (url) return (
    <div className="relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt="Portada" className="w-full aspect-video object-cover border-2 border-morado/15" />
      <button type="button" onClick={onRemove}
        className="absolute top-2 right-2 bg-tierra-dark/80 text-white p-1.5 hover:bg-rosa transition-colors">
        <X size={13} />
      </button>
      <span className="absolute bottom-0 left-0 right-0 bg-dorado/90 text-tierra-dark font-sans text-[0.5rem] tracking-widest uppercase text-center py-1">
        Portada del curso
      </span>
    </div>
  );
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files); }}
      onClick={() => ref.current?.click()}
      className={`border-2 border-dashed cursor-pointer transition-all py-10 flex flex-col items-center gap-3 ${drag ? "border-morado bg-morado/5" : "border-morado/25 hover:border-morado/50"}`}
    >
      {uploading
        ? <Loader2 size={22} className="animate-spin text-morado/40" />
        : <Upload size={22} className={drag ? "text-morado" : "text-tierra/25"} strokeWidth={1.5} />
      }
      <div className="text-center">
        <p className="font-sans text-sm text-tierra/70 tracking-wide">{drag ? "Soltá para subir" : "Arrastrá o hacé click"}</p>
        <p className="font-sans text-xs text-tierra/30 tracking-wide mt-0.5">JPG, PNG, WEBP — imagen principal del curso</p>
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => handle(e.target.files)} />
    </div>
  );
}

// ── Card preview pública ──────────────────────────────────────────────────────
function CourseCardPreview({ name, subtitle, price, level, badge, coverUrl, durationWeeks, lessonsCount }: {
  name: string; subtitle: string; price: string; level: string; badge: string;
  coverUrl: string | null; durationWeeks: string; lessonsCount: string;
}) {
  return (
    <article className="bg-white border-2 border-morado-dark block-shadow overflow-hidden flex flex-col">
      <div className="relative aspect-video bg-gradient-to-br from-morado-dark via-morado to-celeste overflow-hidden shrink-0">
        {coverUrl
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={coverUrl} alt={name} className="w-full h-full object-cover" />
          : <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-white/20 text-6xl">✦</span>
            </div>
        }
        {badge && (
          <span className={`absolute top-3 left-3 font-sans text-[0.55rem] px-2 py-1 border tracking-widest uppercase ${badgeStyles[badge] ?? ""}`}>
            {badge}
          </span>
        )}
        <span className={`absolute top-3 right-3 font-sans text-[0.55rem] px-2 py-1 tracking-widest uppercase font-semibold ${levelColors[level] ?? "bg-dorado text-tierra-dark"}`}>
          {level || "Nivel"}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-sans font-bold text-sm text-tierra-dark leading-snug mb-1">
          {name || <span className="text-tierra/25">Título del curso</span>}
        </h3>
        {subtitle && (
          <p className="font-sans text-xs text-tierra/70 italic mb-3 leading-snug">{subtitle}</p>
        )}
        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-morado/8">
          {durationWeeks && (
            <span className="font-sans text-[0.6rem] text-tierra/60 tracking-wide">{durationWeeks} sem.</span>
          )}
          {lessonsCount && (
            <span className="font-sans text-[0.6rem] text-tierra/60 tracking-wide">{lessonsCount} clases</span>
          )}
          <span className="font-sans font-bold text-lg text-morado ml-auto">
            {price ? `$${price}` : <span className="text-tierra/20 text-sm">$—</span>}
          </span>
        </div>
      </div>
    </article>
  );
}

const empty = {
  name: "", subtitle: "", description: "", price: "",
  durationWeeks: "", lessonsCount: "", level: "Todos los niveles", badge: "", videoUrl: "",
};

export default function NuevoCursoPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = useState(empty);
  const gallery = useImageGallery();
  const [cover, setCover] = useState<{ url: string; uploading: boolean } | null>(null);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const vimeoEmbed = parseVimeo(form.videoUrl);

  const create = api.admin.cursos.create.useMutation({
    onSuccess: (c) => { toast(`"${c.name}" publicado`); router.push(`/admin/cursos/${c.id}`); },
    onError: (err) => toast(err.message, "error"),
  });

  async function uploadCover(file: File) {
    setCover({ url: "", uploading: true });
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json() as { url?: string };
      if (data.url) setCover({ url: data.url, uploading: false });
      else setCover(null);
    } catch { setCover(null); }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cover?.uploading || gallery.isUploading) { toast("Esperá a que terminen de subir las imágenes", "error"); return; }
    if (form.videoUrl && !vimeoEmbed) { toast("El link de Vimeo no es válido", "error"); return; }
    create.mutate({
      name: form.name,
      subtitle: form.subtitle || undefined,
      description: form.description,
      price: parseFloat(form.price),
      durationWeeks: form.durationWeeks ? parseInt(form.durationWeeks) : undefined,
      lessonsCount: form.lessonsCount ? parseInt(form.lessonsCount) : undefined,
      level: form.level,
      badge: form.badge || undefined,
      imageUrl: cover?.url ?? gallery.readyImages[0]?.url,
      images: gallery.readyImages.map((img) => img.url),
      videoUrl: vimeoEmbed ?? undefined,
      active: true,
    });
  };

  const saving = create.isPending;

  return (
    <div className="space-y-8">
      <Link href="/admin/cursos" className="inline-flex items-center gap-2 font-sans text-[0.65rem] text-tierra/60 hover:text-tierra tracking-widest uppercase transition-colors">
        <ArrowLeft size={13} /> Volver a cursos
      </Link>

      <div>
        <p className="font-sans text-[0.58rem] text-tierra/30 tracking-[0.35em] uppercase mb-1">Nuevo contenido</p>
        <h1 className="font-display text-5xl text-morado-dark tracking-wide uppercase leading-none">Nuevo Curso</h1>
        <p className="font-sans text-tierra/65 mt-2 tracking-wide text-sm">Completá los datos para publicar un curso en el sitio</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-5">

            {/* Info básica */}
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
              </div>
            </div>

            {/* Estructura */}
            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase mb-6 pb-5 border-b border-morado/10">Estructura del curso</h2>
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

            {/* Video Vimeo */}
            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-morado/10">
                <Video size={15} className="text-morado" strokeWidth={1.8} />
                <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widets uppercase">Video de presentación</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Link de Vimeo</label>
                  <p className={hintClass}>Video de presentación visible para todas (inscriptas y no inscriptas)</p>
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
                    <iframe src={`${vimeoEmbed}&color=7B5EA7&title=0&byline=0&portrait=0`} className="w-full h-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
                  </div>
                )}
              </div>
            </div>

            {/* Portada */}
            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-morado/10">
                <Star size={15} className="text-morado" strokeWidth={1.8} />
                <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase">Portada del curso</h2>
              </div>
              <p className={hintClass}>Imagen principal — aparece en la card de la tienda y en el encabezado de la página del curso</p>
              <CoverUpload
                url={cover?.url ?? null}
                uploading={cover?.uploading ?? false}
                onFile={uploadCover}
                onRemove={() => setCover(null)}
              />
            </div>

            {/* Galería adicional */}
            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-morado/10">
                <div className="flex items-center gap-3">
                  <ImageIcon size={15} className="text-morado" strokeWidth={1.8} />
                  <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase">Galería de fotos</h2>
                </div>
                {gallery.readyImages.length > 0 && (
                  <span className="font-sans text-[0.58rem] text-tierra/55 tracking-widest uppercase">{gallery.readyImages.length} foto{gallery.readyImages.length !== 1 ? "s" : ""}</span>
                )}
              </div>
              <p className={hintClass}>Fotos adicionales que aparecen en la página del curso — ambiente, materiales, capturas</p>
              <ImageGallery {...gallery} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-crema border-2 border-morado-dark block-shadow p-6">
              <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase mb-5 pb-4 border-b border-morado/10">Publicación</h2>
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

            {/* Card preview */}
            <div className="space-y-2">
              <p className="font-sans text-[0.58rem] text-tierra/55 tracking-widest uppercase">Así se ve en el catálogo</p>
              <CourseCardPreview
                name={form.name} subtitle={form.subtitle} price={form.price}
                level={form.level} badge={form.badge}
                coverUrl={cover?.url ?? null}
                durationWeeks={form.durationWeeks} lessonsCount={form.lessonsCount}
              />
            </div>

            <div className="space-y-3">
              <button type="submit" disabled={saving || cover?.uploading || gallery.isUploading}
                className="flex items-center justify-center gap-2 w-full bg-morado-dark text-crema font-sans font-semibold text-[0.65rem] py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-morado transition-colors disabled:opacity-60">
                {saving ? <Loader2 size={13} className="animate-spin" /> : "✦"}
                {saving ? "Publicando..." : cover?.uploading || gallery.isUploading ? "Subiendo imágenes..." : "Publicar curso"}
              </button>
              <Link href="/admin/cursos" className="block w-full text-center font-sans text-[0.65rem] py-3 tracking-widest uppercase border-2 border-morado/20 text-tierra/70 hover:border-morado/50 hover:text-tierra transition-colors">
                Cancelar
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
