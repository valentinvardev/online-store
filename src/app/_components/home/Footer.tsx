"use client";

import Link from "next/link";
import { useState } from "react";

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

const cursosList = [
  "Tarot desde Cero",
  "Rituales Lunares",
  "Astrología Práctica",
  "Meditación y Presencia",
  "Tarot Avanzado",
  "Chakras: Mapa Interior",
  "Sueños y Simbolismo",
  "Herbología y Rituales",
  "Numerología Esencial",
];

const consultasList = [
  "Lectura de Tarot",
  "Lectura Extendida",
  "Ritual Personalizado",
  "Consulta Astrológica",
  "Bundle Tarot + Ritual",
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

const inputClass = "w-full bg-white/6 border border-crema/15 px-4 py-3 font-sans text-sm text-crema placeholder:text-crema/25 focus:outline-none focus:border-dorado/50 transition-colors";
const labelClass = "block font-sans text-[0.58rem] text-crema/35 tracking-widest uppercase mb-1.5";

export default function Footer() {
  const [sent, setSent] = useState(false);
  const [tipo, setTipo] = useState<"" | "curso" | "consulta">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

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

      {/* Formulario de aplicación + Newsletter */}
      <div className="border-y border-dorado/10 py-14 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14">

          {/* Formulario de aplicación */}
          <div>
            <p className="font-sans text-[0.58rem] text-dorado tracking-[0.35em] uppercase mb-3">Trabajemos juntas</p>
            <h3 className="font-display text-crema text-3xl uppercase tracking-wide leading-none mb-7">
              Formulario de<br />aplicación
            </h3>

            {sent ? (
              <div className="border border-dorado/30 bg-dorado/5 px-6 py-10 text-center space-y-3">
                <span className="font-display text-dorado text-4xl block">✦</span>
                <p className="font-sans text-crema text-sm tracking-wide font-semibold">¡Aplicación recibida!</p>
                <p className="font-sans text-crema/45 text-xs tracking-wide">Me pondré en contacto con vos pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nombre + Email */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Nombre <span className="text-rosa">*</span></label>
                    <input type="text" required placeholder="Tu nombre" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email <span className="text-rosa">*</span></label>
                    <input type="email" required placeholder="tu@email.com" className={inputClass} />
                  </div>
                </div>

                {/* WhatsApp + País */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>WhatsApp</label>
                    <input type="tel" placeholder="+54 11 1234-5678" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>País</label>
                    <input type="text" placeholder="Argentina" className={inputClass} />
                  </div>
                </div>

                {/* Tipo de interés */}
                <div>
                  <label className={labelClass}>¿Qué estás buscando? <span className="text-rosa">*</span></label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { val: "consulta", label: "◎ Una consulta" },
                      { val: "curso",    label: "◈ Un curso" },
                    ].map(({ val, label }) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setTipo(val as "consulta" | "curso")}
                        className={`font-sans text-[0.62rem] py-2.5 border tracking-widest uppercase transition-colors ${
                          tipo === val
                            ? "bg-dorado text-tierra-dark border-dorado"
                            : "border-crema/15 text-crema/40 hover:border-dorado/40 hover:text-crema/70"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selector específico (condicional) */}
                {tipo !== "" && (
                  <div>
                    <label className={labelClass}>
                      {tipo === "curso" ? "¿Qué curso?" : "¿Qué tipo de sesión?"} <span className="text-rosa">*</span>
                    </label>
                    <select required className={`${inputClass} appearance-none`} defaultValue="">
                      <option value="" disabled>Elegí una opción</option>
                      {(tipo === "curso" ? cursosList : consultasList).map((s) => (
                        <option key={s} value={s} className="text-tierra-dark bg-white">{s}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Sobre la usuaria */}
                <div>
                  <label className={labelClass}>¿Desde dónde llegás?</label>
                  <textarea
                    rows={3}
                    placeholder="Contame un poco dónde estás en tu camino y qué estás buscando en este momento..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-dorado text-tierra-dark font-sans font-semibold text-[0.65rem] py-3.5 tracking-widest uppercase border-2 border-dorado hover:bg-dorado-light transition-colors"
                >
                  ✦ Enviar aplicación
                </button>
              </form>
            )}
          </div>

          {/* Newsletter */}
          <div className="flex flex-col justify-between gap-10">
            <div>
              <p className="font-sans text-[0.58rem] text-dorado tracking-[0.35em] uppercase mb-3">Magia directo a tu correo</p>
              <h3 className="font-display text-crema text-3xl uppercase tracking-wide leading-none mb-4">
                Ritual semanal<br />en tu bandeja
              </h3>
              <p className="font-sans text-crema/35 text-sm tracking-wide leading-relaxed max-w-sm">
                Reflexiones de luna, rituales de temporada, ofertas exclusivas y mucho más — sin spam ni ruido innecesario.
              </p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input
                type="email"
                placeholder="tu@email.com"
                className={inputClass}
              />
              <button type="submit" className="w-full border border-dorado/40 text-dorado font-sans font-semibold text-[0.65rem] py-3 tracking-widest uppercase hover:bg-dorado hover:text-tierra-dark transition-colors">
                ✦ Suscribirme
              </button>
            </form>

            {/* Redes sociales */}
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
        </div>
      </div>

      {/* Grid de navegación */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-10">

          {/* Marca */}
          <div className="space-y-4">
            <div>
              <p className="font-display text-dorado text-3xl tracking-widest uppercase leading-none">La Reina</p>
              <p className="font-display text-crema/20 text-3xl tracking-widest uppercase leading-none">de Bastos</p>
            </div>
            <p className="font-sans italic text-crema/30 text-sm leading-relaxed max-w-xs">
              Espiritualidad que sabe a tierra. Para las que quieren ser sagradas y humanas al mismo tiempo.
            </p>
          </div>

          {/* Navegar */}
          <div>
            <h4 className="font-sans font-semibold uppercase text-crema/40 text-[0.58rem] tracking-[0.35em] mb-5 pb-3 border-b border-crema/8">
              Navegar
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 font-sans text-xs text-crema/30 hover:text-dorado transition-colors tracking-wide">
                    <span className="text-dorado/0 group-hover:text-dorado/50 text-[0.5rem] transition-colors">✦</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-sans font-semibold uppercase text-crema/40 text-[0.58rem] tracking-[0.35em] mb-5 pb-3 border-b border-crema/8">
              Servicios
            </h4>
            <ul className="space-y-3">
              {servicios.map((s) => (
                <li key={s}>
                  <Link href="/servicios" className="group flex items-center gap-2 font-sans text-xs text-crema/30 hover:text-dorado transition-colors tracking-wide">
                    <span className="text-dorado/0 group-hover:text-dorado/50 text-[0.5rem] transition-colors">✦</span>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
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
