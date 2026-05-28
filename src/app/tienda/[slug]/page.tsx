import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "~/server/db";
import Navbar from "~/app/_components/home/Navbar";
import Footer from "~/app/_components/home/Footer";
import ProductDetailClient from "./_components/ProductDetailClient";

type Props = { params: Promise<{ slug: string }> };

const badgeStyles: Record<string, string> = {
  "Nuevo":       "bg-celeste/20 text-celeste border-celeste/30",
  "Oferta":      "bg-rosa/15 text-rosa border-rosa/30",
  "Más vendido": "bg-dorado/20 text-tierra-dark border-dorado/40",
  "Agotado":     "bg-tierra/10 text-tierra/60 border-tierra/20",
};

const typeLabel: Record<string, string> = {
  FISICO: "Físico",
  DIGITAL: "Digital",
  PERSONALIZADO: "Personalizado",
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug, active: true } });
  if (!product) return {};
  return {
    title: `${product.name} — La Reina de Bastos`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductoDetailPage({ params }: Props) {
  const { slug } = await params;

  const product = await db.product.findUnique({ where: { slug, active: true } });
  if (!product) notFound();

  return (
    <>
      <Navbar />
      <main className="bg-crema min-h-screen">

        {/* Breadcrumb */}
        <div className="border-b-2 border-morado/8 px-6 py-4">
          <div className="max-w-6xl mx-auto">
            <nav className="flex items-center gap-2 font-sans text-[0.62rem] text-tierra/35 tracking-widest uppercase">
              <Link href="/tienda" className="hover:text-tierra transition-colors">Tienda</Link>
              <span>›</span>
              <span className="text-tierra/60">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Galería de imágenes */}
            <div className="space-y-3">
              {product.images.length > 0 ? (
                <ProductDetailClient images={product.images} videoUrl={product.videoUrl} />
              ) : product.videoUrl ? (
                <div className="aspect-video w-full border-2 border-morado-dark overflow-hidden">
                  <iframe
                    src={`${product.videoUrl}&color=7B5EA7&title=0&byline=0&portrait=0`}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gradient-to-br from-morado-dark via-celeste to-morado flex items-center justify-center border-2 border-morado-dark">
                  <span className="text-white/20 text-6xl">✦</span>
                </div>
              )}
            </div>

            {/* Info del producto */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex items-center gap-3 flex-wrap">
                {product.badge && (
                  <span className={`font-sans text-[0.58rem] px-3 py-1.5 border tracking-widest uppercase ${badgeStyles[product.badge] ?? ""}`}>
                    {product.badge}
                  </span>
                )}
                <span className="font-sans text-[0.58rem] px-3 py-1.5 border border-morado/20 text-tierra/50 tracking-widest uppercase">
                  {typeLabel[product.type] ?? product.type}
                </span>
              </div>

              {/* Título y precio */}
              <div>
                <h1 className="font-sans font-bold text-3xl text-tierra-dark leading-tight tracking-wide mb-4">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-3">
                  <span className="font-sans font-bold text-4xl text-morado">${product.price.toLocaleString("es-AR")}</span>
                  {product.priceOld && (
                    <span className="font-sans text-base text-tierra/35 line-through">${product.priceOld.toLocaleString("es-AR")}</span>
                  )}
                </div>
              </div>

              {/* Descripción */}
              <div className="border-t-2 border-morado/8 pt-6">
                <p className="font-sans text-tierra/65 leading-relaxed tracking-wide whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Info extra */}
              <div className="bg-white border-2 border-morado/10 p-5 space-y-3">
                {product.type === "FISICO" && product.stock !== null && product.stock !== undefined && (
                  <div className="flex items-center justify-between font-sans text-xs tracking-wide">
                    <span className="text-tierra/40 uppercase tracking-widest">Stock disponible</span>
                    <span className={`font-semibold ${product.stock > 0 ? "text-verde" : "text-rosa"}`}>
                      {product.stock > 0 ? `${product.stock} unidades` : "Sin stock"}
                    </span>
                  </div>
                )}
                {product.type === "DIGITAL" && (
                  <div className="flex items-center gap-2 font-sans text-xs text-tierra/50 tracking-wide">
                    <span className="text-celeste">◈</span>
                    Producto digital — acceso inmediato tras la compra
                  </div>
                )}
                {product.type === "PERSONALIZADO" && (
                  <div className="flex items-center gap-2 font-sans text-xs text-tierra/50 tracking-wide">
                    <span className="text-rosa">◉</span>
                    Hecho a medida — te contactamos para coordinar
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <button
                  disabled={product.badge === "Agotado" || (product.type === "FISICO" && product.stock === 0)}
                  className="w-full font-sans font-semibold text-[0.65rem] py-4 px-8 bg-morado-dark text-crema border-2 border-morado-dark hover:bg-morado transition-colors tracking-widest uppercase block-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.badge === "Agotado" ? "Agotado" : "Agregar al carrito ✦"}
                </button>
                <Link
                  href="/tienda"
                  className="block w-full text-center font-sans text-[0.62rem] py-3 tracking-widest uppercase border-2 border-morado/20 text-tierra/45 hover:border-morado/50 hover:text-tierra transition-colors"
                >
                  Seguir comprando
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Video (si hay imágenes Y video, se muestra el video abajo) */}
        {product.images.length > 0 && product.videoUrl && (
          <div className="border-t-2 border-morado/8 py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-morado/10" />
                <span className="font-sans text-[0.6rem] text-morado tracking-[0.35em] uppercase">Video del producto</span>
                <div className="h-px flex-1 bg-morado/10" />
              </div>
              <div className="aspect-video w-full border-2 border-morado-dark overflow-hidden">
                <iframe
                  src={`${product.videoUrl}&color=7B5EA7&title=0&byline=0&portrait=0`}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}
