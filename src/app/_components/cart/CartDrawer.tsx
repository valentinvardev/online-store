"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowLeft, User, Mail, Phone } from "lucide-react";
import { useCart, type BuyerInfo, type LastOrder } from "./CartContext";

const inputClass = "w-full bg-white border-2 border-morado/20 px-3 py-2.5 font-sans text-sm text-tierra-dark placeholder:text-tierra/25 focus:outline-none focus:border-morado transition-colors";
const labelClass = "block font-sans text-[0.58rem] text-tierra/45 tracking-widest uppercase mb-1";

type Step = "cart" | "checkout";

export default function CartDrawer() {
  const router = useRouter();
  const { items, isOpen, closeCart, removeItem, updateQty, clearCart, total, count } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [buyer, setBuyer] = useState<BuyerInfo>({ name: "", apellido: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const set = (k: keyof BuyerInfo, v: string) => setBuyer((b) => ({ ...b, [k]: v }));

  function handleClose() {
    closeCart();
    // Reset step when drawer closes
    setTimeout(() => setStep("cart"), 300);
  }

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const order: LastOrder = { buyer, items, total };
    try {
      localStorage.setItem("rdb_last_order", JSON.stringify(order));
    } catch {}

    clearCart();
    handleClose();
    router.push("/pago/gracias");
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-morado-dark/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] z-50 bg-crema border-l-2 border-morado-dark flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* ── HEADER ─────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-5 border-b-2 border-morado/10 shrink-0">
          <div className="flex items-center gap-3">
            {step === "checkout" && (
              <button onClick={() => setStep("cart")} className="text-morado/40 hover:text-morado transition-colors mr-1">
                <ArrowLeft size={16} strokeWidth={1.5} />
              </button>
            )}
            <ShoppingBag size={16} strokeWidth={1.5} className="text-morado" />
            <span className="font-sans font-bold text-sm text-morado-dark uppercase tracking-widest">
              {step === "cart" ? "Tu carrito" : "Tus datos"}
            </span>
            {step === "cart" && count > 0 && (
              <span className="bg-dorado text-tierra-dark font-sans font-bold text-[0.65rem] w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
          <button onClick={handleClose} className="text-morado/40 hover:text-morado transition-colors p-1" aria-label="Cerrar">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* ── STEP: CART ─────────────────────────── */}
        {step === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
                  <span className="font-display text-6xl text-morado/10">✦</span>
                  <p className="font-sans text-tierra/40 text-sm tracking-wide">Tu carrito está vacío</p>
                  <button onClick={handleClose} className="font-sans text-xs text-morado/50 hover:text-morado transition-colors tracking-widest uppercase">
                    Seguir viendo →
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 bg-white border-2 border-morado/10 p-4">
                      <div className={`w-16 h-16 shrink-0 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                        <span className="text-white/40 text-base">✦</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans font-semibold text-sm text-tierra-dark leading-snug truncate">{item.name}</p>
                        <p className="font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase mt-0.5 mb-3">{item.category}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border-2 border-morado/15">
                            <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-morado/40 hover:text-morado hover:bg-morado/5 transition-colors">
                              <Minus size={11} strokeWidth={2} />
                            </button>
                            <span className="w-7 h-7 flex items-center justify-center font-sans text-xs text-tierra-dark font-semibold border-x-2 border-morado/15">
                              {item.quantity}
                            </span>
                            <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-morado/40 hover:text-morado hover:bg-morado/5 transition-colors">
                              <Plus size={11} strokeWidth={2} />
                            </button>
                          </div>
                          <span className="font-sans font-bold text-xl text-morado">${(item.price * item.quantity).toFixed(0)}</span>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-tierra/20 hover:text-rosa transition-colors self-start mt-0.5 shrink-0" aria-label="Eliminar">
                        <Trash2 size={13} strokeWidth={1.5} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t-2 border-morado/10 px-6 py-6 space-y-4 shrink-0">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm text-tierra/55 tracking-wide">Subtotal</span>
                  <span className="font-sans font-bold text-2xl text-tierra-dark">${total.toFixed(0)}</span>
                </div>
                <button
                  onClick={() => setStep("checkout")}
                  className="w-full bg-dorado text-tierra-dark font-sans font-bold text-xs py-4 border-2 border-morado-dark hover:bg-dorado-light transition-colors tracking-widest uppercase block-shadow"
                >
                  Finalizar compra
                </button>
                <button onClick={handleClose} className="w-full font-sans text-xs text-tierra/40 hover:text-morado transition-colors tracking-widest uppercase py-1">
                  Seguir comprando
                </button>
              </div>
            )}
          </>
        )}

        {/* ── STEP: CHECKOUT ─────────────────────── */}
        {step === "checkout" && (
          <form onSubmit={handleConfirm} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

              {/* Resumen compacto */}
              <div className="bg-white border-2 border-morado/10 p-4 space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-2">
                    <span className="font-sans text-xs text-tierra/60 truncate flex-1">{item.name} ×{item.quantity}</span>
                    <span className="font-sans text-xs font-semibold text-tierra-dark shrink-0">${(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t border-morado/10 pt-2 mt-2">
                  <span className="font-sans text-[0.65rem] text-tierra/40 tracking-widest uppercase">Total</span>
                  <span className="font-sans font-bold text-base text-morado">${total.toFixed(0)}</span>
                </div>
              </div>

              {/* Formulario */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <User size={13} className="text-morado/50" strokeWidth={1.5} />
                  <p className="font-sans text-[0.62rem] text-tierra/40 tracking-widest uppercase">Información de contacto</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Nombre <span className="text-rosa">*</span></label>
                    <input
                      className={inputClass}
                      placeholder="Ana"
                      value={buyer.name}
                      onChange={(e) => set("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Apellido <span className="text-rosa">*</span></label>
                    <input
                      className={inputClass}
                      placeholder="García"
                      value={buyer.apellido}
                      onChange={(e) => set("apellido", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    <Mail size={10} className="inline mr-1" />
                    Email <span className="text-rosa">*</span>
                  </label>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="ana@ejemplo.com"
                    value={buyer.email}
                    onChange={(e) => set("email", e.target.value)}
                    required
                  />
                  <p className="font-sans text-[0.58rem] text-tierra/30 tracking-wide mt-1">
                    Vamos a enviarte los detalles de tu pedido a este email.
                  </p>
                </div>

                <div>
                  <label className={labelClass}>
                    <Phone size={10} className="inline mr-1" />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className={inputClass}
                    placeholder="+54 9 11 1234-5678"
                    value={buyer.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="border-t-2 border-morado/10 px-6 py-6 space-y-3 shrink-0">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-dorado text-tierra-dark font-sans font-bold text-xs py-4 border-2 border-morado-dark hover:bg-dorado-light transition-colors tracking-widest uppercase block-shadow disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Procesando..." : "Confirmar compra ✦"}
              </button>
              <button
                type="button"
                onClick={() => setStep("cart")}
                className="w-full font-sans text-xs text-tierra/40 hover:text-morado transition-colors tracking-widest uppercase py-1"
              >
                ← Volver al carrito
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
