"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Mail, Lock, User as UserIcon, Loader2 } from "lucide-react";

export default function RegistroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "No pudimos crear tu cuenta");
      }

      // Auto-signin con las credenciales recién creadas
      const signed = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (signed?.error) {
        // Si el auto-login falla, mandalas al login a mano
        router.push("/login");
        return;
      }

      /* Rutear segun si quedo flageada como admin (caso: email en ADMIN_EMAILS). */
      try {
        const sessionRes = await fetch("/api/auth/session", { cache: "no-store" });
        const session = (await sessionRes.json()) as { user?: { isAdmin?: boolean } } | null;
        router.push(session?.user?.isAdmin ? "/admin" : "/mi-cuenta");
      } catch {
        router.push("/mi-cuenta");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-crema flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-sans text-[0.8rem] text-morado/65 tracking-[0.45em] uppercase mb-4">
            La Reina de Bastos
          </p>
          <h1 className="font-display uppercase text-[clamp(2.5rem,6vw,3rem)] text-tierra-dark leading-none tracking-wide">
            Crear cuenta
          </h1>
          <div className="flex items-center gap-4 mt-5 justify-center">
            <div className="h-px w-10 bg-dorado/40" />
            <span className="text-dorado/40 text-[13px]">✦</span>
            <div className="h-px w-10 bg-dorado/40" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div className="relative">
            <UserIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-tierra/35" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              required
              className="w-full bg-white border-2 border-morado/20 pl-11 pr-4 py-3.5 font-sans text-sm text-tierra-dark placeholder:text-tierra/30 focus:outline-none focus:border-morado/60 transition-colors"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="relative">
            <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-tierra/35" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña (mínimo 8 caracteres)"
              required
              minLength={8}
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
            {submitting ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="font-sans text-[0.85rem] text-tierra/55 text-center mt-7 tracking-wide">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="text-morado hover:text-morado-dark font-semibold transition-colors">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
