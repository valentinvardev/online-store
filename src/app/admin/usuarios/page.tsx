import { Users, Database } from "lucide-react";
import AdminHeader from "../_components/AdminHeader";

const mockUsers = [
  { id: 1, name: "Valentina R.",   email: "valentina@ejemplo.com", joined: "12 may 2025", cursos: 2, role: "usuario" },
  { id: 2, name: "Sofía M.",       email: "sofia@ejemplo.com",      joined: "3 abr 2025",  cursos: 1, role: "usuario" },
  { id: 3, name: "Camila T.",      email: "camila@ejemplo.com",     joined: "28 mar 2025", cursos: 3, role: "usuario" },
  { id: 4, name: "Admin",          email: "valentinvarela0508@gmail.com", joined: "1 ene 2025", cursos: 0, role: "admin" },
];

export default function AdminUsuarios() {
  return (
    <div>
      <AdminHeader title="Usuarios" subtitle="Listado de usuarios registrados" />

      {/* Aviso DB */}
      <div className="flex items-start gap-3 bg-dorado/10 border-2 border-dorado/25 rounded-xl px-5 py-4 mb-8">
        <Database size={16} className="text-dorado-dark mt-0.5 shrink-0" />
        <p className="font-sans text-sm text-tierra/70 tracking-wide">
          Los usuarios reales se cargarán una vez que Supabase esté conectado. Por ahora se muestran datos de ejemplo.
        </p>
      </div>

      <div className="bg-white border-2 border-morado/10 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-morado/8 bg-crema/60">
              <th className="text-left font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase px-6 py-4">Usuario</th>
              <th className="text-left font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase px-4 py-4">Ingresó</th>
              <th className="text-left font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase px-4 py-4">Cursos</th>
              <th className="text-left font-sans text-[0.6rem] text-tierra/40 tracking-widest uppercase px-4 py-4">Rol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-morado/6">
            {mockUsers.map((u) => (
              <tr key={u.id} className="hover:bg-crema/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-morado/15 flex items-center justify-center">
                      <Users size={14} className="text-morado" />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-sm text-tierra-dark tracking-wide">{u.name}</p>
                      <p className="font-sans text-xs text-tierra/40">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="font-sans text-sm text-tierra/60">{u.joined}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-display text-lg text-morado">{u.cursos}</span>
                </td>
                <td className="px-4 py-4">
                  <span className={`font-sans text-[0.6rem] px-2.5 py-1 border rounded-full tracking-widest uppercase ${
                    u.role === "admin"
                      ? "bg-morado/15 text-morado border-morado/25"
                      : "bg-tierra/8 text-tierra/50 border-tierra/15"
                  }`}>
                    {u.role}
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
