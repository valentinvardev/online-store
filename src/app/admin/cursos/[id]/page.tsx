"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft, BookOpen, Loader2, Plus, ChevronDown, ChevronRight,
  Pencil, Trash2, Video, AlertCircle, Eye, EyeOff, Check, X, Save,
  ExternalLink, FileText, Paperclip,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "../../_components/AdminToast";
import ConfirmModal from "../../_components/ConfirmModal";
import { api } from "~/trpc/react";

// ── Helpers ───────────────────────────────────────────────────────────────────
function parseVimeo(input: string): string | null {
  const s = input.trim();
  if (!s) return null;
  const player = s.match(/player\.vimeo\.com\/video\/(\d+)(?:\?h=([a-f0-9]+))?/);
  if (player) return s;
  const withHash = s.match(/vimeo\.com\/(\d+)\/([a-f0-9]+)/);
  if (withHash) return `https://player.vimeo.com/video/${withHash[1]}?h=${withHash[2]}`;
  const simple = s.match(/vimeo\.com\/(\d+)/);
  if (simple) return `https://player.vimeo.com/video/${simple[1]}`;
  if (/^\d+$/.test(s)) return `https://player.vimeo.com/video/${s}`;
  return null;
}

const inputClass = "w-full bg-white border-2 border-morado/20 px-3 py-2.5 font-sans text-sm text-tierra-dark placeholder:text-tierra/25 focus:outline-none focus:border-morado transition-colors";
const labelClass = "block font-sans text-[0.58rem] text-tierra-dark tracking-widest uppercase mb-1";

// ── Inline editable text ──────────────────────────────────────────────────────
function InlineEdit({ value, onSave, className }: {
  value: string; onSave: (v: string) => Promise<void>; className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editing) ref.current?.focus(); }, [editing]);

  const save = async () => {
    if (!draft.trim() || draft === value) { setEditing(false); setDraft(value); return; }
    setSaving(true);
    await onSave(draft.trim());
    setSaving(false);
    setEditing(false);
  };

  if (editing) return (
    <div className="flex items-center gap-2 flex-1">
      <input
        ref={ref} value={draft} onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") void save(); if (e.key === "Escape") { setEditing(false); setDraft(value); } }}
        className="flex-1 bg-white border-2 border-morado px-3 py-1.5 font-sans text-sm text-tierra-dark focus:outline-none"
      />
      <button type="button" onClick={() => void save()} disabled={saving}
        className="p-1.5 text-verde hover:text-verde/70 transition-colors">
        {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
      </button>
      <button type="button" onClick={() => { setEditing(false); setDraft(value); }}
        className="p-1.5 text-tierra/60 hover:text-rosa transition-colors">
        <X size={14} />
      </button>
    </div>
  );

  return (
    <button type="button" onClick={() => setEditing(true)}
      className={`text-left hover:text-morado transition-colors group flex items-center gap-2 ${className ?? ""}`}>
      <span>{value}</span>
      <Pencil size={11} className="opacity-0 group-hover:opacity-40 transition-opacity shrink-0" />
    </button>
  );
}

// ── Lesson editor ─────────────────────────────────────────────────────────────
type Lesson = {
  id: string; title: string; content: string | null;
  videoUrl: string | null; freePreview: boolean; order: number; attachments: string[];
};

type LessonUpdate = {
  title?: string; content?: string; videoUrl?: string;
  freePreview?: boolean; attachments?: string[];
};

function LessonRow({ lesson, onUpdate, onDelete }: {
  lesson: Lesson;
  onUpdate: (data: LessonUpdate) => Promise<void>;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ title: lesson.title, content: lesson.content ?? "", videoUrl: lesson.videoUrl ?? "" });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const vimeoEmbed = parseVimeo(draft.videoUrl);
  const hasVideo = !!lesson.videoUrl;

  const save = async () => {
    if (draft.videoUrl && !vimeoEmbed) { toast("Link de Vimeo inválido", "error"); return; }
    setSaving(true);
    await onUpdate({
      title: draft.title,
      content: draft.content || undefined,
      videoUrl: vimeoEmbed ?? undefined,
    });
    setSaving(false);
    setOpen(false);
  };

  return (
    <div className="border border-morado/10 bg-white">
      {/* Header de la lección */}
      <div className="flex items-center gap-3 px-4 py-3 group">
        <button type="button" onClick={() => setOpen(!open)}
          className="text-tierra/30 hover:text-morado transition-colors">
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <span className="font-sans text-[0.55rem] text-tierra/30 tracking-widest uppercase w-5 shrink-0">{lesson.order}</span>
        <InlineEdit
          value={lesson.title}
          onSave={(v) => onUpdate({ title: v })}
          className="flex-1 font-sans text-sm text-tierra-dark"
        />
        <div className="flex items-center gap-1.5 shrink-0 ml-auto">
          {hasVideo && <Video size={12} className="text-morado/40" />}
          <button type="button"
            onClick={() => void onUpdate({ freePreview: !lesson.freePreview })}
            title={lesson.freePreview ? "Preview gratuita activa" : "Sin preview gratuita"}
            className={`flex items-center gap-1 font-sans text-[0.55rem] tracking-widest uppercase px-2 py-1 border transition-colors ${lesson.freePreview ? "bg-verde/15 text-verde border-verde/30" : "text-tierra/30 border-tierra/15 hover:border-morado/30 hover:text-morado"}`}>
            {lesson.freePreview ? <Eye size={10} /> : <EyeOff size={10} />}
            {lesson.freePreview ? "Gratis" : "Paga"}
          </button>
          <button type="button" onClick={onDelete}
            className="p-1 text-tierra/25 hover:text-rosa transition-colors opacity-0 group-hover:opacity-100">
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {/* Editor de lección */}
      {open && (
        <div className="border-t border-morado/10 px-4 py-5 bg-crema/50 space-y-4">
          <div>
            <label className={labelClass}>Título de la clase</label>
            <input className={inputClass} value={draft.title}
              onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} />
          </div>

          <div>
            <label className={labelClass}>Video (Vimeo)</label>
            <input
              className={`${inputClass} ${draft.videoUrl && !vimeoEmbed ? "border-rosa" : ""}`}
              placeholder="https://vimeo.com/123456789"
              value={draft.videoUrl}
              onChange={(e) => setDraft((d) => ({ ...d, videoUrl: e.target.value }))}
            />
            {draft.videoUrl && !vimeoEmbed && (
              <p className="flex items-center gap-1 font-sans text-xs text-rosa mt-1">
                <AlertCircle size={11} /> URL de Vimeo inválida
              </p>
            )}
            {vimeoEmbed && (
              <div className="mt-3 aspect-video overflow-hidden border border-morado/15">
                <iframe src={`${vimeoEmbed}&color=7B5EA7&title=0&byline=0&portrait=0`}
                  className="w-full h-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              </div>
            )}
          </div>

          <div>
            <label className={labelClass}>Descripción / contenido de la clase</label>
            <textarea rows={4} className={`${inputClass} resize-none`}
              placeholder="Qué se trabaja en esta clase, recursos, consignas..."
              value={draft.content}
              onChange={(e) => setDraft((d) => ({ ...d, content: e.target.value }))}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)}
              className="font-sans text-[0.62rem] px-4 py-2 border border-morado/20 text-tierra/70 hover:text-tierra tracking-widest uppercase transition-colors">
              Cancelar
            </button>
            <button type="button" onClick={() => void save()} disabled={saving}
              className="flex items-center gap-1.5 font-sans text-[0.62rem] px-4 py-2 bg-morado-dark text-crema hover:bg-morado tracking-widest uppercase transition-colors disabled:opacity-60">
              {saving ? <Loader2 size={11} className="animate-spin" /> : <Save size={11} />}
              {saving ? "Guardando..." : "Guardar clase"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Module block ──────────────────────────────────────────────────────────────
type Module = {
  id: string; title: string; order: number;
  attachments: string[]; lessons: Lesson[];
};

function ModuleBlock({ mod, onUpdateModule, onDeleteModule, onCreateLesson, onUpdateLesson, onDeleteLesson }: {
  mod: Module;
  onUpdateModule: (id: string, data: { title?: string; attachments?: string[] }) => Promise<void>;
  onDeleteModule: (id: string) => void;
  onCreateLesson: (moduleId: string, title: string) => Promise<void>;
  onUpdateLesson: (id: string, data: LessonUpdate) => Promise<void>;
  onDeleteLesson: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const [addingLesson, setAddingLesson] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [creatingLesson, setCreatingLesson] = useState(false);

  const createLesson = async () => {
    if (!newLessonTitle.trim()) return;
    setCreatingLesson(true);
    await onCreateLesson(mod.id, newLessonTitle.trim());
    setNewLessonTitle("");
    setAddingLesson(false);
    setCreatingLesson(false);
  };

  const [localAttachments, setLocalAttachments] = useState<string[]>(mod.attachments);
  const [uploading, setUploading] = useState(false);
  const pdfRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setLocalAttachments(mod.attachments); }, [mod.attachments]);

  const handlePdfUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    const newUrls: string[] = [];
    for (const file of Array.from(files).filter((f) => f.type === "application/pdf")) {
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await fetch("/api/admin/upload-pdf", { method: "POST", body: fd });
        const data = await res.json() as { url?: string };
        if (data.url) newUrls.push(data.url);
      } catch { /* skip failed upload */ }
    }
    if (newUrls.length) {
      const updated = [...localAttachments, ...newUrls];
      setLocalAttachments(updated);
      await onUpdateModule(mod.id, { attachments: updated });
    }
    setUploading(false);
    if (pdfRef.current) pdfRef.current.value = "";
  };

  const handleRemovePdf = async (idx: number) => {
    const updated = localAttachments.filter((_, i) => i !== idx);
    setLocalAttachments(updated);
    await onUpdateModule(mod.id, { attachments: updated });
  };

  return (
    <div className="bg-crema border-2 border-morado-dark block-shadow">
      {/* Header del módulo */}
      <div className="flex items-center gap-3 px-6 py-4 bg-morado-dark">
        <button type="button" onClick={() => setOpen(!open)}
          className="text-crema/40 hover:text-crema transition-colors">
          {open ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
        </button>
        <span className="font-sans text-[0.55rem] text-crema/30 tracking-widest uppercase w-6 shrink-0">M{mod.order}</span>
        <InlineEdit
          value={mod.title}
          onSave={(v) => onUpdateModule(mod.id, { title: v })}
          className="flex-1 font-sans font-semibold text-sm text-crema"
        />
        <span className="font-sans text-[0.55rem] text-crema/30 tracking-widest uppercase ml-auto">
          {mod.lessons.length} clase{mod.lessons.length !== 1 ? "s" : ""}
        </span>
        <button type="button" onClick={() => onDeleteModule(mod.id)}
          className="p-1 text-crema/25 hover:text-rosa transition-colors ml-2">
          <Trash2 size={13} />
        </button>
      </div>

      {/* Lecciones */}
      {open && (
        <div className="divide-y divide-morado/8">
          {mod.lessons.length === 0 && !addingLesson && (
            <p className="px-6 py-5 font-sans text-xs text-tierra/30 tracking-wide italic">
              Este módulo no tiene clases todavía.
            </p>
          )}

          {mod.lessons.map((lesson) => (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              onUpdate={(data) => onUpdateLesson(lesson.id, data)}
              onDelete={() => onDeleteLesson(lesson.id)}
            />
          ))}

          {/* Agregar lección */}
          <div className="px-4 py-3">
            {addingLesson ? (
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  className={`${inputClass} flex-1`}
                  placeholder="Título de la clase..."
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void createLesson();
                    if (e.key === "Escape") { setAddingLesson(false); setNewLessonTitle(""); }
                  }}
                />
                <button type="button" onClick={() => void createLesson()} disabled={creatingLesson || !newLessonTitle.trim()}
                  className="px-3 py-2.5 bg-morado-dark text-crema font-sans text-[0.6rem] tracking-widest uppercase hover:bg-morado transition-colors disabled:opacity-50">
                  {creatingLesson ? <Loader2 size={12} className="animate-spin" /> : "Agregar"}
                </button>
                <button type="button" onClick={() => { setAddingLesson(false); setNewLessonTitle(""); }}
                  className="p-2 text-tierra/60 hover:text-rosa transition-colors">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => setAddingLesson(true)}
                className="flex items-center gap-1.5 font-sans text-[0.6rem] text-tierra/55 hover:text-morado tracking-widest uppercase transition-colors">
                <Plus size={12} /> Agregar clase
              </button>
            )}
          </div>

          {/* Archivos del módulo */}
          <div className="px-4 py-3 border-t border-morado/10 bg-crema/30">
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-[0.55rem] text-tierra/30 tracking-widest uppercase flex items-center gap-1.5">
                <FileText size={10} /> Archivos adjuntos
              </span>
              <button type="button" onClick={() => pdfRef.current?.click()} disabled={uploading}
                className="flex items-center gap-1 font-sans text-[0.58rem] text-tierra/60 hover:text-morado tracking-widest uppercase transition-colors disabled:opacity-50">
                {uploading ? <Loader2 size={10} className="animate-spin" /> : <Paperclip size={10} />}
                {uploading ? "Subiendo..." : "Adjuntar PDF"}
              </button>
              <input ref={pdfRef} type="file" accept="application/pdf" multiple className="hidden"
                onChange={(e) => void handlePdfUpload(e.target.files)} />
            </div>
            {localAttachments.length > 0 ? (
              <ul className="space-y-1 mt-1">
                {localAttachments.map((url, i) => (
                  <li key={url} className="flex items-center gap-2 group">
                    <FileText size={11} className="text-morado/40 shrink-0" />
                    <span className="font-sans text-xs text-tierra-dark truncate flex-1">
                      {decodeURIComponent(url.split("/").pop() ?? url)}
                    </span>
                    <a href={url} target="_blank" rel="noopener noreferrer"
                      className="p-1 text-tierra/25 hover:text-morado transition-colors opacity-0 group-hover:opacity-100"
                      title="Abrir PDF">
                      <ExternalLink size={11} />
                    </a>
                    <button type="button" onClick={() => void handleRemovePdf(i)}
                      className="p-1 text-tierra/25 hover:text-rosa transition-colors opacity-0 group-hover:opacity-100"
                      title="Quitar archivo">
                      <X size={11} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-sans text-xs text-tierra/25 italic">Sin archivos adjuntos</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Tipos locales ─────────────────────────────────────────────────────────────
type CourseMeta = {
  name: string; subtitle: string | null; description: string;
  price: number; level: string; badge: string | null;
  active: boolean; slug: string; imageUrl: string | null;
  durationWeeks: number | null; enrollments: number;
};

const levelColors: Record<string, string> = {
  "Principiante": "bg-verde/15 text-verde border-verde/30",
  "Intermedio": "bg-celeste/15 text-celeste border-celeste/30",
  "Todos los niveles": "bg-dorado/15 text-dorado-dark border-dorado/30",
  "Avanzado": "bg-morado/15 text-morado border-morado/30",
};

// ── Página principal ──────────────────────────────────────────────────────────
export default function GestionCursoPage() {
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();

  const { data: curso, isLoading } = api.admin.cursos.getById.useQuery(id, { enabled: !!id });

  // Todo el estado es local — las acciones son demostrativas, no persisten en DB
  const [meta, setMeta] = useState<CourseMeta | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (curso && !initialized.current) {
      initialized.current = true;
      setMeta({
        name: curso.name, subtitle: curso.subtitle ?? null,
        description: curso.description, price: curso.price,
        level: curso.level, badge: curso.badge ?? null,
        active: curso.active, slug: curso.slug,
        imageUrl: curso.imageUrl ?? null, durationWeeks: curso.durationWeeks ?? null,
        enrollments: curso._count.enrollments,
      });
      setModules(curso.modules as Module[]);
      setEditForm({
        name: curso.name, subtitle: curso.subtitle ?? "",
        description: curso.description, price: String(curso.price),
        level: curso.level, badge: curso.badge ?? "",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curso]);

  // UI state
  const [addingModule, setAddingModule] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{ type: "module" | "lesson"; id: string; name: string } | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", subtitle: "", description: "", price: "", level: "Todos los niveles", badge: "" });
  const [editSaving, setEditSaving] = useState(false);
  const setE = (k: string, v: string) => setEditForm((f) => ({ ...f, [k]: v }));

  // Handlers — local state only
  const saveEditForm = async () => {
    setEditSaving(true);
    await new Promise((r) => setTimeout(r, 350));
    setMeta((prev) => prev ? {
      ...prev,
      name: editForm.name, subtitle: editForm.subtitle || null,
      description: editForm.description, price: parseFloat(editForm.price),
      level: editForm.level, badge: editForm.badge || null,
    } : null);
    setEditSaving(false);
    setEditOpen(false);
    toast("Curso actualizado");
  };

  const handleCreateModule = () => {
    if (!newModuleTitle.trim()) return;
    const newMod: Module = {
      id: `mod-${Date.now()}`, title: newModuleTitle.trim(),
      order: modules.length + 1, attachments: [], lessons: [],
    };
    setModules((prev) => [...prev, newMod]);
    setNewModuleTitle("");
    setAddingModule(false);
  };

  const handleUpdateModule = async (modId: string, data: { title?: string; attachments?: string[] }) => {
    setModules((prev) => prev.map((m) => m.id === modId ? { ...m, ...data } : m));
  };

  const handleCreateLesson = async (moduleId: string, title: string) => {
    setModules((prev) => prev.map((m) => {
      if (m.id !== moduleId) return m;
      return { ...m, lessons: [...m.lessons, {
        id: `les-${Date.now()}`, moduleId, title,
        content: null, videoUrl: null, freePreview: false,
        order: m.lessons.length + 1, attachments: [],
      }] };
    }));
  };

  const handleUpdateLesson = async (lessonId: string, data: LessonUpdate) => {
    setModules((prev) => prev.map((m) => ({
      ...m, lessons: m.lessons.map((l) => l.id === lessonId ? { ...l, ...data } : l),
    })));
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "module") {
      setModules((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    } else {
      setModules((prev) => prev.map((m) => ({
        ...m, lessons: m.lessons.filter((l) => l.id !== deleteTarget.id),
      })));
    }
    setDeleteTarget(null);
  };

  if (isLoading) return (
    <div className="flex items-center justify-center py-24 gap-3 text-tierra/60">
      <Loader2 size={18} className="animate-spin" />
      <span className="font-sans text-sm tracking-wide">Cargando curso...</span>
    </div>
  );

  if (!meta) return (
    <div className="py-24 text-center">
      <p className="font-sans text-tierra/60 text-sm">Curso no encontrado</p>
      <Link href="/admin/cursos" className="font-sans text-morado text-sm hover:underline mt-4 block">← Volver a cursos</Link>
    </div>
  );

  return (
    <div className="space-y-8">
      <Link href="/admin/cursos" className="inline-flex items-center gap-2 font-sans text-[0.65rem] text-tierra/60 hover:text-tierra tracking-widest uppercase transition-colors">
        <ArrowLeft size={13} /> Volver a cursos
      </Link>

      {/* Encabezado del curso */}
      <div className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
        <div className="bg-morado-dark px-8 py-6 flex items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            {meta.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={meta.imageUrl} alt={meta.name} className="w-20 h-20 object-cover border-2 border-white/20 shrink-0" />
            )}
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className={`font-sans text-[0.55rem] px-2 py-1 border tracking-widest uppercase ${levelColors[meta.level] ?? "bg-dorado/15 text-dorado-dark border-dorado/30"}`}>
                  {meta.level}
                </span>
                {meta.badge && (
                  <span className="font-sans text-[0.55rem] text-dorado tracking-widest uppercase">✦ {meta.badge}</span>
                )}
              </div>
              <h1 className="font-display text-3xl text-crema tracking-wide uppercase leading-none">{meta.name}</h1>
              {meta.subtitle && <p className="font-sans text-crema/50 text-sm mt-1 italic">{meta.subtitle}</p>}
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <span className="font-sans font-bold text-xl text-dorado">${meta.price}</span>
                {meta.durationWeeks && <span className="font-sans text-xs text-crema/40">{meta.durationWeeks} semanas</span>}
                {meta.enrollments > 0 && <span className="font-sans text-xs text-crema/40">{meta.enrollments} alumnas</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a href={`/cursos/${meta.slug}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-sans text-[0.6rem] px-3 py-2 bg-white/10 text-crema/70 border border-white/15 hover:bg-white/20 tracking-widest uppercase transition-colors">
              <ExternalLink size={11} /> Preview
            </a>
            <button
              onClick={() => setMeta((prev) => prev ? { ...prev, active: !prev.active } : null)}
              className={`font-sans text-[0.6rem] px-3 py-2 border tracking-widest uppercase transition-colors ${meta.active ? "bg-dorado/20 text-dorado border-dorado/40 hover:bg-dorado/30" : "bg-white/10 text-crema/40 border-white/15 hover:bg-white/15"}`}>
              {meta.active ? "Activo" : "Inactivo"}
            </button>
            <button onClick={() => setEditOpen(!editOpen)}
              className="flex items-center gap-1.5 font-sans text-[0.6rem] px-3 py-2 bg-white/10 text-crema/70 border border-white/15 hover:bg-white/20 tracking-widest uppercase transition-colors">
              <Pencil size={11} /> Editar
            </button>
          </div>
        </div>

        {/* Panel editar info del curso */}
        {editOpen && (
          <div className="px-8 py-6 border-t border-morado/15 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Título</label>
                <input className={inputClass} value={editForm.name} onChange={(e) => setE("name", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Subtítulo</label>
                <input className={inputClass} value={editForm.subtitle} onChange={(e) => setE("subtitle", e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Descripción</label>
              <textarea rows={4} className={`${inputClass} resize-none`} value={editForm.description} onChange={(e) => setE("description", e.target.value)} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Precio (ARS)</label>
                <input type="number" className={inputClass} value={editForm.price} onChange={(e) => setE("price", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Nivel</label>
                <select className={`${inputClass} cursor-pointer`} value={editForm.level} onChange={(e) => setE("level", e.target.value)}>
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                  <option value="Todos los niveles">Todos los niveles</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Badge</label>
                <select className={`${inputClass} cursor-pointer`} value={editForm.badge} onChange={(e) => setE("badge", e.target.value)}>
                  <option value="">Sin badge</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Más vendido">Más vendido</option>
                  <option value="Últimos lugares">Últimos lugares</option>
                  <option value="Próximamente">Próximamente</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setEditOpen(false)}
                className="font-sans text-[0.62rem] px-4 py-2 border border-morado/20 text-tierra/70 hover:text-tierra tracking-widest uppercase transition-colors">
                Cancelar
              </button>
              <button onClick={() => void saveEditForm()} disabled={editSaving}
                className="flex items-center gap-1.5 font-sans text-[0.62rem] px-5 py-2 bg-morado-dark text-crema hover:bg-morado tracking-widest uppercase transition-colors disabled:opacity-60">
                {editSaving ? <Loader2 size={11} className="animate-spin" /> : <Save size={11} />}
                {editSaving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Módulos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-sans text-[0.6rem] text-tierra/55 tracking-[0.3em] uppercase mb-0.5">Contenido del curso</p>
            <h2 className="font-sans font-bold text-tierra-dark tracking-wide">
              {modules.length} módulo{modules.length !== 1 ? "s" : ""}
              {" · "}
              {modules.reduce((acc, m) => acc + m.lessons.length, 0)} clases en total
            </h2>
          </div>
          {!addingModule && (
            <button onClick={() => setAddingModule(true)}
              className="flex items-center gap-2 bg-morado-dark text-crema font-sans text-[0.65rem] px-5 py-3 tracking-widest uppercase font-semibold border-2 border-morado-dark block-shadow hover:bg-morado transition-colors">
              <Plus size={13} /> Nuevo módulo
            </button>
          )}
        </div>

        {/* Formulario nuevo módulo */}
        {addingModule && (
          <div className="bg-crema border-2 border-morado-dark block-shadow p-5 flex items-center gap-3">
            <BookOpen size={15} className="text-morado shrink-0" strokeWidth={1.8} />
            <input
              autoFocus
              className={`${inputClass} flex-1`}
              placeholder="Título del módulo, ej: Arcanos Mayores"
              value={newModuleTitle}
              onChange={(e) => setNewModuleTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateModule();
                if (e.key === "Escape") { setAddingModule(false); setNewModuleTitle(""); }
              }}
            />
            <button onClick={handleCreateModule} disabled={!newModuleTitle.trim()}
              className="flex items-center gap-1.5 font-sans text-[0.62rem] px-4 py-2.5 bg-morado-dark text-crema hover:bg-morado tracking-widest uppercase transition-colors disabled:opacity-50">
              <Plus size={12} /> Crear módulo
            </button>
            <button onClick={() => { setAddingModule(false); setNewModuleTitle(""); }}
              className="p-2 text-tierra/60 hover:text-rosa transition-colors">
              <X size={15} />
            </button>
          </div>
        )}

        {modules.length === 0 && !addingModule && (
          <div className="bg-crema border-2 border-dashed border-morado/20 py-16 flex flex-col items-center gap-4">
            <span className="font-display text-4xl text-morado/10">✦</span>
            <p className="font-sans text-tierra/55 text-sm tracking-wide">Este curso no tiene módulos todavía.</p>
            <button onClick={() => setAddingModule(true)}
              className="font-sans text-xs text-morado/50 hover:text-morado tracking-widest uppercase transition-colors">
              + Crear el primer módulo
            </button>
          </div>
        )}

        {modules.map((mod) => (
          <ModuleBlock
            key={mod.id}
            mod={mod}
            onUpdateModule={handleUpdateModule}
            onDeleteModule={(modId) => setDeleteTarget({ type: "module", id: modId, name: mod.title })}
            onCreateLesson={handleCreateLesson}
            onUpdateLesson={handleUpdateLesson}
            onDeleteLesson={(lessonId) => {
              const lesson = mod.lessons.find((l) => l.id === lessonId);
              setDeleteTarget({ type: "lesson", id: lessonId, name: lesson?.title ?? "esta clase" });
            }}
          />
        ))}
      </div>

      <ConfirmModal
        open={deleteTarget !== null}
        title={deleteTarget?.type === "module" ? "Eliminar módulo" : "Eliminar clase"}
        message={`¿Segura que querés eliminar "${deleteTarget?.name}"? ${deleteTarget?.type === "module" ? "Se eliminarán todas las clases del módulo." : "Esta acción no se puede deshacer."}`}
        confirmLabel="Sí, eliminar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
