"use client";

import { AlertTriangle } from "lucide-react";

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ open, title, message, confirmLabel = "Eliminar", onConfirm, onCancel }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-morado-dark/60 backdrop-blur-sm" onClick={onCancel} />

      {/* Modal */}
      <div className="relative bg-crema border-4 border-morado-dark block-shadow w-full max-w-sm p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2.5 bg-rosa/10 border-2 border-rosa/30 shrink-0">
            <AlertTriangle size={18} className="text-rosa" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-display text-2xl text-morado-dark tracking-wide uppercase leading-tight">
              {title}
            </h3>
            <p className="font-sans text-sm text-tierra/60 mt-2 tracking-wide leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 font-sans text-[0.65rem] tracking-widest uppercase py-3 border-2 border-morado/20 text-tierra/60 hover:border-morado/50 hover:text-tierra transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 font-sans text-[0.65rem] tracking-widest uppercase py-3 bg-rosa text-crema border-2 border-rosa hover:bg-rosa-light transition-colors font-semibold block-shadow-sm"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
