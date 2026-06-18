"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Play, Lock, ArrowLeft, ArrowRight, CircleCheck, Circle, BookOpen, PlayCircle, LayoutList, Paperclip,
} from "lucide-react";
import { api } from "~/trpc/react";
import { toEmbedUrl } from "~/lib/embed";
import MaterialLightbox from "~/app/circulo/_components/MaterialLightbox";

type Lesson = {
  id: string;
  title: string;
  content: string | null;
  videoUrl: string | null;
  attachments: string[];
  publishedAt: Date | null;
};
type Module = { id: string; title: string; lessons: Lesson[] };

const fmtDate = (d: Date) => new Date(d).toLocaleDateString("es-AR", { day: "numeric", month: "long" });
const isLocked = (l: Lesson) => !!l.publishedAt && new Date(l.publishedAt) > new Date();

export default function CoursePlayer({
  courseId, courseSlug, courseName, courseDescription, modules,
}: {
  courseId: string; courseSlug: string; courseName: string; courseDescription: string; modules: Module[];
}) {
  const utils = api.useUtils();
  const { data: progress } = api.progress.forCourse.useQuery({ courseId });
  const view = api.progress.view.useMutation();
  const setCompleted = api.progress.setCompleted.useMutation({
    onSuccess: () => void utils.progress.forCourse.invalidate({ courseId }),
  });

  const flat = useMemo(() => modules.flatMap((m) => m.lessons), [modules]);
  const available = useMemo(() => flat.filter((l) => !isLocked(l)), [flat]);

  const [mode, setMode] = useState<"cover" | "lesson">("cover");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const completed = new Set(progress?.completed ?? []);
  const total = flat.length;
  const doneCount = flat.filter((l) => completed.has(l.id)).length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  const select = (id: string) => {
    setSelectedId(id);
    setMode("lesson");
    view.mutate({ courseId, lessonId: id });
  };

  // CTA principal de la portada: continuar donde dejó o empezar.
  const startLessonId =
    (progress?.lastLessonId && available.find((l) => l.id === progress.lastLessonId)?.id) ??
    available[0]?.id ?? null;
  const start = () => { if (startLessonId) select(startLessonId); };

  /* ════════════ PORTADA ════════════ */
  if (mode === "cover") {
    return (
      <div className="bg-crema min-h-screen">
        {/* Hero */}
        <section className="bg-morado-dark px-5 sm:px-8 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto">
            <Link href={`/cursos/${courseSlug}`} className="inline-flex items-center gap-2 font-sans text-[0.72rem] text-crema/45 hover:text-dorado tracking-widest uppercase transition-colors mb-6">
              <ArrowLeft size={12} /> Volver al curso
            </Link>
            <span className="font-sans text-[0.65rem] text-dorado tracking-[0.4em] uppercase block mb-3">
              {progress?.hasStarted ? "Seguí aprendiendo" : "Tu curso te espera"}
            </span>
            <h1 className="font-sans font-bold text-[clamp(2rem,5vw,3rem)] text-crema leading-tight tracking-wide mb-4">
              {courseName}
            </h1>
            <p className="font-sans text-crema/70 text-[15px] leading-relaxed max-w-xl mb-8">
              {courseDescription}
            </p>

            {/* Progreso */}
            {progress?.hasStarted && (
              <div className="mb-8 max-w-md">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-sans text-[0.65rem] text-crema/60 tracking-widest uppercase">Tu progreso</span>
                  <span className="font-sans text-[0.65rem] text-dorado tracking-widest uppercase">{doneCount}/{total} · {pct}%</span>
                </div>
                <div className="h-2.5 bg-crema/15 border border-crema/10 overflow-hidden">
                  <div className="h-full bg-dorado transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )}

            {/* CTA */}
            {startLessonId ? (
              <button
                onClick={start}
                className="inline-flex items-center gap-2.5 bg-dorado text-tierra-dark font-sans font-bold text-[0.78rem] px-8 py-4 border-2 border-dorado tracking-widest uppercase hover:bg-dorado-light transition-colors block-shadow"
              >
                <PlayCircle size={17} />
                {progress?.hasStarted ? "Continuar donde dejaste" : "Comenzar curso"}
              </button>
            ) : (
              <p className="font-sans italic text-crema/50 text-sm">El contenido estará disponible pronto.</p>
            )}
          </div>
        </section>

        {/* Temario */}
        <section className="px-5 sm:px-8 py-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-5">
              <LayoutList size={16} className="text-morado" />
              <h2 className="font-sans font-bold text-lg text-tierra-dark tracking-wide">Contenido del curso</h2>
              <span className="font-sans text-[0.7rem] text-tierra/45 tracking-wide ml-1">{total} lecciones</span>
            </div>

            <div className="space-y-4">
              {modules.map((m, mi) => (
                <div key={m.id} className="bg-white border-2 border-morado-dark block-shadow overflow-hidden">
                  <div className="bg-morado/8 border-b-2 border-morado/10 px-5 py-3">
                    <h3 className="font-sans font-bold text-[0.85rem] text-tierra-dark tracking-wide">
                      {String(mi + 1).padStart(2, "0")} · {m.title}
                    </h3>
                  </div>
                  <ul className="divide-y divide-morado/8">
                    {m.lessons.map((l) => {
                      const locked = isLocked(l);
                      const done = completed.has(l.id);
                      return (
                        <li key={l.id}>
                          <button
                            onClick={() => !locked && select(l.id)}
                            disabled={locked}
                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${locked ? "opacity-55 cursor-default" : "hover:bg-dorado/5"}`}
                          >
                            <span className="shrink-0">
                              {locked ? <Lock size={14} className="text-tierra/35" />
                                : done ? <CircleCheck size={15} className="text-verde" />
                                : <PlayCircle size={15} className="text-morado/60" />}
                            </span>
                            <span className="flex-1 min-w-0">
                              <span className="font-sans text-sm text-tierra-dark/85 tracking-wide">{l.title}</span>
                              {locked && l.publishedAt && (
                                <span className="block font-sans text-[0.65rem] text-dorado-dark tracking-wide mt-0.5">
                                  Se libera el {fmtDate(l.publishedAt)}
                                </span>
                              )}
                            </span>
                            {l.videoUrl && !locked && <Play size={11} className="text-tierra/25 shrink-0" />}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* ════════════ REPRODUCTOR ════════════ */
  const current = flat.find((l) => l.id === selectedId) ?? null;
  const curIdx = available.findIndex((l) => l.id === selectedId);
  const next = curIdx >= 0 ? available[curIdx + 1] : undefined;
  const embed = current?.videoUrl ? toEmbedUrl(current.videoUrl) : null;
  const isDone = current ? completed.has(current.id) : false;

  return (
    <div className="bg-crema min-h-screen">
      {/* Barra superior con progreso */}
      <div className="bg-morado-dark px-5 sm:px-8 py-5">
        <div className="max-w-6xl mx-auto">
          <button onClick={() => setMode("cover")} className="inline-flex items-center gap-2 font-sans text-[0.72rem] text-crema/45 hover:text-dorado tracking-widest uppercase transition-colors mb-3">
            <ArrowLeft size={12} /> Inicio del curso
          </button>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-2.5 bg-crema/15 border border-crema/10 overflow-hidden">
                <div className="h-full bg-dorado transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
            </div>
            <span className="font-sans text-[0.72rem] text-crema/70 tracking-widest uppercase whitespace-nowrap">
              {doneCount} / {total} · {pct}%
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Contenido de la lección */}
        <main className="min-w-0 order-2 lg:order-1">
          {!current ? (
            <div className="bg-white border-2 border-morado/10 p-12 text-center">
              <BookOpen size={28} className="text-morado/20 mx-auto mb-3" />
              <p className="font-sans text-tierra/60 text-sm">Elegí una lección del temario.</p>
            </div>
          ) : (
            <article className="space-y-5">
              <div>
                <span className="font-sans text-[0.62rem] text-morado/70 tracking-[0.3em] uppercase">Lección</span>
                <h1 className="font-sans font-bold text-2xl sm:text-3xl text-tierra-dark tracking-wide leading-tight mt-1">
                  {current.title}
                </h1>
              </div>

              {embed && (
                <div className="relative border-4 border-morado-dark block-shadow overflow-hidden bg-morado-dark" style={{ paddingBottom: "56.25%" }}>
                  <iframe src={embed} className="absolute inset-0 w-full h-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title={current.title} />
                </div>
              )}

              {/* Recursos de la lección (debajo del video) */}
              <div className="bg-white border-2 border-morado/15 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Paperclip size={15} className="text-morado" />
                  <h2 className="font-sans font-bold text-sm text-tierra-dark tracking-wide">Recursos de la lección</h2>
                </div>
                {current.attachments.length > 0 ? (
                  <MaterialLightbox attachments={current.attachments} attachmentsTitle="" />
                ) : (
                  <p className="font-sans text-[0.82rem] text-tierra/50 italic">Esta lección no tiene recursos adicionales.</p>
                )}
              </div>

              {current.content?.trim() && (
                <p className="font-sans text-tierra-dark/85 text-[15px] leading-relaxed tracking-wide whitespace-pre-wrap">
                  {current.content}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t-2 border-morado/10">
                <button
                  onClick={() => setCompleted.mutate({ courseId, lessonId: current.id, completed: !isDone })}
                  disabled={setCompleted.isPending}
                  className={`flex items-center justify-center gap-2 font-sans font-semibold text-[0.72rem] px-6 py-3.5 border-2 border-morado-dark tracking-widest uppercase transition-colors block-shadow-sm ${
                    isDone ? "bg-verde text-crema hover:bg-verde/85" : "bg-crema text-tierra-dark hover:bg-dorado-light"
                  }`}
                >
                  {isDone ? <CircleCheck size={15} /> : <Circle size={15} />}
                  {isDone ? "Completada" : "Marcar como completada"}
                </button>
                {next && (
                  <button
                    onClick={() => select(next.id)}
                    className="flex items-center justify-center gap-2 bg-morado-dark text-crema font-sans font-semibold text-[0.72rem] px-6 py-3.5 border-2 border-morado-dark tracking-widest uppercase hover:bg-morado transition-colors block-shadow-sm"
                  >
                    Siguiente lección <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </article>
          )}
        </main>

        {/* Sidebar de lecciones */}
        <aside className="order-1 lg:order-2 lg:sticky lg:top-6">
          <div className="bg-white border-2 border-morado-dark block-shadow overflow-hidden">
            {/* Header con progreso */}
            <div className="bg-morado-dark px-5 py-4">
              <div className="flex items-center gap-2 mb-2.5">
                <LayoutList size={14} className="text-dorado" />
                <p className="font-sans font-bold text-[0.68rem] text-crema tracking-[0.25em] uppercase">Contenido del curso</p>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex-1 h-1.5 bg-crema/15 overflow-hidden">
                  <div className="h-full bg-dorado transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <span className="font-sans text-[0.6rem] text-crema/70 tracking-widest uppercase whitespace-nowrap">{doneCount}/{total}</span>
              </div>
            </div>

            <div className="max-h-[68vh] overflow-y-auto scroll-brand">
              {modules.map((m, mi) => {
                const modDone = m.lessons.filter((l) => completed.has(l.id)).length;
                const modComplete = m.lessons.length > 0 && modDone === m.lessons.length;
                return (
                  <div key={m.id} className="border-b-2 border-morado/8 last:border-0">
                    {/* Header del módulo */}
                    <div className="flex items-center gap-2.5 px-4 py-3 bg-crema/60">
                      <span className={`w-6 h-6 flex items-center justify-center font-sans font-bold text-[0.62rem] shrink-0 border-2 ${
                        modComplete ? "bg-verde text-crema border-verde" : "bg-morado-dark text-crema border-morado-dark"
                      }`}>
                        {modComplete ? <CircleCheck size={13} /> : mi + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans font-bold text-[0.78rem] text-tierra-dark leading-tight">{m.title}</p>
                        <p className="font-sans text-[0.58rem] text-tierra/45 tracking-widest uppercase mt-0.5">{modDone}/{m.lessons.length} lecciones</p>
                      </div>
                    </div>
                    {/* Lecciones */}
                    <ul>
                      {m.lessons.map((l) => {
                        const locked = isLocked(l);
                        const done = completed.has(l.id);
                        const active = l.id === selectedId;
                        return (
                          <li key={l.id}>
                            <button
                              onClick={() => !locked && select(l.id)}
                              disabled={locked}
                              className={`group w-full flex items-start gap-2.5 pr-4 py-2.5 text-left border-l-[3px] transition-colors ${
                                active ? "border-dorado bg-dorado/12" : "border-transparent hover:border-morado/30"
                              } ${locked ? "opacity-55 cursor-default" : "hover:bg-morado/5"}`}
                              style={{ paddingLeft: "0.85rem" }}
                            >
                              <span className="mt-0.5 shrink-0">
                                {locked ? <Lock size={13} className="text-tierra/35" />
                                  : done ? <CircleCheck size={15} className="text-verde" />
                                  : active ? <PlayCircle size={15} className="text-morado" />
                                  : <Circle size={13} className="text-tierra/25 group-hover:text-morado/50 transition-colors" />}
                              </span>
                              <span className="flex-1 min-w-0">
                                <span className={`block font-sans text-[0.8rem] leading-snug ${
                                  active ? "text-tierra-dark font-bold" : done ? "text-tierra/55" : "text-tierra/80"
                                }`}>
                                  {l.title}
                                </span>
                                {locked && l.publishedAt ? (
                                  <span className="block font-sans text-[0.62rem] text-dorado-dark tracking-wide mt-0.5">
                                    Se libera el {fmtDate(l.publishedAt)}
                                  </span>
                                ) : l.videoUrl ? (
                                  <span className="inline-flex items-center gap-1 font-sans text-[0.6rem] text-tierra/40 tracking-wide mt-0.5">
                                    <Play size={8} className="fill-tierra/40" /> Video
                                  </span>
                                ) : null}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
