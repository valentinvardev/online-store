"use client";

import { useState, useRef, useCallback } from "react";
import { X, Upload, Loader2, FileText, ExternalLink } from "lucide-react";

// ── Tipos ─────────────────────────────────────────────────────────────────────
export type PdfEntry = {
  url: string;
  name: string;
  size?: number;
  uploading?: boolean;
};

// ── Hook ──────────────────────────────────────────────────────────────────────
export function usePdfGallery() {
  const [pdfs, setPdfs] = useState<PdfEntry[]>([]);

  const uploadFiles = useCallback(async (files: File[]) => {
    const startIdx = pdfs.length;
    setPdfs((prev) => [
      ...prev,
      ...files.map((f) => ({ url: "", name: f.name, size: f.size, uploading: true })),
    ]);
    await Promise.all(
      files.map(async (file, i) => {
        const fd = new FormData();
        fd.append("file", file);
        try {
          const res = await fetch("/api/admin/upload-pdf", { method: "POST", body: fd });
          const data = await res.json() as { url?: string; name?: string; size?: number; error?: string };
          setPdfs((prev) => {
            const next = [...prev];
            if (data.url) {
              next[startIdx + i] = { url: data.url, name: data.name ?? file.name, size: data.size };
            } else {
              next.splice(startIdx + i, 1);
            }
            return next;
          });
        } catch {
          setPdfs((prev) => prev.filter((_, idx) => idx !== startIdx + i));
        }
      }),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfs.length]);

  const removePdf = (idx: number) => setPdfs((prev) => prev.filter((_, i) => i !== idx));

  const readyPdfs = pdfs.filter((p) => !p.uploading && p.url);
  const isUploading = pdfs.some((p) => p.uploading);

  return { pdfs, readyPdfs, uploadFiles, removePdf, isUploading };
}

// ── DropZone PDF ──────────────────────────────────────────────────────────────
function PdfDropZone({ onFiles }: { onFiles: (files: File[]) => void }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handle = (files: FileList | null) => {
    if (!files) return;
    onFiles(Array.from(files).filter((f) => f.type === "application/pdf"));
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files); }}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed cursor-pointer transition-all py-8 flex flex-col items-center gap-3 ${
        dragging ? "border-morado bg-morado/5" : "border-morado/25 hover:border-morado/50"
      }`}
    >
      <Upload size={22} className={dragging ? "text-morado" : "text-tierra/25"} strokeWidth={1.5} />
      <div className="text-center">
        <p className="font-sans text-sm text-tierra/50 tracking-wide">
          {dragging ? "Soltá para subir" : "Arrastrá PDFs o hacé click"}
        </p>
        <p className="font-sans text-xs text-tierra/30 tracking-wide mt-0.5">Solo PDF — máximo 20 MB por archivo</p>
      </div>
      <input ref={inputRef} type="file" accept="application/pdf" multiple className="hidden" onChange={(e) => handle(e.target.files)} />
    </div>
  );
}

// ── Utilidades ────────────────────────────────────────────────────────────────
function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Componente principal ──────────────────────────────────────────────────────
interface PdfGalleryProps {
  pdfs: PdfEntry[];
  uploadFiles: (files: File[]) => Promise<void>;
  removePdf: (i: number) => void;
}

export function PdfGallery({ pdfs, uploadFiles, removePdf }: PdfGalleryProps) {
  return (
    <div className="space-y-4">
      <PdfDropZone onFiles={uploadFiles} />

      {pdfs.length > 0 && (
        <ul className="space-y-2">
          {pdfs.map((pdf, i) => (
            <li
              key={i}
              className="flex items-center gap-3 bg-white border-2 border-morado/10 px-4 py-3 group"
            >
              {/* Icono / spinner */}
              <div className="shrink-0">
                {pdf.uploading ? (
                  <Loader2 size={18} className="animate-spin text-morado/40" />
                ) : (
                  <FileText size={18} className="text-morado/50" strokeWidth={1.5} />
                )}
              </div>

              {/* Nombre y tamaño */}
              <div className="flex-1 min-w-0">
                <p className="font-sans text-sm text-tierra-dark truncate leading-none">
                  {pdf.name}
                </p>
                {pdf.size && (
                  <p className="font-sans text-[0.6rem] text-tierra/35 tracking-wide mt-0.5">
                    {formatBytes(pdf.size)}
                  </p>
                )}
                {pdf.uploading && (
                  <p className="font-sans text-[0.6rem] text-morado/60 tracking-wide mt-0.5">
                    Subiendo…
                  </p>
                )}
              </div>

              {/* Acciones */}
              {!pdf.uploading && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <a
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 text-tierra/40 hover:text-morado transition-colors"
                    title="Ver PDF"
                  >
                    <ExternalLink size={13} />
                  </a>
                  <button
                    type="button"
                    onClick={() => removePdf(i)}
                    className="p-1.5 text-tierra/40 hover:text-rosa transition-colors"
                    title="Eliminar"
                  >
                    <X size={13} />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {pdfs.length === 0 && (
        <div className="border-2 border-dashed border-morado/10 py-5 flex flex-col items-center gap-1.5">
          <FileText size={18} className="text-tierra/15" />
          <p className="font-sans text-xs text-tierra/25 tracking-wide">Sin PDFs todavía</p>
        </div>
      )}
    </div>
  );
}
