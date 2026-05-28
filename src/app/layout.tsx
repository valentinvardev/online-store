import "~/styles/globals.css";

import { type Metadata } from "next";
import localFont from "next/font/local";
import { Jost } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import CartProviders from "./_components/cart/CartProviders";
import PageTransition from "./_components/PageTransition";

const lostar = localFont({
  src: "../fonts/lostar.ttf",
  variable: "--font-tropi",
  display: "swap",
});

const chevrola = localFont({
  src: "../fonts/al-chevrola.ttf",
  variable: "--font-chevrola",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "La Reina de Bastos",
  description:
    "Espiritualidad que sabe a tierra. Tienda, cursos y servicios personalizados de tarot, rituales y espiritualidad práctica.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${lostar.variable} ${chevrola.variable} ${jost.variable}`}
    >
      <body className="bg-crema font-sans text-tierra antialiased">
        <TRPCReactProvider>
          <CartProviders>
            <PageTransition>{children}</PageTransition>
          </CartProviders>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
