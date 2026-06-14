"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, FileText, Video, Headphones, ImageIcon as ImageLucide,
  Upload, X, Loader2, Save,
} from "lucide-react";
import { useToast } from "../../_components/AdminToast";
import { ImageGallery, useImageGallery } from "../../_components/ImageGallery";
import { PdfGallery, usePdfGallery } from "../../_components/PdfGallery";
import MarkdownHelpModal from "./MarkdownHelpModal";
import { api } from "~/trpc/react";

const inputClass = "w-full bg-white border-2 border-morado/20 px-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/25 focus:outline-none focus:border-morado transition-colors";
const labelClass = "block font-sans text-[0.6rem] text-tierra/70 tracking-widest uppercase mb-1.5";
const hintClass = "font-sans text-xs text-tierra/55 tracking-wide";

type ContentType = "TEXT" | "VIDEO" | "AUDIO" | "GALLERY";

const typeOptions: { value: ContentType; label: string; icon: React.ReactNode; desc: string }[] = [
  { value: "TEXT",    label: "Texto",   icon: <FileText size={18} />,    desc: "Reflexión escrita en markdown" },
  { value: "VIDEO",   label: "Video",   icon: <Video size={18} />,       desc: "Vimeo o YouTube embed" },
  { value: "AUDIO",   label: "Audio",   icon: <Headphones size={18} />,  desc: "Meditación / podcast (mp3)" },
  { value: "GALLERY", label: "Galería", icon: <ImageLucide size={18} />, desc: "Conjunto de imágenes" },
];

interface InitialData {
  id?: string;
  title?: string;
  slug?: string | null;
  excerpt?: string | null;
  content?: string;
  contentType?: ContentType;
  coverImageUrl?: string | null;
  videoUrl?: string | null;
  audioUrl?: string | null;
  images?: string[];
  attachments?: string[];
  requiredTierId?: string | null;
  published?: boolean;
}

export default function PostForm({ initial }: { initial?: InitialData }) {
  const router = useRouter();
  const { toast } = useToast();
  const utils = api.useUtils();

  const isEdit = !!initial?.id;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [contentType, setContentType] = useState<ContentType>(initial?.contentType ?? "TEXT");
  const [videoUrl, setVideoUrl] = useState(initial?.videoUrl ?? "");
  const [audioUrl, setAudioUrl] = useState(initial?.audioUrl ?? "");
  const [coverUrl, setCoverUrl] = useState(initial?.coverImageUrl ?? "");
  const [coverUploading, setCoverUploading] = useState(false);
  const [audioUploading, setAudioUploading] = useState(false);
  const [requiredTierId, setRequiredTierId] = useState<string>(initial?.requiredTierId ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* Galleries (para GALLERY type + attachments siempre) */
  const imageGallery = useImageGallery();
  const pdfGallery = usePdfGallery();
  useEffect(() => {
    if (initial?.images) imageGallery.setInitialImages(initial.images.map((url) => ({ url })));
    if (initial?.attachments) {
      pdfGallery.setInitialPdfs(
        initial.attachments.map((url) => ({ url, name: url.split("/").pop() ?? "archivo.pdf" })),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Tiers para el dropdown */
  const { data: tiers = [] } = api.admin.posts.tiers.useQuery();

  /* Mutations */
  const createMutation = api.admin.posts.create.useMutation({
    onSuccess: () => {
      void utils.admin.posts.list.invalidate();
      toast("Post creado", "success");
      router.push("/admin/circulo");
    },
    onError: (e) => {
      setError(e.message);
      setSubmitting(false);
    },
  });
  const updateMutation = api.admin.posts.update.useMutation({
    onSuccess: () => {
      void utils.admin.posts.list.invalidate();
      if (initial?.id) void utils.admin.posts.getById.invalidate(initial.id);
      toast("Post actualizado", "success");
      router.push("/admin/circulo");
    },
    onError: (e) => {
      setError(e.message);
      setSubmitting(false);
    },
  });

  /* Cover upload single */
  const coverInputRef = useRef<HTMLInputElement>(null);
  async function uploadCover(file: File) {
    setCoverUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json() as { url?: string; error?: string };
      if (data.url) setCoverUrl(data.url);
      else toast(data.error ?? "Error al subir portada", "error");
    } catch {
      toast("Error al subir portada", "error");
    } finally {
      setCoverUploading(false);
    }
  }

  /* Audio upload */
  const audioInputRef = useRef<HTMLInputElement>(null);
  async function uploadAudio(file: File) {
    setAudioUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload-audio", { method: "POST", body: fd });
      const data = await res.json() as { url?: string; error?: string };
      if (data.url) setAudioUrl(data.url);
      else toast(data.error ?? "Error al subir audio", "error");
    } catch {
      toast("Error al subir audio", "error");
    } finally {
      setAudioUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      title: title.trim(),
      excerpt: excerpt.trim() || undefined,
      content: content.trim(),
      contentType,
      coverImageUrl: coverUrl || undefined,
      videoUrl: contentType === "VIDEO" ? videoUrl.trim() || undefined : undefined,
      audioUrl: contentType === "AUDIO" ? audioUrl || undefined : undefined,
      images: contentType === "GALLERY" ? imageGallery.readyImages.map((i) => i.url) : [],
      attachments: pdfGallery.readyPdfs.map((p) => p.url),
      requiredTierId: requiredTierId || null,
      published,
    };

    if (isEdit && initial?.id) {
      updateMutation.mutate({ id: initial.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/circulo"
            className="inline-flex items-center gap-1.5 font-sans text-[0.7rem] text-tierra/60 hover:text-morado tracking-widest uppercase mb-3 transition-colors"
          >
            <ArrowLeft size={11} /> Volver al círculo
          </Link>
          <h1 className="font-display uppercase text-[clamp(2rem,5vw,2.5rem)] text-tierra-dark leading-none tracking-wide">
            {isEdit ? "Editar post" : "Nuevo post"}
          </h1>
        </div>
        <div className="flex items-center gap-3 shrink-0 pt-2">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-tierra/20 peer-checked:bg-verde rounded-full transition-colors relative">
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                published ? "translate-x-[1.25rem]" : "translate-x-0.5"
              }`} />
            </div>
            <span className="font-sans text-[0.65rem] tracking-widest uppercase font-semibold text-tierra-dark">
              {published ? "Publicado" : "Borrador"}
            </span>
          </label>
          <button
            type="submit"
            disabled={submitting || coverUploading || audioUploading || imageGallery.isUploading || pdfGallery.isUploading}
            className="flex items-center gap-2 bg-morado-dark text-crema font-sans text-[0.65rem] px-5 py-3 tracking-widest uppercase font-semibold border-2 border-morado-dark block-shadow hover:bg-morado transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            {submitting ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear post"}
          </button>
        </div>
      </div>

      {error && (
        <p className="font-sans text-sm text-rosa bg-rosa/10 border border-rosa/30 px-4 py-3 tracking-wide">
          {error}
        </p>
      )}

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* ─── Columna principal ─── */}
        <div className="space-y-5">
          {/* Title */}
          <div>
            <label className={labelClass}>Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="El ritual del eclipse de mayo"
              className={inputClass}
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className={labelClass}>Bajada (opcional)</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              placeholder="Una línea o dos que invitan a leer el post"
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Tipo de contenido */}
          <div>
            <label className={labelClass}>Tipo de contenido</label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {typeOptions.map((opt) => {
                const active = contentType === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setContentType(opt.value)}
                    className={`text-left p-3 border-2 transition-all ${
                      active
                        ? "bg-morado-dark text-crema border-morado-dark block-shadow-sm"
                        : "bg-white border-morado/15 text-tierra-dark hover:border-morado/40"
                    }`}
                  >
                    <div className={`flex items-center gap-2 mb-1 ${active ? "text-dorado" : "text-morado"}`}>
                      {opt.icon}
                      <span className="font-sans text-xs font-bold uppercase tracking-wider">{opt.label}</span>
                    </div>
                    <p className={`font-sans text-[0.7rem] tracking-wide leading-snug ${active ? "text-crema/70" : "text-tierra/60"}`}>
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Video URL (si VIDEO) */}
          {contentType === "VIDEO" && (
            <div>
              <label className={labelClass}>URL del video (Vimeo / YouTube)</label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://vimeo.com/123456 o https://youtu.be/abc"
                className={inputClass}
              />
              <p className={`${hintClass} mt-1.5`}>
                Pegá el link público del video. Se va a embeber al ver el post.
              </p>
            </div>
          )}

          {/* Audio upload (si AUDIO) */}
          {contentType === "AUDIO" && (
            <div>
              <label className={labelClass}>Archivo de audio (mp3)</label>
              {audioUrl ? (
                <div className="flex items-center gap-3 bg-white border-2 border-morado/15 px-4 py-3">
                  <Headphones size={16} className="text-morado shrink-0" />
                  <span className="flex-1 font-sans text-sm text-tierra-dark truncate">{audioUrl.split("/").pop()}</span>
                  <button
                    type="button"
                    onClick={() => setAudioUrl("")}
                    className="p-1.5 text-tierra/60 hover:text-rosa transition-colors"
                  >
                    <X size={13} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => audioInputRef.current?.click()}
                  disabled={audioUploading}
                  className="w-full flex items-center justify-center gap-3 py-8 border-2 border-dashed border-morado/25 hover:border-morado/50 transition-colors disabled:opacity-50"
                >
                  {audioUploading ? (
                    <Loader2 size={18} className="animate-spin text-morado" />
                  ) : (
                    <>
                      <Upload size={18} className="text-tierra/40" strokeWidth={1.5} />
                      <span className="font-sans text-sm text-tierra/70 tracking-wide">
                        Subir mp3 / wav / m4a
                      </span>
                    </>
                  )}
                </button>
              )}
              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void uploadAudio(f);
                }}
              />
              <p className={`${hintClass} mt-1.5`}>Máximo 50 MB.</p>
            </div>
          )}

          {/* Gallery (si GALLERY) */}
          {contentType === "GALLERY" && (
            <div>
              <label className={labelClass}>Imágenes de la galería</label>
              <ImageGallery
                images={imageGallery.images}
                readyImages={imageGallery.readyImages}
                lightbox={imageGallery.lightbox}
                setLightbox={imageGallery.setLightbox}
                uploadFiles={imageGallery.uploadFiles}
                removeImage={imageGallery.removeImage}
                setCover={imageGallery.setCover}
              />
            </div>
          )}

          {/* Content / markdown */}
          <div>
            <label className={labelClass}>
              Contenido {contentType !== "TEXT" && "(descripción)"}
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={contentType === "TEXT" ? 18 : 8}
              placeholder={
                contentType === "TEXT"
                  ? "Escribí en markdown. **negrita**, *itálica*, # títulos, - listas, [link](url)..."
                  : "Texto que acompaña al video / audio / galería..."
              }
              className={`${inputClass} resize-y font-mono text-[13px] leading-relaxed`}
            />
            <p className={`${hintClass} mt-1.5 flex items-center gap-1.5`}>
              Soporta markdown básico: ** negrita **, * itálica *, # título, - lista, [link](url).
              <MarkdownHelpModal />
            </p>
          </div>

          {/* Attachments */}
          <div>
            <label className={labelClass}>Adjuntos PDF (opcional)</label>
            <PdfGallery
              pdfs={pdfGallery.pdfs}
              uploadFiles={pdfGallery.uploadFiles}
              removePdf={pdfGallery.removePdf}
            />
          </div>
        </div>

        {/* ─── Sidebar ─── */}
        <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          {/* Cover */}
          <div>
            <label className={labelClass}>Imagen de portada</label>
            {coverUrl ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverUrl} alt="Portada" className="w-full aspect-video object-cover border-2 border-morado/15" />
                <button
                  type="button"
                  onClick={() => setCoverUrl("")}
                  className="absolute top-2 right-2 bg-tierra-dark/80 text-white p-1.5 hover:bg-rosa transition-colors"
                >
                  <X size={13} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                disabled={coverUploading}
                className="w-full aspect-video flex items-center justify-center gap-2 border-2 border-dashed border-morado/25 hover:border-morado/50 transition-colors"
              >
                {coverUploading ? (
                  <Loader2 size={16} className="animate-spin text-morado" />
                ) : (
                  <>
                    <Upload size={16} className="text-tierra/40" strokeWidth={1.5} />
                    <span className="font-sans text-xs text-tierra/65">Subir portada</span>
                  </>
                )}
              </button>
            )}
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void uploadCover(f);
              }}
            />
          </div>

          {/* Tier required */}
          <div>
            <label className={labelClass}>Acceso</label>
            <select
              value={requiredTierId}
              onChange={(e) => setRequiredTierId(e.target.value)}
              className={inputClass}
            >
              <option value="">Libre (sin tier)</option>
              {tiers.map((t) => (
                <option key={t.id} value={t.id}>
                  Solo {t.name}
                </option>
              ))}
            </select>
            <p className={`${hintClass} mt-1.5`}>
              Los posts libres se ven sin estar suscripta. Los de tier requieren membresía activa.
            </p>
          </div>
        </aside>
      </div>
    </form>
  );
}
