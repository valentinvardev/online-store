"use client";

import Link from "next/link";
import Image from "next/image";

/* ── SVG logos de redes sociales ── */
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconTikTok = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.81a8.18 8.18 0 004.77 1.52V6.93a4.85 4.85 0 01-1-.24z" />
  </svg>
);

const IconYouTube = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
    <polygon points="9.75,15.02 15.5,12 9.75,8.98" fill="white" />
  </svg>
);

const IconSpotify = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <circle cx="12" cy="12" r="10" />
    <path d="M16.7 15.3c-.2 0-.3-.1-.5-.2-1.4-.9-3.2-1.4-5.1-1.4-.9 0-1.8.1-2.7.3-.2 0-.5-.1-.5-.3s.1-.5.3-.5c1-.2 2-.3 3-.3 2.1 0 4.1.6 5.7 1.6.2.1.3.3.2.5-.1.2-.3.3-.4.3zm.9-2.3c-.2 0-.4-.1-.5-.2-1.7-1-4-1.6-6.3-1.6-1.1 0-2.1.2-3.1.4-.3.1-.5-.1-.5-.4s.1-.5.4-.5c1-.3 2.1-.4 3.3-.4 2.5 0 5 .7 6.9 1.8.2.1.4.4.3.7-.2.1-.4.2-.5.2zm1-2.6c-.2 0-.3 0-.5-.1-1.9-1.1-4.5-1.8-7.1-1.8-1.3 0-2.6.2-3.8.5-.3.1-.6-.1-.6-.4s.1-.6.4-.6c1.3-.4 2.7-.5 4.1-.5 2.8 0 5.6.8 7.7 2 .3.2.4.5.3.8-.2.1-.3.1-.5.1z" fill="white" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const socials = [
  { label: "Instagram", Icon: IconInstagram, href: "#", color: "hover:text-rosa hover:border-rosa/40" },
  { label: "TikTok",    Icon: IconTikTok,    href: "#", color: "hover:text-crema hover:border-crema/30" },
  { label: "YouTube",   Icon: IconYouTube,   href: "#", color: "hover:text-rosa hover:border-rosa/40" },
  { label: "Spotify",   Icon: IconSpotify,   href: "#", color: "hover:text-verde hover:border-verde/40" },
  { label: "Email",     Icon: IconMail,      href: "mailto:hola@lareinadebastos.com", color: "hover:text-dorado hover:border-dorado/40" },
];

const navLinks = [
  { label: "Tienda",    href: "/tienda" },
  { label: "Cursos",    href: "/cursos" },
  { label: "Servicios", href: "/servicios" },
  { label: "Sobre mí",  href: "/sobre-mi" },
];

const servicios = [
  "Lectura de Tarot",
  "Ritual Personalizado",
  "Consulta Astrológica",
  "Sesiones grupales",
];

export default function Footer() {
  return (
    <footer className="bg-morado-dark relative overflow-hidden">

      {/* Borde superior ornamental */}
      <div className="h-px bg-gradient-to-r from-transparent via-dorado/50 to-transparent" />
      <div className="flex items-center justify-center py-5 gap-4 px-6">
        <div className="flex-1 h-px bg-crema/5" />
        <span className="font-display text-dorado/40 text-sm shrink-0">✦</span>
        <span className="font-sans text-[0.52rem] text-crema/20 tracking-[0.4em] uppercase shrink-0">La Reina de Bastos</span>
        <span className="font-display text-dorado/40 text-sm shrink-0">✦</span>
        <div className="flex-1 h-px bg-crema/5" />
      </div>

      {/* Grid principal */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-12">

          {/* Marca */}
          <div className="space-y-6">
            <div>
              <Image
                src="/logo-rdb.png"
                alt="La Reina de Bastos"
                width={160}
                height={80}
                className="w-auto h-24 object-contain"
                style={{
                  filter: "brightness(0) invert(1) sepia(0.15) brightness(0.95)",
                }}
              />
            </div>
            <p className="font-sans italic text-crema/35 text-sm leading-relaxed max-w-xs">
              Espiritualidad que sabe a tierra. Para las que quieren ser sagradas y humanas al mismo tiempo.
            </p>
            {/* Redes */}
            <div>
              <p className="font-sans text-[0.58rem] text-crema/20 tracking-[0.3em] uppercase mb-3">Seguime</p>
              <div className="flex flex-wrap gap-2">
                {socials.map(({ label, Icon, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    title={label}
                    className={`flex items-center gap-2 border border-crema/12 text-crema/35 px-3.5 py-2.5 transition-colors ${color}`}
                  >
                    <Icon />
                    <span className="font-sans text-[0.6rem] tracking-widest uppercase">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navegar */}
          <div>
            <h4 className="font-sans font-semibold uppercase text-crema/40 text-[0.6rem] tracking-[0.35em] mb-6 pb-3 border-b border-crema/8">
              Navegar
            </h4>
            <ul className="space-y-3.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 font-sans text-xs text-crema/35 hover:text-dorado transition-colors tracking-wide">
                    <span className="text-dorado/0 group-hover:text-dorado/50 text-[0.5rem] transition-colors">✦</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-sans font-semibold uppercase text-crema/40 text-[0.6rem] tracking-[0.35em] mb-6 pb-3 border-b border-crema/8">
              Servicios
            </h4>
            <ul className="space-y-3.5">
              {servicios.map((s) => (
                <li key={s}>
                  <Link href="/servicios" className="group flex items-center gap-2 font-sans text-xs text-crema/35 hover:text-dorado transition-colors tracking-wide">
                    <span className="text-dorado/0 group-hover:text-dorado/50 text-[0.5rem] transition-colors">✦</span>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-sans font-semibold uppercase text-crema/40 text-[0.6rem] tracking-[0.35em] mb-6 pb-3 border-b border-crema/8">
              Contacto
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:hola@lareinadebastos.com"
                className="block font-sans text-xs text-crema/35 hover:text-dorado transition-colors tracking-wide"
              >
                hola@lareinadebastos.com
              </a>
              <Link
                href="/sobre-mi"
                className="inline-flex items-center gap-2 font-sans text-[0.62rem] text-crema/35 hover:text-dorado border border-crema/10 hover:border-dorado/40 px-4 py-2.5 tracking-widest uppercase transition-colors"
              >
                ✦ Mi historia
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-crema/6 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[0.6rem] text-crema/18 tracking-wide">
            © 2025 La Reina de Bastos — Todos los derechos reservados.
          </p>
          <p className="font-sans text-[0.6rem] text-crema/18 tracking-wide italic">
            Hecho con amor, intuición y un poco de vino
          </p>
        </div>
      </div>

    </footer>
  );
}
