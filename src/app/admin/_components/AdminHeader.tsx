"use client";

import { Bell } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
}

export default function AdminHeader({ title, subtitle }: Props) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="font-display text-3xl text-tierra-dark tracking-wide uppercase">
          {title}
        </h1>
        {subtitle && (
          <p className="font-sans text-sm text-tierra/50 mt-1 tracking-wide">
            {subtitle}
          </p>
        )}
      </div>
      <button className="relative p-2.5 rounded-full border-2 border-morado/15 hover:border-morado/40 transition-colors text-morado/50 hover:text-morado">
        <Bell size={18} strokeWidth={1.8} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rosa rounded-full" />
      </button>
    </div>
  );
}
