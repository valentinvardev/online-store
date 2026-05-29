interface Props {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function AdminHeader({ title, subtitle, action }: Props) {
  return (
    <div className="flex items-end justify-between mb-8 pb-6 border-b-2 border-morado/15">
      <div>
        <p className="font-sans text-[0.6rem] text-tierra/55 tracking-[0.3em] uppercase mb-1">
          ✦ Panel de administración
        </p>
        <h1 className="font-display text-4xl text-morado-dark tracking-wide uppercase leading-none">
          {title}
        </h1>
        {subtitle && (
          <p className="font-sans text-sm text-tierra/65 mt-2 tracking-wide">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
