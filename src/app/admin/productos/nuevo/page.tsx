"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, Loader2, ImageIcon, Video, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "../../_components/AdminToast";
import { ImageGallery, useImageGallery } from "../../_components/ImageGallery";
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

const typeInfo: Record<string, string> = {
  FISICO: "Objeto enviado por correo o en persona",
  DIGITAL: "Archivo descargable o acceso online",
  PERSONALIZADO: "Hecho a medida, requiere consulta previa",
};
const typeLabel: Record<string, string> = { FISICO: "Físico", DIGITAL: "Digital", PERSONALIZADO: "Personalizado" };
const badgeStyles: Record<string, string> = {
  "Nuevo":       "bg-celeste/20 text-celeste border-celeste/30",
  "Oferta":      "bg-rosa/15 text-rosa border-rosa/30",
  "Más vendido": "bg-dorado/20 text-tierra-dark border-dorado/40",
  "Agotado":     "bg-tierra/10 text-tierra/60 border-tierra/20",
};

function ProductCardPreview({ name, description, price, priceOld, badge, type, imageUrl }: {
  name: string; description: string; price: string; priceOld: string;
  badge: string; type: string; imageUrl?: string;
}) {
  return (
    <article className="bg-white border-2 border-morado-dark overflow-hidden block-shadow flex flex-col">
      <div className="h-52 bg-gradient-to-br from-morado-dark via-celeste to-morado relative flex items-center justify-center shrink-0 overflow-hidden">
        {imageUrl
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          : <div className="w-14 h-14 bg-white/20 border-2 border-white/50 flex items-center justify-center"><span className="text-white text-xl">✦</span></div>
        }
        {badge && <span className={`absolute top-3 left-3 font-sans text-[0.58rem] px-2.5 py-1 border tracking-widest uppercase ${badgeStyles[badge] ?? ""}`}>{badge}</span>}
        <span className="absolute top-3 right-3 font-sans text-[0.55rem] text-white/50 tracking-[0.3em] uppercase bg-black/20 px-2 py-1">{typeLabel[type] ?? type}</span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-sans font-semibold text-base text-tierra-dark mb-2 leading-snug">
          {name || <span className="text-tierra/25">Nombre del producto</span>}
        </h3>
        <p className="font-sans text-[0.72rem] text-tierra/70 mb-5 leading-relaxed tracking-wide flex-1 line-clamp-3">
          {description || <span className="text-tierra/20">Descripción...</span>}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="font-sans font-bold text-2xl text-morado">{price ? `$${price}` : <span className="text-tierra/20 text-base">$0</span>}</span>
            {priceOld && <span className="font-sans text-xs text-tierra/55 line-through">${priceOld}</span>}
          </div>
          <button type="button" disabled={badge === "Agotado"} className="font-sans text-[0.65rem] px-4 py-2.5 border-2 border-morado-dark text-morado hover:bg-morado hover:text-crema transition-colors tracking-widest uppercase block-shadow-sm disabled:opacity-40">
            {badge === "Agotado" ? "Agotado" : "Agregar"}
          </button>
        </div>
      </div>
    </article>
  );
}

const empty = {
  name: "", description: "", type: "FISICO" as "FISICO" | "DIGITAL" | "PERSONALIZADO",
  price: "", priceOld: "", badge: "", fileUrl: "", stock: "", videoUrl: "",
};

export default function NuevoProductoPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = useState(empty);
  const gallery = useImageGallery();
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const vimeoEmbed = parseVimeo(form.videoUrl);

  const create = api.admin.productos.create.useMutation({
    onSuccess: (p) => { toast(`"${p.name}" publicado`); router.push("/admin/productos"); },
    onError: (err) => toast(err.message, "error"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gallery.isUploading) { toast("Esperá a que terminen de subir todas las fotos", "error"); return; }
    if (form.videoUrl && !vimeoEmbed) { toast("El link de Vimeo no es válido", "error"); return; }
    create.mutate({
      name: form.name, description: form.description, type: form.type,
      price: parseFloat(form.price),
      priceOld: form.priceOld ? parseFloat(form.priceOld) : undefined,
      badge: form.badge || undefined,
      imageUrl: gallery.readyImages[0]?.url,
      images: gallery.readyImages.map((img) => img.url),
      videoUrl: vimeoEmbed ?? undefined,
      fileUrl: form.fileUrl || undefined,
      stock: form.stock ? parseInt(form.stock) : undefined,
      active: true,
    });
  };

  const saving = create.isPending;

  return (
    <div className="space-y-8">
      <Link href="/admin/productos" className="inline-flex items-center gap-2 font-sans text-[0.65rem] text-tierra/60 hover:text-tierra tracking-widest uppercase transition-colors">
        <ArrowLeft size={13} /> Volver a productos
      </Link>

      <div>
        <p className="font-sans text-[0.58rem] text-tierra/30 tracking-[0.35em] uppercase mb-1">Nuevo contenido</p>
        <h1 className="font-display text-5xl text-morado-dark tracking-wide uppercase leading-none">Nuevo Producto</h1>
        <p className="font-sans text-tierra/65 mt-2 tracking-wide text-sm">Completá los datos para agregar un producto a la tienda</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-5">

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
                <div>
                  <label className={labelClass}>Tipo de producto <span className="text-rosa">*</span></label>
                  <div className="grid grid-cols-3 gap-3 mt-1">
                    {(["FISICO", "DIGITAL", "PERSONALIZADO"] as const).map((t) => (
                      <button key={t} type="button" onClick={() => set("type", t)}
                        className={`py-3 px-3 border-2 text-left transition-colors ${form.type === t ? "bg-morado-dark text-crema border-morado-dark" : "bg-white text-tierra/70 border-morado/15 hover:border-morado/40"}`}>
                        <p className="font-sans text-[0.6rem] tracking-widest uppercase font-semibold">{typeLabel[t]}</p>
                        <p className={`font-sans text-[0.58rem] mt-1 leading-snug ${form.type === t ? "text-crema/50" : "text-tierra/30"}`}>{typeInfo[t]}</p>
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

            {/* Video Vimeo */}
            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-morado/10">
                <Video size={15} className="text-morado" strokeWidth={1.8} />
                <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase">Video del producto</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Link de Vimeo</label>
                  <p className={hintClass}>Video de presentación o demostración del producto</p>
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

            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-morado/10">
                <div className="flex items-center gap-3">
                  <ImageIcon size={15} className="text-morado" strokeWidth={1.8} />
                  <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase">Fotos del producto</h2>
                </div>
                {gallery.readyImages.length > 0 && (
                  <span className="font-sans text-[0.58rem] text-tierra/55 tracking-widest uppercase">{gallery.readyImages.length} foto{gallery.readyImages.length !== 1 ? "s" : ""}</span>
                )}
              </div>
              <ImageGallery {...gallery} />
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-crema border-2 border-morado-dark block-shadow p-6">
              <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase mb-5 pb-4 border-b border-morado/10">Precio y estado</h2>
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

            <div className="space-y-2">
              <p className="font-sans text-[0.58rem] text-tierra/55 tracking-widest uppercase">Así se ve en la tienda</p>
              <ProductCardPreview name={form.name} description={form.description} price={form.price} priceOld={form.priceOld} badge={form.badge} type={form.type} imageUrl={gallery.readyImages[0]?.url} />
            </div>

            <div className="space-y-3">
              <button type="submit" disabled={saving || gallery.isUploading}
                className="flex items-center justify-center gap-2 w-full bg-morado-dark text-crema font-sans font-semibold text-[0.65rem] py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-morado transition-colors disabled:opacity-60">
                {saving ? <Loader2 size={13} className="animate-spin" /> : "✦"}
                {saving ? "Publicando..." : gallery.isUploading ? "Subiendo fotos..." : "Publicar producto"}
              </button>
              <Link href="/admin/productos" className="block w-full text-center font-sans text-[0.65rem] py-3 tracking-widest uppercase border-2 border-morado/20 text-tierra/70 hover:border-morado/50 hover:text-tierra transition-colors">
                Cancelar
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
