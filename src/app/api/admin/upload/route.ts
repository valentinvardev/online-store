import { NextResponse } from "next/server";
import { uploadToStorage } from "~/lib/upload";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Formato no soportado" }, { status: 400 });
  }

  try {
    const url = await uploadToStorage(file, "images");
    return NextResponse.json({ url });
  } catch (e) {
    console.error("[upload] Error:", e);
    return NextResponse.json({ error: "No se pudo subir la imagen" }, { status: 500 });
  }
}
