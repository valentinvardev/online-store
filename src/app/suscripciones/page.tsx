"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Crown } from "lucide-react";
import Navbar from "~/app/_components/home/Navbar";
import Footer from "~/app/_components/home/Footer";
import RevealOnScroll from "~/app/_components/home/RevealOnScroll";
import Stickers from "~/app/_components/Stickers";
import DecorIcons from "~/app/_components/DecorIcons";

/* ── La membresía (única) ── */
const membresia = {
  nombre: "Círculo de la Reina",
  subtitulo: "Tu práctica espiritual, sostenida mes a mes",
  precio: { mensual: "$19", anual: "$159" },
  beneficios: [
    "Newsletter premium semanal",
    "Ritual del mes en PDF",
    "Meditación guiada mensual",
    "Sesión grupal en vivo cada mes",
    "Acceso a la comunidad privada",
    "Descuentos en cursos y servicios (20%)",
    "Acceso anticipado a lanzamientos",
    "Consulta 1 a 1 mensual (30 min)",
  ],
};

const modulos = [
  {
    num: "01",
    titulo: "Ritual del mes",
    desc: "Un ritual completo en PDF diseñado para la energía de la luna y la estación. Incluye lista de elementos, pasos detallados, afirmaciones y cierre.",
    items: ["Ritual de luna nueva", "Ritual de luna llena", "Ritual estacional", "Rituales de emergencia emocional"],
    gradient: "from-verde to-[#2d6a45]",
  },
  {
    num: "02",
    titulo: "Newsletter profundo",
    desc: "No es un correo de novedades. Es una reflexión real, honesta, sin positividad tóxica. Sobre espiritualidad encarnada que se vive en lo cotidiano.",
    items: ["Reflexión semanal", "Consejo práctico", "Recomendación cultural", "Pregunta para tu diario"],
    gradient: "from-dorado via-naranja to-rosa",
  },
  {
    num: "03",
    titulo: "Meditación guiada",
    desc: "Una grabación de audio nueva cada mes. Distintos enfoques: meditaciones de arraigo, visualizaciones creativas, trabajo con chakras, liberación emocional.",
    items: ["Audio MP3 descargable", "15 a 30 minutos", "Adaptada al ciclo del mes", "Con música original"],
    gradient: "from-celeste via-morado-light to-morado",
  },
  {
    num: "04",
    titulo: "Sesión grupal en vivo",
    desc: "Un encuentro en vivo por Zoom una vez al mes. Un espacio de práctica colectiva, preguntas reales y conexión genuina. Se graba para las que no pueden asistir.",
    items: ["Zoom en vivo mensual", "Grabación 48hs después", "Temática nueva cada mes", "Espacio de preguntas"],
    gradient: "from-rosa via-morado to-morado-dark",
  },
];

const virtudes = [
  { icon: "✦", titulo: "Claridad interior",   desc: "Cada mes trabajás una intención concreta. Sin ruido. Sin acumulación. Solo lo que necesitás en ese momento." },
  { icon: "◎", titulo: "Práctica sostenida",  desc: "La magia no es un momento — es un hábito. La membresía te da estructura sin rigidez para sostener tu práctica." },
  { icon: "◈", titulo: "Comunidad real",      desc: "Mujeres que no te van a decir 'todo pasa por algo'. Te van a acompañar en lo que sea con honestidad y presencia." },
];

const faqs = [
  { q: "¿Puedo cancelar en cualquier momento?",       a: "Sí. Sin cargos extras. El acceso se mantiene hasta el final del período ya pagado." },
  { q: "¿Qué diferencia hay entre mensual y anual?",  a: "El plan anual equivale a 10 meses — te regalás dos. Se cobra todo junto al inicio." },
  { q: "¿Cómo recibo los contenidos?",                a: "Por email y a través de la comunidad privada. Al suscribirte tenés acceso inmediato." },
  { q: "¿Las sesiones grupales son en vivo?",         a: "Sí, por Zoom una vez al mes. Si no podés asistir, se graban y quedan en la comunidad." },
  { q: "¿La consulta 1 a 1 es de tarot?",             a: "Podés elegirla: tarot, astrología o charla de acompañamiento espiritual. 30 minutos por mes." },
];

export default function SuscripcionesPage() {
  const [billing, setBilling] = useState<"mensual" | "anual">("mensual");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* Card de precio reutilizable (hero + sección final) */
  const PrecioCard = ({ idAnchor }: { idAnchor?: string }) => (
    <div id={idAnchor} className="bg-crema border-4 border-morado-dark block-shadow overflow-hidden">
      {/* Header verde con corona */}
      <div className="bg-verde px-7 py-6 text-center relative overflow-hidden">
        <span className="absolute -top-3 -right-2 font-display text-crema/10 text-[6rem] leading-none select-none pointer-events-none">✦</span>
        <div className="w-14 h-14 mx-auto mb-3 bg-dorado flex items-center justify-center border-2 border-morado-dark">
          <Crown size={28} strokeWidth={1.8} className="text-tierra-dark" />
        </div>
        <h3 className="font-display text-crema text-2xl tracking-wide uppercase leading-none">{membresia.nombre}</h3>
      </div>

      {/* Switch */}
      <div className="px-7 pt-6 flex items-center justify-center gap-3">
        <span className={`font-sans text-[0.7rem] tracking-widest uppercase transition-colors ${billing === "mensual" ? "text-tierra-dark font-semibold" : "text-tierra/40"}`}>
          Mensual
        </span>
        <button
          onClick={() => setBilling(b => b === "mensual" ? "anual" : "mensual")}
          className="relative w-12 h-6 bg-verde border-2 border-morado-dark shrink-0"
          aria-label="Cambiar facturación"
        >
          <span className={`absolute top-0.5 w-4 h-4 bg-dorado transition-all duration-300 ${billing === "anual" ? "left-6" : "left-0.5"}`} />
        </button>
        <span className={`font-sans text-[0.7rem] tracking-widest uppercase transition-colors ${billing === "anual" ? "text-tierra-dark font-semibold" : "text-tierra/40"}`}>
          Anual
        </span>
      </div>

      {/* Precio */}
      <div className="px-7 pt-4 pb-6 text-center">
        <div className="flex items-baseline justify-center gap-2">
          <span className="font-display text-6xl text-tierra-dark">{membresia.precio[billing]}</span>
          <span className="font-sans text-sm text-tierra/45 tracking-wide">/{billing === "mensual" ? "mes" : "año"}</span>
        </div>
        {billing === "anual"
          ? <p className="font-sans text-[0.7rem] text-verde font-semibold tracking-widest uppercase mt-1.5">✦ Te regalás 2 meses</p>
          : <p className="font-sans text-[0.7rem] text-tierra/40 tracking-widest uppercase mt-1.5">Anual: 2 meses gratis</p>
        }
      </div>

      {/* CTA */}
      <div className="px-7 pb-7">
        <button className="w-full bg-dorado text-tierra-dark font-sans font-bold text-[0.72rem] py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-dorado-light transition-colors">
          ✦ Suscribirme ahora
        </button>
        <p className="font-sans text-[0.68rem] text-tierra/45 text-center tracking-wide mt-3">
          Cancelás cuando quieras · Sin compromisos
        </p>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      {/* ── HERO con oferta ── */}
      <section className="bg-verde relative overflow-hidden">
        {/* Fondo verde con animación CSS liviana */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #1a4d2e 0%, #2d6a3e 35%, #3d7a47 70%, #2d6a3e 100%)" }} />
        <div className="absolute inset-0 animate-gradient-breathe" style={{ background: "linear-gradient(180deg, #2d6a3e 0%, #3d7a47 35%, #5fa569 70%, #3d7a47 100%)" }} />
        <div className="absolute inset-x-0 h-[40%] animate-shimmer-fall" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)" }} />
        <Stickers preset="bosque" blend="soft-light" />
        <div className="absolute inset-0 bg-[#14362a]/30 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none select-none">
          <span className="absolute top-8 right-[8%] font-display text-crema/10 text-[9rem] leading-none">✦</span>
          <span className="absolute bottom-2 left-6 font-display text-crema/5 text-[7rem] leading-none">◉</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">

            {/* Texto */}
            <div className="text-center lg:text-left">
              <span className="inline-block font-sans text-[0.62rem] text-tierra-dark bg-dorado px-3 py-1.5 border-2 border-morado-dark tracking-[0.3em] uppercase mb-6">
                Membresía mensual
              </span>
              <h1 className="font-display uppercase text-[clamp(2.8rem,8vw,5.5rem)] text-crema leading-[0.95] tracking-wide mb-5">
                Sumate al<br /><span className="text-dorado">Círculo</span>
              </h1>
              <p className="font-sans italic text-crema text-lg sm:text-xl max-w-md mx-auto lg:mx-0 leading-relaxed drop-shadow-[0_1px_8px_rgba(20,54,42,0.5)] mb-7">
                {membresia.subtitulo}. Rituales, contenidos exclusivos y comunidad — todos los meses, directo a vos.
              </p>
              {/* Highlights rápidos */}
              <ul className="inline-flex flex-col gap-2.5 text-left">
                {membresia.beneficios.slice(0, 4).map((b, i) => (
                  <li key={i} className="flex items-center gap-2.5 font-sans text-[15px] text-crema tracking-wide">
                    <Check size={15} className="text-dorado shrink-0" strokeWidth={2.5} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card de precio */}
            <RevealOnScroll direction="up">
              <div className="max-w-sm mx-auto w-full">
                <PrecioCard idAnchor="suscribirme" />
              </div>
            </RevealOnScroll>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-dorado/40 to-transparent" />
      </section>

      {/* ── TODO LO QUE INCLUYE ── */}
      <section className="bg-crema py-16 sm:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <span className="font-sans text-[0.6rem] text-tierra/50 tracking-[0.4em] uppercase block mb-4">Tu membresía incluye</span>
              <h2 className="font-display uppercase text-[clamp(2rem,5vw,3.5rem)] text-tierra-dark leading-none tracking-wide">
                Todo lo que recibís
              </h2>
            </div>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4 max-w-2xl mx-auto">
            {membresia.beneficios.map((b, i) => (
              <RevealOnScroll key={i} delay={i * 50}>
                <div className="flex items-start gap-3 border-b border-morado/10 pb-4">
                  <div className="w-6 h-6 bg-verde flex items-center justify-center shrink-0">
                    <Check size={13} className="text-crema" strokeWidth={3} />
                  </div>
                  <span className="font-sans text-[15px] sm:text-base text-tierra-dark/85 tracking-wide leading-snug">{b}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA: VIDEO ── */}
      <section className="bg-crema-dark py-16 sm:py-20 px-6 relative overflow-hidden">
        <DecorIcons preset="suave" />
        <div className="max-w-4xl mx-auto relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-10">
              <span className="font-sans text-[0.6rem] text-tierra/50 tracking-[0.4em] uppercase block mb-4">Antes de suscribirte</span>
              <h2 className="font-display uppercase text-[clamp(2rem,5vw,3.5rem)] text-tierra-dark leading-none tracking-wide">
                Mirá cómo funciona
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <div className="relative border-4 border-morado-dark block-shadow overflow-hidden bg-morado-dark" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://player.vimeo.com/video/76979871?title=0&byline=0&portrait=0&color=F5C842"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Cómo funciona la membresía — La Reina de Bastos"
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── MÓDULOS (qué llega cada mes) ── */}
      <section className="bg-crema py-16 sm:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="mb-12">
              <span className="font-sans text-[0.6rem] text-tierra/50 tracking-[0.4em] uppercase block mb-4">Cada mes en tu bandeja</span>
              <h2 className="font-display uppercase text-[clamp(2rem,5vw,3.5rem)] text-tierra-dark leading-none tracking-wide">
                El contenido<br />de la membresía
              </h2>
            </div>
          </RevealOnScroll>
          <div className="space-y-6">
            {modulos.map((m, i) => (
              <RevealOnScroll key={i} delay={i * 80}>
                <div className={`grid lg:grid-cols-[1fr_2fr] border-2 border-morado-dark block-shadow overflow-hidden ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                  <div className={`bg-gradient-to-br ${m.gradient} flex flex-col justify-between p-8 min-h-[180px] ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <span className="font-display text-white/20 text-6xl leading-none">{m.num}</span>
                    <h3 className="font-display text-white text-2xl uppercase tracking-wide leading-none">{m.titulo}</h3>
                  </div>
                  <div className={`bg-crema p-8 ${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    <p className="font-sans text-tierra-dark/80 text-[15px] sm:text-base leading-relaxed tracking-wide mb-5">{m.desc}</p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                      {m.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2.5 font-sans text-[15px] text-tierra-dark/75 tracking-wide">
                          <Check size={13} className="text-verde shrink-0" strokeWidth={2.5} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUÉ SUMARTE ── */}
      <section className="bg-verde py-16 sm:py-20 px-6 relative overflow-hidden">
        <DecorIcons preset="festivo" />
        <div className="max-w-6xl mx-auto relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <span className="font-sans text-[0.6rem] text-dorado tracking-[0.4em] uppercase block mb-4">Lo que se despierta en vos</span>
              <h2 className="font-display uppercase text-[clamp(2rem,5vw,3.5rem)] text-crema leading-none tracking-wide">
                Por qué sumarte
              </h2>
            </div>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-3 gap-5">
            {virtudes.map((v, i) => (
              <RevealOnScroll key={i} delay={i * 100}>
                <div className="bg-crema/10 border border-crema/20 p-7 hover:bg-crema/15 hover:border-dorado/40 transition-all group h-full text-center sm:text-left">
                  <span className="font-display text-dorado text-3xl block mb-4 group-hover:scale-110 transition-transform">{v.icon}</span>
                  <h3 className="font-sans font-bold text-crema text-base tracking-wide mb-2">{v.titulo}</h3>
                  <p className="font-sans text-crema/85 text-[15px] leading-relaxed tracking-wide">{v.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-crema py-16 sm:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <RevealOnScroll>
            <h2 className="font-display uppercase text-[clamp(2rem,5vw,3rem)] text-tierra-dark leading-none tracking-wide mb-12">
              Preguntas frecuentes
            </h2>
          </RevealOnScroll>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <RevealOnScroll key={i} delay={i * 50}>
                <div className={`border-2 transition-colors ${openFaq === i ? "border-morado-dark" : "border-morado/15 hover:border-morado/35"}`}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left gap-4">
                    <span className={`font-sans font-semibold text-[15px] tracking-wide transition-colors ${openFaq === i ? "text-tierra-dark" : "text-tierra-dark/70"}`}>
                      {faq.q}
                    </span>
                    <span className={`font-display text-xl shrink-0 transition-all ${openFaq === i ? "text-verde rotate-45" : "text-tierra/30"}`}>+</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="border-t border-morado/10 mx-6" />
                    <p className="px-6 py-4 font-sans text-[15px] text-tierra-dark/75 leading-relaxed tracking-wide">{faq.a}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL (amarillo) con la card ── */}
      <section className="bg-dorado py-16 sm:py-20 px-6 relative overflow-hidden border-t-4 border-morado-dark">
        <DecorIcons preset="festivo" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <RevealOnScroll>
              <div className="text-center lg:text-left">
                <span className="font-display text-tierra-dark/15 text-6xl block mb-2">✦</span>
                <h2 className="font-display uppercase text-[clamp(2.2rem,6vw,4rem)] text-tierra-dark leading-none tracking-wide mb-5">
                  ¿Te sumás?
                </h2>
                <p className="font-sans text-tierra-dark/80 text-base sm:text-lg tracking-wide leading-relaxed max-w-md mx-auto lg:mx-0 mb-7">
                  Empezá tu práctica sostenida hoy. Cancelás cuando quieras, sin compromisos — solo magia mensual garantizada.
                </p>
                <Link href="/servicios" className="inline-block border-2 border-morado-dark text-tierra-dark font-sans font-semibold text-[0.7rem] px-8 py-4 tracking-widest uppercase hover:bg-morado-dark hover:text-crema transition-colors">
                  Ver servicios sueltos
                </Link>
              </div>
            </RevealOnScroll>
            <RevealOnScroll direction="up" delay={120}>
              <div className="max-w-sm mx-auto w-full">
                <PrecioCard />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
