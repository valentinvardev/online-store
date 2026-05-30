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
    <section className="bg-verde-light py-16 sm:py-20 px-5 sm:px-6 relative overflow-hidden">
      {/* Aurora boreal — verde puro */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] left-[5%] w-80 sm:w-[28rem] h-80 sm:h-[28rem] rounded-full bg-verde blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-[8%] right-[10%] w-80 sm:w-[30rem] h-80 sm:h-[30rem] rounded-full bg-verde-pale blur-3xl opacity-65 animate-blob" style={{ animationDelay: "3s" }} />
        <div className="absolute bottom-[5%] left-[15%] w-96 sm:w-[36rem] h-96 sm:h-[36rem] rounded-full bg-verde blur-3xl opacity-70 animate-blob" style={{ animationDelay: "6s" }} />
        <div className="absolute top-[35%] right-[8%] w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-verde blur-3xl opacity-60 animate-blob" style={{ animationDelay: "9s" }} />
        <div className="absolute top-[42%] left-[38%] w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-verde blur-3xl opacity-55 animate-blob" style={{ animationDelay: "4.5s" }} />
        <div className="absolute bottom-[12%] right-[20%] w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-verde-pale blur-3xl opacity-55 animate-blob" style={{ animationDelay: "7.5s" }} />
        <div className="absolute top-[18%] left-[50%] w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-verde-pale blur-3xl opacity-50 animate-blob" style={{ animationDelay: "1.5s" }} />

        {/* Estrellitas dispersas */}
        <span className="absolute top-[12%] right-[14%] font-display text-crema text-base select-none drop-shadow-[0_0_8px_rgba(251,245,230,0.7)]">✦</span>
        <span className="absolute top-[24%] left-[15%] font-display text-crema/90 text-xs select-none drop-shadow-[0_0_6px_rgba(251,245,230,0.6)]">⋆</span>
        <span className="absolute top-[38%] right-[20%] font-display text-crema text-sm select-none drop-shadow-[0_0_7px_rgba(251,245,230,0.7)]">✧</span>
        <span className="absolute top-[55%] left-[38%] font-display text-crema/85 text-base select-none drop-shadow-[0_0_8px_rgba(251,245,230,0.6)]">✦</span>
        <span className="absolute top-[70%] right-[10%] font-display text-crema/90 text-[0.7rem] select-none">⋆</span>
        <span className="absolute top-[82%] left-[55%] font-display text-crema text-sm select-none drop-shadow-[0_0_7px_rgba(251,245,230,0.7)]">✧</span>
        <span className="absolute top-[18%] left-[48%] font-display text-crema/75 text-[0.55rem] select-none">·</span>
        <span className="absolute top-[48%] right-[48%] font-display text-crema/70 text-[0.6rem] select-none">·</span>
        <span className="absolute top-[88%] right-[35%] font-display text-crema/80 text-xs select-none">⋆</span>
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
                <p className="font-sans text-tierra/70 text-sm leading-relaxed tracking-wide">
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
