"use client";

import { useState } from "react";

const faqs = [
  {
    q: "¿Las sesiones son en vivo o grabadas?",
    a: "Todas las sesiones por Zoom son en vivo y se graban automáticamente. Recibís el link de la grabación dentro de las 24hs de finalizada la sesión.",
  },
  {
    q: "¿En qué horarios podés atender?",
    a: "De lunes a sábado, de 10hs a 20hs (Argentina, GMT-3). Si estás en otro huso horario coordinamos sin problema.",
  },
  {
    q: "¿Cómo se paga?",
    a: "Transferencia bancaria, MercadoPago o PayPal para el exterior. El pago se confirma antes de la sesión. Los precios son orientativos y pueden ajustarse según el tipo de cambio.",
  },
  {
    q: "¿Puedo cancelar o reprogramar?",
    a: "Podés reprogramar hasta 24hs antes sin costo. Cancelaciones con menos de 24hs tienen un cargo del 50% del valor.",
  },
  {
    q: "¿Necesito saber algo de tarot o astrología antes de la sesión?",
    a: "No. Las sesiones están diseñadas para cualquier punto de partida. Si no sabés nada de tarot, mejor — llegás sin expectativas fijas.",
  },
  {
    q: "¿Los rituales personalizados requieren comprar elementos especiales?",
    a: "La guía incluye la lista completa de elementos con alternativas accesibles. Nunca te pido algo que no pueda conseguirse fácil o reemplazarse.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-crema py-20 px-6 border-t-2 border-morado/10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-8 bg-dorado" />
            <span className="font-sans text-[0.6rem] text-dorado tracking-[0.4em] uppercase">
              Preguntas frecuentes
            </span>
          </div>
          <h2 className="font-display uppercase text-[clamp(2rem,5vw,3.5rem)] text-tierra-dark leading-none tracking-wide">
            Antes de reservar
          </h2>
        </div>

        <div className="space-y-0 border-t-2 border-morado/15">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b-2 border-morado/15">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left gap-6 group"
              >
                <span className="font-sans font-semibold text-sm text-tierra-dark tracking-wide group-hover:text-morado transition-colors">
                  {faq.q}
                </span>
                <span
                  className={`text-dorado text-lg shrink-0 transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="pb-5">
                  <p className="font-sans text-tierra/60 text-sm leading-relaxed tracking-wide">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
