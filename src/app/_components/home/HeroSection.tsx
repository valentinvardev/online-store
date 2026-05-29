export default function HeroSection() {
  return (
    <section className="relative bg-crema flex flex-col overflow-hidden">

      {/* Marco decorativo */}
      <div className="absolute inset-4 border border-morado/12 pointer-events-none z-10" />

      {/* Ornamentos de esquina */}
      <span className="absolute top-8 left-8 font-display text-dorado/40 text-lg z-10 select-none">✦</span>
      <span className="absolute top-8 right-8 font-display text-dorado/40 text-lg z-10 select-none">✦</span>
      <span className="absolute bottom-8 left-8 font-display text-dorado/40 text-lg z-10 select-none">✦</span>
      <span className="absolute bottom-8 right-8 font-display text-dorado/40 text-lg z-10 select-none">✦</span>

      {/* Contenido */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-6 lg:px-8 py-12 sm:py-16 text-center relative z-20">

        {/* Título */}
        <h1 className="font-display leading-[0.85] mb-8 sm:mb-10 select-none">
          <span className="block text-[clamp(2.25rem,14vw,9rem)] text-morado tracking-wide">
            La Reina
          </span>
          <span className="block text-[clamp(2.25rem,14vw,9rem)] text-morado-dark tracking-wide">
            de Bastos
          </span>
        </h1>

        {/* Separador */}
        <div className="flex items-center gap-5 mb-8 w-full max-w-sm">
          <div className="flex-1 h-px bg-morado/30" />
          <span className="font-display text-morado/40 text-xs">✦</span>
          <div className="flex-1 h-px bg-morado/30" />
        </div>

        {/* Tagline */}
        <p className="font-sans font-semibold text-tierra/70 text-lg mb-3 max-w-sm leading-snug">
          Magia que se siente en el cuerpo.
        </p>
        <p className="font-sans font-medium text-tierra/45 text-base tracking-wide mb-12 max-w-sm leading-relaxed">
          Una práctica sagrada que no le niega un vino al cuerpo ni una canción al alma.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/tienda"
            className="whitespace-nowrap bg-dorado text-tierra-dark font-sans font-semibold text-xs px-8 py-4 border-2 border-morado-dark hover:bg-dorado-light transition-colors tracking-widest uppercase block-shadow"
          >
            Explorar tienda
          </a>
          <a
            href="/cursos"
            className="whitespace-nowrap border-2 border-morado text-morado font-sans font-semibold text-xs px-8 py-4 hover:bg-morado/5 transition-colors tracking-widest uppercase block-shadow-sm"
          >
            Ver cursos
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex flex-col items-center gap-2 pb-8 text-morado/20">
        <span className="font-sans text-[0.5rem] tracking-[0.5em] uppercase">Descubrí más</span>
        <div className="w-px h-6 bg-gradient-to-b from-morado/20 to-transparent" />
      </div>

    </section>
  );
}
