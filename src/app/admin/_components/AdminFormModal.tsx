"use client";

import { X } from "lucide-react";

interface Props {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  children: React.ReactNode;
  submitLabel?: string;
}

export default function AdminFormModal({ open, title, subtitle, onClose, onSubmit, children, submitLabel = "Guardar" }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-morado-dark/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer derecha */}
      <div className="relative bg-crema-dark w-full max-w-lg h-screen flex flex-col border-l-4 border-morado-dark shadow-2xl overflow-hidden"
        style={{ animation: "slideIn 0.25s ease" }}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b-2 border-morado/15 bg-crema shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-sans text-[0.58rem] text-tierra/35 tracking-[0.3em] uppercase mb-1">
                ✦ Panel de administración
              </p>
              <h2 className="font-display text-3xl text-morado-dark tracking-wide uppercase leading-none">
                {title}
              </h2>
              {subtitle && (
                <p className="font-sans text-sm text-tierra/45 mt-2 tracking-wide">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-tierra/30 hover:text-tierra transition-colors mt-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-7 space-y-5">
          {children}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t-2 border-morado/15 bg-crema shrink-0 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 font-sans text-[0.65rem] tracking-widest uppercase py-3 border-2 border-morado/20 text-tierra/60 hover:border-morado/50 hover:text-tierra transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="admin-form"
            className="flex-1 font-sans text-[0.65rem] tracking-widest uppercase py-3 bg-morado-dark text-crema border-2 border-morado-dark block-shadow-sm hover:bg-morado transition-colors font-semibold"
          >
            {submitLabel}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ── Campos reutilizables ── */

interface FieldProps {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function Field({ label, hint, required, children }: FieldProps) {
  return (
    <div>
      <label className="block font-sans text-[0.6rem] text-tierra/50 tracking-widest uppercase mb-1.5">
        {label} {required && <span className="text-rosa">*</span>}
      </label>
      {hint && <p className="font-sans text-xs text-tierra/35 tracking-wide mb-2">{hint}</p>}
      {children}
    </div>
  );
}

const inputClass = "w-full bg-white border-2 border-morado/15 px-4 py-2.5 font-sans text-sm text-tierra-dark placeholder:text-tierra/25 focus:outline-none focus:border-morado transition-colors";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputClass} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={3} {...props} className={`${inputClass} resize-none`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${inputClass} cursor-pointer`} />
  );
}
