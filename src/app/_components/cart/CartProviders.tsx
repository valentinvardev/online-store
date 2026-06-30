"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./CartContext";
import CartDrawer from "./CartDrawer";
import ThemeEditorProvider from "../editor/ThemeEditorContext";

export default function CartProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <ThemeEditorProvider>
          {children}
          <CartDrawer />
        </ThemeEditorProvider>
      </CartProvider>
    </SessionProvider>
  );
}
