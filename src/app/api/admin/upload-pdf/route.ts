import { NextResponse } from "next/server";
import { uploadToStorage } from "~/lib/upload";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Solo se aceptan archivos PDF" }, { status: 400 });
  }

  if (file.size > 20 * 1024 * 1024) {
    return NextResponse.json({ error: "El PDF no puede superar 20 MB" }, { status: 400 });
  }

  try {
    const url = await uploadToStorage(file, "pdfs");
    return NextResponse.json({ url, name: file.name, size: file.size });
  } catch (e) {
    console.error("[upload-pdf] Error:", e);
    return NextResponse.json({ error: "No se pudo subir el PDF" }, { status: 500 });
  }
}
