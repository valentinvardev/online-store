import { BookOpen, ShoppingBag, Users, Mail, Wrench, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import AdminHeader from "./_components/AdminHeader";
import StatCard from "./_components/StatCard";

const stats = [
  { label: "Cursos activos",  value: "9",  sub: "3 niveles",             icon: BookOpen,    accent: "text-morado",     href: "/admin/cursos" },
  { label: "Productos",       value: "12", sub: "2 agotados",             icon: ShoppingBag, accent: "text-dorado-dark", href: "/admin/productos" },
  { label: "Servicios",       value: "6",  sub: "5 lugares disponibles",  icon: Wrench,      accent: "text-verde",       href: "/admin/servicios" },
  { label: "Usuarios",        value: "—",  sub: "Conectar Supabase",      icon: Users,       accent: "text-celeste",     href: "/admin/usuarios" },
  { label: "Suscriptoras",    value: "—",  sub: "Conectar Supabase",      icon: Mail,        accent: "text-rosa",        href: "/admin/newsletter" },
  { label: "Ingresos",        value: "—",  sub: "Requiere e-commerce",    icon: TrendingUp,  accent: "text-tierra/60",   href: "/admin" },
];

const actividad = [
  { texto: "Nueva suscriptora al newsletter",       hora: "hace 5 min",  dot: "bg-rosa" },
  { texto: "Producto 'Kit Ritual' visto 12×",       hora: "hace 22 min", dot: "bg-dorado" },
  { texto: "Curso 'Tarot desde Cero' destacado",    hora: "hace 1 h",    dot: "bg-morado" },
  { texto: "Servicio 'Lectura de Tarot' reservado", hora: "hace 3 h",    dot: "bg-verde" },
];

const quickLinks = [
  { label: "Nuevo curso",     href: "/admin/cursos/nuevo",    color: "bg-morado-dark text-crema" },
  { label: "Nuevo producto",  href: "/admin/productos/nuevo", color: "bg-dorado text-tierra-dark" },
  { label: "Nuevo servicio",  href: "/admin/servicios/nuevo", color: "bg-verde text-crema" },
  { label: "Ver newsletter",  href: "/admin/newsletter",      color: "bg-rosa/90 text-crema" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <AdminHeader title="Dashboard" subtitle="Resumen general del sitio" />

      {/* Quick actions */}
      <div>
        <p className="font-sans text-[0.6rem] text-tierra/55 tracking-[0.3em] uppercase mb-3">Acciones rápidas</p>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map(({ label, href, color }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-5 py-2.5 font-sans text-[0.65rem] tracking-widest uppercase font-semibold border-2 border-morado-dark block-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-transform ${color}`}
            >
              {label}
              <ArrowRight size={12} />
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div>
        <p className="font-sans text-[0.6rem] text-tierra/55 tracking-[0.3em] uppercase mb-3">Estadísticas</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {stats.map((s) => (
            <Link key={s.label} href={s.href} className="group self-start">
              <StatCard {...s} />
            </Link>
          ))}
        </div>
      </div>

      {/* Actividad */}
      <div>
        <p className="font-sans text-[0.6rem] text-tierra/55 tracking-[0.3em] uppercase mb-3">Actividad reciente</p>
        <div className="bg-crema border-2 border-morado-dark block-shadow p-8">
          <ul className="divide-y divide-morado/10">
            {actividad.map((a, i) => (
              <li key={i} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${a.dot}`} />
                <p className="font-sans text-sm text-tierra/70 flex-1 tracking-wide">{a.texto}</p>
                <span className="font-sans text-xs text-tierra/30 tracking-wide whitespace-nowrap">{a.hora}</span>
              </li>
            ))}
          </ul>
          <p className="font-sans text-[0.58rem] text-tierra/25 tracking-widest uppercase mt-6 pt-4 border-t border-morado/10">
            ✦ Actividad real disponible al conectar Supabase
          </p>
        </div>
      </div>
    </div>
  );
}
