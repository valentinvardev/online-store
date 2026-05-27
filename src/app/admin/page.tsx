import { BookOpen, ShoppingBag, Users, Mail, TrendingUp, Wrench } from "lucide-react";
import AdminHeader from "./_components/AdminHeader";
import StatCard from "./_components/StatCard";

const stats = [
  { label: "Cursos activos",   value: "9",    sub: "3 niveles distintos",     icon: BookOpen,   color: "bg-morado/10 text-morado" },
  { label: "Productos",        value: "12",   sub: "2 agotados",              icon: ShoppingBag, color: "bg-dorado/15 text-dorado-dark" },
  { label: "Usuarios",         value: "—",    sub: "Conectar Supabase",        icon: Users,      color: "bg-celeste/15 text-celeste" },
  { label: "Suscriptores",     value: "—",    sub: "Conectar Supabase",        icon: Mail,       color: "bg-rosa/15 text-rosa" },
  { label: "Servicios",        value: "6",    sub: "5 lugares disponibles",   icon: Wrench,     color: "bg-verde/15 text-verde" },
  { label: "Ingresos est.",    value: "—",    sub: "Requiere e-commerce real", icon: TrendingUp, color: "bg-naranja/15 text-naranja" },
];

const actividad = [
  { texto: "Nueva suscriptora al newsletter",   hora: "hace 5 min",  color: "bg-rosa" },
  { texto: "Producto 'Kit Ritual' visto 12×",   hora: "hace 22 min", color: "bg-dorado" },
  { texto: "Curso 'Tarot desde Cero' destacado", hora: "hace 1 h",  color: "bg-morado" },
  { texto: "Servicio 'Lectura de Tarot' reservado", hora: "hace 3 h", color: "bg-verde" },
];

export default function AdminDashboard() {
  return (
    <div>
      <AdminHeader
        title="Dashboard"
        subtitle="Resumen general del sitio"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Actividad reciente */}
      <div className="bg-white border-2 border-morado/10 rounded-2xl p-7">
        <h2 className="font-sans font-semibold text-sm text-tierra-dark tracking-widest uppercase mb-6">
          Actividad reciente
        </h2>
        <ul className="space-y-4">
          {actividad.map((a, i) => (
            <li key={i} className="flex items-center gap-4">
              <span className={`w-2 h-2 rounded-full shrink-0 ${a.color}`} />
              <p className="font-sans text-sm text-tierra/70 flex-1 tracking-wide">{a.texto}</p>
              <span className="font-sans text-xs text-tierra/30 tracking-wide whitespace-nowrap">{a.hora}</span>
            </li>
          ))}
        </ul>
        <p className="font-sans text-xs text-tierra/25 tracking-widest uppercase mt-6 pt-5 border-t border-morado/8">
          Actividad real disponible al conectar Supabase
        </p>
      </div>
    </div>
  );
}
