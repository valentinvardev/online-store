import { type LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({ label, value, sub, icon: Icon, color }: Props) {
  return (
    <div className="bg-white border-2 border-morado/10 rounded-2xl p-6 flex items-start justify-between">
      <div>
        <p className="font-sans text-[0.65rem] text-tierra/40 tracking-widest uppercase mb-2">
          {label}
        </p>
        <p className="font-display text-4xl text-tierra-dark tracking-wide">{value}</p>
        {sub && (
          <p className="font-sans text-xs text-tierra/40 mt-1 tracking-wide">{sub}</p>
        )}
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={20} strokeWidth={1.8} />
      </div>
    </div>
  );
}
