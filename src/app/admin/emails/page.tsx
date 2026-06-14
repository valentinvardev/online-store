import { headers } from "next/headers";
import { render } from "@react-email/render";
import { Mail, Zap, User, Info } from "lucide-react";
import AdminHeader from "../_components/AdminHeader";
import { emailRegistry } from "~/emails/templates";

export const metadata = { title: "Emails — Admin" };

export default async function AdminEmails() {
  // Origin real del request (para que el logo cargue en local y en prod)
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${proto}://${host}`;

  const rendered = await Promise.all(
    emailRegistry.map(async (e) => ({ ...e, html: await render(e.render(origin)) })),
  );

  return (
    <div className="space-y-6">
      <AdminHeader title="Emails" subtitle="Plantillas de correo y cuándo se envían" />

      {/* Aviso */}
      <div className="flex items-start gap-3 bg-dorado/10 border-2 border-dorado/30 px-5 py-4">
        <Info size={16} className="text-dorado-dark mt-0.5 shrink-0" />
        <p className="font-sans text-sm text-tierra/75 tracking-wide leading-relaxed">
          Estas son las plantillas de los correos automáticos, con datos de ejemplo.
          Mirálas y opiná — todavía <strong>no se envían</strong>; falta conectar el servicio de envío (Resend).
        </p>
      </div>

      <div className="space-y-8">
        {rendered.map((e) => (
          <div key={e.key} className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
            {/* Encabezado de la plantilla */}
            <div className="px-5 sm:px-6 py-4 border-b-2 border-morado/10" style={{ borderTopColor: e.accent }}>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 flex items-center justify-center border-2 border-morado-dark shrink-0" style={{ backgroundColor: e.accent }}>
                    <Mail size={15} className="text-crema" />
                  </span>
                  <div>
                    <p className="font-sans font-bold text-sm text-tierra-dark leading-tight">{e.subject}</p>
                    <p className="font-sans text-[0.68rem] text-tierra/50 tracking-wide">Asunto del correo</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:ml-auto">
                  <Zap size={13} className="text-morado shrink-0" />
                  <div>
                    <p className="font-sans text-[0.78rem] text-tierra-dark font-medium leading-tight">{e.event}</p>
                    <p className="font-sans text-[0.62rem] text-tierra/45 tracking-widest uppercase">Se envía</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User size={13} className="text-morado shrink-0" />
                  <div>
                    <p className="font-sans text-[0.78rem] text-tierra-dark font-medium leading-tight">{e.to}</p>
                    <p className="font-sans text-[0.62rem] text-tierra/45 tracking-widest uppercase">Destinatario</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview del email real */}
            <div className="bg-[#EFE6D2]">
              <iframe
                srcDoc={e.html}
                title={e.subject}
                className="w-full border-0 block"
                style={{ height: 640 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
