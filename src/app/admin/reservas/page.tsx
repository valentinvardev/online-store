"use client";

import { Loader2, Mail, MessageCircle, Calendar, Video, Clock } from "lucide-react";
import AdminHeader from "../_components/AdminHeader";
import { api } from "~/trpc/react";

const dateFmt = new Intl.DateTimeFormat("es-AR", {
  weekday: "short", day: "numeric", month: "short", year: "numeric",
});
const timeFmt = new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit" });

function waLink(phone: string) {
  return `https://wa.me/${phone.replace(/[^\d]/g, "")}`;
}

// El form de /reservas guarda el whatsapp dentro de notes ("WhatsApp: <num>")
function extractWhatsApp(notes: string | null): string | null {
  if (!notes) return null;
  const m = /whatsapp:\s*([+\d][\d\s()-]{5,})/i.exec(notes);
  return m?.[1]?.trim() ?? null;
}

export default function AdminReservas() {
  const { data: reservas = [], isLoading } = api.admin.reservas.list.useQuery();

  const now = Date.now();
  const proximas = reservas.filter((r) => r.date.getTime() >= now);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Reservas"
        subtitle={`${reservas.length} en total · ${proximas.length} próximas`}
      />

      <div className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-tierra/60">
            <Loader2 size={18} className="animate-spin" />
            <span className="font-sans text-sm tracking-wide">Cargando reservas…</span>
          </div>
        ) : reservas.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Calendar size={28} className="text-morado/20 mx-auto mb-3" />
            <p className="font-sans text-sm text-tierra/55">
              Todavía no hay reservas. Cuando alguien reserve desde el sitio, aparece acá.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b-2 border-morado-dark bg-morado-dark">
                  <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-6 py-4">Cuándo</th>
                  <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Sesión</th>
                  <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Persona</th>
                  <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Contacto</th>
                  <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Notas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-morado/10">
                {reservas.map((r) => {
                  const past = r.date.getTime() < now;
                  const phone = r.user?.phone ?? extractWhatsApp(r.notes);
                  return (
                    <tr key={r.id} className={`hover:bg-dorado/5 transition-colors ${past ? "opacity-55" : ""}`}>
                      {/* Cuándo */}
                      <td className="px-6 py-4">
                        <p className="font-sans font-bold text-sm text-tierra-dark capitalize">{dateFmt.format(r.date)}</p>
                        <p className="font-sans text-[0.72rem] text-tierra/55 flex items-center gap-1 mt-0.5">
                          <Clock size={10} /> {timeFmt.format(r.date)} hs
                          {!past && <span className="text-verde font-semibold tracking-widest uppercase text-[0.55rem] ml-1">· próxima</span>}
                        </p>
                      </td>
                      {/* Sesión */}
                      <td className="px-4 py-4">
                        <p className="font-sans font-semibold text-sm text-tierra-dark">{r.service.name}</p>
                        <p className="font-sans text-[0.7rem] text-tierra/55 flex items-center gap-1 mt-0.5">
                          <Video size={10} /> {r.service.format}{r.service.durationLabel ? ` · ${r.service.durationLabel}` : ""}
                        </p>
                      </td>
                      {/* Persona */}
                      <td className="px-4 py-4">
                        <span className="font-sans text-sm text-tierra-dark">{r.user?.name ?? "—"}</span>
                      </td>
                      {/* Contacto */}
                      <td className="px-4 py-4">
                        <div className="space-y-1.5">
                          <a href={`mailto:${r.email}`} className="flex items-center gap-1.5 font-sans text-[0.76rem] text-tierra/70 hover:text-morado transition-colors">
                            <Mail size={12} className="shrink-0" /> {r.email}
                          </a>
                          {phone && (
                            <a href={waLink(phone)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-sans text-[0.76rem] text-verde font-semibold hover:text-verde-dark transition-colors" title="Escribir por WhatsApp">
                              <MessageCircle size={12} className="shrink-0" /> {phone}
                            </a>
                          )}
                        </div>
                      </td>
                      {/* Notas */}
                      <td className="px-4 py-4 max-w-[220px]">
                        {r.notes ? (
                          <p className="font-sans text-[0.72rem] text-tierra/60 leading-relaxed whitespace-pre-wrap line-clamp-3">{r.notes}</p>
                        ) : (
                          <span className="font-sans text-[0.7rem] text-tierra/30 italic">—</span>
                        )}
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
