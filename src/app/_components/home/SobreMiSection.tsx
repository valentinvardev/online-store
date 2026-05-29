export default function SobreMiSection() {
  return (
    <section className="bg-crema py-16 sm:py-20 lg:py-28 px-5 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 sm:gap-14 lg:gap-20">

        {/* Imagen */}
        <div className="w-full max-w-[260px] sm:max-w-[300px] lg:max-w-sm lg:flex-shrink-0 lg:basis-2/5 relative">
          {/* Badge "Certificada" */}
          <div className="absolute -top-3 left-2 z-10 bg-morado text-crema font-sans text-[0.55rem] sm:text-[0.6rem] px-2.5 sm:px-3 py-1 sm:py-1.5 border-2 border-morado-dark block-shadow-sm tracking-widest uppercase">
            ✦ Certificada en Tarot
          </div>

          {/* Card de imagen */}
          <div className="aspect-[3/4] bg-gradient-to-br from-morado-pale via-rosa-pale to-dorado-pale relative overflow-hidden border-2 border-morado-dark block-shadow">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 bg-white/60 flex items-center justify-center border border-morado/20">
                <span className="text-morado text-3xl sm:text-4xl">✦</span>
              </div>
              <p className="font-sans text-tierra/40 text-xs tracking-wide">Tu foto acá</p>
            </div>
          </div>
        </div>

        {/* Texto */}
        <div className="w-full lg:flex-1 lg:basis-3/5 text-center lg:text-left">
          <h2 className="font-display uppercase text-[clamp(2rem,8vw,3.8rem)] text-tierra-dark leading-[0.95] tracking-wide mb-5 sm:mb-7 lg:mb-8">
            Hola,<br />soy la Reina
          </h2>

          <div className="space-y-4 sm:space-y-5 font-sans text-tierra/65 leading-relaxed tracking-wide text-sm sm:text-[15px] max-w-prose mx-auto lg:mx-0">
            <p>
              Empecé mi camino espiritual en el mismo lugar que muchas: confundida,
              buscando respuestas y con un mazo de tarot que no entendía del todo.
              Quería algo que se sintiera real.
            </p>
            <p>
              Lo que descubrí en el camino es que la espiritualidad no te pide que
              abandones el mundo. Te pide que lo habitás con más conciencia. Que te
              tomés un vino y también agradezcás.
            </p>
            <p className="font-sans italic text-tierra text-base sm:text-lg lg:text-xl leading-snug">
              &ldquo;Ser sagrada y humana al mismo tiempo. Eso es lo que enseño.&rdquo;
            </p>
          </div>

          <div className="mt-8 sm:mt-10 flex justify-center lg:justify-start">
            <a
              href="/sobre-mi"
              className="inline-flex items-center gap-2 bg-morado text-crema font-sans text-[0.7rem] sm:text-xs px-5 sm:px-7 py-3 sm:py-3.5 border-2 border-morado-dark hover:bg-morado-light transition-colors tracking-widest uppercase block-shadow-sm whitespace-nowrap"
            >
              Leer mi historia completa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
