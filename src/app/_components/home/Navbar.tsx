"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, LogIn, LogOut, User, X } from "lucide-react";
import { useCart } from "../cart/CartContext";
import { useSession, signOut } from "next-auth/react";

const links = [
  { label: "Tienda",          href: "/tienda" },
  { label: "Cursos",          href: "/cursos" },
  { label: "Servicios",       href: "/servicios" },
  { label: "Suscripciones",   href: "/suscripciones" },
  { label: "Sobre mí",        href: "/sobre-mi" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { count, openCart } = useCart();
  const { data: session } = useSession();

  // Portal solo en cliente
  useEffect(() => { setMounted(true); }, []);

  // Body scroll lock cuando el drawer está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-50 bg-crema backdrop-blur-sm border-b border-rosa/10 shadow-sm shadow-rosa/5">
      <nav className="max-w-7xl mx-auto px-8 h-28 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="group shrink-0">
          <Image
            src="/logo-rdb.png"
            alt="La Reina de Bastos"
            width={200}
            height={200}
            className="h-20 w-auto transition-opacity duration-300 group-hover:opacity-75"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10 flex-1 justify-center">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-sans font-extrabold text-morado/60 hover:text-morado transition-colors text-[13px] tracking-[0.2em] uppercase"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Acciones Desktop */}
        <div className="hidden md:flex items-center gap-5 shrink-0">

          {/* Carrito */}
          <button
            onClick={openCart}
            className="relative flex items-center justify-center w-9 h-9 hover:bg-morado/5 transition-all"
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={18} strokeWidth={1.5} className="text-morado" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-dorado text-tierra-dark font-sans font-bold text-[0.8rem] w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          {/* Auth */}
          {session ? (
            <div className="flex items-center gap-3">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? ""}
                  width={30}
                  height={30}
                  className="rounded-full border-2 border-morado/20"
                />
              ) : (
                <div className="w-8 h-8 bg-morado/8 border border-morado/20 flex items-center justify-center">
                  <User size={14} className="text-verde-light" />
                </div>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-1.5 font-sans text-[0.75rem] text-tierra/65 hover:text-morado transition-colors tracking-widest uppercase"
                aria-label="Cerrar sesión"
              >
                <LogOut size={13} strokeWidth={1.5} className="text-verde-light" />
                Salir
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 font-sans font-semibold text-[0.75rem] text-morado/80 hover:text-morado transition-colors tracking-widest uppercase"
            >
              <LogIn size={14} strokeWidth={1.8} className="text-morado" />
              Entrar
            </Link>
          )}

          {/* Separador */}
          <span className="h-6 w-px bg-rosa/15" />

          {/* CTA Reservar */}
          <Link
            href="/reservas"
            className="bg-morado text-crema font-sans font-semibold text-[0.75rem] px-6 py-2.5 border-2 border-morado hover:bg-morado-light transition-colors tracking-widest uppercase block-shadow-sm whitespace-nowrap"
          >
            ✦ Reservar
          </Link>
        </div>

        {/* Acciones Mobile (siempre visibles) */}
        <div className="md:hidden flex items-center gap-4">
          {/* Carrito */}
          <button
            onClick={openCart}
            className="relative flex items-center justify-center w-12 h-12 hover:bg-morado/5 transition-all"
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={26} strokeWidth={1.8} className="text-morado" />
            {count > 0 && (
              <span className="absolute top-0 right-0 bg-dorado text-tierra-dark font-sans font-bold text-[0.65rem] w-5 h-5 flex items-center justify-center rounded-full">
                {count}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            className="flex flex-col gap-[7px] p-2"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
          >
            <span className={`block h-[3px] w-8 bg-verde-light transition-all duration-300 ${open ? "rotate-45 translate-y-[10px]" : ""}`} />
            <span className={`block h-[3px] w-8 bg-verde-light transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-[3px] w-8 bg-verde-light transition-all duration-300 ${open ? "-rotate-45 -translate-y-[10px]" : ""}`} />
          </button>
        </div>
      </nav>

      </header>

      {/* ── Drawer lateral mobile (portal a body para escapar del page-transition) ── */}
      {mounted && createPortal(
      <div
        className={`md:hidden fixed inset-0 z-[100] ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* Backdrop oscuro */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-tierra-dark/70 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel */}
        <aside
          className={`absolute top-0 right-0 h-full w-[84%] max-w-[340px] bg-verde flex flex-col shadow-[-8px_0_40px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header del drawer */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-crema/15 shrink-0 relative z-10">
            <span className="font-display text-crema text-2xl tracking-wider uppercase">Menú</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="w-11 h-11 flex items-center justify-center border-2 border-crema/50 text-crema hover:bg-crema hover:text-verde transition-colors"
            >
              <X size={24} strokeWidth={2} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 flex flex-col gap-1 px-6 py-8 relative z-10 overflow-y-auto">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-center py-3 border-b border-crema/10 font-display uppercase text-3xl text-crema hover:text-dorado hover:translate-x-1 tracking-wide leading-none transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Acciones abajo */}
          <div className="px-6 pb-8 pt-4 border-t border-crema/15 shrink-0 space-y-3 relative z-10">
            {session ? (
              <button
                onClick={() => { void signOut({ callbackUrl: "/" }); setOpen(false); }}
                className="w-full flex items-center justify-center gap-2 font-sans font-semibold text-xs text-crema hover:bg-crema hover:text-verde transition-colors tracking-widest uppercase py-3.5 border-2 border-crema/50"
              >
                <LogOut size={15} strokeWidth={1.8} /> Cerrar sesión
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-2 font-sans font-semibold text-xs text-crema hover:bg-crema hover:text-verde transition-colors tracking-widest uppercase py-3.5 border-2 border-crema/50"
              >
                <LogIn size={15} strokeWidth={1.8} /> Entrar
              </Link>
            )}
            <Link
              href="/reservas"
              onClick={() => setOpen(false)}
              className="w-full block text-center bg-dorado text-tierra-dark font-sans font-bold text-xs py-4 tracking-widest uppercase border-2 border-dorado hover:bg-dorado-light transition-colors block-shadow-sm"
            >
              ✦ Reservar consulta
            </Link>
          </div>
        </aside>
      </div>,
      document.body
      )}
    </>
  );
}
