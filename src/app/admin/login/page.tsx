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
        <div className="text-center mb-10 space-y-5">
          {/* Carta de tarot */}
          <div className="flex justify-center">
            <svg width="70" height="105" viewBox="0 0 70 105" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Carta de atrás (offset) */}
              <rect x="7" y="7" width="58" height="92" rx="5" fill="#F5C842" fillOpacity="0.25" stroke="#F5C842" strokeWidth="1" strokeOpacity="0.4" />
              {/* Carta principal — fondo crema */}
              <rect x="2" y="2" width="58" height="92" rx="5" fill="#FBF5E6" stroke="#F5C842" strokeWidth="2" />
              {/* Marco interior dorado */}
              <rect x="7" y="7" width="48" height="82" rx="3" stroke="#F5C842" strokeWidth="1" strokeOpacity="0.6" />
              {/* Q esquina superior izquierda */}
              <text x="13" y="21" fill="#7B5EA7" fontSize="12" fontWeight="bold" fontFamily="Georgia, serif">Q</text>
              {/* Palo — bastón (♣) esquina sup */}
              <text x="13" y="32" fill="#7B5EA7" fontSize="10" fontFamily="Georgia, serif">♣</text>
              {/* Estrella central grande */}
              <text x="31" y="58" textAnchor="middle" fill="#F5C842" fontSize="30" fontFamily="Georgia, serif">✦</text>
              {/* Q esquina inferior derecha (invertida) */}
              <g transform="rotate(180 46 80)">
                <text x="40" y="77" fill="#7B5EA7" fontSize="12" fontWeight="bold" fontFamily="Georgia, serif">Q</text>
                <text x="40" y="88" fill="#7B5EA7" fontSize="10" fontFamily="Georgia, serif">♣</text>
              </g>
              {/* Líneas decorativas */}
              <line x1="14" y1="40" x2="48" y2="40" stroke="#F5C842" strokeWidth="0.8" strokeOpacity="0.5" />
              <line x1="14" y1="70" x2="48" y2="70" stroke="#F5C842" strokeWidth="0.8" strokeOpacity="0.5" />
            </svg>
          </div>

          {/* Título */}
          <div>
            <p className="font-display text-dorado text-4xl tracking-widest uppercase leading-none">
              La Reina
            </p>
            <p className="font-display text-crema/40 text-4xl tracking-widest uppercase leading-none mt-1">
              de Bastos
            </p>
          </div>

          <span className="font-sans text-[0.55rem] text-crema/25 tracking-[0.35em] uppercase">
            Administración
          </span>
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
