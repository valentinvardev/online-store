import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "settings.json");

export type Settings = {
  mp_access_token?: string;
  mp_public_key?: string;
  mp_refresh_token?: string;
  mp_user_id?: string;
  mp_mode?: "test" | "live";
};

export function readSettings(): Settings {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8")) as Settings;
  } catch {
    return {};
  }
}

export function writeSettings(patch: Partial<Settings>): Settings {
  const current = readSettings();
  const next = { ...current, ...patch };
  fs.writeFileSync(FILE, JSON.stringify(next, null, 2));
  return next;
}
