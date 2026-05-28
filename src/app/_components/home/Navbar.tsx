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
    <header className="sticky top-0 z-50 bg-crema backdrop-blur-sm border-b border-morado/10 shadow-sm shadow-morado/5">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="group">
          <Image
            src="/logo-rdb.png"
            alt="La Reina de Bastos"
            width={160}
            height={160}
            className="h-16 w-auto transition-opacity duration-300 group-hover:opacity-75"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-sans font-extrabold text-morado/65 hover:text-morado transition-colors text-xs tracking-[0.2em] uppercase"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cart */}
          <button
            onClick={openCart}
            className="relative p-2 text-morado/60 hover:text-morado transition-colors"
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-dorado text-tierra-dark font-sans font-bold text-[0.55rem] w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          {/* Auth */}
          {session ? (
            <div className="flex items-center gap-2">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? ""}
                  width={28}
                  height={28}
                  className="rounded-full border border-morado/20"
                />
              ) : (
                <div className="w-7 h-7 bg-morado/10 border border-morado/20 flex items-center justify-center">
                  <User size={14} className="text-morado/50" />
                </div>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-morado/40 hover:text-morado transition-colors p-1"
                aria-label="Cerrar sesión"
              >
                <LogOut size={16} strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 font-sans text-xs text-morado/60 hover:text-morado transition-colors tracking-widest uppercase"
            >
              <LogIn size={15} strokeWidth={1.5} />
              Entrar
            </Link>
          )}

          <Link
            href="/servicios"
            className="border-2 border-morado text-morado font-sans text-xs px-5 py-2.5 hover:bg-morado hover:text-crema transition-colors tracking-widest uppercase block-shadow-sm"
          >
            Reservar consulta
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <span className={`block h-0.5 w-6 bg-morado/60 transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-morado/60 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-morado/60 transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="bg-crema border-t border-morado/10 px-6 py-6 space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block font-sans font-extrabold text-morado/50 hover:text-morado transition-colors text-xs tracking-[0.2em] uppercase py-1"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {session ? (
            <button
              onClick={() => { void signOut({ callbackUrl: "/" }); setOpen(false); }}
              className="block font-sans text-xs text-tierra/50 hover:text-morado transition-colors tracking-widest uppercase py-1"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              href="/login"
              className="block font-sans text-xs text-morado/50 hover:text-morado transition-colors tracking-widest uppercase py-1"
              onClick={() => setOpen(false)}
            >
              Iniciar sesión
            </Link>
          )}
          <Link
            href="/servicios"
            className="block text-center border-2 border-morado text-morado font-sans text-xs px-5 py-2.5 hover:bg-morado hover:text-crema transition-colors tracking-widest uppercase"
            onClick={() => setOpen(false)}
          >
            Reservar consulta
          </Link>
        </div>
      </div>
    </header>
  );
}
