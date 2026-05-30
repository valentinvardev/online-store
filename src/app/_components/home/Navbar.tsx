"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, LogIn, LogOut, User } from "lucide-react";
import { useCart } from "../cart/CartContext";
import { useSession, signOut } from "next-auth/react";

const links = [
  { label: "Tienda", href: "/tienda" },
  { label: "Cursos", href: "/cursos" },
  { label: "Servicios", href: "/servicios" },
  { label: "Sobre mí", href: "/sobre-mi" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-crema backdrop-blur-sm border-b border-rosa/10 shadow-sm shadow-rosa/5">
      <nav className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="group shrink-0">
          <Image
            src="/logo-rdb.png"
            alt="La Reina de Bastos"
            width={160}
            height={160}
            className="h-14 w-auto transition-opacity duration-300 group-hover:opacity-75"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10 flex-1 justify-center">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-sans font-extrabold text-morado/60 hover:text-morado transition-colors text-xs tracking-[0.2em] uppercase"
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
              <span className="absolute -top-1 -right-1 bg-dorado text-tierra-dark font-sans font-bold text-[0.5rem] w-4 h-4 flex items-center justify-center">
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
                className="flex items-center gap-1.5 font-sans text-[0.65rem] text-tierra/40 hover:text-morado transition-colors tracking-widest uppercase"
                aria-label="Cerrar sesión"
              >
                <LogOut size={13} strokeWidth={1.5} className="text-verde-light" />
                Salir
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 font-sans font-semibold text-[0.65rem] text-morado/80 hover:text-morado transition-colors tracking-widest uppercase"
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
            className="bg-morado text-crema font-sans font-semibold text-[0.65rem] px-6 py-2.5 border-2 border-morado hover:bg-morado-light transition-colors tracking-widest uppercase block-shadow-sm whitespace-nowrap"
          >
            ✦ Reservar
          </Link>
        </div>

        {/* Acciones Mobile (siempre visibles) */}
        <div className="md:hidden flex items-center gap-3">
          {/* Carrito */}
          <button
            onClick={openCart}
            className="relative flex items-center justify-center w-9 h-9 hover:bg-morado/5 transition-all"
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={18} strokeWidth={1.5} className="text-morado" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-dorado text-tierra-dark font-sans font-bold text-[0.5rem] w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
          >
            <span className={`block h-0.5 w-6 bg-verde-light transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-verde-light transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-verde-light transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="bg-crema border-t border-rosa/10 px-8 py-6">
          <ul className="space-y-1 mb-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-2 font-sans font-extrabold text-morado/55 hover:text-morado transition-colors text-xs tracking-[0.2em] uppercase py-2.5 border-b border-morado/6 last:border-0"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-dorado/40 text-[0.5rem]">✦</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 pt-2">
            {session ? (
              <button
                onClick={() => { void signOut({ callbackUrl: "/" }); setOpen(false); }}
                className="flex items-center gap-1.5 font-sans text-[0.65rem] text-tierra/40 hover:text-morado transition-colors tracking-widest uppercase px-3 py-2 border border-morado/15"
              >
                <LogOut size={13} strokeWidth={1.5} className="text-verde-light" /> Salir
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 font-sans font-semibold text-[0.65rem] text-morado/80 hover:text-morado transition-colors tracking-widest uppercase px-3 py-2 border border-morado/15"
                onClick={() => setOpen(false)}
              >
                <LogIn size={13} strokeWidth={1.8} className="text-morado" /> Entrar
              </Link>
            )}
            <Link
              href="/reservas"
              className="flex-1 text-center bg-morado text-crema font-sans font-semibold text-[0.65rem] py-2.5 tracking-widest uppercase border-2 border-morado hover:bg-morado-light transition-colors"
              onClick={() => setOpen(false)}
            >
              ✦ Reservar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
