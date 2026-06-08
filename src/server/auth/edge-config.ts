/* Config edge-safe — usada por middleware.ts.
 * NO importa PrismaAdapter ni Resend (que arrastra fs/node deps).
 * Solo lo mínimo para que `auth()` en middleware pueda verificar el JWT. */

import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

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

export const authEdgeConfig = {
  providers,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub ?? "",
        isAdmin: (token as { isAdmin?: boolean }).isAdmin ?? false,
      },
    }),
  },
} satisfies NextAuthConfig;
