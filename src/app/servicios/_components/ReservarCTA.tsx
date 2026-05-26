export default function ReservarCTA() {
  return (
    <section id="reservar" className="bg-rosa py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-8 bg-crema/40" />
          <span className="font-sans text-[0.6rem] text-crema/50 tracking-[0.4em] uppercase">
            Reservas
          </span>
          <div className="h-px w-8 bg-crema/40" />
        </div>

        <h2 className="font-display uppercase text-[clamp(2rem,6vw,4rem)] text-crema leading-none tracking-wide mb-4">
          ¿Cuándo<br />empezamos?
        </h2>
        <p className="font-sans italic text-crema/65 text-lg leading-snug mb-10 max-w-sm mx-auto">
          Escribime por Instagram o por mail y coordinamos. Sin formularios eternos.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap bg-crema text-tierra-dark font-sans font-semibold text-xs px-8 py-4 border-2 border-morado-dark hover:bg-crema-dark transition-colors tracking-widest uppercase block-shadow"
          >
            Escribirme por Instagram
          </a>
          <a
            href="mailto:hola@lareinadebastos.com"
            className="whitespace-nowrap border-2 border-crema/50 text-crema font-sans font-semibold text-xs px-8 py-4 hover:bg-crema/10 transition-colors tracking-widest uppercase"
          >
            Enviar un mail
          </a>
        </div>

        <p className="font-sans text-[0.65rem] text-crema/35 mt-8 tracking-wide">
          Respondо dentro de las 24hs en días hábiles.
        </p>
      </div>
    </section>
  );
}
