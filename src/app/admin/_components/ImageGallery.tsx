"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Star, Upload, Loader2, ImageIcon } from "lucide-react";

// ── Lightbox ──────────────────────────────────────────────────────────────────
export function Lightbox({ images, index, onClose, onNav }: {
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
    <div className="fixed inset-0 z-50 bg-morado-dark/95 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-5 right-5 text-crema/50 hover:text-crema transition-colors">
        <X size={22} />
      </button>
      <p className="absolute top-5 left-1/2 -translate-x-1/2 font-sans text-[0.65rem] text-crema/40 tracking-widest uppercase">
        {index + 1} / {images.length}
      </p>
      {index > 0 && (
        <button onClick={(e) => { e.stopPropagation(); onNav(index - 1); }} className="absolute left-5 text-crema/40 hover:text-crema transition-colors p-2">
          <ChevronLeft size={32} />
        </button>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={images[index]} alt={`Foto ${index + 1}`} className="max-h-[85vh] max-w-[85vw] object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
      {index < images.length - 1 && (
        <button onClick={(e) => { e.stopPropagation(); onNav(index + 1); }} className="absolute right-5 text-crema/40 hover:text-crema transition-colors p-2">
          <ChevronRight size={32} />
        </button>
      )}
      {images.length > 1 && (
        <div className="absolute bottom-5 flex gap-2">
          {images.map((url, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); onNav(i); }}
              className={`w-12 h-12 border-2 transition-all overflow-hidden ${i === index ? "border-dorado" : "border-white/10 opacity-50 hover:opacity-75"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── DropZone ──────────────────────────────────────────────────────────────────
export function DropZone({ onFiles }: { onFiles: (files: File[]) => void }) {
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
        dragging ? "border-morado bg-morado/5" : "border-morado/25 hover:border-morado/50"
      }`}
    >
      <Upload size={22} className={dragging ? "text-morado" : "text-tierra/25"} strokeWidth={1.5} />
      <div className="text-center">
        <p className="font-sans text-sm text-tierra/70 tracking-wide">{dragging ? "Soltá para subir" : "Arrastrá fotos o hacé click"}</p>
        <p className="font-sans text-xs text-tierra/30 tracking-wide mt-0.5">JPG, PNG, WEBP — sin límite de cantidad</p>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handle(e.target.files)} />
    </div>
  );
}

// ── Tipos ─────────────────────────────────────────────────────────────────────
export type UploadEntry = { url: string; uploading?: boolean };

// ── Hook de upload ────────────────────────────────────────────────────────────
export function useImageGallery(uploadPath = "/api/admin/upload") {
  const [images, setImages] = useState<UploadEntry[]>([]);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const uploadFiles = useCallback(async (files: File[]) => {
    const startIdx = images.length;
    setImages((prev) => [...prev, ...files.map(() => ({ url: "", uploading: true }))]);
    await Promise.all(files.map(async (file, i) => {
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await fetch(uploadPath, { method: "POST", body: fd });
        const data = await res.json() as { url?: string; error?: string };
        setImages((prev) => {
          const next = [...prev];
          if (data.url) next[startIdx + i] = { url: data.url };
          else next.splice(startIdx + i, 1);
          return next;
        });
      } catch {
        setImages((prev) => prev.filter((_, idx) => idx !== startIdx + i));
      }
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length, uploadPath]);

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
  const isUploading = images.some((img) => img.uploading);

  const setInitialImages = useCallback((initial: UploadEntry[]) => {
    setImages(initial);
  }, []);

  return { images, readyImages, lightbox, setLightbox, uploadFiles, removeImage, setCover, isUploading, setInitialImages };
}

// ── ImageGallery component ────────────────────────────────────────────────────
interface ImageGalleryProps {
  images: UploadEntry[];
  readyImages: UploadEntry[];
  lightbox: number | null;
  setLightbox: (i: number | null) => void;
  uploadFiles: (files: File[]) => Promise<void>;
  removeImage: (i: number) => void;
  setCover: (i: number) => void;
}

export function ImageGallery({ images, readyImages, lightbox, setLightbox, uploadFiles, removeImage, setCover }: ImageGalleryProps) {
  return (
    <div className="space-y-4">
      <DropZone onFiles={uploadFiles} />

      {images.length > 0 && (
        <div className="space-y-3">
          <p className="font-sans text-xs text-tierra/55 tracking-wide">
            La primera foto es la portada. Hacé click en <Star size={10} className="inline" /> para cambiarla.
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
                    <img src={img.url} alt={`Foto ${i + 1}`} className="w-full h-full object-cover border-2 border-morado/10 cursor-zoom-in" onClick={() => setLightbox(i)} />
                    {i === 0 && (
                      <span className="absolute bottom-0 left-0 right-0 bg-dorado/90 text-tierra-dark font-sans text-[0.5rem] tracking-widest uppercase text-center py-0.5">
                        Portada
                      </span>
                    )}
                    <div className="absolute inset-0 bg-morado-dark/0 group-hover:bg-morado-dark/40 transition-all flex items-start justify-end gap-1 p-1.5 opacity-0 group-hover:opacity-100">
                      {i !== 0 && (
                        <button type="button" title="Usar como portada" onClick={() => setCover(i)} className="bg-dorado text-tierra-dark p-1 hover:bg-dorado/80 transition-colors">
                          <Star size={11} />
                        </button>
                      )}
                      <button type="button" title="Eliminar" onClick={() => removeImage(i)} className="bg-tierra-dark/80 text-white p-1 hover:bg-rosa transition-colors">
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

      {images.length === 0 && (
        <div className="border-2 border-dashed border-morado/10 py-6 flex flex-col items-center gap-1.5">
          <ImageIcon size={18} className="text-tierra/15" />
          <p className="font-sans text-xs text-tierra/25 tracking-wide">Sin fotos todavía</p>
        </div>
      )}

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
