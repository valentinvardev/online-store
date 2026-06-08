import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import { authEdgeConfig } from "~/server/auth/edge-config";

const { auth } = NextAuth(authEdgeConfig);

const isDev = process.env.NODE_ENV === "development";
const hasCredentials = !!(
  process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
);

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    // En dev sin credenciales configuradas, permitir acceso libre
    if (isDev && !hasCredentials) return NextResponse.next();

    if (!req.auth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (!req.auth.user?.isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
