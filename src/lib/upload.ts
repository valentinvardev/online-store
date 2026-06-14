import { createClient } from "@supabase/supabase-js";

/* Subida de archivos a Supabase Storage.
 * Reemplaza la escritura a public/uploads (que no funciona en Vercel —
 * filesystem de solo lectura). El bucket 'uploads' se crea público on-demand. */

const BUCKET = "uploads";

function adminStorage() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

let bucketReady = false;
async function ensureBucket(supabase: ReturnType<typeof adminStorage>) {
  if (bucketReady) return;
  const { data } = await supabase.storage.getBucket(BUCKET);
  if (!data) {
    // 50 MB límite (cubre audio). Ignora error si ya existe (carrera).
    await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: "50MB",
    });
  }
  bucketReady = true;
}

export async function uploadToStorage(file: File, folder: string): Promise<string> {
  const supabase = adminStorage();
  await ensureBucket(supabase);

  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${folder}/${Date.now()}-${safe}`;
  const arrayBuffer = await file.arrayBuffer();

  const { error } = await supabase.storage.from(BUCKET).upload(path, arrayBuffer, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
