"use client";

import { Mail } from "lucide-react";
import AdminHeader from "../_components/AdminHeader";
import { api } from "~/trpc/react";

const fmt = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "short", year: "numeric" });

export default function AdminNewsletter() {
  const { data: subs = [], isLoading } = api.newsletter.list.useQuery();

  const activas = subs.filter((s) => s.active).length;
  const bajas = subs.length - activas;

  return (
    <div>
      <AdminHeader title="Newsletter" subtitle="Suscriptoras al boletín" />

      {/* Stats rápidas */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="bg-white border-2 border-morado/10 rounded-2xl p-6 text-center">
          <p className="font-display text-4xl text-morado mb-1">{subs.length}</p>
          <p className="font-sans text-[0.6rem] text-tierra/60 tracking-widest uppercase">Total</p>
        </div>
        <div className="bg-white border-2 border-morado/10 rounded-2xl p-6 text-center">
          <p className="font-display text-4xl text-verde mb-1">{activas}</p>
          <p className="font-sans text-[0.6rem] text-tierra/60 tracking-widest uppercase">Activas</p>
        </div>
        <div className="bg-white border-2 border-morado/10 rounded-2xl p-6 text-center">
          <p className="font-display text-4xl text-tierra/30 mb-1">{bajas}</p>
          <p className="font-sans text-[0.6rem] text-tierra/60 tracking-widest uppercase">Dadas de baja</p>
        </div>
      </div>

      <div className="bg-white border-2 border-morado/10 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="px-6 py-12 text-center font-sans text-sm text-tierra/50">Cargando…</div>
        ) : subs.length === 0 ? (
          <div className="px-6 py-12 text-center font-sans text-sm text-tierra/50">
            Todavía no hay suscriptoras. El formulario del homepage ya está activo.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-morado/8 bg-crema/60">
                <th className="text-left font-sans text-[0.6rem] text-tierra/60 tracking-widest uppercase px-6 py-4">Email</th>
                <th className="text-left font-sans text-[0.6rem] text-tierra/60 tracking-widest uppercase px-4 py-4">Fecha</th>
                <th className="text-left font-sans text-[0.6rem] text-tierra/60 tracking-widest uppercase px-4 py-4">Origen</th>
                <th className="text-left font-sans text-[0.6rem] text-tierra/60 tracking-widest uppercase px-4 py-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-morado/6">
              {subs.map((s) => (
                <tr key={s.id} className="hover:bg-crema/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Mail size={14} className="text-morado/40" />
                      <span className="font-sans text-sm text-tierra-dark">{s.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-sans text-sm text-tierra/70">{fmt.format(s.createdAt)}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-sans text-[0.7rem] text-tierra/60">{s.source ?? "—"}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`font-sans text-[0.6rem] px-2.5 py-1 border rounded-full tracking-widest uppercase ${
                      s.active
                        ? "bg-verde/10 text-verde border-verde/25"
                        : "bg-tierra/8 text-tierra/60 border-tierra/15"
                    }`}>
                      {s.active ? "Activa" : "Baja"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
