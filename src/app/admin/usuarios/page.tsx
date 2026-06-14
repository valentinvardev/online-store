"use client";

import { Users, Loader2, Mail, MessageCircle, Crown, Sparkles } from "lucide-react";
import AdminHeader from "../_components/AdminHeader";
import { api } from "~/trpc/react";

/* Limpia el teléfono a solo dígitos para el link de WhatsApp (wa.me) */
function waLink(phone: string) {
  const digits = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}`;
}

const membershipBadge: Record<string, { text: string; cls: string }> = {
  ACTIVE: { text: "Socia", cls: "bg-verde/15 text-verde border-verde/30" },
  PENDING: { text: "Pendiente", cls: "bg-dorado/20 text-tierra-dark border-dorado/40" },
  CANCELLED: { text: "Cancelada", cls: "bg-tierra/8 text-tierra/60 border-tierra/15" },
  PAST_DUE: { text: "Vencida", cls: "bg-rosa/15 text-rosa border-rosa/30" },
};

export default function AdminUsuarios() {
  const { data: users = [], isLoading } = api.admin.usuarios.list.useQuery();

  return (
    <div>
      <AdminHeader title="Usuarios" subtitle={`${users.length} ${users.length === 1 ? "usuario" : "usuarios"} registrados`} />

      <div className="bg-white border-2 border-morado-dark block-shadow overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-tierra/60">
            <Loader2 size={18} className="animate-spin" />
            <span className="font-sans text-sm tracking-wide">Cargando usuarios…</span>
          </div>
        ) : users.length === 0 ? (
          <div className="px-6 py-16 text-center font-sans text-sm text-tierra/55">
            Todavía no hay usuarios registrados.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px]">
              <thead>
                <tr className="border-b-2 border-morado-dark bg-morado-dark">
                  <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-6 py-4">Usuario</th>
                  <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Contacto</th>
                  <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Membresía</th>
                  <th className="text-center font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Cursos</th>
                  <th className="text-center font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Compras</th>
                  <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Rol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-morado/10">
                {users.map((u) => {
                  const mem = u.memberships[0]?.status;
                  const badge = mem ? membershipBadge[mem] : null;
                  return (
                    <tr key={u.id} className="hover:bg-dorado/5 transition-colors">
                      {/* Usuario */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-morado/12 border-2 border-morado/15 flex items-center justify-center shrink-0 overflow-hidden">
                            {u.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={u.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <Users size={14} className="text-morado" />
                            )}
                          </div>
                          <p className="font-sans font-semibold text-sm text-tierra-dark tracking-wide">
                            {u.name ?? "—"}
                          </p>
                        </div>
                      </td>

                      {/* Contacto: email + whatsapp */}
                      <td className="px-4 py-4">
                        <div className="space-y-1.5">
                          {u.email && (
                            <a
                              href={`mailto:${u.email}`}
                              className="flex items-center gap-1.5 font-sans text-[0.78rem] text-tierra/70 hover:text-morado transition-colors"
                            >
                              <Mail size={12} className="shrink-0" />
                              {u.email}
                            </a>
                          )}
                          {u.phone ? (
                            <a
                              href={waLink(u.phone)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 font-sans text-[0.78rem] text-verde font-semibold hover:text-verde-dark transition-colors"
                              title="Escribir por WhatsApp"
                            >
                              <MessageCircle size={12} className="shrink-0" />
                              {u.phone}
                            </a>
                          ) : (
                            <span className="font-sans text-[0.72rem] text-tierra/35 italic">sin teléfono</span>
                          )}
                        </div>
                      </td>

                      {/* Membresía */}
                      <td className="px-4 py-4">
                        {badge ? (
                          <span className={`inline-flex items-center gap-1 font-sans text-[0.6rem] px-2.5 py-1 border rounded-full tracking-widest uppercase ${badge.cls}`}>
                            <Sparkles size={9} /> {badge.text}
                          </span>
                        ) : (
                          <span className="font-sans text-[0.7rem] text-tierra/35">—</span>
                        )}
                      </td>

                      {/* Cursos */}
                      <td className="px-4 py-4 text-center">
                        <span className="font-display text-lg text-morado">{u._count.enrollments}</span>
                      </td>
                      {/* Compras */}
                      <td className="px-4 py-4 text-center">
                        <span className="font-display text-lg text-tierra-dark/70">{u._count.orders}</span>
                      </td>

                      {/* Rol */}
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1 font-sans text-[0.6rem] px-2.5 py-1 border rounded-full tracking-widest uppercase ${
                          u.isAdmin
                            ? "bg-morado/15 text-morado border-morado/25"
                            : "bg-tierra/8 text-tierra/70 border-tierra/15"
                        }`}>
                          {u.isAdmin && <Crown size={9} />}
                          {u.isAdmin ? "Admin" : "Usuario"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
