import Navbar from "../_components/home/Navbar";
import Footer from "../_components/home/Footer";
import RevealOnScroll from "../_components/home/RevealOnScroll";
import Stickers from "../_components/Stickers";

export const metadata = {
  title: "Sobre Mí — La Reina de Bastos",
  description: "Conocé la historia, filosofía y camino de La Reina de Bastos.",
};

const valores = [
  {
    icon: "✦",
    title: "Espiritualidad encarnada",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. La magia no vive en las alturas — vive en el cuerpo, en la tierra, en la cotidianeidad que elegís habitar con presencia.",
    color: "border-morado/20 hover:border-morado",
    accent: "text-morado",
  },
  {
    icon: "◉",
    title: "Sin dogmas ni rigidez",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque. Cada persona tiene su propio lenguaje sagrado y el trabajo es encontrarlo, no copiarlo.",
    color: "border-dorado/30 hover:border-dorado",
    accent: "text-dorado-dark",
  },
  {
    icon: "◎",
    title: "Goce y gratitud",
    desc: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Tomar un vino con amigas y agradecer la luna llena no son contradictorios — son lo mismo.",
    color: "border-rosa/25 hover:border-rosa",
    accent: "text-rosa",
  },
];

const hitos = [
  {
    año: "2016",
    titulo: "El primer mazo",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Así empezó todo — con una baraja que no entendía y muchas preguntas sin respuesta.",
  },
  {
    año: "2018",
    titulo: "Formación formal",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Certificación en tarot, primeros pasos en astrología y el descubrimiento de que enseñar era el camino.",
  },
  {
    año: "2020",
    titulo: "Los primeros cursos",
    desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. La pandemia cerró el mundo y abrió una nueva forma de conectar. Las primeras 30 alumnas lo cambiaron todo.",
  },
  {
    año: "Hoy",
    titulo: "La Reina de Bastos",
    desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Una comunidad de mujeres que aprenden a leer su propio código sagrado — sin rigidez, con goce.",
  },
];

const formacion = [
  "Certificada en Tarot Rider-Waite",
  "Formación en Astrología Natal",
  "Rituales y Herbología Sagrada",
  "Numerología Esencial",
  "Chakras y Energía Práctica",
  "Facilitadora de Círculos de Mujeres",
];

export default function SobreMiPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-dorado-light relative overflow-hidden">
        {/* Stickers — mobile: 2 esquinas opuestas (florcita TR + cristal BL). Desktop: 4 dispersos */}
        <Stickers blend="multiply" items={[
          { id: "sticker-22", top: "6%",   right: "5%",   size: 170, opacity: 0.42, rotate: 8,   anim: "float-slow", delay: 2 },
          { id: "sticker-04", bottom: "6%", left: "5%",   size: 180, opacity: 0.36, rotate: -10, anim: "float-slow", delay: 1.5 },
          { id: "sticker-15", bottom: "10%", right: "6%", size: 180, opacity: 0.38, rotate: 12,  anim: "spin", hideOnMobile: true },
          { id: "sticker-09", top: "55%",  right: "10%",  size: 160, opacity: 0.36, rotate: 0,   anim: "float", delay: 0.5, hideOnMobile: true },
        ]} />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-14 sm:py-16 lg:py-20 relative z-10">
          <span className="font-sans font-semibold text-[0.85rem] text-tierra-dark tracking-[0.35em] sm:tracking-[0.4em] uppercase block mb-4 sm:mb-5">
            La historia detrás
          </span>
          <h1 className="font-display uppercase text-[clamp(3rem,10vw,7rem)] text-tierra-dark leading-[0.95] tracking-wide mb-5 sm:mb-6">
            Sobre<br />
            <span className="text-morado-dark">mí</span>
          </h1>
          <p className="font-sans italic text-tierra-dark/90 text-lg sm:text-xl max-w-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Una mujer, un mazo de tarot y la convicción de que la magia es para todas.
          </p>
        </div>

        {/* Borde inferior decorativo */}
        <div className="h-1 bg-gradient-to-r from-transparent via-dorado/60 to-transparent" />
      </section>

      {/* ── Presentación principal ── */}
      <section className="bg-crema py-16 sm:py-20 lg:py-24 px-5 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-start">

            {/* Foto */}
            <RevealOnScroll direction="up">
              <div className="lg:sticky lg:top-24">
                <div className="relative w-full max-w-[280px] sm:max-w-xs lg:max-w-sm mx-auto lg:mx-0">
                  {/* Foto placeholder */}
                  <div className="aspect-[3/4] bg-gradient-to-br from-morado-pale via-rosa-pale to-dorado-pale border-4 border-morado-dark block-shadow overflow-hidden relative">
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4 px-4 text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/60 border-2 border-morado/20 flex items-center justify-center">
                        <span className="text-morado text-2xl sm:text-3xl">✦</span>
                      </div>
                      <p className="font-sans text-tierra/60 text-[0.75rem] sm:text-[13px] tracking-widest uppercase">Tu foto acá</p>
                    </div>
                  </div>

                  {/* Badge certificación */}
                  <div className="absolute -top-3 left-2 bg-morado text-crema font-sans text-[0.75rem] sm:text-[0.78rem] px-2.5 sm:px-3 py-1 sm:py-1.5 border-2 border-morado-dark block-shadow-sm tracking-widest uppercase">
                    ✦ Certificada en Tarot
                  </div>
                  {/* Badge años */}
                  <div className="absolute -bottom-3 right-2 bg-dorado text-tierra-dark font-sans text-[0.75rem] sm:text-[0.78rem] px-2.5 sm:px-3 py-1 sm:py-1.5 border-2 border-morado-dark block-shadow-sm tracking-widest uppercase font-semibold">
                    +8 años de práctica
                  </div>
                </div>

                {/* Cita */}
                <blockquote className="mt-8 sm:mt-10 border-l-4 border-dorado pl-4 sm:pl-5 max-w-md mx-auto lg:mx-0">
                  <p className="font-sans italic text-tierra/60 text-[15px] leading-relaxed">
                    &ldquo;Ser sagrada y humana al mismo tiempo. Eso es todo lo que enseño.&rdquo;
                  </p>
                </blockquote>
              </div>
            </RevealOnScroll>

            {/* Texto */}
            <RevealOnScroll direction="up" delay={150}>
              <div className="space-y-8 text-center lg:text-left">
                <div>
                  <h2 className="font-display uppercase text-[clamp(3rem,7vw,3.5rem)] text-tierra-dark leading-[0.95] tracking-wide mb-5 sm:mb-6">
                    Hola,<br />soy la Reina
                  </h2>
                  <div className="space-y-4 sm:space-y-5 font-sans text-tierra-dark/85 leading-relaxed tracking-wide text-[15px] sm:text-[17px] max-w-prose mx-auto lg:mx-0">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p className="font-sans italic text-tierra text-base sm:text-lg leading-snug border-l-2 border-morado/30 pl-4 text-left">
                      &ldquo;Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.&rdquo;
                    </p>
                    <p>
                      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
                    </p>
                    <p>
                      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                    </p>
                  </div>
                </div>

                {/* Formación */}
                <div className="pt-6 border-t border-morado/10 max-w-prose mx-auto lg:mx-0">
                  <p className="font-sans text-[0.8rem] text-tierra/80 tracking-[0.3em] uppercase mb-4">Formación</p>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {formacion.map((item) => (
                      <span key={item} className="font-sans text-[0.82rem] px-3 py-1.5 border border-morado/20 text-tierra/65 tracking-wide bg-white">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── Mi historia — Timeline ── */}
      <section className="bg-verde-light py-16 sm:py-20 lg:py-24 px-5 sm:px-6 overflow-hidden relative">
        {/* Degradado de verdes claros con shimmer (estilo PropuestaSection) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #5fa569 0%, #6bae75 25%, #7bc888 55%, #6bae75 85%, #5fa569 100%)" }} />
          <div className="absolute inset-0 animate-gradient-breathe" style={{ background: "linear-gradient(180deg, #6bae75 0%, #7bc888 30%, #8fd4a0 65%, #7bc888 90%, #6bae75 100%)" }} />
          <div className="absolute inset-x-0 h-[35%] animate-shimmer-fall" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)" }} />
          <div className="absolute inset-x-0 h-[45%] animate-shimmer-fall-slow" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(143,212,160,0.28) 50%, transparent 100%)" }} />
          {/* Mobile: mariposa TR + corazon arcoiris BL. Desktop: 5 dispersos */}
          <Stickers blend="soft-light" items={[
            { id: "sticker-17", top: "8%",   right: "5%",   size: 160, opacity: 0.46, rotate: 8,   anim: "float", delay: 1 },
            { id: "sticker-19", bottom: "8%", left: "5%",   size: 150, opacity: 0.46, rotate: -8,  anim: "spin", delay: 0.5 },
            { id: "sticker-13", top: "12%",  left: "5%",    size: 200, opacity: 0.5,  rotate: -10, anim: "float-slow", hideOnMobile: true },
            { id: "sticker-04", bottom: "12%", right: "8%", size: 220, opacity: 0.45, rotate: 14,  anim: "float-slow", delay: 2, hideOnMobile: true },
            { id: "sticker-08", top: "50%",  left: "42%",   size: 135, opacity: 0.4,  rotate: 0,   anim: "float", delay: 1.5, hideOnMobile: true },
          ]} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <RevealOnScroll>
            <div className="mb-10 sm:mb-12 lg:mb-14 text-center">
              <span className="font-sans text-[0.8rem] text-crema/70 tracking-[0.35em] sm:tracking-[0.4em] uppercase block mb-4">El camino</span>
              <h2 className="font-display uppercase text-[clamp(3rem,7vw,4rem)] text-crema leading-[0.95] tracking-wide">
                Mi historia
              </h2>
            </div>
          </RevealOnScroll>

          <div className="relative">
            {/* Línea vertical solo en desktop */}
            <div className="absolute left-[2.75rem] top-0 bottom-0 w-px bg-dorado/30 hidden lg:block" />

            <div className="space-y-8 sm:space-y-10">
              {hitos.map((hito, i) => (
                <RevealOnScroll key={i} delay={i * 100}>
                  <div className="flex gap-4 lg:gap-8 items-start">
                    {/* Año en desktop */}
                    <div className="shrink-0 w-20 text-right hidden lg:block pt-1">
                      <span className="font-display text-crema text-lg tracking-wide">{hito.año}</span>
                    </div>
                    {/* Punto en desktop */}
                    <div className="shrink-0 hidden lg:flex items-center justify-center w-6 h-6 rounded-full border-2 border-morado-dark bg-dorado-light mt-1">
                      <div className="w-2 h-2 bg-morado-dark rounded-full" />
                    </div>
                    {/* Contenido */}
                    <div className="bg-dorado-light border-2 border-morado-dark block-shadow-sm p-5 sm:p-6 flex-1 hover:translate-y-[-2px] transition-transform min-w-0">
                      <span className="font-display text-morado-dark text-sm tracking-widest lg:hidden block mb-2 font-bold">{hito.año}</span>
                      <h3 className="font-sans font-bold text-tierra-dark tracking-wide mb-2 text-lg">{hito.titulo}</h3>
                      <p className="font-sans text-tierra-dark/85 text-[15px] leading-relaxed tracking-wide">{hito.desc}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Filosofía ── */}
      <section className="bg-crema py-16 sm:py-20 lg:py-24 px-5 sm:px-6 overflow-hidden relative">
        {/* Mobile: arcoiris TR + honguito BL. Desktop: 6 dispersos */}
        <Stickers blend="multiply" items={[
          { id: "sticker-16", top: "8%",   right: "5%",   size: 140, opacity: 0.4,  rotate: 12,  anim: "float-slow", delay: 1.4 },
          { id: "sticker-18", bottom: "8%", left: "5%",   size: 150, opacity: 0.4,  rotate: 0,   anim: "float", delay: 0.4 },
          { id: "sticker-07", top: "10%",  left: "6%",    size: 120, opacity: 0.4,  rotate: 0,   anim: "spin", hideOnMobile: true },
          { id: "sticker-10", top: "65%",  left: "14%",   size: 145, opacity: 0.34, rotate: -8,  anim: "float", delay: 0.8, hideOnMobile: true },
          { id: "sticker-21", bottom: "18%", right: "12%", size: 105, opacity: 0.34, rotate: -6, anim: "float-slow", delay: 2, hideOnMobile: true },
          { id: "sticker-02", top: "45%",  left: "50%",   size: 95,  opacity: 0.3,  rotate: 10,  anim: "spin", delay: 3, hideOnMobile: true },
        ]} />
        <div className="max-w-7xl mx-auto relative z-10">
          <RevealOnScroll>
            <div className="mb-10 sm:mb-12 lg:mb-14 text-center lg:text-left">
              <span className="font-sans text-[0.8rem] text-tierra/80 tracking-[0.35em] sm:tracking-[0.4em] uppercase block mb-4">En qué creo</span>
              <h2 className="font-display uppercase text-[clamp(3rem,7vw,4rem)] text-tierra-dark leading-[0.95] tracking-wide">
                Mi filosofía
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {valores.map((v, i) => (
              <RevealOnScroll key={i} delay={i * 100}>
                <div className={`bg-white border-2 block-shadow p-6 sm:p-8 transition-colors h-full ${v.color}`}>
                  <span className={`text-2xl sm:text-3xl block mb-4 sm:mb-5 ${v.accent}`}>{v.icon}</span>
                  <h3 className="font-sans font-bold text-tierra-dark tracking-wide mb-3">{v.title}</h3>
                  <p className="font-sans text-tierra-dark/80 text-[15px] leading-relaxed tracking-wide">{v.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="bg-rosa border-t-4 border-dorado/40 py-16 sm:py-20 lg:py-24 px-5 sm:px-6 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <span className="font-display text-5xl sm:text-6xl text-dorado block mb-5 sm:mb-6">✦</span>
            <h2 className="font-display uppercase text-[clamp(3rem,7vw,4rem)] text-crema leading-[0.95] tracking-wide mb-4 sm:mb-5">
              <span className="inline-block rotate-180 leading-none">?</span>Trabajamos juntas?
            </h2>
            <p className="font-sans text-crema/80 text-sm leading-relaxed tracking-wide max-w-xl mx-auto mb-8 sm:mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si algo de lo que leíste resonó, el próximo paso es tuyo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="/servicios"
                className="bg-dorado text-tierra-dark font-sans font-semibold text-[0.8rem] px-7 sm:px-8 py-3.5 sm:py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-dorado-light transition-colors"
              >
                ✦ Ver mis servicios
              </a>
              <a
                href="/cursos"
                className="bg-transparent text-crema font-sans font-semibold text-[0.8rem] px-7 sm:px-8 py-3.5 sm:py-4 tracking-widest uppercase border-2 border-crema/40 hover:border-crema hover:bg-crema/10 transition-colors"
              >
                Explorar cursos
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
    </>
  );
}
