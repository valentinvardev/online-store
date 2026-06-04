"use client";

import { useState, useEffect } from "react";
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
  const { count, openCart } = useCart();
  const { data: session } = useSession();

  // Body scroll lock cuando el menú fullscreen está abierto
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

      {/* Mobile menu fullscreen overlay — render condicional para evitar issues de stacking */}
      {open && (
      <div className="md:hidden fixed inset-0 z-[100] bg-verde flex flex-col">
        {/* Cerrar */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
          className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-crema hover:text-dorado transition-colors z-20"
        >
          <X size={32} strokeWidth={1.8} />
        </button>

        {/* Contenido */}
        <div className="h-full flex flex-col px-8 pt-20 pb-10">
          {/* Nav links grandes */}
          <nav className="flex-1 flex flex-col justify-center gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display uppercase text-[clamp(2.5rem,11vw,4.5rem)] text-crema hover:text-dorado tracking-wide leading-none flex items-center gap-3 group transition-colors"
              >
                <span className="font-display text-dorado/80 group-hover:text-dorado text-2xl transition-colors">✦</span>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Acciones abajo */}
          <div className="pt-8 border-t-2 border-crema/20 shrink-0 space-y-3">
            {session ? (
              <button
                onClick={() => { void signOut({ callbackUrl: "/" }); setOpen(false); }}
                className="w-full flex items-center justify-center gap-2 font-sans font-semibold text-sm text-crema hover:text-dorado transition-colors tracking-widest uppercase py-3.5 border-2 border-crema/40 hover:border-dorado/60"
              >
                <LogOut size={16} strokeWidth={1.8} /> Cerrar sesión
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-2 font-sans font-semibold text-sm text-crema hover:text-dorado transition-colors tracking-widest uppercase py-3.5 border-2 border-crema/40 hover:border-dorado/60"
              >
                <LogIn size={16} strokeWidth={1.8} /> Entrar
              </Link>
            )}
            <Link
              href="/reservas"
              onClick={() => setOpen(false)}
              className="w-full block text-center bg-dorado text-tierra-dark font-sans font-semibold text-sm py-4 tracking-widest uppercase border-2 border-dorado hover:bg-dorado-light transition-colors block-shadow-sm"
            >
              ✦ Reservar
            </Link>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
