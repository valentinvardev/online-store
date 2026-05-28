"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, Users, ChevronDown, Check } from "lucide-react";
import { cursos } from "../_data/cursos";

const levelColors: Record<string, string> = {
  "Principiante":      "text-verde bg-verde/10 border-verde/25",
  "Intermedio":        "text-celeste bg-celeste/10 border-celeste/25",
  "Todos los niveles": "text-dorado-dark bg-dorado/10 border-dorado/25",
};

const badgeColors: Record<string, string> = {
  "Más vendido":     "bg-dorado/20 text-tierra-dark border-dorado/40",
  "Nuevo":           "bg-celeste/20 text-celeste border-celeste/30",
  "Últimos lugares": "bg-rosa/15 text-rosa border-rosa/30",
};

export default function CursoDetallePage({ params }: { params: { slug: string } }) {
  const curso = cursos.find((c) => c.slug === params.slug);
  if (!curso) notFound();

  const [openModulo, setOpenModulo] = useState<number | null>(0);

  const toggle = (i: number) => setOpenModulo(openModulo === i ? null : i);

  return (
    <div className="min-h-screen bg-crema">

      {/* Barra de navegación superior */}
      <div className="border-b-2 border-morado/10 bg-crema/95 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 font-sans text-[0.65rem] text-tierra/40 hover:text-tierra tracking-widest uppercase transition-colors"
          >
            <ArrowLeft size={13} /> Volver a cursos
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-morado-dark border-b-4 border-dorado">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-5 gap-12 items-center">

            {/* Info */}
            <div className="lg:col-span-3 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`font-sans text-[0.58rem] px-2.5 py-1 border tracking-widest uppercase ${levelColors[curso.level]}`}>
                  {curso.level}
                </span>
                {curso.badge && (
                  <span className={`font-sans text-[0.58rem] px-2.5 py-1 border tracking-widest uppercase ${badgeColors[curso.badge]}`}>
                    {curso.badge}
                  </span>
                )}
              </div>

              <div>
                <h1 className="font-display text-5xl lg:text-6xl text-crema leading-none tracking-wide mb-3">
                  {curso.title}
                </h1>
                <p className="font-sans italic text-crema/55 text-lg">{curso.subtitle}</p>
              </div>

              <p className="font-sans text-crema/70 text-sm leading-relaxed tracking-wide max-w-xl">
                {curso.desc}
              </p>

              <div className="flex flex-wrap gap-6 font-sans text-xs text-crema/40 tracking-wide pt-2">
                <span className="flex items-center gap-2">
                  <Clock size={13} strokeWidth={1.5} />
                  {curso.duration}
                </span>
                <span className="flex items-center gap-2">
                  <BookOpen size={13} strokeWidth={1.5} />
                  {curso.lessons}
                </span>
                <span className="flex items-center gap-2">
                  <Users size={13} strokeWidth={1.5} />
                  {curso.students}
                </span>
              </div>
            </div>

            {/* Card de compra */}
            <div className="lg:col-span-2">
              <div className="bg-crema border-4 border-dorado block-shadow p-8 space-y-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-5xl text-morado">{curso.price}</span>
                  {curso.priceOld && (
                    <span className="font-sans text-sm text-tierra/35 line-through">{curso.priceOld}</span>
                  )}
                </div>

                <button className="w-full bg-dorado text-tierra-dark font-sans font-semibold text-[0.7rem] py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-dorado-light transition-colors">
                  ✦ Inscribirme ahora
                </button>

                <ul className="space-y-2.5 pt-2 border-t border-morado/10">
                  {curso.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 font-sans text-xs text-tierra/60 tracking-wide">
                      <Check size={12} className="text-verde shrink-0" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cuerpo principal */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-5 gap-16">

          {/* Columna principal */}
          <div className="lg:col-span-3 space-y-14">

            {/* Video de presentación */}
            {curso.videoId && (
              <section>
                <h2 className="font-display text-3xl text-tierra-dark mb-6">
                  Video de presentación
                </h2>
                <div className="relative border-4 border-morado-dark block-shadow overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src={`https://player.vimeo.com/video/${curso.videoId}?title=0&byline=0&portrait=0&color=7B5EA7`}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={`Presentación — ${curso.title}`}
                  />
                </div>
                <p className="font-sans text-xs text-tierra/35 tracking-wide mt-3 text-center">
                  Mirá cómo funciona el curso antes de inscribirte
                </p>
              </section>
            )}

            {/* Descripción completa */}
            <section>
              <h2 className="font-display text-3xl text-tierra-dark mb-6">
                Sobre este curso
              </h2>
              <div className="bg-white border-2 border-morado/15 p-8">
                <p className="font-sans text-tierra/70 text-sm leading-relaxed tracking-wide">
                  {curso.descLong}
                </p>
              </div>
            </section>

            {/* Currículum */}
            <section>
              <h2 className="font-display text-3xl text-tierra-dark mb-2">
                Contenidos del curso
              </h2>
              <p className="font-sans text-xs text-tierra/35 tracking-widest uppercase mb-8">
                {curso.modules.length} módulos · {curso.lessons}
              </p>

              <div className="space-y-2">
                {curso.modules.map((modulo, i) => {
                  const isOpen = openModulo === i;
                  return (
                    <div key={i} className={`border-2 transition-colors ${isOpen ? "border-morado-dark" : "border-morado/20 hover:border-morado/40"}`}>
                      <button
                        onClick={() => toggle(i)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left"
                      >
                        <div className="flex items-center gap-4">
                          <span className={`font-display text-2xl transition-colors ${isOpen ? "text-morado" : "text-morado/30"}`}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <p className={`font-sans font-semibold text-sm tracking-wide transition-colors ${isOpen ? "text-tierra-dark" : "text-tierra/70"}`}>
                              {modulo.title}
                            </p>
                            <p className="font-sans text-[0.65rem] text-tierra/35 tracking-wide mt-0.5">
                              {modulo.lessons.length} clases
                            </p>
                          </div>
                        </div>
                        <ChevronDown
                          size={16}
                          className={`text-tierra/40 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {/* Clases del módulo */}
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="border-t border-morado/10 mx-6" />
                        <ul className="px-6 py-4 space-y-0">
                          {modulo.lessons.map((lesson, j) => (
                            <li
                              key={j}
                              className="flex items-center gap-3 py-3 border-b border-morado/6 last:border-0"
                            >
                              <span className="font-sans text-[0.6rem] text-morado/40 tracking-widest w-5 shrink-0 text-right">
                                {j + 1}
                              </span>
                              <span className="w-px h-4 bg-morado/15 shrink-0" />
                              <span className="font-sans text-sm text-tierra/60 tracking-wide">{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sidebar sticky */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="bg-crema border-2 border-morado-dark block-shadow p-8 space-y-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-5xl text-morado">{curso.price}</span>
                  {curso.priceOld && (
                    <span className="font-sans text-sm text-tierra/35 line-through">{curso.priceOld}</span>
                  )}
                </div>

                <button className="w-full bg-morado-dark text-crema font-sans font-semibold text-[0.7rem] py-4 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-morado transition-colors">
                  ✦ Inscribirme ahora
                </button>

                <ul className="space-y-2.5 pt-2 border-t border-morado/10">
                  {curso.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 font-sans text-xs text-tierra/60 tracking-wide">
                      <Check size={12} className="text-verde shrink-0" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Detalles del curso */}
              <div className="bg-crema border-2 border-morado/20 p-6 space-y-4">
                <p className="font-sans text-[0.6rem] text-tierra/35 tracking-widest uppercase">Detalles</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs text-tierra/50 tracking-wide flex items-center gap-2">
                      <Clock size={12} strokeWidth={1.5} /> Duración
                    </span>
                    <span className="font-sans text-xs text-tierra-dark font-semibold">{curso.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs text-tierra/50 tracking-wide flex items-center gap-2">
                      <BookOpen size={12} strokeWidth={1.5} /> Clases
                    </span>
                    <span className="font-sans text-xs text-tierra-dark font-semibold">{curso.lessons}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs text-tierra/50 tracking-wide flex items-center gap-2">
                      <Users size={12} strokeWidth={1.5} /> Alumnas
                    </span>
                    <span className="font-sans text-xs text-tierra-dark font-semibold">{curso.students}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA final */}
      <div className="border-t-4 border-morado/10 bg-morado-dark">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center space-y-6">
          <h2 className="font-display text-4xl text-crema">¿Lista para empezar?</h2>
          <p className="font-sans text-crema/55 text-sm tracking-wide max-w-md mx-auto">
            Unite a {curso.students} que ya recorrieron este camino.
          </p>
          <button className="bg-dorado text-tierra-dark font-sans font-semibold text-[0.7rem] px-10 py-4 tracking-widest uppercase border-2 border-crema block-shadow hover:bg-dorado-light transition-colors">
            ✦ Inscribirme a {curso.title}
          </button>
        </div>
      </div>
    </div>
  );
}
