import { NextResponse } from "next/server";
import { readSettings, writeSettings, type Settings } from "~/lib/settings";

function mask(val: string | undefined) {
  if (!val) return null;
  return val.slice(0, 8) + "••••••••••••" + val.slice(-4);
}

export async function GET() {
  const s = readSettings();
  return NextResponse.json({
    mp_access_token: mask(s.mp_access_token),
    mp_public_key: mask(s.mp_public_key),
    mp_mode: s.mp_mode ?? "test",
    mp_user_id: s.mp_user_id ?? null,
    mp_connected: !!(s.mp_access_token && s.mp_public_key),
  });
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<Settings> & { action?: string };

  if (body.action === "disconnect") {
    writeSettings({
      mp_access_token: undefined,
      mp_public_key: undefined,
      mp_refresh_token: undefined,
      mp_user_id: undefined,
    });
    return NextResponse.json({ ok: true, mp_connected: false });
  }

  const next = writeSettings(body);
  return NextResponse.json({
    ok: true,
    mp_connected: !!(next.mp_access_token && next.mp_public_key),
  });
}
