"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  Users,
  Mail,
  Wrench,
  LogOut,
  ExternalLink,
} from "lucide-react";

const nav = [
  { label: "Dashboard",  href: "/admin",           icon: LayoutDashboard },
  { label: "Cursos",     href: "/admin/cursos",     icon: BookOpen },
  { label: "Productos",  href: "/admin/productos",  icon: ShoppingBag },
  { label: "Usuarios",   href: "/admin/usuarios",   icon: Users },
  { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { label: "Servicios",  href: "/admin/servicios",  icon: Wrench },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-tierra-dark flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/10">
        <p className="font-display text-crema text-lg tracking-widest uppercase leading-tight">
          La Reina
        </p>
        <p className="font-sans text-[0.6rem] text-crema/40 tracking-[0.3em] uppercase mt-0.5">
          Panel de Admin
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {nav.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-sans text-sm tracking-wide transition-all ${
                active
                  ? "bg-dorado text-tierra-dark font-semibold"
                  : "text-crema/60 hover:text-crema hover:bg-white/8"
              }`}
            >
              <Icon size={16} strokeWidth={active ? 2.5 : 1.8} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-6 space-y-1 border-t border-white/10 pt-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg font-sans text-sm text-crema/40 hover:text-crema/70 transition-colors tracking-wide"
        >
          <ExternalLink size={15} strokeWidth={1.8} />
          Ver sitio
        </Link>
        <Link
          href="/api/auth/signout"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg font-sans text-sm text-rosa/60 hover:text-rosa transition-colors tracking-wide"
        >
          <LogOut size={15} strokeWidth={1.8} />
          Cerrar sesión
        </Link>
      </div>
    </aside>
  );
}
