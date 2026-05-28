import { type LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  accent: string;
}

export default function StatCard({ label, value, sub, icon: Icon, accent }: Props) {
  return (
    <div className={`bg-crema border-2 border-morado-dark block-shadow p-6 w-full`}>
      <div className="flex items-start justify-between mb-4">
        <p className="font-sans text-[0.6rem] text-tierra/40 tracking-[0.25em] uppercase">
          {label}
        </p>
        <Icon size={16} strokeWidth={1.8} className={accent} />
      </div>
      <p className={`font-display text-5xl tracking-wide leading-none mb-1 ${accent}`}>
        {value}
      </p>
      {sub && (
        <p className="font-sans text-xs text-tierra/35 mt-2 tracking-wide">{sub}</p>
      )}
    </div>
  );
}
