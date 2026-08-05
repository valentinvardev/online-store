import Image from "next/image";

/* Iconos ilustrados (stickers PNG a todo color, estética Lisa Frank) de la
 * librería surcodia. Uso DECORATIVO/temático — los controles de UI (cerrar,
 * flechas, spinner, campos de formulario) siguen usando lucide-react. */

export type StickerName =
  | "luna" | "sol" | "estrella" | "estrella-2" | "cometa" | "destello"
  | "eclipse" | "planeta" | "constelacion" | "constelacion-2" | "carta"
  | "basto" | "copa" | "copa-2" | "espada" | "corona" | "corona-2"
  | "bola-de-cristal" | "cristal" | "ojo-mistico" | "mano" | "pocion"
  | "vela" | "llave" | "varita" | "libro" | "mariposa-lunar" | "reloj-de-arena";

export default function Sticker({
  name,
  size = 24,
  className = "",
  alt = "",
}: {
  name: StickerName;
  size?: number;
  className?: string;
  alt?: string;
}) {
  return (
    <Image
      src={`/iconos/${name}.png`}
      width={size}
      height={size}
      alt={alt}
      aria-hidden={alt === "" ? true : undefined}
      draggable={false}
      className={`inline-block align-middle select-none ${className}`}
    />
  );
}
