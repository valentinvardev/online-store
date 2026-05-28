"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, Loader2, X, ChevronLeft, ChevronRight, ImageIcon, Star, Upload } from "lucide-react";
import Link from "next/link";
import { useToast } from "../../_components/AdminToast";
import { api } from "~/trpc/react";

const inputClass = "w-full bg-white border-2 border-morado/20 px-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/25 focus:outline-none focus:border-morado transition-colors";
const labelClass = "block font-sans text-[0.6rem] text-tierra/50 tracking-widest uppercase mb-1.5";
const hintClass = "font-sans text-xs text-tierra/35 tracking-wide mb-2";

const typeInfo: Record<string, string> = {
  FISICO: "Objeto enviado por correo o en persona",
  DIGITAL: "Archivo descargable o acceso online",
  PERSONALIZADO: "Hecho a medida, requiere consulta previa",
};

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onNav }: {
  images: string[];
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && index > 0) onNav(index - 1);
      if (e.key === "ArrowRight" && index < images.length - 1) onNav(index + 1);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [images.length, index, onClose, onNav]);

  return (
    <div
      className="fixed inset-0 z-50 bg-morado-dark/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Cerrar */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-crema/50 hover:text-crema transition-colors"
      >
        <X size={22} />
      </button>

      {/* Contador */}
      <p className="absolute top-5 left-1/2 -translate-x-1/2 font-sans text-[0.65rem] text-crema/40 tracking-widest uppercase">
        {index + 1} / {images.length}
      </p>

      {/* Prev */}
      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNav(index - 1); }}
          className="absolute left-5 text-crema/40 hover:text-crema transition-colors p-2"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Imagen */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[index]}
        alt={`Foto ${index + 1}`}
        className="max-h-[85vh] max-w-[85vw] object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next */}
      {index < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNav(index + 1); }}
          className="absolute right-5 text-crema/40 hover:text-crema transition-colors p-2"
        >
          <ChevronRight size={32} />
        </button>
      )}

      {/* Tiras abajo */}
      {images.length > 1 && (
        <div className="absolute bottom-5 flex gap-2">
          {images.map((url, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); onNav(i); }}
              className={`w-12 h-12 border-2 transition-all overflow-hidden ${i === index ? "border-dorado" : "border-white/10 opacity-50 hover:opacity-75"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Drop Zone ─────────────────────────────────────────────────────────────────
function DropZone({ onFiles }: { onFiles: (files: File[]) => void }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handle = (files: FileList | null) => {
    if (!files) return;
    onFiles(Array.from(files).filter((f) => f.type.startsWith("image/")));
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files); }}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed cursor-pointer transition-all py-10 flex flex-col items-center gap-3 ${
        dragging ? "border-morado bg-morado/5" : "border-morado/25 hover:border-morado/50 hover:bg-morado/3"
      }`}
    >
      <Upload size={22} className={dragging ? "text-morado" : "text-tierra/25"} strokeWidth={1.5} />
      <div className="text-center">
        <p className="font-sans text-sm text-tierra/50 tracking-wide">
          {dragging ? "Soltá para subir" : "Arrastrá fotos o hacé click"}
        </p>
        <p className="font-sans text-xs text-tierra/30 tracking-wide mt-0.5">JPG, PNG, WEBP — sin límite de cantidad</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handle(e.target.files)}
      />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
const empty = {
  name: "", description: "", type: "FISICO" as "FISICO" | "DIGITAL" | "PERSONALIZADO",
  price: "", priceOld: "", badge: "", fileUrl: "", stock: "",
};

type UploadEntry = { url: string; uploading?: boolean };

export default function NuevoProductoPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = useState(empty);
  const [images, setImages] = useState<UploadEntry[]>([]);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const uploadFiles = useCallback(async (files: File[]) => {
    // Agrega placeholders de carga
    const placeholders: UploadEntry[] = files.map(() => ({ url: "", uploading: true }));
    setImages((prev) => [...prev, ...placeholders]);
    const startIdx = images.length;

    await Promise.all(files.map(async (file, i) => {
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json() as { url?: string; error?: string };
        if (data.url) {
          setImages((prev) => {
            const next = [...prev];
            next[startIdx + i] = { url: data.url! };
            return next;
          });
        } else {
          setImages((prev) => prev.filter((_, idx) => idx !== startIdx + i));
          toast(data.error ?? "Error al subir imagen", "error");
        }
      } catch {
        setImages((prev) => prev.filter((_, idx) => idx !== startIdx + i));
        toast("Error de red al subir imagen", "error");
      }
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    if (lightbox !== null) {
      if (idx === lightbox) setLightbox(null);
      else if (idx < lightbox) setLightbox(lightbox - 1);
    }
  };

  const setCover = (idx: number) => {
    setImages((prev) => {
      const next = [...prev];
      const [item] = next.splice(idx, 1);
      return [item!, ...next];
    });
  };

  const readyImages = images.filter((img) => !img.uploading && img.url);

  const create = api.admin.productos.create.useMutation({
    onSuccess: (p) => {
      toast(`"${p.name}" publicado`);
      router.push("/admin/productos");
    },
    onError: (err) => toast(err.message, "error"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (images.some((img) => img.uploading)) {
      toast("Esperá a que terminen de subir todas las fotos", "error");
      return;
    }
    create.mutate({
      name: form.name,
      description: form.description,
      type: form.type,
      price: parseFloat(form.price),
      priceOld: form.priceOld ? parseFloat(form.priceOld) : undefined,
      badge: form.badge || undefined,
      imageUrl: readyImages[0]?.url,
      images: readyImages.map((img) => img.url),
      fileUrl: form.fileUrl || undefined,
      stock: form.stock ? parseInt(form.stock) : undefined,
      active: true,
    });
  };

  const saving = create.isPending;

  return (
    <div className="space-y-8">

      <Link
        href="/admin/productos"
        className="inline-flex items-center gap-2 font-sans text-[0.65rem] text-tierra/40 hover:text-tierra tracking-widest uppercase transition-colors"
      >
        <ArrowLeft size={13} /> Volver a productos
      </Link>

      <div>
        <p className="font-sans text-[0.58rem] text-tierra/30 tracking-[0.35em] uppercase mb-1">Nuevo contenido</p>
        <h1 className="font-display text-5xl text-morado-dark tracking-wide uppercase leading-none">Nuevo Producto</h1>
        <p className="font-sans text-tierra/45 mt-2 tracking-wide text-sm">
          Completá los datos para agregar un producto a la tienda
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-5">

            {/* Info básica */}
            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-morado/10">
                <ShoppingBag size={15} className="text-morado" strokeWidth={1.8} />
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
                  <textarea rows={6} className={`${inputClass} resize-none`} placeholder="Describí el producto con detalle..." value={form.description} onChange={(e) => set("description", e.target.value)} required />
                </div>

                {/* Tipo */}
                <div>
                  <label className={labelClass}>Tipo de producto <span className="text-rosa">*</span></label>
                  <div className="grid grid-cols-3 gap-3 mt-1">
                    {(["FISICO", "DIGITAL", "PERSONALIZADO"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => set("type", t)}
                        className={`py-3 px-3 border-2 text-left transition-colors ${
                          form.type === t
                            ? "bg-morado-dark text-crema border-morado-dark"
                            : "bg-white text-tierra/50 border-morado/15 hover:border-morado/40"
                        }`}
                      >
                        <p className="font-sans text-[0.6rem] tracking-widest uppercase font-semibold">
                          {t === "FISICO" ? "Físico" : t === "DIGITAL" ? "Digital" : "Personalizado"}
                        </p>
                        <p className={`font-sans text-[0.58rem] mt-1 leading-snug ${form.type === t ? "text-crema/50" : "text-tierra/30"}`}>
                          {typeInfo[t]}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {form.type === "DIGITAL" && (
                  <div>
                    <label className={labelClass}>URL del archivo digital</label>
                    <p className={hintClass}>Link al PDF, ZIP o recurso que se entrega al comprar</p>
                    <input className={inputClass} placeholder="https://..." value={form.fileUrl} onChange={(e) => set("fileUrl", e.target.value)} />
                  </div>
                )}
              </div>
            </div>

            {/* Galería */}
            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-morado/10">
                <ImageIcon size={15} className="text-morado" strokeWidth={1.8} />
                <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase">
                  Fotos del producto
                </h2>
                {images.length > 0 && (
                  <span className="ml-auto font-sans text-[0.58rem] text-tierra/35 tracking-widest uppercase">
                    {readyImages.length} foto{readyImages.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              <DropZone onFiles={uploadFiles} />

              {images.length > 0 && (
                <div className="mt-5 space-y-3">
                  <p className={hintClass}>
                    La primera foto es la portada. Hacé click en <Star size={11} className="inline" /> para cambiarla.
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {images.map((img, i) => (
                      <div key={i} className="relative group aspect-square">
                        {img.uploading ? (
                          <div className="w-full h-full bg-morado/5 border-2 border-morado/10 flex items-center justify-center">
                            <Loader2 size={18} className="animate-spin text-morado/30" />
                          </div>
                        ) : (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={img.url}
                              alt={`Foto ${i + 1}`}
                              className="w-full h-full object-cover border-2 border-morado/10 cursor-zoom-in"
                              onClick={() => setLightbox(i)}
                            />

                            {/* Badge portada */}
                            {i === 0 && (
                              <span className="absolute bottom-0 left-0 right-0 bg-dorado/90 text-tierra-dark font-sans text-[0.5rem] tracking-widest uppercase text-center py-0.5">
                                Portada
                              </span>
                            )}

                            {/* Controles hover */}
                            <div className="absolute inset-0 bg-morado-dark/0 group-hover:bg-morado-dark/40 transition-all flex items-start justify-end gap-1 p-1.5 opacity-0 group-hover:opacity-100">
                              {i !== 0 && (
                                <button
                                  type="button"
                                  title="Usar como portada"
                                  onClick={() => setCover(i)}
                                  className="bg-dorado text-tierra-dark p-1 hover:bg-dorado/80 transition-colors"
                                >
                                  <Star size={11} />
                                </button>
                              )}
                              <button
                                type="button"
                                title="Eliminar"
                                onClick={() => removeImage(i)}
                                className="bg-tierra-dark/80 text-white p-1 hover:bg-rosa transition-colors"
                              >
                                <X size={11} />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Columna lateral */}
          <div className="space-y-5">

            {/* Precio */}
            <div className="bg-crema border-2 border-morado-dark block-shadow p-6">
              <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase mb-5 pb-4 border-b border-morado/10">
                Precio y estado
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Precio (ARS) <span className="text-rosa">*</span></label>
                  <input type="number" step="0.01" min="0" className={inputClass} placeholder="Ej: 8500" value={form.price} onChange={(e) => set("price", e.target.value)} required />
                </div>
                <div>
                  <label className={labelClass}>Precio anterior</label>
                  <p className={hintClass}>Solo si está en oferta</p>
                  <input type="number" step="0.01" min="0" className={inputClass} placeholder="Ej: 12000" value={form.priceOld} onChange={(e) => set("priceOld", e.target.value)} />
                </div>
                {form.type === "FISICO" && (
                  <div>
                    <label className={labelClass}>Stock</label>
                    <input type="number" min="0" className={inputClass} placeholder="Ej: 50" value={form.stock} onChange={(e) => set("stock", e.target.value)} />
                  </div>
                )}
                <div>
                  <label className={labelClass}>Badge</label>
                  <p className={hintClass}>Etiqueta visible en la tienda</p>
                  <select className={`${inputClass} cursor-pointer`} value={form.badge} onChange={(e) => set("badge", e.target.value)}>
                    <option value="">Sin badge</option>
                    <option value="Nuevo">Nuevo</option>
                    <option value="Oferta">Oferta</option>
                    <option value="Más vendido">Más vendido</option>
                    <option value="Agotado">Agotado</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Preview portada */}
            {readyImages[0] && (
              <div className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={readyImages[0].url} alt="Portada" className="w-full aspect-square object-cover" />
                <div className="px-4 py-3">
                  <p className="font-sans text-[0.55rem] text-tierra/35 tracking-widest uppercase mb-0.5">Así se ve en la tienda</p>
                  {form.name && <p className="font-sans font-semibold text-sm text-tierra-dark tracking-wide truncate">{form.name}</p>}
                  {form.price && <p className="font-sans text-morado font-bold mt-0.5">${form.price}</p>}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={saving || images.some((img) => img.uploading)}
                className="flex items-center justify-center gap-2 w-full bg-morado-dark text-crema font-sans font-semibold text-[0.65rem] py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-morado transition-colors disabled:opacity-60"
              >
                {saving ? <Loader2 size={13} className="animate-spin" /> : "✦"}
                {saving ? "Publicando..." : images.some((img) => img.uploading) ? "Subiendo fotos..." : "Publicar producto"}
              </button>
              <Link
                href="/admin/productos"
                className="block w-full text-center font-sans text-[0.65rem] py-3 tracking-widest uppercase border-2 border-morado/20 text-tierra/50 hover:border-morado/50 hover:text-tierra transition-colors"
              >
                Cancelar
              </Link>
            </div>
          </div>
        </div>
      </form>

      {/* Lightbox */}
      {lightbox !== null && readyImages.length > 0 && (
        <Lightbox
          images={readyImages.map((img) => img.url)}
          index={Math.min(lightbox, readyImages.length - 1)}
          onClose={() => setLightbox(null)}
          onNav={setLightbox}
        />
      )}
    </div>
  );
}
