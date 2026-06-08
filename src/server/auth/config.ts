import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

import { db } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }
}

const providers: NextAuthConfig["providers"] = [];

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  );
}

if (process.env.AUTH_RESEND_KEY) {
  providers.push(
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "La Reina de Bastos <no-reply@lareinadebastos.com>",
    }),
  );
}

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const authConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(db) as any,
  providers,
  /* JWT (no DB) — necesario para que el middleware Edge no importe
   * el motor wasm de Prisma al verificar la sesión en cada request. */
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    /* Al firmar el JWT (login inicial o refresh), guardamos isAdmin
     * en el token para no consultar la DB en cada session(). */
    jwt: async ({ token, user }) => {
      if (user) {
        token.sub = user.id;
        token.isAdmin =
          (user as { isAdmin?: boolean }).isAdmin ??
          ADMIN_EMAILS.includes((user.email ?? "").toLowerCase());
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub ?? "",
        isAdmin: (token as { isAdmin?: boolean }).isAdmin ?? false,
      },
    }),
  },
  events: {
    /* Cuando un usuario nuevo se registra con un email de la whitelist
     * ADMIN_EMAILS, lo flagueamos como admin automaticamente. */
    async createUser({ user }) {
      const email = user.email?.toLowerCase();
      if (email && ADMIN_EMAILS.includes(email)) {
        await db.user.update({
          where: { id: user.id },
          data: { isAdmin: true },
        });
      }
    },
  },
} satisfies NextAuthConfig;
