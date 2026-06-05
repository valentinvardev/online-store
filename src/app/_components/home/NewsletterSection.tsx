"use client";

import { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import StarField from "./StarField";
import Stickers from "../Stickers";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };

  return (
    <section className="bg-morado py-24 px-6 relative overflow-hidden">
      <Stickers blend="screen" items={[
        { id: "sticker-22", top: "5%",   right: "3%", size: 150, opacity: 0.22, rotate: 12,  anim: "float-slow" },
        { id: "sticker-04", bottom: "5%", left: "3%", size: 110, opacity: 0.2, rotate: -8, anim: "float", delay: 1.2 },
        { id: "sticker-19", top: "40%",   left: "3%",  size: 94, opacity: 0.16, rotate: 0,   anim: "spin", delay: 0.6, hideOnMobile: true },
      ]} />
      <StarField />
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-dorado opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-rosa opacity-10 blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <svg className="absolute inset-0 m-auto w-[50vmin] h-[50vmin] opacity-[0.05] animate-spin-slow pointer-events-none" viewBox="0 0 300 300" fill="none" aria-hidden="true">
        <circle cx="150" cy="150" r="140" stroke="#fbf5e6" strokeWidth="1" strokeDasharray="4 10" />
        <circle cx="150" cy="150" r="110" stroke="#f5c842" strokeWidth="0.5" />
      </svg>

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <RevealOnScroll direction="up" delay={0}>
          <h2 className="font-display uppercase text-[clamp(2.75rem,7vw,4rem)] text-crema leading-none tracking-wide mb-4">
            Un ritual<br />en tu correo
          </h2>
          <p className="font-sans italic text-crema/90 text-xl sm:text-2xl mb-10 leading-snug">
            Cada semana: una lectura, una práctica, un recordatorio de que sos más de lo que creés.
          </p>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={200}>
          {sent ? (
            <div className="bg-white/10 border-2 border-crema/30 p-8 ">
              <p className="font-display uppercase text-2xl text-dorado mb-3 tracking-wide">
                ✦ ¡Bienvenida! ✦
              </p>
              <p className="font-sans italic text-crema/70 text-lg">
                Tu primera carta llega pronto. Mientras tanto, respirá.
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="flex-1 bg-white/15 border-2 border-white/40 text-crema placeholder:text-crema/60 font-sans text-base px-5 py-4 focus:outline-none focus:border-dorado focus:bg-white/25 transition-colors tracking-wide"
                />
                <button
                  type="submit"
                  className="bg-dorado text-tierra-dark font-sans font-semibold text-[14px] px-7 py-4 border-2 border-morado-dark hover:bg-dorado-light transition-colors whitespace-nowrap tracking-widest uppercase block-shadow-sm"
                >
                  Suscribirme
                </button>
              </form>
              <p className="font-sans text-[0.95rem] text-crema/75 mt-4 tracking-wide">
                Sin spam. Solo magia. Podés darte de baja cuando quieras.
              </p>
            </>
          )}
        </RevealOnScroll>
      </div>
    </section>
  );
}
