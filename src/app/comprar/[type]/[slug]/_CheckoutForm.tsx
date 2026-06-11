"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, User as UserIcon, Phone, Lock, Eye, EyeOff, Loader2, Sparkles } from "lucide-react";

const inputBase =
  "w-full bg-white border-2 border-morado/20 pl-11 pr-4 py-3.5 font-sans text-sm text-tierra-dark placeholder:text-tierra/30 focus:outline-none focus:border-morado/60 transition-colors";
const labelClass = "block font-sans text-[0.6rem] text-tierra/70 tracking-widest uppercase mb-1.5";

interface Props {
  type: "curso" | "servicio" | "membresia";
  slug: string;
  itemName: string;
  price: number;
}

export default function CheckoutForm({ type, slug, itemName, price }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout/digital", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          slug,
          buyer: {
            email: email.trim().toLowerCase(),
            name: name.trim(),
            apellido: apellido.trim(),
            phone: phone.trim() || undefined,
            password,
          },
        }),
      });
      const data = (await res.json()) as { ok?: boolean; orderId?: string; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "No pudimos procesar la compra");
      }

      /* Auto-login y redirect a la pantalla de éxito */
      await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      router.push(`/comprar/exito?type=${type}&slug=${slug}&orderId=${data.orderId ?? ""}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="mb-7">
        <span className="font-sans text-[0.65rem] text-morado/70 tracking-[0.4em] uppercase block mb-3">
          Crear cuenta y pagar
        </span>
        <h1 className="font-display uppercase text-[clamp(2rem,5vw,2.75rem)] text-tierra-dark leading-none tracking-wide">
          Tus datos
        </h1>
        <p className="font-sans text-tierra/75 text-sm mt-3 leading-relaxed">
          Con estos datos creamos tu cuenta. Con la contraseña vas a poder volver
          a entrar cuando quieras desde <span className="text-morado font-semibold">/login</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre + Apellido */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Nombre</label>
            <div className="relative">
              <UserIcon size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-tierra/35" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="María"
                className={inputBase}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Apellido</label>
            <div className="relative">
              <UserIcon size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-tierra/35" />
              <input
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
                placeholder="González"
                className={inputBase}
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email</label>
          <div className="relative">
            <Mail size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-tierra/35" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              className={inputBase}
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>Teléfono (opcional)</label>
          <div className="relative">
            <Phone size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-tierra/35" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+54 9 11 1234 5678"
              className={inputBase}
            />
          </div>
        </div>

        {/* Password con eye toggle */}
        <div>
          <label className={labelClass}>Contraseña</label>
          <div className="relative">
            <Lock size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-tierra/35" />
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="Mínimo 8 caracteres"
              className={`${inputBase} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              tabIndex={-1}
              aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-tierra/45 hover:text-morado transition-colors"
            >
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          <p className="font-sans text-[0.7rem] text-tierra/55 mt-2 tracking-wide">
            La vas a usar para entrar a tu cuenta y ver tus compras.
          </p>
        </div>

        {error && (
          <p className="font-sans text-[0.85rem] text-rosa bg-rosa/10 border border-rosa/30 px-4 py-3 tracking-wide">
            {error}
          </p>
        )}

        {/* CTA pagar */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2.5 bg-morado-dark text-crema font-sans font-semibold text-[14px] py-5 mt-6 hover:bg-morado transition-colors tracking-widest uppercase block-shadow disabled:opacity-60 disabled:cursor-wait"
        >
          {submitting ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
          {submitting ? "Procesando..." : `Pagar $${price}${type === "membresia" ? " / mes" : ""}`}
        </button>

        <p className="font-sans text-[0.7rem] text-tierra/45 text-center tracking-wide mt-3">
          Al continuar aceptás los términos de uso y la política de privacidad.
        </p>
      </form>
    </div>
  );
}
