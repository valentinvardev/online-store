"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, Moon, Star, Sparkles } from "lucide-react";
import Navbar from "~/app/_components/home/Navbar";
import Footer from "~/app/_components/home/Footer";
import RevealOnScroll from "~/app/_components/home/RevealOnScroll";
import ShaderBackground from "~/app/_components/ShaderBackground";
import DecorIcons from "~/app/_components/DecorIcons";

/* ── Planes ── */
const planes = [
  {
    id: "luna",
    nombre: "Luna",
    icon: <Moon size={28} strokeWidth={1.5} />,
    precio: { mensual: "$9", anual: "$79" },
    subtitulo: "Para empezar el camino",
    desc: "Acceso a recursos básicos, newsletter premium y comunidad.",
    color: "border-morado/25",
    colorActivo: "border-morado-dark",
    acento: "text-morado",
    bgIcono: "bg-morado/10 text-morado",
    ctaClass: "border-2 border-morado text-morado hover:bg-morado hover:text-crema",
    beneficios: [
      { texto: "Newsletter premium semanal",  incluido: true },
      { texto: "Ritual del mes en PDF",        incluido: true },
      { texto: "Acceso a comunidad privada",   incluido: true },
      { texto: "Meditación guiada mensual",    incluido: true },
      { texto: "Descuentos en cursos (10%)",   incluido: false },
      { texto: "Sesión grupal mensual",        incluido: false },
      { texto: "Acceso anticipado a cursos",   incluido: false },
      { texto: "Consulta mensual 1 a 1",       incluido: false },
    ],
  },
  {
    id: "reina",
    nombre: "Reina",
    icon: <Star size={28} strokeWidth={1.5} />,
    precio: { mensual: "$19", anual: "$159" },
    subtitulo: "La experiencia completa",
    desc: "Todo lo del plan Luna más descuentos, sesiones grupales y contenido exclusivo.",
    color: "border-dorado/35",
    colorActivo: "border-dorado",
    acento: "text-dorado-dark",
    bgIcono: "bg-dorado/15 text-dorado-dark",
    ctaClass: "bg-dorado text-tierra-dark border-2 border-morado-dark hover:bg-dorado-light",
    destacado: true,
    beneficios: [
      { texto: "Newsletter premium semanal",  incluido: true },
      { texto: "Ritual del mes en PDF",        incluido: true },
      { texto: "Acceso a comunidad privada",   incluido: true },
      { texto: "Meditación guiada mensual",    incluido: true },
      { texto: "Descuentos en cursos (20%)",   incluido: true },
      { texto: "Sesión grupal mensual",        incluido: true },
      { texto: "Acceso anticipado a cursos",   incluido: false },
      { texto: "Consulta mensual 1 a 1",       incluido: false },
    ],
  },
  {
    id: "sacerdotisa",
    nombre: "Sacerdotisa",
    icon: <Sparkles size={28} strokeWidth={1.5} />,
    precio: { mensual: "$39", anual: "$319" },
    subtitulo: "Para las que van profundo",
    desc: "Acceso completo: sesiones 1 a 1, anticipos exclusivos y acompañamiento personalizado.",
    color: "border-rosa/25",
    colorActivo: "border-rosa",
    acento: "text-rosa",
    bgIcono: "bg-rosa/10 text-rosa",
    ctaClass: "border-2 border-rosa text-rosa hover:bg-rosa hover:text-crema",
    beneficios: [
      { texto: "Newsletter premium semanal",      incluido: true },
      { texto: "Ritual del mes en PDF",            incluido: true },
      { texto: "Acceso a comunidad privada",       incluido: true },
      { texto: "Meditación guiada mensual",        incluido: true },
      { texto: "Descuentos en cursos (30%)",       incluido: true },
      { texto: "Sesión grupal mensual",            incluido: true },
      { texto: "Acceso anticipado a cursos",       incluido: true },
      { texto: "Consulta mensual 1 a 1 (30 min)", incluido: true },
    ],
  },
];

const virtudes = [
  { icon: "✦", titulo: "Claridad interior",     desc: "Cada mes trabajás una intención concreta. Sin ruido. Sin acumulación. Solo lo que necesitás en ese momento." },
  { icon: "◎", titulo: "Práctica sostenida",    desc: "La magia no es un momento — es un hábito. La membresía te da estructura sin rigidez para sostener tu práctica." },
  { icon: "◈", titulo: "Comunidad real",        desc: "Mujeres que no te van a decir 'todo pasa por algo'. Te van a acompañar en lo que sea con honestidad y presencia." },
  { icon: "◉", titulo: "Ahorro inteligente",    desc: "Descuentos reales en cursos y servicios. Todo lo que de todas formas ibas a hacer — pero con más margen." },
  { icon: "✧", titulo: "Contenido exclusivo",   desc: "Rituales, meditaciones y reflexiones que no están en ningún otro lado. Creados específicamente para membresías." },
  { icon: "⋆", titulo: "Acceso prioritario",    desc: "Primero te enterás vos. Nuevos cursos, lanzamientos, eventos y plazas limitadas antes que nadie más." },
];

const modulos = [
  {
    num: "01",
    titulo: "Ritual del mes",
    desc: "Un ritual completo en PDF diseñado para la energía de la luna y la estación. Incluye lista de elementos, pasos detallados, afirmaciones y cierre.",
    items: ["Ritual de luna nueva", "Ritual de luna llena", "Ritual estacional (solsticios y equinoccios)", "Rituales de emergencia emocional"],
    gradient: "from-morado-dark to-morado-mid",
  },
  {
    num: "02",
    titulo: "Newsletter profundo",
    desc: "No es un correo de novedades. Es una reflexión real, honesta, sin positividad tóxica. Sobre espiritualidad que se siente en el cuerpo y se vive en lo cotidiano.",
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
    titulo: "Sesión grupal (Reina y Sacerdotisa)",
    desc: "Un encuentro en vivo por Zoom una vez al mes. Un espacio de práctica colectiva, preguntas reales y conexión genuina. Se graba para las que no pueden asistir.",
    items: ["Zoom en vivo, 1 vez por mes", "Grabación disponible 48hs después", "Temática nueva cada mes", "Espacio de preguntas incluido"],
    gradient: "from-rosa via-morado to-morado-dark",
  },
];

const faqs = [
  { q: "¿Puedo cancelar en cualquier momento?",       a: "Sí. Sin cargos extras. El acceso se mantiene hasta el final del período ya pagado." },
  { q: "¿Qué diferencia hay entre mensual y anual?",  a: "El plan anual equivale a 10 meses — te regalás dos. Se cobra todo junto al inicio." },
  { q: "¿Cómo recibo los contenidos?",                a: "Por email y a través de la comunidad privada. Al suscribirte tenés acceso inmediato." },
  { q: "¿Puedo cambiar de plan?",                     a: "Sí, cuando quieras. El cambio se aplica desde el próximo ciclo de facturación." },
  { q: "¿Las sesiones grupales son en vivo?",         a: "Sí, por Zoom una vez al mes. Si no podés asistir, se graban y quedan en la comunidad." },
  { q: "¿La consulta 1 a 1 del plan Sacerdotisa es de tarot?", a: "Podés elegirla: tarot, astrología o charla de acompañamiento espiritual. 30 minutos por mes." },
];

export default function SuscripcionesPage() {
  const [billing, setBilling] = useState<"mensual" | "anual">("mensual");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-morado-dark relative overflow-hidden">
        {/* Fondo psicodélico animado (Paper Shaders) */}
        <ShaderBackground palette="mistico" speed={0.28} distortion={0.85} swirl={0.7} grain={0.22} opacity={0.9} />
        {/* Oscurecedor para legibilidad del texto */}
        <div className="absolute inset-0 bg-morado-dark/35 pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none select-none">
          <span className="absolute top-6 right-12 font-display text-dorado/10 text-[10rem] leading-none">✦</span>
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
          <p className="font-sans italic text-crema/45 text-lg max-w-lg mx-auto leading-relaxed">
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
              <span className="font-sans text-[0.8rem] text-tierra/35 tracking-[0.4em] uppercase block mb-4">Antes de suscribirte</span>
              <h2 className="font-display uppercase text-[clamp(3rem,5vw,3.5rem)] text-tierra-dark leading-none tracking-wide">
                Mirá cómo funciona
              </h2>
              <p className="font-sans italic text-tierra/45 text-base mt-3 max-w-md mx-auto leading-relaxed">
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
            <p className="font-sans text-[13px] text-tierra/30 tracking-wide mt-3 text-center">
              Duración: 3 minutos · Actualizamos este video cada temporada
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── VIRTUDES / BENEFICIOS ── */}
      <section className="bg-morado-dark py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-14">
              <span className="font-sans text-[0.8rem] text-dorado tracking-[0.4em] uppercase block mb-4">Lo que te llevás</span>
              <h2 className="font-display uppercase text-[clamp(3rem,5vw,3.5rem)] text-crema leading-none tracking-wide">
                Qué se despierta<br />en vos
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {virtudes.map((v, i) => (
              <RevealOnScroll key={i} delay={i * 80}>
                <div className="bg-crema/5 border border-dorado/12 p-7 hover:border-dorado/30 hover:bg-crema/8 transition-all group">
                  <span className="font-display text-dorado text-3xl block mb-4 group-hover:scale-110 transition-transform origin-left">
                    {v.icon}
                  </span>
                  <h3 className="font-sans font-bold text-crema text-sm tracking-wide mb-2">{v.titulo}</h3>
                  <p className="font-sans text-crema/40 text-[13px] leading-relaxed tracking-wide">{v.desc}</p>
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
              <span className="font-sans text-[0.8rem] text-tierra/35 tracking-[0.4em] uppercase block mb-4">Cada mes recibís</span>
              <h2 className="font-display uppercase text-[clamp(3rem,5vw,3.5rem)] text-tierra-dark leading-none tracking-wide">
                El contenido de<br />la membresía
              </h2>
            </div>
          </RevealOnScroll>

          <div className="space-y-6">
            {modulos.map((m, i) => (
              <RevealOnScroll key={i} delay={i * 80}>
                <div className={`grid lg:grid-cols-[1fr_2fr] border-2 border-morado-dark block-shadow overflow-hidden ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                  {/* Visual */}
                  <div className={`bg-gradient-to-br ${m.gradient} flex flex-col justify-between p-8 min-h-[180px] ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <span className="font-display text-white/15 text-6xl leading-none">{m.num}</span>
                    <h3 className="font-display text-white text-2xl uppercase tracking-wide leading-none">{m.titulo}</h3>
                  </div>
                  {/* Info */}
                  <div className={`bg-crema p-8 ${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    <p className="font-sans text-tierra/60 text-sm leading-relaxed tracking-wide mb-5">{m.desc}</p>
                    <ul className="space-y-2">
                      {m.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2.5 font-sans text-[13px] text-tierra/65 tracking-wide">
                          <Check size={12} className="text-verde shrink-0" strokeWidth={2.5} />
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

      {/* ── TOGGLE BILLING ── */}
      <div className="bg-crema border-y border-morado/8 sticky top-0 z-10" id="planes">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-center gap-4">
          <span className={`font-sans text-[13px] tracking-widest uppercase transition-colors ${billing === "mensual" ? "text-tierra-dark font-semibold" : "text-tierra/35"}`}>
            Mensual
          </span>
          <button
            onClick={() => setBilling(b => b === "mensual" ? "anual" : "mensual")}
            className="relative w-14 h-7 bg-morado-dark border-2 border-morado-dark"
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-dorado transition-all duration-300 ${billing === "anual" ? "left-7" : "left-0.5"}`} />
          </button>
          <span className={`font-sans text-[13px] tracking-widest uppercase transition-colors flex items-center gap-2 ${billing === "anual" ? "text-tierra-dark font-semibold" : "text-tierra/35"}`}>
            Anual
            <span className="bg-verde text-crema font-sans text-[0.75rem] px-2 py-0.5 tracking-widest uppercase">2 meses gratis</span>
          </span>
        </div>
      </div>

      {/* ── PLANES ── */}
      <section className="bg-crema-dark py-16 px-6 relative overflow-hidden">
        <DecorIcons preset="festivo" />
        <div className="max-w-6xl mx-auto relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="font-display uppercase text-[clamp(3rem,5vw,3.5rem)] text-tierra-dark leading-none tracking-wide">
                Elegí tu plan
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-6">
            {planes.map((plan, i) => (
              <RevealOnScroll key={plan.id} delay={i * 100}>
                <div className={`relative border-2 flex flex-col bg-crema ${plan.destacado ? `${plan.colorActivo} block-shadow` : `${plan.color} hover:${plan.colorActivo} transition-colors`}`}>
                  {plan.destacado && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-dorado text-tierra-dark font-sans font-bold text-[0.78rem] px-4 py-1 tracking-widest uppercase border-2 border-morado-dark whitespace-nowrap">
                      ✦ Más popular
                    </div>
                  )}

                  <div className="p-7 border-b border-morado/10">
                    <div className={`w-12 h-12 flex items-center justify-center mb-4 ${plan.bgIcono}`}>{plan.icon}</div>
                    <h3 className={`font-display text-3xl tracking-wide uppercase ${plan.acento} mb-1`}>{plan.nombre}</h3>
                    <p className="font-sans italic text-tierra/45 text-sm mb-3">{plan.subtitulo}</p>
                    <p className="font-sans text-tierra/50 text-[13px] leading-relaxed tracking-wide">{plan.desc}</p>
                  </div>

                  <div className="px-7 py-5 border-b border-morado/10">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-5xl text-tierra-dark">{plan.precio[billing]}</span>
                      <span className="font-sans text-[13px] text-tierra/35 tracking-wide">/{billing === "mensual" ? "mes" : "año"}</span>
                    </div>
                    {billing === "anual" && (
                      <p className="font-sans text-[0.8rem] text-verde tracking-wide mt-1">✦ Ahorrás 2 meses</p>
                    )}
                  </div>

                  <div className="px-7 py-6 flex-1">
                    <ul className="space-y-3">
                      {plan.beneficios.map((b, j) => (
                        <li key={j} className="flex items-start gap-3">
                          {b.incluido
                            ? <Check size={14} className="text-verde shrink-0 mt-0.5" strokeWidth={2.5} />
                            : <X size={14} className="text-tierra/20 shrink-0 mt-0.5" strokeWidth={2} />
                          }
                          <span className={`font-sans text-[13px] tracking-wide leading-snug ${b.incluido ? "text-tierra/70" : "text-tierra/25 line-through"}`}>
                            {b.texto}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="px-7 pb-7">
                    <button className={`w-full font-sans font-semibold text-[0.75rem] py-3.5 tracking-widest uppercase transition-colors block-shadow-sm ${plan.ctaClass}`}>
                      ✦ Suscribirme — {plan.nombre}
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-crema py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <RevealOnScroll>
            <h2 className="font-display uppercase text-[clamp(3rem,5vw,3rem)] text-tierra-dark leading-none tracking-wide mb-12">
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
                    <span className={`font-sans font-semibold text-sm tracking-wide transition-colors ${openFaq === i ? "text-tierra-dark" : "text-tierra/65"}`}>
                      {faq.q}
                    </span>
                    <span className={`font-display text-xl shrink-0 transition-all ${openFaq === i ? "text-morado rotate-45" : "text-tierra/25"}`}>+</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="border-t border-morado/10 mx-6" />
                    <p className="px-6 py-4 font-sans text-sm text-tierra/55 leading-relaxed tracking-wide">{faq.a}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-morado-dark py-20 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <RevealOnScroll>
            <span className="font-display text-dorado/20 text-6xl block">✦</span>
            <h2 className="font-display uppercase text-[clamp(3rem,5vw,3.5rem)] text-crema leading-none tracking-wide">
              ¿Te sumás?
            </h2>
            <p className="font-sans text-crema/40 text-sm tracking-wide leading-relaxed max-w-sm mx-auto">
              Cancelás cuando quieras. Sin compromisos. Solo magia mensual garantizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => document.getElementById("planes")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-dorado text-tierra-dark font-sans font-semibold text-[0.8rem] px-8 py-4 tracking-widest uppercase border-2 border-crema/20 block-shadow hover:bg-dorado-light transition-colors"
              >
                ✦ Ver planes
              </button>
              <Link href="/servicios" className="border-2 border-crema/15 text-crema/40 font-sans text-[0.8rem] px-8 py-4 tracking-widest uppercase hover:border-crema/35 hover:text-crema/60 transition-colors">
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
