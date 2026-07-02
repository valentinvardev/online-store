import "~/styles/globals.css";

import { type Metadata } from "next";
import localFont from "next/font/local";
import { Jost } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import CartProviders from "./_components/cart/CartProviders";
import PageTransition from "./_components/PageTransition";
import MagicCursor from "./_components/MagicCursor";
import VinylPlayer from "./_components/VinylPlayer";

const retroMother = localFont({
  src: "../fonts/RetroMother-Regular.otf",
  variable: "--font-tropi",
  display: "swap",
});

const lostar = localFont({
  src: "../fonts/lostar.ttf",
  variable: "--font-lostar",
  display: "swap",
});

const chevrola = localFont({
  src: "../fonts/al-chevrola.ttf",
  variable: "--font-chevrola",
  display: "swap",
});

// ── Fuentes extra para el editor visual (pestaña Fuentes) ──
const pretorian    = localFont({ src: "../fonts/pretorian-regular.ttf",   variable: "--font-pretorian",    display: "swap" });
const tropiLand    = localFont({ src: "../fonts/tropi-land.ttf",          variable: "--font-tropiland",    display: "swap" });
const funkyGroovy  = localFont({ src: "../fonts/funky-groovy.otf",        variable: "--font-funky",        display: "swap" });
const groovyBeach  = localFont({ src: "../fonts/groovy-beach.ttf",        variable: "--font-groovybeach",  display: "swap" });
const groovyBeachX = localFont({ src: "../fonts/groovy-beach-extrude.ttf",variable: "--font-groovybeachx", display: "swap" });
const groovyClouds = localFont({ src: "../fonts/groovy-clouds.otf",       variable: "--font-groovyclouds", display: "swap" });
const groovyDay    = localFont({ src: "../fonts/groovy-day.ttf",          variable: "--font-groovyday",    display: "swap" });
const kongGroovy   = localFont({ src: "../fonts/kong-groovy.ttf",         variable: "--font-kong",         display: "swap" });
const masaGroovy   = localFont({ src: "../fonts/masa-groovy.ttf",         variable: "--font-masa",         display: "swap" });
const retroGroovy  = localFont({ src: "../fonts/retro-groovy.ttf",        variable: "--font-retrogroovy",  display: "swap" });
const superGroovy  = localFont({ src: "../fonts/super-groovy.ttf",        variable: "--font-super",        display: "swap" });
const theGroovy    = localFont({ src: "../fonts/the-groovy.otf",          variable: "--font-thegroovy",    display: "swap" });

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "La Reina de Bastos",
  description:
    "Magia para la vida cotidiana. Tienda, cursos y servicios personalizados de tarot, rituales y espiritualidad práctica.",
  icons: [
    { rel: "icon",             url: "/logo-rdb.png", type: "image/png" },
    { rel: "apple-touch-icon", url: "/logo-rdb.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${retroMother.variable} ${lostar.variable} ${chevrola.variable} ${jost.variable} ${pretorian.variable} ${tropiLand.variable} ${funkyGroovy.variable} ${groovyBeach.variable} ${groovyBeachX.variable} ${groovyClouds.variable} ${groovyDay.variable} ${kongGroovy.variable} ${masaGroovy.variable} ${retroGroovy.variable} ${superGroovy.variable} ${theGroovy.variable}`}
    >
      <body className="bg-crema font-sans text-tierra antialiased overflow-x-hidden">
        <TRPCReactProvider>
          <MagicCursor />
          <CartProviders>
            <PageTransition>{children}</PageTransition>
          </CartProviders>
          <VinylPlayer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
