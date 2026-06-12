"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import { api } from "~/trpc/react";

const fmt = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "long", year: "numeric" });
const CIRCULO_CHECKOUT = "/comprar/membresia/circulo-reina";

interface Props {
  membership: {
    status: "PENDING" | "ACTIVE" | "CANCELLED" | "PAST_DUE";
    nextBillingAt: Date | null;
    tier: { name: string; price: number };
  } | null;
}

export default function MembershipCard({ membership }: Props) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  const cancel = api.account.cancelMembership.useMutation({
    onSuccess: () => {
      setConfirming(false);
      router.refresh();
    },
  });

  // Sin membresía → invitación
  if (!membership || membership.status === "CANCELLED") {
    return (
      <div className="bg-morado-dark border-2 border-morado-dark block-shadow p-7 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <div className="w-14 h-14 bg-dorado/15 border-2 border-dorado/40 flex items-center justify-center shrink-0">
          <Sparkles size={24} className="text-dorado" />
        </div>
        <div className="flex-1">
          <h3 className="font-display uppercase text-2xl text-crema tracking-wide leading-none mb-1.5">
            {membership?.status === "CANCELLED" ? "Tu membresía está cancelada" : "Sumate al Círculo"}
          </h3>
          <p className="font-sans text-crema/70 text-sm tracking-wide">
            Rituales, meditaciones, lecturas y todos los cursos — todos los meses.
          </p>
        </div>
        <Link
          href={CIRCULO_CHECKOUT}
          className="shrink-0 inline-flex items-center gap-2 bg-dorado text-tierra-dark font-sans font-semibold text-[0.72rem] px-6 py-3.5 border-2 border-dorado hover:bg-dorado-light transition-colors tracking-widest uppercase block-shadow-sm"
        >
          {membership?.status === "CANCELLED" ? "Reactivar" : "Sumate"} <ArrowRight size={13} />
        </Link>
      </div>
    );
  }

  // Membresía activa / pendiente
  const isActive = membership.status === "ACTIVE";

  return (
    <div className="bg-dorado-light border-2 border-morado-dark block-shadow p-7">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles size={16} className="text-morado-dark" />
            <span className="font-sans text-[0.6rem] text-tierra-dark/70 tracking-[0.3em] uppercase font-bold">
              Tu membresía
            </span>
            <span className={`font-sans text-[0.55rem] px-2 py-0.5 border rounded-full tracking-widest uppercase ${
              isActive ? "bg-verde/15 text-verde border-verde/40" : "bg-dorado/30 text-tierra-dark border-morado-dark/30"
            }`}>
              {isActive ? "Activa" : "Pendiente"}
            </span>
          </div>
          <h3 className="font-display uppercase text-3xl text-tierra-dark tracking-wide leading-none">
            {membership.tier.name}
          </h3>
          <p className="font-sans text-tierra-dark/75 text-sm tracking-wide mt-2">
            ${membership.tier.price} / mes
            {membership.nextBillingAt && isActive && (
              <> · próximo cobro el {fmt.format(membership.nextBillingAt)}</>
            )}
          </p>
        </div>

        <div className="flex flex-col gap-2 items-end">
          <Link
            href="/circulo"
            className="inline-flex items-center gap-2 bg-morado-dark text-crema font-sans font-semibold text-[0.7rem] px-5 py-3 border-2 border-morado-dark hover:bg-morado transition-colors tracking-widest uppercase block-shadow-sm"
          >
            Entrar al Círculo <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Cancelar */}
      <div className="border-t-2 border-morado-dark/15 mt-5 pt-4">
        {confirming ? (
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-sans text-[0.8rem] text-tierra-dark/80 tracking-wide">
              ¿Seguro que querés cancelar? Perdés el acceso al contenido.
            </span>
            <button
              onClick={() => cancel.mutate()}
              disabled={cancel.isPending}
              className="inline-flex items-center gap-1.5 font-sans font-semibold text-[0.65rem] px-4 py-2 bg-rosa text-crema border-2 border-rosa hover:bg-rosa/85 transition-colors tracking-widest uppercase disabled:opacity-60"
            >
              {cancel.isPending && <Loader2 size={11} className="animate-spin" />}
              Sí, cancelar
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="font-sans text-[0.65rem] text-tierra-dark/60 hover:text-tierra-dark tracking-widest uppercase"
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            className="font-sans text-[0.7rem] text-tierra-dark/55 hover:text-rosa tracking-widest uppercase transition-colors"
          >
            Cancelar membresía
          </button>
        )}
      </div>
    </div>
  );
}
