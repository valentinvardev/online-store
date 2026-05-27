"use client";

import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total, count } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-morado-dark/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeCart}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] z-50 bg-crema border-l-2 border-morado-dark flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b-2 border-morado/10 shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingBag size={16} strokeWidth={1.5} className="text-morado" />
            <span className="font-sans font-bold text-sm text-morado-dark uppercase tracking-widest">
              Tu carrito
            </span>
            {count > 0 && (
              <span className="bg-dorado text-tierra-dark font-sans font-bold text-[0.65rem] w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="text-morado/40 hover:text-morado transition-colors p-1"
            aria-label="Cerrar carrito"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
              <span className="font-display text-6xl text-morado/10">✦</span>
              <p className="font-sans text-tierra/40 text-sm tracking-wide">
                Tu carrito está vacío
              </p>
              <button
                onClick={closeCart}
                className="font-sans text-xs text-morado/50 hover:text-morado transition-colors tracking-widest uppercase"
              >
                Seguir viendo →
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 bg-white border-2 border-morado/10 p-4">
                  {/* Thumbnail */}
                  <div className={`w-16 h-16 shrink-0 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                    <span className="text-white/40 text-base">✦</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-semibold text-sm text-tierra-dark leading-snug truncate">
                      {item.name}
                    </p>
                    <p className="font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase mt-0.5 mb-3">
                      {item.category}
                    </p>
                    <div className="flex items-center justify-between">
                      {/* Qty */}
                      <div className="flex items-center border-2 border-morado/15">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-morado/40 hover:text-morado hover:bg-morado/5 transition-colors"
                        >
                          <Minus size={11} strokeWidth={2} />
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center font-sans text-xs text-tierra-dark font-semibold border-x-2 border-morado/15">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-morado/40 hover:text-morado hover:bg-morado/5 transition-colors"
                        >
                          <Plus size={11} strokeWidth={2} />
                        </button>
                      </div>
                      <span className="font-sans font-bold text-xl text-morado">
                        ${(item.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>

                  {/* Eliminar */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-tierra/20 hover:text-rosa transition-colors self-start mt-0.5 shrink-0"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 size={13} strokeWidth={1.5} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t-2 border-morado/10 px-6 py-6 space-y-4 shrink-0">
            <div className="flex items-center justify-between">
              <span className="font-sans text-sm text-tierra/55 tracking-wide">Subtotal</span>
              <span className="font-sans font-bold text-2xl text-tierra-dark">
                ${total.toFixed(0)}
              </span>
            </div>
            <button className="w-full bg-dorado text-tierra-dark font-sans font-bold text-xs py-4 border-2 border-morado-dark hover:bg-dorado-light transition-colors tracking-widest uppercase block-shadow">
              Finalizar compra
            </button>
            <button
              onClick={closeCart}
              className="w-full font-sans text-xs text-tierra/40 hover:text-morado transition-colors tracking-widest uppercase py-1"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
