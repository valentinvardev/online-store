/* Badge unificada del sitio — fondo sólido + borde morado-dark consistente.
 * Mismo estilo en tienda, cursos y donde haga falta. */

const styles: Record<string, string> = {
  // Producto / curso
  "Más vendido":     "bg-dorado text-tierra-dark",
  "Nuevo":           "bg-celeste text-tierra-dark",
  "Oferta":          "bg-rosa text-crema",
  "Últimos lugares": "bg-morado text-crema",
  "Agotado":         "bg-tierra text-crema",
};

interface Props {
  label: string;
  className?: string;
  /** Tamaño: sm para cards chicas, md por defecto */
  size?: "sm" | "md";
}

export default function Badge({ label, className = "", size = "md" }: Props) {
  const style = styles[label] ?? "bg-verde text-crema";
  const sizing = size === "sm"
    ? "text-[0.62rem] px-2 py-0.5"
    : "text-[0.7rem] px-2.5 py-1";

  return (
    <span
      className={`inline-block font-sans font-bold tracking-widest uppercase border-2 border-morado-dark leading-none whitespace-nowrap ${sizing} ${style} ${className}`}
    >
      {label}
    </span>
  );
}
