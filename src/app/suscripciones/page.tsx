"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Crown } from "lucide-react";
import Navbar from "~/app/_components/home/Navbar";
import Footer from "~/app/_components/home/Footer";
import RevealOnScroll from "~/app/_components/home/RevealOnScroll";
import ShaderBackground from "~/app/_components/ShaderBackground";
import DecorIcons from "~/app/_components/DecorIcons";

/* ── La membresía (única) ── */
const membresia = {
  nombre: "Círculo de la Reina",
  subtitulo: "Tu práctica sostenida, mes a mes",
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

const virtudes = [
  { icon: "✦", titulo: "Claridad interior",   desc: "Cada mes trabajás una intención concreta. Sin ruido. Sin acumulación. Solo lo que necesitás en ese momento." },
  { icon: "◎", titulo: "Práctica sostenida",  desc: "La magia no es un momento — es un hábito. La membresía te da estructura sin rigidez para sostener tu práctica." },
  { icon: "◈", titulo: "Comunidad real",      desc: "Mujeres que no te van a decir 'todo pasa por algo'. Te van a acompañar en lo que sea con honestidad y presencia." },
  { icon: "◉", titulo: "Ahorro inteligente",  desc: "Descuentos reales en cursos y servicios. Todo lo que de todas formas ibas a hacer — pero con más margen." },
  { icon: "✧", titulo: "Contenido exclusivo", desc: "Rituales, meditaciones y reflexiones que no están en ningún otro lado. Creados solo para el Círculo." },
  { icon: "⋆", titulo: "Acceso prioritario",  desc: "Primero te enterás vos. Nuevos cursos, lanzamientos, eventos y plazas limitadas antes que nadie más." },
];

const modulos = [
  {
    num: "01",
    titulo: "Ritual del mes",
    desc: "Un ritual completo en PDF diseñado para la energía de la luna y la estación. Incluye lista de elementos, pasos detallados, afirmaciones y cierre.",
    items: ["Ritual de luna nueva", "Ritual de luna llena", "Ritual estacional (solsticios y equinoccios)", "Rituales de emergencia emocional"],
    gradient: "from-verde to-[#2d6a45]",
  },
  {
    num: "02",
    titulo: "Newsletter profundo",
    desc: "No es un correo de novedades. Es una reflexión real, honesta, sin positividad tóxica. Sobre espiritualidad encarnada que se vive en lo cotidiano.",
    items: ["Reflexión semanal", "Consejo práctico de la semana", "Recomendación cultural (libro, canción, película)", "Pregunta para tu diario"],
    gradient: "from-dorado via-naranja to-rosa",
  },
  {
    num: "03",
    titulo: "Meditación guiada",
    desc: "Una grabación de audio nueva cada mes. Distintos enfoques: meditaciones de arraigo, visualizaciones creativas, trabajo con chakras, liberación emocional.",
    items: ["Audio MP3 descargable", "Duración: 15 a 30 minutos", "Adaptada al ciclo del mes", "Con música original"],
    gradient: "from-celeste via-morado-light to-morado",
  },
  {
    num: "04",
    titulo: "Sesión grupal en vivo",
    desc: "Un encuentro en vivo por Zoom una vez al mes. Un espacio de práctica colectiva, preguntas reales y conexión genuina. Se graba para las que no pueden asistir.",
    items: ["Zoom en vivo, 1 vez por mes", "Grabación disponible 48hs después", "Temática nueva cada mes", "Espacio de preguntas incluido"],
    gradient: "from-rosa via-morado to-morado-dark",
  },
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

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-verde relative overflow-hidden">
        {/* Fondo psicodélico verde */}
        <ShaderBackground palette="bosque" effect="mesh" speed={0.26} distortion={0.85} swirl={0.7} grain={0.2} opacity={0.95} />
        <div className="absolute inset-0 bg-[#14362a]/30 pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none select-none">
          <span className="absolute top-6 right-12 font-display text-crema/10 text-[10rem] leading-none">✦</span>
          <span className="absolute bottom-0 left-8 font-display text-crema/5 text-[8rem] leading-none">◉</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center">
          <span className="font-sans text-[0.8rem] text-dorado tracking-[0.4em] uppercase block mb-5">
            Membresía · Comunidad · Crecimiento
          </span>
          <h1 className="font-display uppercase text-[clamp(3rem,8vw,6rem)] text-crema leading-none tracking-wide mb-5">
            Suscribite a<br />
            <span className="text-dorado">la magia</span>
          </h1>
          <p className="font-sans italic text-crema text-lg sm:text-xl max-w-lg mx-auto leading-relaxed drop-shadow-[0_1px_8px_rgba(20,54,42,0.5)]">
            Rituales, contenidos exclusivos y comunidad — todos los meses, directo a vos.
          </p>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-dorado/40 to-transparent" />
      </section>

      {/* ── VIDEO EXPLICATIVO ── */}
      <section className="bg-crema py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-10">
              <span className="font-sans text-[0.6rem] text-tierra/50 tracking-[0.4em] uppercase block mb-4">Antes de suscribirte</span>
              <h2 className="font-display uppercase text-[clamp(2rem,5vw,3.5rem)] text-tierra-dark leading-none tracking-wide">
                Mirá cómo funciona
              </h2>
              <p className="font-sans italic text-tierra-dark/70 text-base sm:text-lg mt-3 max-w-md mx-auto leading-relaxed">
                Un recorrido breve por lo que vas a recibir cada mes y cómo aprovecharlo al máximo.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div
              className="relative border-4 border-morado-dark block-shadow overflow-hidden bg-morado-dark"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                src="https://player.vimeo.com/video/76979871?title=0&byline=0&portrait=0&color=F5C842"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Cómo funciona la membresía — La Reina de Bastos"
              />
            </div>
            <p className="font-sans text-xs text-tierra/40 tracking-wide mt-3 text-center">
              Duración: 3 minutos · Actualizamos este video cada temporada
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── VIRTUDES ── */}
      <section className="bg-verde py-20 px-6 relative overflow-hidden">
        <DecorIcons preset="festivo" />
        <div className="max-w-7xl mx-auto relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-14">
              <span className="font-sans text-[0.6rem] text-dorado tracking-[0.4em] uppercase block mb-4">Lo que te llevás</span>
              <h2 className="font-display uppercase text-[clamp(2rem,5vw,3.5rem)] text-crema leading-none tracking-wide">
                Qué se despierta<br />en vos
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {virtudes.map((v, i) => (
              <RevealOnScroll key={i} delay={i * 80}>
                <div className="bg-crema/10 border border-crema/20 p-7 hover:bg-crema/15 hover:border-dorado/40 transition-all group h-full">
                  <span className="font-display text-dorado text-3xl block mb-4 group-hover:scale-110 transition-transform origin-left">
                    {v.icon}
                  </span>
                  <h3 className="font-sans font-bold text-crema text-base tracking-wide mb-2">{v.titulo}</h3>
                  <p className="font-sans text-crema/85 text-[15px] leading-relaxed tracking-wide">{v.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÓDULOS ── */}
      <section className="bg-crema py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="mb-14">
              <span className="font-sans text-[0.6rem] text-tierra/50 tracking-[0.4em] uppercase block mb-4">Cada mes recibís</span>
              <h2 className="font-display uppercase text-[clamp(2rem,5vw,3.5rem)] text-tierra-dark leading-none tracking-wide">
                El contenido de<br />la membresía
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
                    <ul className="space-y-2">
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

      {/* ── LA MEMBRESÍA (única) + SWITCH ── */}
      <section className="bg-crema-dark py-16 px-6 relative overflow-hidden" id="planes">
        <DecorIcons preset="suave" />
        <div className="max-w-2xl mx-auto relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-10">
              <h2 className="font-display uppercase text-[clamp(2rem,5vw,3.5rem)] text-tierra-dark leading-none tracking-wide mb-6">
                Sumate al Círculo
              </h2>

              {/* Switch mensual / anual */}
              <div className="flex items-center justify-center gap-4">
                <span className={`font-sans text-xs tracking-widest uppercase transition-colors ${billing === "mensual" ? "text-tierra-dark font-semibold" : "text-tierra/40"}`}>
                  Mensual
                </span>
                <button
                  onClick={() => setBilling(b => b === "mensual" ? "anual" : "mensual")}
                  className="relative w-14 h-7 bg-verde border-2 border-morado-dark"
                  aria-label="Cambiar facturación"
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-dorado transition-all duration-300 ${billing === "anual" ? "left-7" : "left-0.5"}`} />
                </button>
                <span className={`font-sans text-xs tracking-widest uppercase transition-colors flex items-center gap-2 ${billing === "anual" ? "text-tierra-dark font-semibold" : "text-tierra/40"}`}>
                  Anual
                  <span className="bg-verde text-crema font-sans text-[0.55rem] px-2 py-0.5 tracking-widest uppercase">2 meses gratis</span>
                </span>
              </div>
            </div>
          </RevealOnScroll>

          {/* Card de la membresía */}
          <RevealOnScroll delay={120}>
            <div className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
              {/* Header */}
              <div className="bg-verde px-8 py-7 text-center relative overflow-hidden">
                <span className="absolute -top-3 -right-2 font-display text-crema/10 text-[6rem] leading-none select-none pointer-events-none">✦</span>
                <div className="w-14 h-14 mx-auto mb-4 bg-dorado flex items-center justify-center border-2 border-morado-dark">
                  <Crown size={28} strokeWidth={1.8} className="text-tierra-dark" />
                </div>
                <h3 className="font-display text-crema text-3xl tracking-wide uppercase">{membresia.nombre}</h3>
                <p className="font-sans italic text-crema/85 text-sm mt-1">{membresia.subtitulo}</p>
              </div>

              {/* Precio */}
              <div className="px-8 py-7 border-b border-morado/10 text-center">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="font-display text-6xl text-tierra-dark">{membresia.precio[billing]}</span>
                  <span className="font-sans text-sm text-tierra/45 tracking-wide">/{billing === "mensual" ? "mes" : "año"}</span>
                </div>
                {billing === "anual" && (
                  <p className="font-sans text-[0.7rem] text-verde tracking-widest uppercase mt-2">✦ Ahorrás 2 meses</p>
                )}
              </div>

              {/* Beneficios */}
              <div className="px-8 py-7">
                <p className="font-sans text-[0.6rem] text-tierra/40 tracking-[0.3em] uppercase mb-4 text-center">Todo lo que incluye</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {membresia.beneficios.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check size={15} className="text-verde shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="font-sans text-[15px] text-tierra-dark/85 tracking-wide leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="px-8 pb-8">
                <button className="w-full bg-verde text-crema font-sans font-bold text-[0.7rem] py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-verde-light transition-colors">
                  ✦ Suscribirme ahora
                </button>
                <p className="font-sans text-[0.65rem] text-tierra/45 text-center tracking-wide mt-3">
                  Cancelás cuando quieras. Sin compromisos.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-crema py-20 px-6">
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
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                  >
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

      {/* ── ¿TE SUMÁS? (amarillo) ── */}
      <section className="bg-dorado py-20 px-6 relative overflow-hidden border-t-4 border-morado-dark">
        <DecorIcons preset="festivo" />
        <div className="max-w-2xl mx-auto text-center space-y-6 relative z-10">
          <RevealOnScroll>
            <span className="font-display text-tierra-dark/15 text-6xl block">✦</span>
            <h2 className="font-display uppercase text-[clamp(2.2rem,6vw,4rem)] text-tierra-dark leading-none tracking-wide">
              ¿Te sumás?
            </h2>
            <p className="font-sans text-tierra-dark/80 text-base sm:text-lg tracking-wide leading-relaxed max-w-md mx-auto">
              Cancelás cuando quieras. Sin compromisos. Solo magia mensual garantizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => document.getElementById("planes")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-verde text-crema font-sans font-bold text-[0.7rem] px-10 py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-verde-light transition-colors"
              >
                ✦ Sumarme al Círculo
              </button>
              <Link href="/servicios" className="border-2 border-morado-dark text-tierra-dark font-sans font-semibold text-[0.7rem] px-8 py-4 tracking-widest uppercase hover:bg-morado-dark hover:text-crema transition-colors">
                Ver servicios
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
    </>
  );
}
