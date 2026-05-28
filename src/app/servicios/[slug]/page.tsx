import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "~/server/db";
import Navbar from "~/app/_components/home/Navbar";
import Footer from "~/app/_components/home/Footer";
import ServiceGalleryClient from "./_components/ServiceGalleryClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = await db.service.findUnique({ where: { slug, active: true } });
  if (!service) return {};
  return {
    title: `${service.name} — La Reina de Bastos`,
    description: service.description.slice(0, 160),
  };
}

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

export default async function ServicioDetailPage({ params }: Props) {
  const { slug } = await params;

  const service = await db.service.findUnique({ where: { slug, active: true } });
  if (!service) notFound();

  return (
    <>
      <Navbar />
      <main className="bg-crema min-h-screen">

        {/* Breadcrumb */}
        <div className="border-b-2 border-morado/8 px-6 py-4">
          <div className="max-w-6xl mx-auto">
            <nav className="flex items-center gap-2 font-sans text-[0.62rem] text-tierra/35 tracking-widest uppercase">
              <Link href="/servicios" className="hover:text-tierra transition-colors">Sesiones</Link>
              <span>›</span>
              <span className="text-tierra/60">{service.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Video / Galería */}
            <div className="space-y-3">
              {service.videoUrl ? (
                <ServiceGalleryClient images={service.images} videoUrl={service.videoUrl} />
              ) : service.images.length > 0 ? (
                <ServiceGalleryClient images={service.images} videoUrl={null} />
              ) : (
                <div className="aspect-video bg-gradient-to-br from-morado-dark via-morado-mid to-morado flex items-center justify-center border-2 border-morado-dark">
                  <span className="text-white/20 text-6xl">✦</span>
                </div>
              )}
            </div>

            {/* Info del servicio */}
            <div className="space-y-6">

              {/* Título */}
              <div>
                <p className="font-sans text-[0.6rem] text-morado tracking-[0.35em] uppercase mb-2">Sesión personal</p>
                <h1 className="font-sans font-bold text-3xl text-tierra-dark leading-tight tracking-wide">
                  {service.name}
                </h1>
                {service.subtitle && (
                  <p className="font-sans italic text-tierra/50 mt-2">{service.subtitle}</p>
                )}
              </div>

              {/* Precio */}
              <div>
                <span className="font-sans font-bold text-4xl text-morado">${service.price.toLocaleString("es-AR")}</span>
              </div>

              {/* Detalles rápidos */}
              <div className="flex flex-wrap gap-3">
                <span className="font-sans text-[0.62rem] bg-white border-2 border-morado/15 text-tierra/60 px-4 py-2 tracking-wide">
                  ⏱ {formatDuration(service.duration)}
                </span>
                <span className="font-sans text-[0.62rem] bg-white border-2 border-morado/15 text-tierra/60 px-4 py-2 tracking-wide">
                  {service.format}
                </span>
              </div>

              {/* Descripción */}
              <div className="border-t-2 border-morado/8 pt-6">
                <p className="font-sans text-tierra/65 leading-relaxed tracking-wide whitespace-pre-line">
                  {service.description}
                </p>
              </div>

              {/* CTA */}
              <div className="space-y-3 pt-2">
                <a
                  href="#reservar"
                  className="flex items-center justify-center gap-2 w-full font-sans font-semibold text-[0.65rem] py-4 px-8 bg-morado-dark text-crema border-2 border-morado-dark hover:bg-morado transition-colors tracking-widest uppercase block-shadow"
                >
                  ✦ Reservar sesión
                </a>
                <Link
                  href="/servicios"
                  className="block w-full text-center font-sans text-[0.62rem] py-3 tracking-widest uppercase border-2 border-morado/20 text-tierra/45 hover:border-morado/50 hover:text-tierra transition-colors"
                >
                  Ver todas las sesiones
                </Link>
              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
