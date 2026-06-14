"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { api } from "~/trpc/react";

const SEEN_KEY = "rdb_admin_comments_seen";

export default function NotificationsBell() {
  const pathname = usePathname();
  const { data: comments = [] } = api.admin.comentarios.recent.useQuery(undefined, {
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
  });
  const [seen, setSeen] = useState(0);

  const readSeen = () => {
    try { return Number(localStorage.getItem(SEEN_KEY) ?? 0); } catch { return 0; }
  };

  useEffect(() => {
    // En la pág de comentarios todo queda visto
    if (pathname === "/admin/circulo/comentarios") {
      const now = Date.now();
      try { localStorage.setItem(SEEN_KEY, String(now)); } catch {}
      setSeen(now);
    } else {
      setSeen(readSeen());
    }
    const onSeen = () => setSeen(readSeen());
    window.addEventListener("rdb-comments-seen", onSeen);
    return () => window.removeEventListener("rdb-comments-seen", onSeen);
  }, [pathname]);

  const unread = comments.filter((c) => new Date(c.createdAt).getTime() > seen).length;

  return (
    <Link
      href="/admin/circulo/comentarios"
      title="Comentarios del Círculo"
      className="relative w-10 h-10 flex items-center justify-center border-2 border-crema/20 text-crema/80 hover:text-crema hover:border-crema/50 transition-colors"
    >
      <Bell size={16} strokeWidth={2} />
      {unread > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-dorado text-tierra-dark font-sans font-bold text-[0.6rem] flex items-center justify-center border-2 border-morado-dark">
          {unread > 9 ? "9+" : unread}
        </span>
      )}
    </Link>
  );
}
