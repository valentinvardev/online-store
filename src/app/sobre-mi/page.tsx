import Navbar from "../_components/home/Navbar";
import Footer from "../_components/home/Footer";
import RevealOnScroll from "../_components/home/RevealOnScroll";

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
      <section className="bg-verde-light relative overflow-hidden">
        {/* Ornamentos */}
        <span className="absolute top-6 left-6 sm:top-8 sm:left-8 font-display text-dorado/40 text-xl sm:text-2xl select-none z-10">✦</span>
        <span className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 font-display text-dorado/30 text-base sm:text-lg select-none z-10">◎</span>

        {/* Aurora boreal — verde puro */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[5%] left-[5%] w-80 sm:w-[28rem] h-80 sm:h-[28rem] rounded-full bg-verde blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-[8%] right-[10%] w-80 sm:w-[30rem] h-80 sm:h-[30rem] rounded-full bg-verde-pale blur-3xl opacity-65 animate-blob" style={{ animationDelay: "3s" }} />
          <div className="absolute bottom-[5%] left-[15%] w-96 sm:w-[36rem] h-96 sm:h-[36rem] rounded-full bg-verde blur-3xl opacity-70 animate-blob" style={{ animationDelay: "6s" }} />
          <div className="absolute top-[35%] right-[8%] w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-verde blur-3xl opacity-60 animate-blob" style={{ animationDelay: "9s" }} />
          <div className="absolute top-[42%] left-[38%] w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-verde blur-3xl opacity-55 animate-blob" style={{ animationDelay: "4.5s" }} />
          <div className="absolute bottom-[12%] right-[20%] w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-verde-pale blur-3xl opacity-55 animate-blob" style={{ animationDelay: "7.5s" }} />
          <div className="absolute top-[18%] left-[50%] w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-verde-pale blur-3xl opacity-50 animate-blob" style={{ animationDelay: "1.5s" }} />

          {/* Estrellitas dispersas por todo el banner */}
          <span className="absolute top-[12%] right-[12%] font-display text-crema text-base select-none drop-shadow-[0_0_8px_rgba(251,245,230,0.7)]">✦</span>
          <span className="absolute top-[24%] left-[15%] font-display text-crema/90 text-xs select-none drop-shadow-[0_0_6px_rgba(251,245,230,0.6)]">⋆</span>
          <span className="absolute top-[38%] right-[18%] font-display text-crema text-sm select-none drop-shadow-[0_0_7px_rgba(251,245,230,0.7)]">✧</span>
          <span className="absolute top-[52%] left-[35%] font-display text-crema/85 text-base select-none drop-shadow-[0_0_8px_rgba(251,245,230,0.6)]">✦</span>
          <span className="absolute top-[68%] right-[8%] font-display text-crema/90 text-[0.7rem] select-none">⋆</span>
          <span className="absolute top-[78%] left-[60%] font-display text-crema text-sm select-none drop-shadow-[0_0_7px_rgba(251,245,230,0.7)]">✧</span>
          <span className="absolute top-[18%] left-[42%] font-display text-crema/75 text-[0.55rem] select-none">·</span>
          <span className="absolute top-[44%] right-[45%] font-display text-crema/70 text-[0.6rem] select-none">·</span>
          <span className="absolute top-[60%] right-[55%] font-display text-crema/80 text-xs select-none">⋆</span>
          <span className="absolute top-[85%] right-[25%] font-display text-crema/65 text-[0.55rem] select-none">·</span>
          <span className="absolute top-[30%] left-[5%] font-display text-crema/85 text-[0.7rem] select-none">⋆</span>
          <span className="absolute top-[88%] left-[8%] font-display text-crema text-xs select-none drop-shadow-[0_0_6px_rgba(251,245,230,0.7)]">✦</span>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-14 sm:py-16 lg:py-20 relative z-10">
          <span className="font-sans text-[0.6rem] text-crema/85 tracking-[0.35em] sm:tracking-[0.4em] uppercase block mb-4 sm:mb-5">
            La historia detrás
          </span>
          <h1 className="font-display uppercase text-[clamp(2.5rem,10vw,7rem)] text-crema leading-[0.95] tracking-wide mb-5 sm:mb-6">
            Sobre<br />
            <span className="text-dorado">mí</span>
          </h1>
          <p className="font-sans italic text-crema/85 text-base sm:text-lg max-w-lg leading-relaxed">
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
                      <p className="font-sans text-tierra/35 text-[0.65rem] sm:text-xs tracking-widest uppercase">Tu foto acá</p>
                    </div>
                  </div>

                  {/* Badge certificación */}
                  <div className="absolute -top-3 left-2 bg-morado text-crema font-sans text-[0.55rem] sm:text-[0.58rem] px-2.5 sm:px-3 py-1 sm:py-1.5 border-2 border-morado-dark block-shadow-sm tracking-widest uppercase">
                    ✦ Certificada en Tarot
                  </div>
                  {/* Badge años */}
                  <div className="absolute -bottom-3 right-2 bg-dorado text-tierra-dark font-sans text-[0.55rem] sm:text-[0.58rem] px-2.5 sm:px-3 py-1 sm:py-1.5 border-2 border-morado-dark block-shadow-sm tracking-widest uppercase font-semibold">
                    +8 años de práctica
                  </div>
                </div>

                {/* Cita */}
                <blockquote className="mt-8 sm:mt-10 border-l-4 border-dorado pl-4 sm:pl-5 max-w-md mx-auto lg:mx-0">
                  <p className="font-sans italic text-tierra/60 text-sm leading-relaxed">
                    &ldquo;Ser sagrada y humana al mismo tiempo. Eso es todo lo que enseño.&rdquo;
                  </p>
                </blockquote>
              </div>
            </RevealOnScroll>

            {/* Texto */}
            <RevealOnScroll direction="up" delay={150}>
              <div className="space-y-8 text-center lg:text-left">
                <div>
                  <h2 className="font-display uppercase text-[clamp(2rem,7vw,3.5rem)] text-tierra-dark leading-[0.95] tracking-wide mb-5 sm:mb-6">
                    Hola,<br />soy la Reina
                  </h2>
                  <div className="space-y-4 sm:space-y-5 font-sans text-tierra/65 leading-relaxed tracking-wide text-sm sm:text-[15px] max-w-prose mx-auto lg:mx-0">
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
                  <p className="font-sans text-[0.6rem] text-tierra/55 tracking-[0.3em] uppercase mb-4">Formación</p>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {formacion.map((item) => (
                      <span key={item} className="font-sans text-[0.62rem] px-3 py-1.5 border border-morado/20 text-tierra/65 tracking-wide bg-white">
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
      <section className="bg-verde py-16 sm:py-20 lg:py-24 px-5 sm:px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="mb-10 sm:mb-12 lg:mb-14 text-center">
              <span className="font-sans text-[0.6rem] text-crema/70 tracking-[0.35em] sm:tracking-[0.4em] uppercase block mb-4">El camino</span>
              <h2 className="font-display uppercase text-[clamp(2rem,7vw,4rem)] text-crema leading-[0.95] tracking-wide">
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
                      <span className="font-display text-dorado text-lg tracking-wide">{hito.año}</span>
                    </div>
                    {/* Punto en desktop */}
                    <div className="shrink-0 hidden lg:flex items-center justify-center w-6 h-6 rounded-full border-2 border-dorado bg-verde mt-1">
                      <div className="w-2 h-2 bg-dorado rounded-full" />
                    </div>
                    {/* Contenido */}
                    <div className="bg-crema/10 border border-crema/25 p-5 sm:p-6 flex-1 hover:border-dorado/60 transition-colors min-w-0">
                      <span className="font-display text-dorado text-sm tracking-widest lg:hidden block mb-2">{hito.año}</span>
                      <h3 className="font-sans font-semibold text-crema tracking-wide mb-2">{hito.titulo}</h3>
                      <p className="font-sans text-crema/80 text-sm leading-relaxed tracking-wide">{hito.desc}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Filosofía ── */}
      <section className="bg-crema py-16 sm:py-20 lg:py-24 px-5 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="mb-10 sm:mb-12 lg:mb-14 text-center lg:text-left">
              <span className="font-sans text-[0.6rem] text-tierra/55 tracking-[0.35em] sm:tracking-[0.4em] uppercase block mb-4">En qué creo</span>
              <h2 className="font-display uppercase text-[clamp(2rem,7vw,4rem)] text-tierra-dark leading-[0.95] tracking-wide">
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
                  <p className="font-sans text-tierra/65 text-sm leading-relaxed tracking-wide">{v.desc}</p>
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
            <h2 className="font-display uppercase text-[clamp(2rem,7vw,4rem)] text-crema leading-[0.95] tracking-wide mb-4 sm:mb-5">
              ¿Trabajamos juntas?
            </h2>
            <p className="font-sans text-crema/80 text-sm leading-relaxed tracking-wide max-w-xl mx-auto mb-8 sm:mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si algo de lo que leíste resonó, el próximo paso es tuyo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="/servicios"
                className="bg-dorado text-tierra-dark font-sans font-semibold text-[0.7rem] px-7 sm:px-8 py-3.5 sm:py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-dorado-light transition-colors"
              >
                ✦ Ver mis servicios
              </a>
              <a
                href="/cursos"
                className="bg-transparent text-crema font-sans font-semibold text-[0.7rem] px-7 sm:px-8 py-3.5 sm:py-4 tracking-widest uppercase border-2 border-crema/40 hover:border-crema hover:bg-crema/10 transition-colors"
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
