"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "~/app/_components/home/Navbar";
import Footer from "~/app/_components/home/Footer";
import { type LastOrder } from "~/app/_components/cart/CartContext";
import {
  Package,
  MessageCircle,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2,
  ExternalLink,
} from "lucide-react";

// ── Sección: Cursos ───────────────────────────────────────────────────────────
function CursosSection({ email }: { email: string }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [activated, setActivated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleActivate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 8) { setError("La contraseña debe tener al menos 8 caracteres."); return; }
    if (password !== confirm) { setError("Las contraseñas no coinciden."); return; }
    setLoading(true);
    // TODO: llamar API de activación de cuenta cuando esté implementada
    await new Promise((r) => setTimeout(r, 1000)); // simulación
    setActivated(true);
    setLoading(false);
  }

  return (
    <div className="border-2 border-morado-dark bg-white overflow-hidden">
      {/* Header del bloque */}
      <div className="bg-morado-dark px-8 py-5 flex items-center gap-3">
        <KeyRound size={16} className="text-dorado" strokeWidth={1.5} />
        <h2 className="font-sans font-bold text-sm text-crema tracking-widest uppercase">Tus cursos</h2>
      </div>

      <div className="p-8">
        {activated ? (
          <div className="flex flex-col items-center gap-4 text-center py-4">
            <CheckCircle2 size={40} className="text-verde" strokeWidth={1.5} />
            <div>
              <p className="font-sans font-semibold text-tierra-dark">¡Tu cuenta está activa!</p>
              <p className="font-sans text-sm text-tierra/50 mt-1 tracking-wide">
                Ya podés acceder a tus cursos con <strong className="text-tierra-dark">{email}</strong>
              </p>
            </div>
            <Link
              href="/login"
              className="font-sans font-semibold text-xs px-6 py-3 bg-morado text-crema border-2 border-morado-dark hover:bg-morado-light transition-colors tracking-widest uppercase block-shadow"
            >
              Ir a mis cursos →
            </Link>
          </div>
        ) : (
          <>
            <p className="font-sans text-tierra/65 text-sm leading-relaxed mb-1">
              Tu usuario fue creado con el email de compra.
              Elegí una contraseña para acceder a tus cursos cuando quieras.
            </p>
            <p className="font-sans text-xs text-morado font-semibold tracking-wide mb-6">
              {email}
            </p>

            <form onSubmit={handleActivate} className="space-y-4 max-w-sm">
              <div>
                <label className="block font-sans text-[0.58rem] text-tierra/45 tracking-widest uppercase mb-1.5">
                  Elegí tu contraseña <span className="text-rosa">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    className="w-full bg-crema border-2 border-morado/20 px-4 py-3 pr-10 font-sans text-sm text-tierra-dark placeholder:text-tierra/25 focus:outline-none focus:border-morado transition-colors"
                    placeholder="Mínimo 8 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-tierra/30 hover:text-tierra/60 transition-colors">
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block font-sans text-[0.58rem] text-tierra/45 tracking-widest uppercase mb-1.5">
                  Confirmá tu contraseña <span className="text-rosa">*</span>
                </label>
                <input
                  type={showPw ? "text" : "password"}
                  className="w-full bg-crema border-2 border-morado/20 px-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/25 focus:outline-none focus:border-morado transition-colors"
                  placeholder="Repetí la contraseña"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="font-sans text-xs text-rosa tracking-wide">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 font-sans font-bold text-xs px-6 py-3 bg-morado-dark text-crema border-2 border-morado-dark hover:bg-morado transition-colors tracking-widest uppercase block-shadow disabled:opacity-60"
              >
                {loading ? <Loader2 size={13} className="animate-spin" /> : <KeyRound size={13} />}
                {loading ? "Activando..." : "Activar mi cuenta"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ── Sección: Productos ────────────────────────────────────────────────────────
function ProductosSection({ items }: { items: LastOrder["items"] }) {
  const productItems = items.filter((i) => i.itemType === "product");
  return (
    <div className="border-2 border-morado-dark bg-white overflow-hidden">
      <div className="bg-dorado px-8 py-5 flex items-center gap-3">
        <Package size={16} className="text-tierra-dark" strokeWidth={1.5} />
        <h2 className="font-sans font-bold text-sm text-tierra-dark tracking-widest uppercase">Tu pedido</h2>
      </div>

      <div className="p-8">
        <ul className="space-y-3 mb-6">
          {productItems.map((item, i) => (
            <li key={i} className="flex items-center justify-between gap-3 py-2 border-b border-morado/8 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 bg-gradient-to-br ${item.gradient} shrink-0 flex items-center justify-center`}>
                  <span className="text-white/50 text-[0.6rem]">✦</span>
                </div>
                <div>
                  <p className="font-sans text-sm text-tierra-dark font-semibold leading-none">{item.name}</p>
                  <p className="font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase mt-0.5">{item.category} · ×{item.quantity}</p>
                </div>
              </div>
              <span className="font-sans text-sm font-bold text-morado shrink-0">${(item.price * item.quantity).toFixed(0)}</span>
            </li>
          ))}
        </ul>

        <div className="space-y-3">
          <p className="font-sans text-tierra/55 text-sm leading-relaxed tracking-wide">
            Vamos a preparar tu pedido y te avisamos por email cuando esté en camino.
          </p>
          {/* TODO: enlazar a página de tracking cuando esté implementada */}
          <a
            href="#"
            className="inline-flex items-center gap-2 font-sans font-semibold text-xs px-6 py-3 border-2 border-morado-dark text-morado hover:bg-morado hover:text-crema transition-colors tracking-widest uppercase block-shadow-sm"
            onClick={(e) => e.preventDefault()}
          >
            <ExternalLink size={13} />
            Seguí el estado de tu pedido
          </a>
          <p className="font-sans text-[0.6rem] text-tierra/30 tracking-wide">
            El link de seguimiento también llega a tu email de compra.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Sección: Servicios ────────────────────────────────────────────────────────
function ServiciosSection({ items, buyerName }: { items: LastOrder["items"]; buyerName: string }) {
  const serviceItems = items.filter((i) => i.itemType === "service");
  const tienePresencial = serviceItems.some((i) =>
    i.category.toLowerCase().includes("presencial")
  );

  const waLink = `https://wa.me/5491112345678?text=${encodeURIComponent(
    `Hola! Soy ${buyerName} y acabo de reservar ${serviceItems.map((i) => i.name).join(", ")}. Quería coordinar los detalles.`
  )}`;

  return (
    <div className="border-2 border-morado-dark bg-white overflow-hidden">
      <div className="bg-verde px-8 py-5 flex items-center gap-3">
        <MessageCircle size={16} className="text-white" strokeWidth={1.5} />
        <h2 className="font-sans font-bold text-sm text-white tracking-widest uppercase">Tu sesión</h2>
      </div>

      <div className="p-8 space-y-5">
        <ul className="space-y-2">
          {serviceItems.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-verde text-[0.55rem]">✦</span>
              <span className="font-sans text-sm text-tierra-dark">{item.name}</span>
            </li>
          ))}
        </ul>

        {/* Banner de coordinación */}
        <div className="bg-crema border-2 border-morado/15 p-5 space-y-2">
          <p className="font-sans font-semibold text-[0.62rem] text-morado tracking-widest uppercase">¿Cómo coordinamos?</p>
          <p className="font-sans text-sm text-tierra/65 leading-relaxed tracking-wide">
            Te vamos a escribir al email de compra para coordinar día y horario.
            {tienePresencial
              ? " La sesión puede realizarse presencialmente o a través de Google Meet, según lo que prefieras."
              : " La sesión se realiza a través de Google Meet — te enviamos el link antes de empezar."}
          </p>
        </div>

        {/* WhatsApp */}
        <div>
          <p className="font-sans text-xs text-tierra/40 tracking-wide mb-3">
            ¿Querés coordinar antes? Escribinos directamente:
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-sans font-bold text-xs px-6 py-3 bg-[#25D366] text-white border-2 border-[#128C7E] hover:bg-[#128C7E] transition-colors tracking-widest uppercase block-shadow"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escribinos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────
export default function GraciasPage() {
  const [order, setOrder] = useState<LastOrder | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rdb_last_order");
      if (stored) {
        setOrder(JSON.parse(stored) as LastOrder);
        // No borramos el order de localStorage por si recarga la página
      }
    } catch {}
    setReady(true);
  }, []);

  const hasCursos = order?.items.some((i) => i.itemType === "course") ?? false;
  const hasProductos = order?.items.some((i) => i.itemType === "product") ?? false;
  const hasServicios = order?.items.some((i) => i.itemType === "service") ?? false;

  return (
    <>
      <Navbar />
      <main className="bg-crema min-h-screen pb-20">

        {/* Hero */}
        <div className="bg-morado-dark py-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <span className="font-display text-5xl text-dorado/30 block mb-6">✦</span>
            <h1 className="font-display uppercase text-[clamp(2.2rem,6vw,4rem)] text-crema leading-none tracking-wide mb-4">
              ¡Gracias{order?.buyer.name ? `, ${order.buyer.name}` : ""}!
            </h1>
            <p className="font-sans text-crema/55 text-base tracking-wide leading-relaxed">
              Tu pedido fue recibido. Revisá tu email —{" "}
              {order?.buyer.email ? (
                <strong className="text-crema/80">{order.buyer.email}</strong>
              ) : (
                "te enviamos los detalles"
              )}{" "}
              — para ver el resumen completo.
            </p>
          </div>
        </div>

        {/* Contenido */}
        <div className="max-w-2xl mx-auto px-6 pt-12 space-y-6">

          {/* Resumen del pedido */}
          {ready && order && (
            <div className="bg-white border-2 border-morado/15 px-6 py-5">
              <p className="font-sans text-[0.6rem] text-tierra/35 tracking-[0.3em] uppercase mb-3">Resumen de tu compra</p>
              <div className="space-y-1.5">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 font-sans text-sm">
                    <span className="text-tierra/65 truncate">{item.name} <span className="text-tierra/35">×{item.quantity}</span></span>
                    <span className="font-semibold text-tierra-dark shrink-0">${(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-morado/10">
                <span className="font-sans text-[0.62rem] text-tierra/40 tracking-widest uppercase">Total</span>
                <span className="font-sans font-bold text-xl text-morado">${order.total.toFixed(0)}</span>
              </div>
            </div>
          )}

          {/* Estado de carga */}
          {!ready && (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={24} className="animate-spin text-morado/30" />
            </div>
          )}

          {/* Sin orden — acceso directo a la URL */}
          {ready && !order && (
            <div className="text-center py-8">
              <p className="font-sans text-tierra/40 text-sm tracking-wide mb-6">
                No encontramos los detalles de tu compra. Si acabás de comprar, revisá tu email.
              </p>
              <Link href="/" className="font-sans text-xs text-morado hover:text-morado-dark tracking-widest uppercase transition-colors">
                Volver al inicio →
              </Link>
            </div>
          )}

          {/* ── Secciones por tipo ─────────────── */}
          {ready && order && (
            <>
              {hasCursos && <CursosSection email={order.buyer.email} />}
              {hasProductos && <ProductosSection items={order.items} />}
              {hasServicios && <ServiciosSection items={order.items} buyerName={order.buyer.name} />}
            </>
          )}

          {/* Footer links */}
          {ready && (
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
              <Link href="/tienda" className="font-sans text-xs text-tierra/40 hover:text-morado transition-colors tracking-widest uppercase">
                Seguir comprando
              </Link>
              <Link href="/cursos" className="font-sans text-xs text-tierra/40 hover:text-morado transition-colors tracking-widest uppercase">
                Ver cursos
              </Link>
              <Link href="/" className="font-sans text-xs text-tierra/40 hover:text-morado transition-colors tracking-widest uppercase">
                Volver al inicio
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
