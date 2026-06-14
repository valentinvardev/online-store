"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Trash2, MessageCircle, CornerDownRight, ExternalLink, User as UserIcon } from "lucide-react";
import AdminHeader from "../../_components/AdminHeader";
import { api } from "~/trpc/react";

function timeAgo(date: Date) {
  const min = Math.floor((Date.now() - date.getTime()) / 60000);
  if (min < 1) return "recién";
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h} h`;
  return `hace ${Math.floor(h / 24)} d`;
}

export default function AdminComentarios() {
  const utils = api.useUtils();
  const { data: comments = [], isLoading } = api.admin.comentarios.recent.useQuery();

  // Marcar como vistos (limpia el badge del bell)
  useEffect(() => {
    if (comments.length > 0) {
      try { localStorage.setItem("rdb_admin_comments_seen", String(Date.now())); } catch {}
      window.dispatchEvent(new Event("rdb-comments-seen"));
    }
  }, [comments.length]);

  const del = api.comments.delete.useMutation({
    onSuccess: () => void utils.admin.comentarios.recent.invalidate(),
  });

  return (
    <div className="space-y-6">
      <AdminHeader title="Comentarios" subtitle="Todo lo que comentan en el Círculo, lo más nuevo primero" />

      <div className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-tierra/60">
            <Loader2 size={18} className="animate-spin" />
            <span className="font-sans text-sm tracking-wide">Cargando comentarios…</span>
          </div>
        ) : comments.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <MessageCircle size={28} className="text-morado/20 mx-auto mb-3" />
            <p className="font-sans text-sm text-tierra/55">Todavía no hay comentarios en el Círculo.</p>
          </div>
        ) : (
          <ul className="divide-y-2 divide-morado/10">
            {comments.map((c) => (
              <li key={c.id} className="flex gap-3 px-5 sm:px-6 py-4 hover:bg-dorado/5 transition-colors group">
                {/* Avatar */}
                <div className="shrink-0">
                  {c.user.image ? (
                    <Image src={c.user.image} alt="" width={34} height={34} className="rounded-full border-2 border-morado/15" />
                  ) : (
                    <div className="w-[34px] h-[34px] bg-morado/10 border-2 border-morado/15 rounded-full flex items-center justify-center">
                      <UserIcon size={14} className="text-morado/60" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="font-sans font-bold text-[0.85rem] text-tierra-dark">{c.user.name ?? "Anónima"}</span>
                    {c.parentId && (
                      <span className="inline-flex items-center gap-1 font-sans text-[0.55rem] text-celeste tracking-widest uppercase bg-celeste/10 border border-celeste/25 px-1.5 py-0.5">
                        <CornerDownRight size={9} /> Respuesta
                      </span>
                    )}
                    <span className="font-sans text-[0.68rem] text-tierra/45 tracking-wide">{timeAgo(c.createdAt)}</span>
                    <button
                      onClick={() => del.mutate({ id: c.id })}
                      disabled={del.isPending}
                      className="ml-auto p-1 text-tierra/30 hover:text-rosa transition-colors opacity-0 group-hover:opacity-100"
                      title="Eliminar"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <p className="font-sans text-[14px] text-tierra-dark/85 leading-relaxed tracking-wide whitespace-pre-wrap break-words mb-1.5">
                    {c.body}
                  </p>
                  <Link
                    href={`/circulo/${c.post.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 font-sans text-[0.66rem] text-morado/70 hover:text-morado tracking-wide transition-colors"
                  >
                    <ExternalLink size={11} /> en “{c.post.title ?? "un mensaje"}”
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
