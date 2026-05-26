export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">

        {/* ── Columna izquierda: fondo psicodélico + texto ── */}
        <div className="relative flex flex-col justify-center px-8 lg:px-14 xl:px-20 py-28 lg:py-20 overflow-hidden">

          {/* ── Fondo animado psicodélico ── */}
          <div className="absolute inset-0">

            {/* Base rosa pálido */}
            <div className="absolute inset-0 bg-rosa-pale" />

            {/* Rainbow blobs */}
            <div style={{ position:"absolute", width:"400px", height:"400px", borderRadius:"50%", background:"#f72585", filter:"blur(75px)", opacity:0.5, top:"-130px", left:"-110px", animation:"blob 9s ease-in-out infinite" }} />
            <div style={{ position:"absolute", width:"320px", height:"320px", borderRadius:"50%", background:"#f5c842", filter:"blur(65px)", opacity:0.45, top:"20%", right:"-90px", animation:"blob 12s ease-in-out infinite 2s" }} />
            <div style={{ position:"absolute", width:"340px", height:"340px", borderRadius:"50%", background:"#8b5cf6", filter:"blur(70px)", opacity:0.5, bottom:"-110px", left:"10%", animation:"blob 14s ease-in-out infinite 4s" }} />
            <div style={{ position:"absolute", width:"260px", height:"260px", borderRadius:"50%", background:"#7ec8e3", filter:"blur(55px)", opacity:0.45, top:"42%", left:"-60px", animation:"blob 8s ease-in-out infinite 1s" }} />
            <div style={{ position:"absolute", width:"280px", height:"280px", borderRadius:"50%", background:"#52e06e", filter:"blur(60px)", opacity:0.5, bottom:"8%", right:"-10px", animation:"blob 11s ease-in-out infinite 3s" }} />
            <div style={{ position:"absolute", width:"230px", height:"230px", borderRadius:"50%", background:"#e8845a", filter:"blur(48px)", opacity:0.4, top:"12%", left:"38%", animation:"blob 7s ease-in-out infinite 5.5s" }} />

            {/* Flor grande — arriba derecha */}
            <svg
              style={{ position:"absolute", top:"6%", right:"6%", width:"120px", height:"120px", opacity:0.6 }}
              viewBox="0 0 100 100"
            >
              <g transform="translate(50,50)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="18s" repeatCount="indefinite" />
                  <ellipse cx="0" cy="-20" rx="9" ry="18" fill="#f72585" opacity="0.9" transform="rotate(0)" />
                  <ellipse cx="0" cy="-20" rx="9" ry="18" fill="#f5c842" opacity="0.9" transform="rotate(60)" />
                  <ellipse cx="0" cy="-20" rx="9" ry="18" fill="#7ec8e3" opacity="0.9" transform="rotate(120)" />
                  <ellipse cx="0" cy="-20" rx="9" ry="18" fill="#52e06e" opacity="0.9" transform="rotate(180)" />
                  <ellipse cx="0" cy="-20" rx="9" ry="18" fill="#8b5cf6" opacity="0.9" transform="rotate(240)" />
                  <ellipse cx="0" cy="-20" rx="9" ry="18" fill="#e8845a" opacity="0.9" transform="rotate(300)" />
                </g>
                <circle cx="0" cy="0" r="10" fill="#fff9e0" />
              </g>
            </svg>

            {/* Flor grande — abajo izquierda, gira al revés */}
            <svg
              style={{ position:"absolute", bottom:"10%", left:"2%", width:"150px", height:"150px", opacity:0.45 }}
              viewBox="0 0 100 100"
            >
              <g transform="translate(50,50)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="26s" repeatCount="indefinite" />
                  <ellipse cx="0" cy="-19" rx="8" ry="17" fill="#f72585" opacity="0.85" transform="rotate(0)" />
                  <ellipse cx="0" cy="-19" rx="8" ry="17" fill="#f5c842" opacity="0.85" transform="rotate(45)" />
                  <ellipse cx="0" cy="-19" rx="8" ry="17" fill="#7ec8e3" opacity="0.85" transform="rotate(90)" />
                  <ellipse cx="0" cy="-19" rx="8" ry="17" fill="#52e06e" opacity="0.85" transform="rotate(135)" />
                  <ellipse cx="0" cy="-19" rx="8" ry="17" fill="#8b5cf6" opacity="0.85" transform="rotate(180)" />
                  <ellipse cx="0" cy="-19" rx="8" ry="17" fill="#e8845a" opacity="0.85" transform="rotate(225)" />
                  <ellipse cx="0" cy="-19" rx="8" ry="17" fill="#f72585" opacity="0.85" transform="rotate(270)" />
                  <ellipse cx="0" cy="-19" rx="8" ry="17" fill="#f5c842" opacity="0.85" transform="rotate(315)" />
                </g>
                <circle cx="0" cy="0" r="10" fill="#fff9e0" />
              </g>
            </svg>

            {/* Flor pequeña — medio izquierda */}
            <svg
              style={{ position:"absolute", top:"35%", left:"5%", width:"75px", height:"75px", opacity:0.55 }}
              viewBox="0 0 100 100"
            >
              <g transform="translate(50,50)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="12s" repeatCount="indefinite" />
                  <ellipse cx="0" cy="-20" rx="11" ry="20" fill="#f72585" opacity="0.9" transform="rotate(0)" />
                  <ellipse cx="0" cy="-20" rx="11" ry="20" fill="#f5c842" opacity="0.9" transform="rotate(72)" />
                  <ellipse cx="0" cy="-20" rx="11" ry="20" fill="#7ec8e3" opacity="0.9" transform="rotate(144)" />
                  <ellipse cx="0" cy="-20" rx="11" ry="20" fill="#52e06e" opacity="0.9" transform="rotate(216)" />
                  <ellipse cx="0" cy="-20" rx="11" ry="20" fill="#8b5cf6" opacity="0.9" transform="rotate(288)" />
                </g>
                <circle cx="0" cy="0" r="11" fill="#f5c842" />
              </g>
            </svg>

            {/* Círculos concéntricos psicodélicos */}
            <svg
              style={{ position:"absolute", top:"50%", left:"50%", marginLeft:"-250px", marginTop:"-250px", width:"500px", height:"500px", opacity:0.08 }}
              viewBox="0 0 500 500"
            >
              <g>
                <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="55s" repeatCount="indefinite" />
                <circle cx="250" cy="250" r="230" stroke="#f72585" strokeWidth="2" fill="none" strokeDasharray="6 12" />
                <circle cx="250" cy="250" r="190" stroke="#f5c842" strokeWidth="2" fill="none" strokeDasharray="3 9" />
                <circle cx="250" cy="250" r="150" stroke="#7ec8e3" strokeWidth="2" fill="none" strokeDasharray="5 8" />
                <circle cx="250" cy="250" r="110" stroke="#8b5cf6" strokeWidth="2" fill="none" strokeDasharray="2 7" />
                <circle cx="250" cy="250" r="70"  stroke="#52e06e" strokeWidth="2" fill="none" strokeDasharray="4 6" />
                <circle cx="250" cy="250" r="35"  stroke="#e8845a" strokeWidth="2" fill="none" />
              </g>
            </svg>

            {/* Vignette para legibilidad */}
            <div style={{
              position:"absolute", inset:0,
              background:"radial-gradient(ellipse at 40% 55%, rgba(253,232,245,0.2) 0%, rgba(253,232,245,0.62) 65%)"
            }} />
          </div>

          {/* ── Contenido encima del fondo ── */}
          <div className="relative z-10">
            <h1 className="font-display leading-[0.85] mb-10 select-none">
              <span className="block text-[clamp(3.8rem,10vw,8rem)] text-rosa tracking-wide">
                La Reina
              </span>
              <span className="block text-[clamp(3.8rem,10vw,8rem)] text-[#3cb858] tracking-wide">
                de Bastos
              </span>
            </h1>

            <p className="font-sans italic text-tierra text-[clamp(1rem,1.8vw,1.3rem)] leading-snug mb-3 max-w-sm">
              Espiritualidad que sabe a tierra.
            </p>
            <p className="font-sans text-tierra/65 text-sm leading-relaxed tracking-wide max-w-xs mb-12">
              Una práctica sagrada que no le niega un vino al cuerpo
              ni una canción al alma.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-fit">
              <a
                href="/tienda"
                className="whitespace-nowrap text-center bg-dorado text-tierra-dark font-sans font-semibold text-xs px-7 py-4 border-2 border-morado-dark hover:bg-dorado-light transition-colors tracking-widest uppercase block-shadow"
              >
                Explorar tienda
              </a>
              <a
                href="/cursos"
                className="whitespace-nowrap text-center border-2 border-morado-dark text-morado-dark font-sans font-semibold text-xs px-7 py-4 hover:bg-morado-dark/5 transition-colors tracking-widest uppercase block-shadow-sm"
              >
                Ver cursos
              </a>
            </div>
          </div>
        </div>

        {/* ── Columna derecha: ilustración / slider ── */}
        <div className="relative hidden lg:flex items-center justify-center bg-crema border-l-2 border-rosa/20">
          <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-dorado/50" />
          <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-dorado/50" />
          <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-dorado/50" />
          <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-dorado/50" />

          <div className="flex flex-col items-center gap-4 text-center select-none">
            <span className="font-sans text-[0.55rem] text-morado/25 tracking-[0.4em] uppercase">
              Ilustración · Slider
            </span>
            <div className="w-8 h-px bg-morado/15" />
            <span className="font-display text-6xl text-morado/10">✦</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center gap-2 pb-8 text-morado/30 pointer-events-none">
        <span className="font-sans text-[0.55rem] tracking-[0.5em] uppercase">Descubrí más</span>
        <div className="w-px h-10 bg-gradient-to-b from-morado/25 to-transparent" />
      </div>

    </section>
  );
}
