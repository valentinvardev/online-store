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
      {/* Textura grainy */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-12 sm:mb-14">
          <h2 className="font-display uppercase text-[clamp(2rem,5vw,3.5rem)] text-tierra-dark leading-none tracking-wide">
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
