import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { writeSettings } from "~/lib/settings";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const oauthError = searchParams.get("error");

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const configUrl = `${baseUrl}/admin/configuracion`;

  if (oauthError) {
    return NextResponse.redirect(`${configUrl}?error=${oauthError}`);
  }

  const cookieStore = await cookies();
  const savedState = cookieStore.get("mp_oauth_state")?.value;
  if (!state || state !== savedState) {
    return NextResponse.redirect(`${configUrl}?error=invalid_state`);
  }

  const mode = state.startsWith("live:") ? "live" : "test";

  if (!code) {
    return NextResponse.redirect(`${configUrl}?error=no_code`);
  }

  const clientId = process.env.MP_APP_ID;
  const clientSecret = process.env.MP_APP_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(`${configUrl}?error=no_app_credentials`);
  }

  const redirectUri = `${baseUrl}/api/admin/mp-callback`;

  try {
    const res = await fetch("https://api.mercadopago.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        test_token: mode === "test",
      }),
    });

    type MPToken = {
      access_token?: string;
      public_key?: string;
      refresh_token?: string;
      user_id?: number;
    };
    const data = (await res.json()) as MPToken;

    if (!res.ok || !data.access_token) {
      return NextResponse.redirect(`${configUrl}?error=token_exchange`);
    }

    writeSettings({
      mp_access_token: data.access_token,
      mp_public_key: data.public_key,
      mp_refresh_token: data.refresh_token,
      mp_user_id: data.user_id ? String(data.user_id) : undefined,
      mp_mode: mode,
    });

    const response = NextResponse.redirect(`${configUrl}?connected=1`);
    response.cookies.delete("mp_oauth_state");
    return response;
  } catch {
    return NextResponse.redirect(`${configUrl}?error=fetch_failed`);
  }
}
