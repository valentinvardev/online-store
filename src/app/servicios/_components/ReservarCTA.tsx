export default function ReservarCTA() {
  return (
    <section id="reservar" className="bg-rosa py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-8 bg-crema/80" />
          <span className="font-sans font-semibold text-[0.85rem] text-crema tracking-[0.4em] uppercase">
            Reservas
          </span>
          <div className="h-px w-8 bg-crema/80" />
        </div>

        <h2 className="font-display uppercase text-[clamp(3rem,6vw,4rem)] text-crema leading-none tracking-wide mb-5">
          <span className="inline-block rotate-180 leading-none">?</span>Cuándo<br />empezamos?
        </h2>
        <p className="font-sans font-medium text-crema text-lg leading-relaxed mb-10 max-w-md mx-auto">
          Escribime por Instagram o por mail y coordinamos. Sin formularios eternos.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap bg-crema text-tierra-dark font-sans font-semibold text-[13px] px-8 py-4 border-2 border-morado-dark hover:bg-crema-dark transition-colors tracking-widest uppercase block-shadow"
          >
            Escribirme por Instagram
          </a>
          <a
            href="mailto:hola@lareinadebastos.com"
            className="whitespace-nowrap border-2 border-crema text-crema font-sans font-semibold text-[13px] px-8 py-4 hover:bg-crema/15 transition-colors tracking-widest uppercase"
          >
            Enviar un mail
          </a>
        </div>

        <p className="font-sans font-medium text-[0.85rem] text-crema/90 mt-8 tracking-wide">
          Respondo dentro de las 24hs en días hábiles.
        </p>
      </div>
    </section>
  );
}
