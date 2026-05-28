"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

type Props = {
  images: string[];
  videoUrl?: string | null;
};

export default function ProductDetailClient({ images, videoUrl }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Tabs: images + optionally a "video" tab
  const tabs = [...images.map((_, i) => ({ type: "image" as const, idx: i }))];

  const prev = () => setActiveIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIdx((i) => (i + 1) % images.length);

  return (
    <>
      {/* Imagen principal */}
      <div className="relative border-2 border-morado-dark overflow-hidden bg-white">
        {showVideo && videoUrl ? (
          <div className="aspect-video">
            <iframe
              src={`${videoUrl}&color=7B5EA7&title=0&byline=0&portrait=0&autoplay=1`}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="aspect-square relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[activeIdx]}
              alt={`Imagen ${activeIdx + 1}`}
              className="w-full h-full object-cover cursor-zoom-in"
              onClick={() => setLightbox(true)}
            />
            {images.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 border-2 border-morado/20 flex items-center justify-center hover:bg-white hover:border-morado/40 transition-colors">
                  <ChevronLeft size={16} className="text-tierra-dark" />
                </button>
                <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 border-2 border-morado/20 flex items-center justify-center hover:bg-white hover:border-morado/40 transition-colors">
                  <ChevronRight size={16} className="text-tierra-dark" />
                </button>
                <span className="absolute bottom-3 right-3 font-sans text-[0.55rem] text-white/70 bg-black/30 px-2 py-1 tracking-widest">
                  {activeIdx + 1} / {images.length}
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {(images.length > 1 || videoUrl) && (
        <div className="flex gap-2 flex-wrap">
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => { setShowVideo(false); setActiveIdx(i); }}
              className={`w-16 h-16 border-2 overflow-hidden shrink-0 transition-colors ${
                !showVideo && activeIdx === i ? "border-morado-dark" : "border-morado/20 hover:border-morado/50"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
          {videoUrl && (
            <button
              onClick={() => setShowVideo(true)}
              className={`w-16 h-16 border-2 overflow-hidden shrink-0 flex items-center justify-center transition-colors ${
                showVideo ? "border-morado-dark bg-morado-dark" : "border-morado/20 hover:border-morado/50 bg-morado/5"
              }`}
            >
              <Play size={18} className={showVideo ? "text-crema" : "text-morado"} />
            </button>
          )}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={22} className="text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronRight size={22} className="text-white" />
              </button>
            </>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[activeIdx]}
            alt=""
            className="max-h-[85vh] max-w-[85vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
