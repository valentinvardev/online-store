import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "~/app/_components/home/Navbar";
import Footer from "~/app/_components/home/Footer";
import { db } from "~/server/db";
import { auth } from "~/server/auth";
import { CIRCULO_CHECKOUT, hasActiveMembership } from "~/lib/access";
import CheckoutForm from "./_CheckoutForm";

type Props = {
  params: Promise<{ type: string; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { type, slug } = await params;
  const item = await fetchItem(type, slug);
  return {
    title: item ? `Comprar ${item.name} — La Reina de Bastos` : "Comprar",
  };
}

async function fetchItem(type: string, slug: string) {
  if (type === "curso") {
    const c = await db.course.findUnique({ where: { slug, active: true } });
    if (!c) return null;
    return {
      kind: "curso" as const,
      slug,
      name: c.name,
      subtitle: c.subtitle ?? null,
      description: c.description,
      price: c.price,
      durationLabel: c.duration,
      imageUrl: c.imageUrl,
      includes: c.includes,
    };
  }
  if (type === "servicio") {
    const s = await db.service.findUnique({ where: { slug, active: true } });
    if (!s) return null;
    return {
      kind: "servicio" as const,
      slug,
      name: s.name,
      subtitle: s.subtitle,
      description: s.description,
      price: s.price,
      durationLabel: s.durationLabel ?? `${s.duration} min`,
      imageUrl: s.imageUrl,
      includes: s.contenido,
    };
  }
  if (type === "membresia") {
    const t = await db.membershipTier.findUnique({ where: { slug, active: true } });
    if (!t) return null;
    return {
      kind: "membresia" as const,
      slug,
      name: t.name,
      subtitle: t.subtitle,
      description: t.description ?? "",
      price: t.price,
      durationLabel: t.interval === "month" ? "/ mes" : t.interval,
      imageUrl: null,
      includes: t.perks,
    };
  }
  return null;
}

export default async function ComprarPage({ params }: Props) {
  const { type, slug } = await params;
  if (!["curso", "servicio", "membresia"].includes(type)) notFound();

  // Modelo de membresía única: los cursos no se compran sueltos.
  // Cualquier intento de comprar un curso redirige al checkout de la membresía.
  if (type === "curso") redirect(CIRCULO_CHECKOUT);

  // Si ya es socia activa y entra a comprar la membresía, la mandamos al Círculo.
  if (type === "membresia") {
    const session = await auth();
    if (await hasActiveMembership(session?.user?.id)) redirect("/circulo");
  }

  const item = await fetchItem(type, slug);
  if (!item) notFound();

  const backHref =
    item.kind === "curso"
      ? `/cursos/${item.slug}`
      : item.kind === "servicio"
        ? `/servicios/${item.slug}`
        : "/suscripciones";

  return (
    <>
      <Navbar />

      <main className="bg-crema min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-crema border-b-2 border-morado/10">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 font-sans text-[0.75rem] text-tierra/60 hover:text-morado tracking-widest uppercase transition-colors"
            >
              <ArrowLeft size={11} /> Volver
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-[1.1fr_1fr] gap-10">
          {/* ─── Resumen del producto ─── */}
          <aside className="lg:order-2">
            <div className="bg-dorado-light border-2 border-morado-dark block-shadow p-7 lg:sticky lg:top-6">
              <span className="font-sans text-[0.65rem] text-tierra-dark/70 tracking-[0.4em] uppercase block mb-3">
                Estás comprando
              </span>
              <h2 className="font-display uppercase text-[clamp(1.75rem,4vw,2.25rem)] text-tierra-dark leading-none tracking-wide mb-2">
                {item.name}
              </h2>
              {item.subtitle && (
                <p className="font-sans italic text-tierra-dark/75 text-base mb-5">{item.subtitle}</p>
              )}

              {/* Precio */}
              <div className="flex items-baseline gap-2 mb-6 border-t-2 border-morado-dark/15 pt-5">
                <span className="font-display text-5xl text-morado-dark">${item.price}</span>
                <span className="font-sans text-sm text-tierra-dark/70 tracking-wide">
                  {item.durationLabel ?? ""}
                </span>
              </div>

              {/* Lista de incluye */}
              {item.includes && item.includes.length > 0 && (
                <div>
                  <p className="font-sans text-[0.6rem] text-tierra-dark/60 tracking-widest uppercase mb-3 font-bold">
                    Lo que incluye
                  </p>
                  <ul className="space-y-2">
                    {item.includes.map((line, i) => (
                      <li key={i} className="flex gap-2 font-sans text-[14px] text-tierra-dark/90 tracking-wide leading-snug">
                        <span className="text-morado-dark shrink-0">✦</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>

          {/* ─── Form ─── */}
          <section className="lg:order-1">
            <CheckoutForm
              type={item.kind}
              slug={item.slug}
              itemName={item.name}
              price={item.price}
            />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
