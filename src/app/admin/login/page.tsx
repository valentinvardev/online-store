"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) setError("Email o contraseña incorrectos.");
    else router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-morado-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Blobs decorativos */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-morado/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rosa/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-dorado/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="font-display text-dorado text-3xl tracking-widest uppercase leading-none">
            La Reina
          </p>
          <p className="font-display text-crema/30 text-3xl tracking-widest uppercase leading-none">
            de Bastos
          </p>
          <div className="ornament text-dorado/20 mt-4">
            <span className="font-sans text-[0.55rem] text-crema/25 tracking-[0.35em] uppercase px-3">
              Administración
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-crema border-4 border-dorado block-shadow-dorado p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-sans text-[0.6rem] text-tierra/50 tracking-widest uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white border-2 border-morado/20 px-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/25 focus:outline-none focus:border-morado transition-colors"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block font-sans text-[0.6rem] text-tierra/50 tracking-widest uppercase mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white border-2 border-morado/20 px-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/25 focus:outline-none focus:border-morado transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="font-sans text-xs text-rosa text-center tracking-wide">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-morado-dark text-crema font-sans font-semibold text-[0.7rem] py-3.5 tracking-widest uppercase block-shadow hover:bg-morado transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? "Entrando..." : "✦ Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
