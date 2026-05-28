"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";

export default function AdminTopBar() {
  const pathname = usePathname();
  const isHub = pathname === "/admin";

  return (
    <header className="h-11 bg-morado-dark border-b-2 border-dorado/20 flex items-center px-8 justify-between shrink-0">
      <Link
        href="/admin"
        className="font-display text-white text-[0.8rem] tracking-[0.2em] uppercase leading-none hover:text-dorado transition-colors"
      >
        La Reina de Bastos
        <span className="text-dorado/40 mx-2 font-sans font-light">/</span>
        <span className="text-white/50">Admin</span>
      </Link>

      <div className="flex items-center gap-5">
        {!isHub && (
          <Link
            href="/admin"
            className="font-sans text-[0.6rem] text-white/40 hover:text-white tracking-widest uppercase transition-colors"
          >
            ← Inicio
          </Link>
        )}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 font-sans text-[0.6rem] text-white/30 hover:text-white/60 tracking-widest uppercase transition-colors"
        >
          <ExternalLink size={11} strokeWidth={1.8} />
          Ver sitio
        </Link>
        <Link
          href="/api/auth/signout"
          className="flex items-center gap-1.5 font-sans text-[0.6rem] text-rosa/50 hover:text-rosa tracking-widest uppercase transition-colors"
        >
          <LogOut size={11} strokeWidth={1.8} />
          Salir
        </Link>
      </div>
    </header>
  );
}
