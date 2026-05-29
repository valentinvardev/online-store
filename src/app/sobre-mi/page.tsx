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
      <section className="bg-morado-dark relative overflow-hidden">
        {/* Ornamentos */}
        <span className="absolute top-8 left-8 font-display text-dorado/15 text-2xl select-none">✦</span>
        <span className="absolute top-8 right-8 font-display text-dorado/15 text-2xl select-none">✦</span>
        <span className="absolute bottom-8 left-8 font-display text-dorado/10 text-lg select-none">◎</span>
        <span className="absolute bottom-8 right-8 font-display text-dorado/10 text-lg select-none">◉</span>

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <span className="font-sans text-[0.6rem] text-morado/65 tracking-[0.4em] uppercase block mb-5">
            La historia detrás
          </span>
          <h1 className="font-display uppercase text-[clamp(3rem,9vw,7rem)] text-crema leading-none tracking-wide mb-6">
            Sobre<br />
            <span className="text-dorado">mí</span>
          </h1>
          <p className="font-sans italic text-crema/40 text-lg max-w-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Una mujer, un mazo de tarot y la convicción de que la magia es para todas.
          </p>
        </div>

        {/* Borde inferior decorativo */}
        <div className="h-1 bg-gradient-to-r from-transparent via-dorado/50 to-transparent" />
      </section>

      {/* ── Presentación principal ── */}
      <section className="bg-crema py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[2fr_3fr] gap-14 lg:gap-24 items-start">

            {/* Foto */}
            <RevealOnScroll direction="left">
              <div className="sticky top-24">
                <div className="relative max-w-sm">
                  {/* Foto placeholder */}
                  <div className="aspect-[3/4] bg-gradient-to-br from-morado-pale via-rosa-pale to-dorado-pale border-4 border-morado-dark block-shadow overflow-hidden relative">
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <div className="w-20 h-20 bg-white/60 border-2 border-morado/20 flex items-center justify-center">
                        <span className="text-morado text-3xl">✦</span>
                      </div>
                      <p className="font-sans text-tierra/35 text-xs tracking-widest uppercase">Tu foto acá</p>
                    </div>
                  </div>

                  {/* Badge certificación */}
                  <div className="absolute -top-3 -left-3 bg-morado text-crema font-sans text-[0.58rem] px-3 py-1.5 border-2 border-morado-dark block-shadow-sm tracking-widest uppercase">
                    ✦ Certificada en Tarot
                  </div>
                  {/* Badge años */}
                  <div className="absolute -bottom-3 -right-3 bg-dorado text-tierra-dark font-sans text-[0.58rem] px-3 py-1.5 border-2 border-morado-dark block-shadow-sm tracking-widest uppercase font-semibold">
                    +8 años de práctica
                  </div>
                </div>

                {/* Cita */}
                <blockquote className="mt-10 border-l-4 border-dorado pl-5">
                  <p className="font-sans italic text-tierra/60 text-sm leading-relaxed">
                    "Ser sagrada y humana al mismo tiempo. Eso es todo lo que enseño."
                  </p>
                </blockquote>
              </div>
            </RevealOnScroll>

            {/* Texto */}
            <RevealOnScroll direction="right" delay={150}>
              <div className="space-y-8">
                <div>
                  <h2 className="font-display uppercase text-[clamp(2rem,5vw,3.5rem)] text-tierra-dark leading-none tracking-wide mb-6">
                    Hola,<br />soy la Reina
                  </h2>
                  <div className="space-y-5 font-sans text-tierra/65 leading-relaxed tracking-wide text-sm">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p className="font-sans italic text-tierra text-lg leading-snug border-l-2 border-morado/30 pl-4">
                      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
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
                <div className="pt-6 border-t border-morado/10">
                  <p className="font-sans text-[0.6rem] text-tierra/35 tracking-[0.3em] uppercase mb-4">Formación</p>
                  <div className="flex flex-wrap gap-2">
                    {formacion.map((item) => (
                      <span key={item} className="font-sans text-[0.62rem] px-3 py-1.5 border border-morado/20 text-tierra/60 tracking-wide bg-white">
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
      <section className="bg-morado-dark py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="mb-14 text-center">
              <span className="font-sans text-[0.6rem] text-morado/65 tracking-[0.4em] uppercase block mb-4">El camino</span>
              <h2 className="font-display uppercase text-[clamp(2rem,6vw,4rem)] text-crema leading-none tracking-wide">
                Mi historia
              </h2>
            </div>
          </RevealOnScroll>

          <div className="relative">
            {/* Línea vertical */}
            <div className="absolute left-[2.75rem] top-0 bottom-0 w-px bg-dorado/20 hidden md:block" />

            <div className="space-y-10">
              {hitos.map((hito, i) => (
                <RevealOnScroll key={i} delay={i * 100}>
                  <div className="flex gap-8 items-start">
                    {/* Año */}
                    <div className="shrink-0 w-22 text-right hidden md:block">
                      <span className="font-display text-dorado text-lg tracking-wide">{hito.año}</span>
                    </div>
                    {/* Punto */}
                    <div className="shrink-0 hidden md:flex items-center justify-center w-6 h-6 rounded-full border-2 border-dorado bg-morado-dark mt-1">
                      <div className="w-2 h-2 bg-dorado rounded-full" />
                    </div>
                    {/* Contenido */}
                    <div className="bg-crema/5 border border-dorado/15 p-6 flex-1 hover:border-dorado/35 transition-colors">
                      <span className="font-display text-dorado text-sm tracking-widest md:hidden block mb-2">{hito.año}</span>
                      <h3 className="font-sans font-semibold text-crema tracking-wide mb-2">{hito.titulo}</h3>
                      <p className="font-sans text-crema/45 text-sm leading-relaxed tracking-wide">{hito.desc}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Filosofía ── */}
      <section className="bg-crema py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="mb-14">
              <span className="font-sans text-[0.6rem] text-tierra/35 tracking-[0.4em] uppercase block mb-4">En qué creo</span>
              <h2 className="font-display uppercase text-[clamp(2rem,6vw,4rem)] text-tierra-dark leading-none tracking-wide">
                Mi filosofía
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-6">
            {valores.map((v, i) => (
              <RevealOnScroll key={i} delay={i * 100}>
                <div className={`bg-white border-2 block-shadow p-8 transition-colors ${v.color}`}>
                  <span className={`text-3xl block mb-5 ${v.accent}`}>{v.icon}</span>
                  <h3 className="font-sans font-bold text-tierra-dark tracking-wide mb-3">{v.title}</h3>
                  <p className="font-sans text-tierra/55 text-sm leading-relaxed tracking-wide">{v.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="bg-crema-dark border-t-4 border-morado/10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <span className="font-display text-6xl text-morado/10 block mb-6">✦</span>
            <h2 className="font-display uppercase text-[clamp(2rem,6vw,4rem)] text-tierra-dark leading-none tracking-wide mb-5">
              ¿Trabajamos juntas?
            </h2>
            <p className="font-sans text-tierra/55 text-sm leading-relaxed tracking-wide max-w-xl mx-auto mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si algo de lo que leíste resonó, el próximo paso es tuyo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/servicios"
                className="bg-morado-dark text-crema font-sans font-semibold text-[0.7rem] px-8 py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-morado transition-colors"
              >
                ✦ Ver mis servicios
              </a>
              <a
                href="/cursos"
                className="bg-transparent text-tierra font-sans font-semibold text-[0.7rem] px-8 py-4 tracking-widest uppercase border-2 border-morado/25 hover:border-morado/60 hover:text-tierra-dark transition-colors"
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
