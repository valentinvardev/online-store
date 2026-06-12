/* Convierte una URL de Vimeo o YouTube a su URL de embed para <iframe>.
 * Devuelve null si no reconoce el formato. */
export function toEmbedUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const s = raw.trim();

  // Ya es un embed
  if (s.includes("player.vimeo.com/video/")) return s;
  if (s.includes("youtube.com/embed/")) return s;

  // Vimeo: vimeo.com/123456 o vimeo.com/123456/hash
  const vimeoHash = /vimeo\.com\/(\d+)\/([a-f0-9]+)/.exec(s);
  if (vimeoHash) return `https://player.vimeo.com/video/${vimeoHash[1]}?h=${vimeoHash[2]}`;
  const vimeo = /vimeo\.com\/(\d+)/.exec(s);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  // YouTube: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/shorts/ID
  const ytShort = /youtu\.be\/([\w-]+)/.exec(s);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;
  const ytWatch = /[?&]v=([\w-]+)/.exec(s);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;
  const ytShorts = /youtube\.com\/shorts\/([\w-]+)/.exec(s);
  if (ytShorts) return `https://www.youtube.com/embed/${ytShorts[1]}`;

  // Solo el id numerico → asumimos Vimeo
  if (/^\d+$/.test(s)) return `https://player.vimeo.com/video/${s}`;

  return null;
}
