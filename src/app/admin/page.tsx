"use client";

import { BookOpen, ShoppingBag, Users, Mail, Wrench, TrendingUp, ArrowRight, Sparkles, CalendarCheck, MessageCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import AdminHeader from "./_components/AdminHeader";
import StatCard from "./_components/StatCard";
import { api } from "~/trpc/react";

function timeAgo(date: Date) {
  const min = Math.floor((Date.now() - date.getTime()) / 60000);
  if (min < 1) return "recién";
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h} h`;
  return `hace ${Math.floor(h / 24)} d`;
}

const quickLinks = [
  { label: "Mensaje al Círculo", href: "/admin/circulo",          color: "bg-morado-dark text-crema" },
  { label: "Nuevo curso",        href: "/admin/cursos/nuevo",     color: "bg-dorado text-tierra-dark" },
  { label: "Nuevo producto",     href: "/admin/productos/nuevo",  color: "bg-verde text-crema" },
  { label: "Ver reservas",       href: "/admin/reservas",         color: "bg-rosa/90 text-crema" },
];

export default function AdminDashboard() {
  const { data: s, isLoading } = api.admin.stats.useQuery();
  const { data: comments = [] } = api.admin.comentarios.recent.useQuery();

  const stats = [
    { label: "Socias activas", value: s ? String(s.socias) : "—",      sub: "Membresías del Círculo", icon: Sparkles,    accent: "text-morado",      href: "/admin/usuarios" },
    { label: "Reservas",       value: s ? String(s.reservas) : "—",    sub: "Próximas",               icon: CalendarCheck, accent: "text-rosa",        href: "/admin/reservas" },
    { label: "Ingresos",       value: s ? `$${s.ingresos}` : "—",      sub: "Órdenes pagadas",        icon: TrendingUp,  accent: "text-verde",       href: "/admin/usuarios" },
    { label: "Cursos activos", value: s ? String(s.cursos) : "—",      sub: "Publicados",             icon: BookOpen,    accent: "text-morado",      href: "/admin/cursos" },
    { label: "Productos",      value: s ? String(s.productos) : "—",   sub: "Activos",                icon: ShoppingBag, accent: "text-dorado-dark", href: "/admin/productos" },
    { label: "Servicios",      value: s ? String(s.servicios) : "—",   sub: "Activos",                icon: Wrench,      accent: "text-verde",       href: "/admin/servicios" },
    { label: "Usuarios",       value: s ? String(s.usuarios) : "—",    sub: "Registrados",            icon: Users,       accent: "text-celeste",     href: "/admin/usuarios" },
    { label: "Suscriptoras",   value: s ? String(s.suscriptoras) : "—",sub: "Newsletter",             icon: Mail,        accent: "text-rosa",        href: "/admin/newsletter" },
  ];

  return (
    <div className="space-y-10">
      <AdminHeader title="Dashboard" subtitle="Resumen general del sitio" />

      {/* Quick actions */}
      <div>
        <p className="font-sans text-[0.6rem] text-tierra/55 tracking-[0.3em] uppercase mb-3">Acciones rápidas</p>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map(({ label, href, color }) => (
            <Link key={href} href={href} className={`flex items-center gap-2 px-5 py-2.5 font-sans text-[0.65rem] tracking-widest uppercase font-semibold border-2 border-morado-dark block-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-transform ${color}`}>
              {label} <ArrowRight size={12} />
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div>
        <p className="font-sans text-[0.6rem] text-tierra/55 tracking-[0.3em] uppercase mb-3">Estadísticas</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {stats.map((st) => (
            <Link key={st.label} href={st.href} className="group self-start">
              <StatCard {...st} />
            </Link>
          ))}
        </div>
      </div>

      {/* Comentarios recientes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="font-sans text-[0.6rem] text-tierra/55 tracking-[0.3em] uppercase">Comentarios recientes</p>
          <Link href="/admin/circulo/comentarios" className="font-sans text-[0.6rem] text-morado hover:text-morado-dark tracking-widest uppercase font-semibold inline-flex items-center gap-1">
            Ver todos <ArrowRight size={11} />
          </Link>
        </div>
        <div className="bg-crema border-2 border-morado-dark block-shadow p-6">
          {isLoading ? (
            <div className="flex items-center gap-2 text-tierra/50 py-4"><Loader2 size={15} className="animate-spin" /><span className="font-sans text-sm">Cargando…</span></div>
          ) : comments.length === 0 ? (
            <p className="font-sans text-sm text-tierra/50 py-2 tracking-wide">Todavía no hay comentarios en el Círculo.</p>
          ) : (
            <ul className="divide-y divide-morado/10">
              {comments.slice(0, 6).map((c) => (
                <li key={c.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <MessageCircle size={14} className="text-morado/50 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-[0.82rem] text-tierra-dark/90 leading-snug line-clamp-1">
                      <span className="font-bold">{c.user.name ?? "Anónima"}</span>
                      {c.parentId ? " respondió" : " comentó"}: {c.body}
                    </p>
                    <p className="font-sans text-[0.65rem] text-tierra/45 mt-0.5">
                      en <Link href={`/circulo/${c.post.slug}`} className="text-morado/70 hover:underline">{c.post.title ?? "un mensaje"}</Link> · {timeAgo(c.createdAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
