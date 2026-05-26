const navLinks = [
  { label: "Tienda", href: "/tienda" },
  { label: "Cursos", href: "/cursos" },
  { label: "Servicios", href: "/servicios" },
  { label: "Sobre mí", href: "/sobre-mi" },
  { label: "Blog", href: "/blog" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Spotify", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-morado-dark py-16 px-6 border-t border-dorado/20">
      <div className="max-w-7xl mx-auto">
        {/* Grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          {/* Marca */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="text-dorado text-lg">✦</span>
              <div className="leading-none">
                <span className="font-display font-black text-base text-crema uppercase tracking-widest block">La Reina</span>
                <span className="font-display text-[0.6rem] text-dorado/70 uppercase tracking-[0.35em] block">de Bastos</span>
              </div>
              <span className="text-dorado text-lg">✦</span>
            </div>
            <p className="font-serif italic text-crema/40 text-base leading-relaxed max-w-xs">
              Espiritualidad que sabe a tierra. Para las que quieren ser sagradas y humanas al mismo tiempo.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-sans font-semibold uppercase text-crema text-xs tracking-[0.35em] mb-5">
              Navegar
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="font-sans text-xs text-crema/40 hover:text-dorado transition-colors tracking-wide">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-sans font-semibold uppercase text-crema text-xs tracking-[0.35em] mb-5">
              Seguime
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="font-sans text-xs text-crema/40 hover:text-dorado transition-colors tracking-wide">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-crema/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-crema/20 tracking-wide">
            © 2025 La Reina de Bastos. Todos los derechos reservados.
          </p>
          <p className="font-sans text-xs text-crema/20 tracking-wide">
            Hecho con amor, intuición y un poco de vino 🍷
          </p>
        </div>
      </div>
    </footer>
  );
}
