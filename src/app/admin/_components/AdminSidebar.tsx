"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, ShoppingBag,
  Users, Mail, Wrench, LogOut, ExternalLink,
} from "lucide-react";

const nav = [
  { label: "Dashboard",  href: "/admin",           icon: LayoutDashboard },
  { label: "Cursos",     href: "/admin/cursos",     icon: BookOpen },
  { label: "Productos",  href: "/admin/productos",  icon: ShoppingBag },
  { label: "Servicios",  href: "/admin/servicios",  icon: Wrench },
  { label: "Usuarios",   href: "/admin/usuarios",   icon: Users },
  { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen bg-morado-dark flex flex-col shrink-0 border-r-4 border-dorado">
      {/* Logo */}
      <div className="px-6 pt-8 pb-6 border-b-2 border-white/10">
        <p className="font-display text-white text-xl tracking-widest uppercase leading-none">
          La Reina
        </p>
        <p className="font-display text-white/40 text-xl tracking-widest uppercase leading-none">
          de Bastos
        </p>
        <div className="ornament text-dorado/30 mt-3 text-[0.55rem] tracking-[0.3em] uppercase text-crema/25 font-sans">
          Admin
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {nav.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 font-sans text-[0.7rem] tracking-widest uppercase font-semibold transition-all ${
                active
                  ? "bg-dorado text-tierra-dark block-shadow-sm"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={14} strokeWidth={active ? 2.5 : 1.8} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 pb-6 pt-4 border-t-2 border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 font-sans text-[0.7rem] text-crema/30 hover:text-crema/60 tracking-widest uppercase transition-colors"
        >
          <ExternalLink size={13} strokeWidth={1.8} />
          Ver sitio
        </Link>
        <Link
          href="/api/auth/signout"
          className="flex items-center gap-3 px-4 py-2.5 font-sans text-[0.7rem] text-rosa/60 hover:text-rosa tracking-widest uppercase transition-colors"
        >
          <LogOut size={13} strokeWidth={1.8} />
          Salir
        </Link>
      </div>
    </aside>
  );
}
