import Link from "next/link";
import { BookOpen, ShoppingBag, Wrench, Users, Mail, Settings, Plus, List } from "lucide-react";

const sections = [
  {
    label: "Cursos",
    description: "Publicá y gestioná tus cursos online. Editá precios, niveles, estructura y visibilidad.",
    icon: BookOpen,
    color: "bg-morado-dark",
    accent: "border-morado",
    listHref: "/admin/cursos",
    newHref: "/admin/cursos/nuevo",
  },
  {
    label: "Productos",
    description: "Administrá tu tienda. Físicos, digitales o personalizados — todo desde acá.",
    icon: ShoppingBag,
    color: "bg-dorado",
    accent: "border-dorado",
    listHref: "/admin/productos",
    newHref: "/admin/productos/nuevo",
  },
  {
    label: "Servicios",
    description: "Tus sesiones y servicios personales. Lecturas, asesorías, talleres y más.",
    icon: Wrench,
    color: "bg-verde",
    accent: "border-verde",
    listHref: "/admin/servicios",
    newHref: "/admin/servicios/nuevo",
  },
];

const secondary = [
  { label: "Usuarios",      icon: Users,    href: "/admin/usuarios",      color: "text-celeste" },
  { label: "Newsletter",    icon: Mail,     href: "/admin/newsletter",    color: "text-rosa" },
  { label: "Configuración", icon: Settings, href: "/admin/configuracion", color: "text-dorado-dark" },
];

export default function AdminHub() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-14 space-y-14">

      {/* Saludo */}
      <div>
        <p className="font-sans text-[0.6rem] text-tierra/30 tracking-[0.35em] uppercase mb-2">Panel de administración</p>
        <h1 className="font-display text-5xl text-morado-dark tracking-wide uppercase leading-none">
          Hola, Belén
        </h1>
        <p className="font-sans text-tierra/50 mt-3 tracking-wide">¿Qué querés gestionar hoy?</p>
      </div>

      {/* Secciones principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {sections.map(({ label, description, icon: Icon, color, accent, listHref, newHref }) => (
          <div
            key={label}
            className={`bg-crema border-2 border-morado-dark block-shadow overflow-hidden flex flex-col`}
          >
            {/* Header de la card */}
            <div className={`${color} px-6 pt-6 pb-5`}>
              <Icon size={28} className="text-white/80 mb-3" strokeWidth={1.5} />
              <h2 className="font-display text-2xl text-white tracking-wide uppercase leading-none">
                {label}
              </h2>
            </div>

            {/* Body */}
            <div className="px-6 py-5 flex-1 flex flex-col justify-between gap-5">
              <p className="font-sans text-sm text-tierra/60 tracking-wide leading-relaxed">
                {description}
              </p>

              <div className="flex flex-col gap-2">
                <Link
                  href={newHref}
                  className="flex items-center justify-center gap-2 bg-morado-dark text-crema font-sans text-[0.65rem] py-3 tracking-widest uppercase font-semibold border-2 border-morado-dark block-shadow-sm hover:bg-morado transition-colors"
                >
                  <Plus size={12} /> Crear nuevo
                </Link>
                <Link
                  href={listHref}
                  className="flex items-center justify-center gap-2 font-sans text-[0.65rem] py-3 tracking-widest uppercase border-2 border-morado/20 text-tierra/50 hover:border-morado/50 hover:text-tierra transition-colors"
                >
                  <List size={12} /> Ver todos
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Secciones secundarias */}
      <div>
        <p className="font-sans text-[0.6rem] text-tierra/30 tracking-[0.35em] uppercase mb-4">Otras secciones</p>
        <div className="flex flex-wrap gap-3">
          {secondary.map(({ label, icon: Icon, href, color }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-5 py-3 bg-crema border-2 border-morado/15 hover:border-morado/40 transition-colors group"
            >
              <Icon size={14} className={`${color} shrink-0`} strokeWidth={1.8} />
              <span className="font-sans text-[0.65rem] tracking-widest uppercase text-tierra/60 group-hover:text-tierra transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
