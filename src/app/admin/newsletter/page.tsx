import { Mail, Database } from "lucide-react";
import AdminHeader from "../_components/AdminHeader";

const mockSubs = [
  { id: 1, email: "valentina@ejemplo.com", fecha: "12 may 2025", activa: true },
  { id: 2, email: "sofia@ejemplo.com",     fecha: "3 abr 2025",  activa: true },
  { id: 3, email: "camila@ejemplo.com",    fecha: "28 mar 2025", activa: true },
  { id: 4, email: "lucia@ejemplo.com",     fecha: "15 mar 2025", activa: false },
  { id: 5, email: "ana@ejemplo.com",       fecha: "2 feb 2025",  activa: true },
];

export default function AdminNewsletter() {
  return (
    <div>
      <AdminHeader title="Newsletter" subtitle="Suscriptoras al boletín" />

      <div className="flex items-start gap-3 bg-dorado/10 border-2 border-dorado/25 rounded-xl px-5 py-4 mb-8">
        <Database size={16} className="text-dorado-dark mt-0.5 shrink-0" />
        <p className="font-sans text-sm text-tierra/70 tracking-wide">
          Las suscriptoras reales se cargarán al conectar Supabase y activar el formulario del sitio.
        </p>
      </div>

      {/* Stats rápidas */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="bg-white border-2 border-morado/10 rounded-2xl p-6 text-center">
          <p className="font-display text-4xl text-morado mb-1">{mockSubs.length}</p>
          <p className="font-sans text-[0.6rem] text-tierra/60 tracking-widest uppercase">Total</p>
        </div>
        <div className="bg-white border-2 border-morado/10 rounded-2xl p-6 text-center">
          <p className="font-display text-4xl text-verde mb-1">{mockSubs.filter(s => s.activa).length}</p>
          <p className="font-sans text-[0.6rem] text-tierra/60 tracking-widest uppercase">Activas</p>
        </div>
        <div className="bg-white border-2 border-morado/10 rounded-2xl p-6 text-center">
          <p className="font-display text-4xl text-tierra/30 mb-1">{mockSubs.filter(s => !s.activa).length}</p>
          <p className="font-sans text-[0.6rem] text-tierra/60 tracking-widest uppercase">Dadas de baja</p>
        </div>
      </div>

      <div className="bg-white border-2 border-morado/10 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-morado/8 bg-crema/60">
              <th className="text-left font-sans text-[0.6rem] text-tierra/60 tracking-widest uppercase px-6 py-4">Email</th>
              <th className="text-left font-sans text-[0.6rem] text-tierra/60 tracking-widest uppercase px-4 py-4">Fecha</th>
              <th className="text-left font-sans text-[0.6rem] text-tierra/60 tracking-widest uppercase px-4 py-4">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-morado/6">
            {mockSubs.map((s) => (
              <tr key={s.id} className="hover:bg-crema/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Mail size={14} className="text-morado/40" />
                    <span className="font-sans text-sm text-tierra-dark">{s.email}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="font-sans text-sm text-tierra/70">{s.fecha}</span>
                </td>
                <td className="px-4 py-4">
                  <span className={`font-sans text-[0.6rem] px-2.5 py-1 border rounded-full tracking-widest uppercase ${
                    s.activa
                      ? "bg-verde/10 text-verde border-verde/25"
                      : "bg-tierra/8 text-tierra/60 border-tierra/15"
                  }`}>
                    {s.activa ? "Activa" : "Baja"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
