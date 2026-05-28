"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => undefined });

export function useToast() {
  return useContext(ToastContext);
}

const icons = {
  success: <CheckCircle size={16} strokeWidth={2} />,
  error:   <XCircle    size={16} strokeWidth={2} />,
  info:    <AlertCircle size={16} strokeWidth={2} />,
};

const styles = {
  success: "border-verde text-verde bg-verde/8",
  error:   "border-rosa  text-rosa  bg-rosa/8",
  info:    "border-morado text-morado bg-morado/8",
};

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  useEffect(() => {
    const t = setTimeout(onRemove, 3500);
    return () => clearTimeout(t);
  }, [onRemove]);

  return (
    <div className={`flex items-center gap-3 px-4 py-3 border-2 bg-crema block-shadow min-w-64 max-w-sm animate-[fadeIn_0.2s_ease] ${styles[toast.type]}`}>
      {icons[toast.type]}
      <p className="font-sans text-sm tracking-wide flex-1 text-tierra-dark">{toast.message}</p>
      <button onClick={onRemove} className="text-tierra/30 hover:text-tierra transition-colors ml-1">
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  let counter = 0;

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = ++counter;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onRemove={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
