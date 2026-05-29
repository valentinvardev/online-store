"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Clock, Video, Bell, BellOff } from "lucide-react";
import Navbar from "~/app/_components/home/Navbar";
import Footer from "~/app/_components/home/Footer";
import CalendarioReserva from "./_components/CalendarioReserva";

/* ── Datos de servicios ── */
const servicios = [
  {
    id: "tarot",
    nombre: "Lectura de Tarot",
    subtitulo: "Una mirada al momento presente",
    precio: "desde $45",
    duracion: "60 min",
    formato: "Zoom en vivo",
    gradient: "from-morado-dark via-morado-mid to-morado",
    acento: "text-morado",
    borde: "border-morado",
    bg: "bg-morado/5",
  },
  {
    id: "lectura-extendida",
    nombre: "Lectura Extendida",
    subtitulo: "Más profundidad y tiempo",
    precio: "desde $70",
    duracion: "90 min",
    formato: "Zoom en vivo",
    gradient: "from-[#0f2744] via-[#1a3a6b] to-celeste",
    acento: "text-celeste",
    borde: "border-celeste",
    bg: "bg-celeste/5",
  },
  {
    id: "ritual",
    nombre: "Ritual Personalizado",
    subtitulo: "Diseñado solo para vos",
    precio: "desde $65",
    duracion: "Proceso 7 días",
    formato: "Asincrónico",
    gradient: "from-[#6b0f3a] via-rosa to-[#ff9a5c]",
    acento: "text-rosa",
    borde: "border-rosa",
    bg: "bg-rosa/5",
  },
  {
    id: "astrologia",
    nombre: "Consulta Astrológica",
    subtitulo: "Tu carta natal como mapa",
    precio: "desde $80",
    duracion: "60 min + informe",
    formato: "Zoom en vivo",
    gradient: "from-[#0a0015] via-morado-dark to-morado-mid",
    acento: "text-dorado-dark",
    borde: "border-dorado",
    bg: "bg-dorado/5",
  },
  {
    id: "bundle",
    nombre: "Bundle Tarot + Ritual",
    subtitulo: "La combinación más completa",
    precio: "$100",
    duracion: "60 min + 7 días",
    formato: "Zoom + guía",
    gradient: "from-tierra-dark via-[#6b2d00] to-dorado",
    acento: "text-tierra",
    borde: "border-tierra",
    bg: "bg-tierra/5",
  },
  {
    id: "cierre",
    nombre: "Sesión de Cierre",
    subtitulo: "Para terminar un ciclo",
    precio: "desde $55",
    duracion: "75 min",
    formato: "Zoom en vivo",
    gradient: "from-morado-dark via-[#3b0764] to-rosa",
    acento: "text-morado-light",
    borde: "border-morado-light",
    bg: "bg-morado/5",
  },
];


const inputClass =
  "w-full bg-white border-2 border-morado/15 px-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/25 focus:outline-none focus:border-morado transition-colors";
const labelClass = "block font-sans text-[0.6rem] text-tierra/50 tracking-widest uppercase mb-1.5";

const STEPS = ["Elegí tu sesión", "Tus datos", "Coordinemos"];

export default function ReservasPage() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [servicioId, setServicioId] = useState<string>("");
  const [form, setForm] = useState({
    nombre: "", email: "", whatsapp: "", pais: "",
    fecha: "", hora: "", mensaje: "",
  });
  const [recordatorio, setRecordatorio] = useState(true);

  useEffect(() => {
    const s = searchParams.get("servicio");
    if (s) setServicioId(s);
  }, [searchParams]);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const servicio = servicios.find((s) => s.id === servicioId);

  const canNext = step === 0
    ? !!servicioId
    : step === 1
    ? !!form.nombre && !!form.email
    : !!form.fecha && !!form.hora;

  const handleSubmit = () => setDone(true);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="bg-morado-dark border-b border-dorado/20">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 font-sans text-[0.62rem] text-crema/30 hover:text-dorado tracking-widest uppercase transition-colors mb-6"
          >
            <ArrowLeft size={12} /> Volver a servicios
          </Link>
          <h1 className="font-display uppercase text-[clamp(2.5rem,7vw,4.5rem)] text-crema leading-none tracking-wide">
            Reservá tu<br />
            <span className="text-dorado">sesión</span>
          </h1>
          <p className="font-sans italic text-crema/40 text-base mt-4 leading-relaxed">
            Tres pasos simples. Te escribo en menos de 24 horas para confirmar.
          </p>
        </div>
      </div>

      {/* Stepper */}
      {!done && (
        <div className="bg-crema border-b-2 border-morado/10 sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-6 py-5">
            <div className="flex items-center gap-0">
              {STEPS.map((label, i) => (
                <div key={i} className="flex items-center flex-1 last:flex-none">
                  {/* Círculo */}
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 border-2 flex items-center justify-center transition-all ${
                      i < step
                        ? "bg-morado-dark border-morado-dark"
                        : i === step
                        ? "bg-dorado border-dorado"
                        : "bg-crema border-morado/20"
                    }`}>
                      {i < step ? (
                        <Check size={13} className="text-crema" strokeWidth={2.5} />
                      ) : (
                        <span className={`font-sans font-bold text-[0.65rem] ${i === step ? "text-tierra-dark" : "text-tierra/30"}`}>
                          {i + 1}
                        </span>
                      )}
                    </div>
                    <span className={`font-sans text-[0.55rem] tracking-widest uppercase whitespace-nowrap hidden sm:block ${
                      i === step ? "text-tierra-dark font-semibold" : "text-tierra/30"
                    }`}>
                      {label}
                    </span>
                  </div>
                  {/* Línea */}
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 transition-all ${i < step ? "bg-morado-dark" : "bg-morado/10"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contenido */}
      <div className="bg-crema min-h-[60vh] py-12 px-6">
        <div className="max-w-3xl mx-auto">

          {/* ── CONFIRMACIÓN ── */}
          {done ? (
            <div className="text-center py-20 space-y-6">
              <div className="w-20 h-20 bg-dorado border-4 border-morado-dark block-shadow flex items-center justify-center mx-auto">
                <Check size={32} className="text-tierra-dark" strokeWidth={2.5} />
              </div>
              <h2 className="font-display uppercase text-[clamp(2rem,6vw,3.5rem)] text-tierra-dark leading-none tracking-wide">
                ¡Reserva recibida!
              </h2>
              <p className="font-sans text-tierra/55 text-sm tracking-wide max-w-sm mx-auto leading-relaxed">
                Recibí tu solicitud para <strong className="text-tierra-dark">{servicio?.nombre}</strong> el{" "}
              <strong className="text-tierra-dark">
                {form.fecha ? new Date(form.fecha + "T12:00:00").toLocaleDateString("es-AR", { weekday:"long", day:"numeric", month:"long" }) : ""}
              </strong>{" "}a las <strong className="text-tierra-dark">{form.hora}hs</strong>.
              {recordatorio && (
                <span> Te enviamos un recordatorio a <strong className="text-tierra-dark">{form.email}</strong> el día anterior.</span>
              )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Link href="/servicios" className="bg-morado-dark text-crema font-sans font-semibold text-[0.65rem] px-8 py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-morado transition-colors">
                  Ver otros servicios
                </Link>
                <Link href="/" className="border-2 border-morado/20 text-tierra/50 font-sans text-[0.65rem] px-8 py-4 tracking-widest uppercase hover:border-morado/40 hover:text-tierra transition-colors">
                  Volver al inicio
                </Link>
              </div>
            </div>

          /* ── PASO 1: ELEGÍ EL SERVICIO ── */
          ) : step === 0 ? (
            <div>
              <h2 className="font-display uppercase text-3xl text-tierra-dark tracking-wide mb-2">
                ¿Qué sesión querés reservar?
              </h2>
              <p className="font-sans text-tierra/40 text-sm tracking-wide mb-8">
                Hacé clic en la sesión que te interesa.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {servicios.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setServicioId(s.id)}
                    className={`text-left border-2 p-5 transition-all group ${
                      servicioId === s.id
                        ? `${s.borde} ${s.bg} shadow-lg`
                        : "border-morado/15 bg-white hover:border-morado/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      {/* Mini visual */}
                      <div className={`w-12 h-12 bg-gradient-to-br ${s.gradient} flex items-center justify-center shrink-0`}>
                        <span className="text-white/70 text-lg">✦</span>
                      </div>
                      {/* Check */}
                      <div className={`w-5 h-5 border-2 flex items-center justify-center shrink-0 transition-all ${
                        servicioId === s.id ? "bg-morado-dark border-morado-dark" : "border-morado/20"
                      }`}>
                        {servicioId === s.id && <Check size={11} className="text-crema" strokeWidth={3} />}
                      </div>
                    </div>
                    <p className={`font-sans font-bold text-sm tracking-wide mb-0.5 transition-colors ${
                      servicioId === s.id ? s.acento : "text-tierra-dark group-hover:text-morado"
                    }`}>
                      {s.nombre}
                    </p>
                    <p className="font-sans italic text-tierra/40 text-xs mb-3">{s.subtitulo}</p>
                    <div className="flex flex-wrap items-center gap-3 font-sans text-[0.62rem] text-tierra/45 tracking-wide">
                      <span className="flex items-center gap-1"><Clock size={10} strokeWidth={1.5} />{s.duracion}</span>
                      <span className="flex items-center gap-1"><Video size={10} strokeWidth={1.5} />{s.formato}</span>
                      <span className={`ml-auto font-bold text-sm ${servicioId === s.id ? s.acento : "text-tierra/60"}`}>
                        {s.precio}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          /* ── PASO 2: TUS DATOS ── */
          ) : step === 1 ? (
            <div>
              <h2 className="font-display uppercase text-3xl text-tierra-dark tracking-wide mb-2">
                Tus datos
              </h2>
              <p className="font-sans text-tierra/40 text-sm tracking-wide mb-8">
                Solo lo necesario para poder contactarte.
              </p>

              {/* Servicio seleccionado (resumen) */}
              {servicio && (
                <div className={`flex items-center gap-4 border-2 ${servicio.borde} ${servicio.bg} p-4 mb-8`}>
                  <div className={`w-10 h-10 bg-gradient-to-br ${servicio.gradient} flex items-center justify-center shrink-0`}>
                    <span className="text-white/70">✦</span>
                  </div>
                  <div>
                    <p className={`font-sans font-bold text-sm ${servicio.acento}`}>{servicio.nombre}</p>
                    <p className="font-sans text-[0.65rem] text-tierra/40 tracking-wide">{servicio.duracion} · {servicio.precio}</p>
                  </div>
                  <button
                    onClick={() => setStep(0)}
                    className="ml-auto font-sans text-[0.58rem] text-tierra/35 hover:text-morado tracking-widest uppercase transition-colors"
                  >
                    Cambiar
                  </button>
                </div>
              )}

              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Nombre completo <span className="text-rosa">*</span></label>
                    <input
                      type="text" required placeholder="Tu nombre"
                      className={inputClass} value={form.nombre}
                      onChange={(e) => set("nombre", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email <span className="text-rosa">*</span></label>
                    <input
                      type="email" required placeholder="tu@email.com"
                      className={inputClass} value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>WhatsApp</label>
                    <input
                      type="tel" placeholder="+54 11 1234-5678"
                      className={inputClass} value={form.whatsapp}
                      onChange={(e) => set("whatsapp", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>País / zona horaria</label>
                    <input
                      type="text" placeholder="Argentina (GMT-3)"
                      className={inputClass} value={form.pais}
                      onChange={(e) => set("pais", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

          /* ── PASO 3: COORDINEMOS ── */
          ) : (
            <div className="space-y-8">
              <div>
                <h2 className="font-display uppercase text-3xl text-tierra-dark tracking-wide mb-1">
                  Coordinemos
                </h2>
                <p className="font-sans text-tierra/40 text-sm tracking-wide">
                  Elegí la fecha y hora que mejor te quede.
                </p>
              </div>

              {/* Calendario + horario */}
              <CalendarioReserva
                fecha={form.fecha}
                hora={form.hora}
                onFecha={(d) => { set("fecha", d); set("hora", ""); }}
                onHora={(h) => set("hora", h)}
              />

              {/* Mensaje */}
              <div>
                <label className={labelClass}>¿Qué te trae? ¿Desde dónde llegás?</label>
                <p className="font-sans text-[0.62rem] text-tierra/30 tracking-wide mb-2">
                  Opcional — cuanto más me contés, mejor puedo prepararme para tu sesión.
                </p>
                <textarea
                  rows={3}
                  placeholder="Contame un poco dónde estás en tu vida ahora mismo..."
                  className={`${inputClass} resize-none`}
                  value={form.mensaje}
                  onChange={(e) => set("mensaje", e.target.value)}
                />
              </div>

              {/* Recordatorio */}
              <div className={`border-2 p-5 transition-all ${recordatorio ? "border-dorado/50 bg-dorado/5" : "border-morado/15 bg-crema"}`}>
                <button
                  type="button"
                  onClick={() => setRecordatorio((r) => !r)}
                  className="w-full flex items-start gap-4 text-left"
                >
                  <div className={`w-10 h-10 border-2 shrink-0 flex items-center justify-center transition-all mt-0.5 ${
                    recordatorio ? "bg-dorado border-dorado" : "border-morado/20 bg-crema"
                  }`}>
                    {recordatorio
                      ? <Bell size={16} className="text-tierra-dark" strokeWidth={2} />
                      : <BellOff size={16} className="text-tierra/25" strokeWidth={1.5} />
                    }
                  </div>
                  <div className="flex-1">
                    <p className={`font-sans font-semibold text-sm tracking-wide transition-colors ${recordatorio ? "text-tierra-dark" : "text-tierra/40"}`}>
                      Recordatorio 24 horas antes
                    </p>
                    <p className="font-sans text-[0.65rem] text-tierra/40 tracking-wide mt-0.5">
                      {recordatorio
                        ? `Te avisamos a ${form.email || "tu email"} el día anterior para que no se te pase.`
                        : "Activá el recordatorio para recibir un aviso por email antes de tu sesión."
                      }
                    </p>
                  </div>
                </button>

                {recordatorio && form.fecha && form.hora && (
                  <div className="reminder-in mt-4 ml-14 border-t border-dorado/20 pt-4">
                    <p className="font-sans text-[0.6rem] text-tierra/35 tracking-[0.3em] uppercase mb-2">Tu recordatorio llegará</p>
                    <div className="flex items-center gap-2">
                      <Bell size={12} className="text-dorado shrink-0" />
                      <p className="font-sans text-sm text-tierra-dark font-medium">
                        {(() => {
                          const d = new Date(form.fecha + "T12:00:00");
                          d.setDate(d.getDate() - 1);
                          return d.toLocaleDateString("es-AR", { weekday:"long", day:"numeric", month:"long" });
                        })()}
                        {" "}· a las 9:00 AM
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Resumen */}
              <div className="bg-crema-dark border-2 border-morado/10 p-6">
                <p className="font-sans text-[0.58rem] text-tierra/30 tracking-[0.3em] uppercase mb-4">Resumen de tu reserva</p>
                <div className="space-y-2.5">
                  {[
                    { label: "Sesión",   val: servicio?.nombre ?? "—" },
                    { label: "Precio",   val: servicio?.precio ?? "—" },
                    { label: "Formato",  val: servicio?.formato ?? "—" },
                    { label: "Fecha",    val: form.fecha ? new Date(form.fecha + "T12:00:00").toLocaleDateString("es-AR", { weekday:"long", day:"numeric", month:"long" }) : "—" },
                    { label: "Hora",     val: form.hora ? `${form.hora}hs` : "—" },
                    { label: "Nombre",   val: form.nombre || "—" },
                    { label: "Email",    val: form.email || "—" },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex items-center justify-between border-b border-morado/6 pb-2 last:border-0 last:pb-0">
                      <span className="font-sans text-[0.62rem] text-tierra/35 tracking-widest uppercase">{label}</span>
                      <span className="font-sans text-sm text-tierra-dark font-medium truncate max-w-[60%] text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Botones de navegación */}
          {!done && (
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={() => step > 0 ? setStep(step - 1) : undefined}
                className={`flex items-center gap-2 font-sans text-[0.65rem] tracking-widest uppercase transition-colors ${
                  step === 0 ? "invisible" : "text-tierra/40 hover:text-tierra"
                }`}
              >
                <ArrowLeft size={14} /> Anterior
              </button>

              {step < STEPS.length - 1 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canNext}
                  className="flex items-center gap-2 bg-morado-dark text-crema font-sans font-semibold text-[0.65rem] px-8 py-3.5 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-morado transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Siguiente <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canNext}
                  className="flex items-center gap-2 bg-dorado text-tierra-dark font-sans font-semibold text-[0.65rem] px-8 py-3.5 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-dorado-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ✦ Confirmar reserva <Check size={14} />
                </button>
              )}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}
