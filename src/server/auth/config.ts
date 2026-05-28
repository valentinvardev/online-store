import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db } from "~/server/db";

const ADMIN_EMAIL = "valentinvarela0508@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin1234";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  providers: [
    Credentials({
      name: "Credenciales",
      credentials: {
        email:    { label: "Email",      type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === ADMIN_EMAIL &&
          credentials?.password === ADMIN_PASSWORD
        ) {
          return {
            id: "admin",
            name: "Admin",
            email: ADMIN_EMAIL,
          };
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.email = user.email;
      return token;
    },
    session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email as string;
        session.user.id = token.sub ?? "admin";
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
} satisfies NextAuthConfig;
