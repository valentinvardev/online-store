"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Download, FileText, Eye, Maximize2 } from "lucide-react";

type Item =
  | { type: "image"; index: number }
  | { type: "pdf"; url: string; name: string };

function fileName(url: string) {
  return decodeURIComponent(url.split("/").pop()?.split("?")[0] ?? "archivo");
}
// Supabase Storage soporta ?download para forzar la descarga
function downloadUrl(url: string) {
  return url.includes("?") ? `${url}&download` : `${url}?download`;
}

export default function MaterialLightbox({
  images = [],
  attachments = [],
  attachmentsTitle = "Material descargable",
}: {
  images?: string[];
  attachments?: string[];
  attachmentsTitle?: string;
}) {
  const [item, setItem] = useState<Item | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setItem(null);
      if (item.type === "image") {
        if (e.key === "ArrowRight") setItem({ type: "image", index: (item.index + 1) % images.length });
        if (e.key === "ArrowLeft") setItem({ type: "image", index: (item.index - 1 + images.length) % images.length });
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [item, images.length]);

  const navImage = (dir: number) => {
    if (item?.type !== "image") return;
    setItem({ type: "image", index: (item.index + dir + images.length) % images.length });
  };

  return (
    <>
      {/* ── Galería ── */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setItem({ type: "image", index: i })}
              className="relative block aspect-square border-2 border-morado/15 overflow-hidden group cursor-zoom-in"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Imagen ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute inset-0 bg-morado-dark/0 group-hover:bg-morado-dark/25 transition-colors flex items-center justify-center">
                <Maximize2 size={20} className="text-crema opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </button>
          ))}
        </div>
      )}

      {/* ── Documentos / PDFs ── */}
      {attachments.length > 0 && (
        <div className={attachmentsTitle ? "border-t-2 border-morado/10 pt-5" : ""}>
          {attachmentsTitle && (
            <p className="font-sans text-[0.65rem] text-tierra/60 tracking-[0.3em] uppercase mb-3 font-bold">
              {attachmentsTitle}
            </p>
          )}
          <ul className="space-y-2">
            {attachments.map((url, i) => {
              const name = fileName(url);
              const isPdf = /\.pdf($|\?)/i.test(url);
              return (
                <li key={i} className="flex items-center gap-3 bg-white border-2 border-morado/15 px-4 py-3 hover:border-morado/40 transition-colors">
                  <FileText size={16} className="text-morado shrink-0" />
                  <span className="flex-1 font-sans text-sm text-tierra-dark truncate">{name}</span>
                  {isPdf && (
                    <button
                      type="button"
                      onClick={() => setItem({ type: "pdf", url, name })}
                      className="inline-flex items-center gap-1.5 font-sans text-[0.65rem] text-morado font-semibold tracking-widest uppercase hover:text-morado-dark transition-colors shrink-0"
                    >
                      <Eye size={13} /> Ver
                    </button>
                  )}
                  <a
                    href={downloadUrl(url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-sans text-[0.65rem] text-tierra/55 font-semibold tracking-widest uppercase hover:text-morado transition-colors shrink-0"
                    title="Descargar"
                  >
                    <Download size={13} /> Bajar
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* ── Lightbox ── */}
      {item && mounted && createPortal(
        <div
          className="fixed inset-0 z-[100] bg-morado-dark/95 backdrop-blur-sm flex flex-col p-3 sm:p-6"
          onClick={() => setItem(null)}
        >
          {item.type === "image" ? (
            <ImageView
              src={images[item.index]!}
              index={item.index}
              total={images.length}
              onNav={navImage}
              onClose={() => setItem(null)}
            />
          ) : (
            <PdfView url={item.url} name={item.name} onClose={() => setItem(null)} />
          )}
        </div>,
        document.body,
      )}
    </>
  );
}

function ImageView({ src, index, total, onNav, onClose }: {
  src: string; index: number; total: number; onNav: (d: number) => void; onClose: () => void;
}) {
  return (
    <>
      {/* Barra superior */}
      <div className="flex items-center justify-between gap-3 mb-3 shrink-0" onClick={(e) => e.stopPropagation()}>
        <span className="font-sans text-[0.7rem] text-crema/60 tracking-widest uppercase">
          {index + 1} / {total}
        </span>
        <div className="flex items-center gap-2">
          <a
            href={downloadUrl(src)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-crema text-tierra-dark font-sans font-semibold text-[0.65rem] px-3 py-2 border-2 border-morado-dark hover:bg-dorado-light transition-colors tracking-widest uppercase block-shadow-sm"
          >
            <Download size={13} /> Descargar
          </a>
          <button onClick={onClose} aria-label="Cerrar" className="w-9 h-9 flex items-center justify-center bg-crema text-tierra-dark border-2 border-morado-dark hover:bg-dorado-light transition-colors block-shadow-sm">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Imagen */}
      <div className="flex-1 flex items-center justify-center min-h-0 relative" onClick={(e) => e.stopPropagation()}>
        {total > 1 && (
          <button onClick={() => onNav(-1)} aria-label="Anterior" className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-crema text-tierra-dark border-2 border-morado-dark hover:bg-dorado-light transition-colors block-shadow-sm z-10">
            <ChevronLeft size={22} />
          </button>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="max-h-full max-w-full object-contain border-4 border-crema block-shadow" />
        {total > 1 && (
          <button onClick={() => onNav(1)} aria-label="Siguiente" className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-crema text-tierra-dark border-2 border-morado-dark hover:bg-dorado-light transition-colors block-shadow-sm z-10">
            <ChevronRight size={22} />
          </button>
        )}
      </div>
    </>
  );
}

function PdfView({ url, name, onClose }: { url: string; name: string; onClose: () => void }) {
  return (
    <div className="flex flex-col h-full" onClick={(e) => e.stopPropagation()}>
      {/* Barra superior con descarga visible */}
      <div className="flex items-center justify-between gap-3 bg-crema border-2 border-morado-dark px-4 py-2.5 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <FileText size={16} className="text-morado shrink-0" />
          <span className="font-sans font-semibold text-sm text-tierra-dark truncate">{name}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={downloadUrl(url)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-dorado text-tierra-dark font-sans font-semibold text-[0.65rem] px-4 py-2 border-2 border-morado-dark hover:bg-dorado-light transition-colors tracking-widest uppercase block-shadow-sm"
          >
            <Download size={13} /> Descargar
          </a>
          <button onClick={onClose} aria-label="Cerrar" className="w-9 h-9 flex items-center justify-center bg-white text-tierra-dark border-2 border-morado-dark hover:bg-rosa hover:text-crema transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>
      {/* Visor PDF */}
      <iframe src={url} title={name} className="flex-1 w-full border-2 border-t-0 border-morado-dark bg-white" />
    </div>
  );
}
