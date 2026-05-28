import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode") === "live" ? "live" : "test";

  const clientId = process.env.MP_APP_ID;
  if (!clientId) {
    return NextResponse.redirect(
      new URL("/admin/configuracion?error=no_app_id", req.url),
    );
  }

  const state = `${mode}:${randomBytes(16).toString("hex")}`;
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const redirectUri = `${baseUrl}/api/admin/mp-callback`;

  const url = new URL("https://auth.mercadopago.com/authorization");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("platform_id", "mp");
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("state", state);

  const response = NextResponse.redirect(url.toString());
  response.cookies.set("mp_oauth_state", state, {
    httpOnly: true,
    maxAge: 600,
    path: "/",
    sameSite: "lax",
  });
  return response;
}
