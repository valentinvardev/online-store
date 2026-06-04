const pasos = [
  {
    numero: "01",
    title: "Elegís tu sesión",
    desc: "Revisás las opciones y seleccionás la que más se alinea con lo que estás necesitando.",
  },
  {
    numero: "02",
    title: "Completás el formulario",
    desc: "Te pido un poco de contexto para llegar preparada. No es obligatorio, pero ayuda.",
  },
  {
    numero: "03",
    title: "Confirmamos y pagamos",
    desc: "Te llega un mail con la confirmación, el link de Zoom y el método de pago acordado.",
  },
  {
    numero: "04",
    title: "Nos encontramos",
    desc: "La sesión en vivo o el proceso asincrónico empieza. Grabación y entregables según el servicio.",
  },
];

export default function ComoFunciona() {
  return (
    <section className="bg-verde py-16 sm:py-20 px-5 sm:px-6 relative overflow-hidden">
      {/* Conic spin — caleidoscopio circular de verdes que rota */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 w-[200vmax] h-[200vmax] animate-conic-spin"
          style={{
            background: "conic-gradient(from 0deg at 50% 50%, #0f3d24 0deg, #3d7a47 60deg, #1a4d2e 120deg, #2d6a3e 180deg, #3d7a47 240deg, #0f3d24 300deg, #1a4d2e 360deg)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[180vmax] h-[180vmax] opacity-40 mix-blend-overlay animate-conic-spin-reverse"
          style={{
            background: "conic-gradient(from 45deg at 50% 50%, #1a4d2e 0deg, transparent 90deg, #2d6a3e 180deg, transparent 270deg, #1a4d2e 360deg)",
          }}
        />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(15,61,36,0.55) 100%)" }} />

        {/* Estrellitas dispersas */}
        <span className="absolute top-[12%] right-[14%] font-display text-crema text-base select-none drop-shadow-[0_0_8px_rgba(251,245,230,0.7)]">✦</span>
        <span className="absolute top-[24%] left-[15%] font-display text-crema/90 text-[13px] select-none drop-shadow-[0_0_6px_rgba(251,245,230,0.6)]">⋆</span>
        <span className="absolute top-[38%] right-[20%] font-display text-crema text-sm select-none drop-shadow-[0_0_7px_rgba(251,245,230,0.7)]">✧</span>
        <span className="absolute top-[55%] left-[38%] font-display text-crema/85 text-base select-none drop-shadow-[0_0_8px_rgba(251,245,230,0.6)]">✦</span>
        <span className="absolute top-[70%] right-[10%] font-display text-crema/90 text-[0.8rem] select-none">⋆</span>
        <span className="absolute top-[82%] left-[55%] font-display text-crema text-sm select-none drop-shadow-[0_0_7px_rgba(251,245,230,0.7)]">✧</span>
        <span className="absolute top-[18%] left-[48%] font-display text-crema/75 text-[0.75rem] select-none">·</span>
        <span className="absolute top-[48%] right-[48%] font-display text-crema/70 text-[0.8rem] select-none">·</span>
        <span className="absolute top-[88%] right-[35%] font-display text-crema/80 text-[13px] select-none">⋆</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 sm:mb-14">
          <h2 className="font-display uppercase text-[clamp(2rem,5vw,3.5rem)] text-crema leading-none tracking-wide">
            Cómo funciona
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pasos.map((paso, i) => (
            <div key={i} className="relative">
              {/* Conector */}
              {i < pasos.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-6 h-px bg-tierra-dark/30 z-10" />
              )}
              <div className="bg-dorado border-2 border-morado-dark block-shadow p-6 h-full">
                <div className="font-display text-5xl text-tierra-dark/20 leading-none mb-5 select-none tracking-wide">
                  {paso.numero}
                </div>
                <h3 className="font-sans font-semibold uppercase text-base text-tierra-dark tracking-wide mb-3">
                  {paso.title}
                </h3>
                <p className="font-sans text-tierra/70 text-[15px] leading-relaxed tracking-wide">
                  {paso.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
