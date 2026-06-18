"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Check, Play, Lock, ArrowLeft, ArrowRight, CircleCheck, Circle, BookOpen, PlayCircle,
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
  courseId, courseSlug, courseName, modules,
}: {
  courseId: string; courseSlug: string; courseName: string; modules: Module[];
}) {
  const utils = api.useUtils();
  const { data: progress } = api.progress.forCourse.useQuery({ courseId });
  const view = api.progress.view.useMutation();
  const setCompleted = api.progress.setCompleted.useMutation({
    onSuccess: () => void utils.progress.forCourse.invalidate({ courseId }),
  });

  const flat = useMemo(() => modules.flatMap((m) => m.lessons), [modules]);
  const available = useMemo(() => flat.filter((l) => !isLocked(l)), [flat]);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Selección inicial una vez que carga el progreso: donde dejó, o la primera.
  useEffect(() => {
    if (selectedId || !progress) return;
    const last = progress.lastLessonId && available.find((l) => l.id === progress.lastLessonId);
    setSelectedId(last ? last.id : (available[0]?.id ?? null));
  }, [progress, selectedId, available]);

  const select = (id: string) => {
    setSelectedId(id);
    view.mutate({ courseId, lessonId: id });
  };

  const current = flat.find((l) => l.id === selectedId) ?? null;
  const completed = new Set(progress?.completed ?? []);
  const total = flat.length;
  const doneCount = flat.filter((l) => completed.has(l.id)).length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  const curIdx = available.findIndex((l) => l.id === selectedId);
  const next = curIdx >= 0 ? available[curIdx + 1] : undefined;

  const embed = current?.videoUrl ? toEmbedUrl(current.videoUrl) : null;
  const isDone = current ? completed.has(current.id) : false;

  return (
    <div className="bg-crema min-h-screen">
      {/* Barra superior con progreso */}
      <div className="bg-morado-dark px-5 sm:px-8 py-5">
        <div className="max-w-6xl mx-auto">
          <Link href={`/cursos/${courseSlug}`} className="inline-flex items-center gap-2 font-sans text-[0.72rem] text-crema/45 hover:text-dorado tracking-widest uppercase transition-colors mb-3">
            <ArrowLeft size={12} /> {courseName}
          </Link>
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
        {/* ── Contenido de la lección ── */}
        <main className="min-w-0 order-2 lg:order-1">
          {/* Banner continuá / empezá */}
          {progress && (
            <div className="flex items-center gap-2.5 bg-dorado-light border-2 border-morado-dark block-shadow-sm px-4 py-2.5 mb-5">
              <PlayCircle size={16} className="text-morado-dark shrink-0" />
              <p className="font-sans text-[0.78rem] text-tierra-dark tracking-wide">
                {progress.hasStarted
                  ? <>Continuás donde dejaste{current ? <>: <strong>{current.title}</strong></> : ""}</>
                  : <>Primera vez por acá — <strong>empezá el curso</strong> ✦</>}
              </p>
            </div>
          )}

          {!current ? (
            <div className="bg-white border-2 border-morado/10 p-12 text-center">
              <BookOpen size={28} className="text-morado/20 mx-auto mb-3" />
              <p className="font-sans text-tierra/60 text-sm">El contenido de este curso estará disponible pronto.</p>
            </div>
          ) : (
            <article className="space-y-5">
              <div>
                <span className="font-sans text-[0.62rem] text-morado/70 tracking-[0.3em] uppercase">Lección</span>
                <h1 className="font-sans font-bold text-2xl sm:text-3xl text-tierra-dark tracking-wide leading-tight mt-1">
                  {current.title}
                </h1>
              </div>

              {/* Video */}
              {embed && (
                <div className="relative border-4 border-morado-dark block-shadow overflow-hidden bg-morado-dark" style={{ paddingBottom: "56.25%" }}>
                  <iframe src={embed} className="absolute inset-0 w-full h-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title={current.title} />
                </div>
              )}

              {/* Texto */}
              {current.content?.trim() && (
                <p className="font-sans text-tierra-dark/85 text-[15px] leading-relaxed tracking-wide whitespace-pre-wrap">
                  {current.content}
                </p>
              )}

              {/* Material adjunto */}
              {current.attachments.length > 0 && (
                <MaterialLightbox attachments={current.attachments} />
              )}

              {/* Acciones */}
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

        {/* ── Sidebar de lecciones ── */}
        <aside className="order-1 lg:order-2 lg:sticky lg:top-6">
          <div className="bg-white border-2 border-morado-dark block-shadow overflow-hidden">
            <div className="bg-morado/8 border-b-2 border-morado/10 px-5 py-3">
              <p className="font-sans font-bold text-[0.7rem] text-tierra-dark tracking-[0.2em] uppercase">Contenido del curso</p>
            </div>
            <div className="max-h-[70vh] overflow-y-auto divide-y divide-morado/8">
              {modules.map((m, mi) => (
                <div key={m.id}>
                  <p className="px-5 pt-4 pb-2 font-sans font-bold text-[0.7rem] text-morado tracking-wide">
                    {String(mi + 1).padStart(2, "0")} · {m.title}
                  </p>
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
                            className={`w-full flex items-start gap-2.5 px-5 py-2.5 text-left transition-colors ${
                              active ? "bg-dorado/15" : locked ? "opacity-55 cursor-default" : "hover:bg-morado/5"
                            }`}
                          >
                            <span className="mt-0.5 shrink-0">
                              {locked ? <Lock size={13} className="text-tierra/35" />
                                : done ? <CircleCheck size={14} className="text-verde" />
                                : active ? <Play size={13} className="text-morado fill-morado" />
                                : <Circle size={13} className="text-tierra/25" />}
                            </span>
                            <span className="flex-1 min-w-0">
                              <span className={`font-sans text-[0.8rem] leading-snug ${active ? "text-tierra-dark font-semibold" : "text-tierra/75"}`}>
                                {l.title}
                              </span>
                              {locked && l.publishedAt && (
                                <span className="block font-sans text-[0.65rem] text-dorado-dark tracking-wide mt-0.5">
                                  Se libera el {fmtDate(l.publishedAt)}
                                </span>
                              )}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
