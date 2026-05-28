"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./CartContext";
import CartDrawer from "./CartDrawer";

export default function CartProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </SessionProvider>
  );
}
