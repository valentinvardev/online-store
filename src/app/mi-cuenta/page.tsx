import { redirect } from "next/navigation";
import Link from "next/link";
import { Calendar, BookOpen, ShoppingBag, LogOut, User as UserIcon } from "lucide-react";
import Navbar from "~/app/_components/home/Navbar";
import Footer from "~/app/_components/home/Footer";
import { auth, signOut } from "~/server/auth";
import { api } from "~/trpc/server";
import MembershipCard from "./_MembershipCard";

const fmt = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const statusLabel: Record<string, { text: string; cls: string }> = {
  PAID: { text: "Pagado", cls: "bg-verde/15 text-verde border-verde/40" },
  PENDING: { text: "Pendiente", cls: "bg-dorado/15 text-tierra-dark border-dorado/40" },
  FAILED: { text: "Fallido", cls: "bg-rosa/15 text-rosa border-rosa/40" },
  CANCELLED: { text: "Cancelado", cls: "bg-tierra/10 text-tierra/70 border-tierra/30" },
};

export default async function MiCuentaPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [me, orders, enrollments, bookings, membership] = await Promise.all([
    api.account.me(),
    api.account.orders(),
    api.account.enrollments(),
    api.account.bookings(),
    api.account.membership(),
  ]);

  return (
    <>
      <Navbar />

      <main className="bg-crema min-h-screen">
        {/* Hero */}
        <section className="bg-dorado-light border-b-2 border-morado-dark/20 py-14 px-6">
          <div className="max-w-5xl mx-auto flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-morado-dark text-crema flex items-center justify-center border-2 border-morado-dark block-shadow-sm">
              <UserIcon size={26} strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <p className="font-sans text-[0.7rem] text-tierra-dark/70 tracking-[0.4em] uppercase mb-1">
                Mi cuenta
              </p>
              <h1 className="font-display uppercase text-[clamp(2rem,5vw,3rem)] text-tierra-dark leading-none tracking-wide">
                {me?.name ?? me?.email ?? "Bienvenida"}
              </h1>
              {me?.email && me?.name && (
                <p className="font-sans text-sm text-tierra-dark/70 mt-1">{me.email}</p>
              )}
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-2 font-sans font-semibold text-[0.75rem] px-4 py-2.5 border-2 border-morado-dark text-tierra-dark hover:bg-morado-dark hover:text-crema transition-colors tracking-widest uppercase block-shadow-sm"
              >
                <LogOut size={13} strokeWidth={2} />
                Salir
              </button>
            </form>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
          {/* Membresía */}
          <section id="suscripcion" className="scroll-mt-24">
            <MembershipCard membership={membership} />
          </section>

          {/* Cursos comprados */}
          <Section id="cursos" title="Mis cursos" icon={<BookOpen size={16} />} empty={enrollments.length === 0} emptyText="Todavía no te inscribiste a ningún curso." emptyCta={{ href: "/cursos", label: "Ver cursos" }}>
            <div className="grid sm:grid-cols-2 gap-4">
              {enrollments.map((e) => (
                <Link
                  key={e.id}
                  href={`/cursos/${e.course.slug}`}
                  className="bg-white border-2 border-morado-dark block-shadow p-5 hover:translate-y-[-2px] transition-transform"
                >
                  <p className="font-sans font-bold text-tierra-dark text-base mb-1">{e.course.name}</p>
                  {e.course.subtitle && (
                    <p className="font-sans italic text-tierra-dark/70 text-sm">{e.course.subtitle}</p>
                  )}
                  <p className="font-sans text-[0.7rem] text-tierra/55 tracking-widest uppercase mt-3">
                    Inscripta el {fmt.format(e.createdAt)}
                  </p>
                </Link>
              ))}
            </div>
          </Section>

          {/* Bookings */}
          <Section id="sesiones" title="Mis sesiones" icon={<Calendar size={16} />} empty={bookings.length === 0} emptyText="Todavía no reservaste ninguna sesión." emptyCta={{ href: "/servicios", label: "Ver servicios" }}>
            <div className="space-y-3">
              {bookings.map((b) => (
                <div key={b.id} className="bg-white border-2 border-morado-dark block-shadow-sm p-5 flex items-center gap-5">
                  <div className="text-center shrink-0">
                    <p className="font-display text-3xl text-morado-dark leading-none">
                      {b.date.getDate()}
                    </p>
                    <p className="font-sans text-[0.7rem] text-tierra/60 tracking-widest uppercase mt-1">
                      {b.date.toLocaleDateString("es-AR", { month: "short" })}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="font-sans font-bold text-tierra-dark">{b.service.name}</p>
                    <p className="font-sans text-sm text-tierra/70">
                      {b.date.toLocaleString("es-AR", { hour: "2-digit", minute: "2-digit" })} · {b.service.format}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Órdenes */}
          <Section title="Mis compras" icon={<ShoppingBag size={16} />} empty={orders.length === 0} emptyText="Todavía no hiciste ninguna compra." emptyCta={{ href: "/tienda", label: "Ir a la tienda" }}>
            <div className="space-y-3">
              {orders.map((o) => {
                const status = statusLabel[o.status] ?? statusLabel.PENDING!;
                return (
                  <div key={o.id} className="bg-white border-2 border-morado-dark block-shadow-sm p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-sans text-[0.7rem] text-tierra/60 tracking-widest uppercase">
                          Orden #{o.id.slice(-8)}
                        </p>
                        <p className="font-sans text-[0.85rem] text-tierra/70 mt-0.5">
                          {fmt.format(o.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-2xl text-tierra-dark">${o.total}</p>
                        <span className={`inline-block font-sans text-[0.6rem] px-2.5 py-1 border rounded-full tracking-widest uppercase mt-1 ${status.cls}`}>
                          {status.text}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-1 border-t border-morado/10 pt-3">
                      {o.items.map((it) => (
                        <li key={it.id} className="flex justify-between font-sans text-sm">
                          <span className="text-tierra-dark/85">
                            {it.name} {it.quantity > 1 && <span className="text-tierra/50">×{it.quantity}</span>}
                          </span>
                          <span className="text-tierra-dark/70">${it.price * it.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </Section>
        </div>
      </main>

      <Footer />
    </>
  );
}

function Section({
  title,
  icon,
  empty,
  emptyText,
  emptyCta,
  children,
  id,
}: {
  title: string;
  icon: React.ReactNode;
  empty: boolean;
  emptyText: string;
  emptyCta: { href: string; label: string };
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-morado-dark">{icon}</span>
        <h2 className="font-display uppercase text-[clamp(1.4rem,3vw,1.8rem)] text-tierra-dark leading-none tracking-wide">
          {title}
        </h2>
      </div>
      {empty ? (
        <div className="bg-crema border-2 border-morado-dark/15 border-dashed p-8 text-center">
          <p className="font-sans text-tierra/65 text-sm mb-4">{emptyText}</p>
          <Link
            href={emptyCta.href}
            className="inline-block font-sans font-semibold text-[0.7rem] px-5 py-2.5 border-2 border-morado-dark text-tierra-dark hover:bg-morado-dark hover:text-crema transition-colors tracking-widest uppercase block-shadow-sm"
          >
            {emptyCta.label}
          </Link>
        </div>
      ) : (
        children
      )}
    </section>
  );
}
