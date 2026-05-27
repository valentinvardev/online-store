import { auth } from "~/server/auth";
import { NextResponse } from "next/server";

const ADMIN_EMAIL = "valentinvarela0508@gmail.com";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (!req.auth?.user) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }
    if (req.auth.user.email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
