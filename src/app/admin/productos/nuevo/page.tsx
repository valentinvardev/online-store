"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, Loader2, Plus, X, ImageIcon } from "lucide-react";
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

function ImagePreview({ url, onRemove, label }: { url: string; onRemove?: () => void; label?: string }) {
  const [error, setError] = useState(false);

  if (!url) return null;

  return (
    <div className="relative group">
      {error ? (
        <div className="w-full aspect-square bg-morado/5 border-2 border-dashed border-morado/20 flex flex-col items-center justify-center gap-2">
          <ImageIcon size={20} className="text-tierra/20" />
          <p className="font-sans text-[0.58rem] text-tierra/30 tracking-wide text-center px-2">URL inválida</p>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={label ?? "Preview"}
          onError={() => setError(true)}
          className="w-full aspect-square object-cover border-2 border-morado/15"
        />
      )}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-1.5 right-1.5 bg-tierra-dark/70 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rosa"
        >
          <X size={11} />
        </button>
      )}
      {label && (
        <p className="font-sans text-[0.55rem] text-tierra/35 tracking-widest uppercase mt-1 text-center">{label}</p>
      )}
    </div>
  );
}

const empty = {
  name: "", description: "", type: "FISICO" as "FISICO" | "DIGITAL" | "PERSONALIZADO",
  price: "", priceOld: "", badge: "", imageUrl: "", fileUrl: "", stock: "",
};

export default function NuevoProductoPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = useState(empty);
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoInput, setPhotoInput] = useState("");
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const addPhoto = () => {
    const url = photoInput.trim();
    if (url && !photos.includes(url)) {
      setPhotos((p) => [...p, url]);
    }
    setPhotoInput("");
  };

  const removePhoto = (idx: number) => setPhotos((p) => p.filter((_, i) => i !== idx));

  const create = api.admin.productos.create.useMutation({
    onSuccess: (p) => {
      toast(`"${p.name}" publicado`);
      router.push("/admin/productos");
    },
    onError: (err) => toast(err.message, "error"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate({
      name: form.name,
      description: form.description,
      type: form.type,
      price: parseFloat(form.price),
      priceOld: form.priceOld ? parseFloat(form.priceOld) : undefined,
      badge: form.badge || undefined,
      imageUrl: form.imageUrl || undefined,
      images: photos.length > 0 ? photos : undefined,
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

            {/* Imágenes */}
            <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-morado/10">
                <ImageIcon size={15} className="text-morado" strokeWidth={1.8} />
                <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase">Imágenes del producto</h2>
              </div>

              {/* Imagen principal */}
              <div className="space-y-3 mb-6">
                <label className={labelClass}>Imagen principal</label>
                <div className="flex gap-3 items-start">
                  <div className="flex-1">
                    <input
                      className={inputClass}
                      placeholder="https://..."
                      value={form.imageUrl}
                      onChange={(e) => set("imageUrl", e.target.value)}
                    />
                    <p className={hintClass + " mt-1.5"}>Es la foto que aparece en la tienda y en la card del producto</p>
                  </div>
                  {form.imageUrl && (
                    <div className="w-20 shrink-0">
                      <ImagePreview url={form.imageUrl} label="Principal" />
                    </div>
                  )}
                </div>
              </div>

              {/* Fotos adicionales */}
              <div className="space-y-3 pt-5 border-t border-morado/10">
                <label className={labelClass}>Fotos del producto</label>
                <p className={hintClass}>Imágenes adicionales que el comprador puede ver en el detalle del producto</p>

                {/* Input para agregar */}
                <div className="flex gap-2">
                  <input
                    className={inputClass}
                    placeholder="Pegá la URL de una foto y presioná +"
                    value={photoInput}
                    onChange={(e) => setPhotoInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addPhoto(); } }}
                  />
                  <button
                    type="button"
                    onClick={addPhoto}
                    disabled={!photoInput.trim()}
                    className="shrink-0 w-12 bg-morado-dark text-crema border-2 border-morado-dark hover:bg-morado transition-colors disabled:opacity-30 flex items-center justify-center"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* Grid de fotos */}
                {photos.length > 0 ? (
                  <div className="grid grid-cols-4 gap-3 mt-3">
                    {photos.map((url, i) => (
                      <ImagePreview
                        key={i}
                        url={url}
                        label={`Foto ${i + 1}`}
                        onRemove={() => removePhoto(i)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-morado/15 py-8 flex flex-col items-center gap-2 mt-2">
                    <ImageIcon size={22} className="text-tierra/15" />
                    <p className="font-sans text-xs text-tierra/25 tracking-wide">Todavía no hay fotos adicionales</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna lateral */}
          <div className="space-y-5">
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
            {form.imageUrl && (
              <div className="bg-crema border-2 border-morado-dark block-shadow p-4">
                <p className={labelClass + " mb-3"}>Preview portada</p>
                <ImagePreview url={form.imageUrl} />
                {form.name && (
                  <p className="font-sans font-semibold text-xs text-tierra-dark mt-2 tracking-wide truncate">{form.name}</p>
                )}
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 w-full bg-morado-dark text-crema font-sans font-semibold text-[0.65rem] py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-morado transition-colors disabled:opacity-60"
              >
                {saving ? <Loader2 size={13} className="animate-spin" /> : "✦"}
                {saving ? "Publicando..." : "Publicar producto"}
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
    </div>
  );
}
