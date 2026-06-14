import { NextResponse } from "next/server";
import { uploadToStorage } from "~/lib/upload";

export const runtime = "nodejs";

const ALLOWED_AUDIO = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/ogg",
  "audio/m4a",
  "audio/mp4",
  "audio/x-m4a",
  "audio/aac",
];

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  if (!ALLOWED_AUDIO.includes(file.type)) {
    return NextResponse.json({ error: `Formato no soportado: ${file.type}` }, { status: 400 });
  }

  if (file.size > 50 * 1024 * 1024) {
    return NextResponse.json({ error: "Archivo demasiado grande (máx 50 MB)" }, { status: 400 });
  }

  try {
    const url = await uploadToStorage(file, "audio");
    return NextResponse.json({ url, name: file.name, size: file.size });
  } catch (e) {
    console.error("[upload-audio] Error:", e);
    return NextResponse.json({ error: "No se pudo subir el audio" }, { status: 500 });
  }
}
