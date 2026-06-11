"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, Loader2 } from "lucide-react";

export default function LoginCredentialsForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await signIn("credentials", {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email o contraseña incorrectos");
      setSubmitting(false);
      return;
    }

    router.push("/mi-cuenta");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-tierra/35" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className="w-full bg-white border-2 border-morado/20 pl-11 pr-4 py-3.5 font-sans text-sm text-tierra-dark placeholder:text-tierra/30 focus:outline-none focus:border-morado/60 transition-colors"
        />
      </div>
      <div className="relative">
        <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-tierra/35" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          className="w-full bg-white border-2 border-morado/20 pl-11 pr-4 py-3.5 font-sans text-sm text-tierra-dark placeholder:text-tierra/30 focus:outline-none focus:border-morado/60 transition-colors"
        />
      </div>

      {error && (
        <p className="font-sans text-[0.8rem] text-rosa bg-rosa/10 border border-rosa/30 px-3 py-2 tracking-wide">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 bg-morado text-crema font-sans font-semibold text-[13px] py-4 hover:bg-morado-light transition-colors tracking-widest uppercase block-shadow disabled:opacity-60 disabled:cursor-wait"
      >
        {submitting && <Loader2 size={14} className="animate-spin" />}
        {submitting ? "Entrando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
