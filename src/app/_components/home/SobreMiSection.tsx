import RevealOnScroll from "./RevealOnScroll";

export default function SobreMiSection() {
  return (
    <section className="bg-crema py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-center">

          {/* Imagen */}
          <RevealOnScroll direction="left" delay={0}>
            <div className="relative max-w-sm mx-auto md:mx-0">
              <div className="aspect-[3/4] bg-gradient-to-br from-morado-pale via-rosa-pale to-dorado-pale relative overflow-hidden border-2 border-morado-dark block-shadow">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-white/60 flex items-center justify-center border border-morado/20">
                      <span className="text-morado text-4xl">✦</span>
                    </div>
                    <p className="font-sans text-tierra/40 text-xs tracking-wide">Tu foto acá</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-3 -left-3 bg-morado text-crema font-sans text-[0.6rem] px-3 py-1.5 border-2 border-morado-dark block-shadow-sm tracking-widest uppercase">
                ✦ Certificada en Tarot
              </div>
            </div>
          </RevealOnScroll>

          {/* Texto */}
          <RevealOnScroll direction="right" delay={150}>
            <div>
              <h2 className="font-display uppercase text-[clamp(2.2rem,5vw,3.8rem)] text-tierra-dark leading-none tracking-wide mb-8">
                Hola,<br />soy la Reina
              </h2>
              <div className="space-y-5 font-sans text-tierra/65 leading-relaxed tracking-wide text-sm">
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
                <p className="font-sans italic text-tierra text-xl leading-snug">
                  "Ser sagrada y humana al mismo tiempo. Eso es lo que enseño."
                </p>
              </div>
              <a
                href="/sobre-mi"
                className="mt-10 inline-flex items-center gap-2 bg-morado text-crema font-sans text-xs px-7 py-3.5 border-2 border-morado-dark hover:bg-morado-light transition-colors tracking-widest uppercase block-shadow-sm"
              >
                Leer mi historia completa
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
