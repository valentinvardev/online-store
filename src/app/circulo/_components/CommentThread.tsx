"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { MessageCircle, Loader2, Trash2, User as UserIcon } from "lucide-react";
import { api } from "~/trpc/react";

const fmt = new Intl.DateTimeFormat("es-AR", {
  day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
});

function timeAgo(date: Date) {
  const diff = Date.now() - date.getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "recién";
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.floor(h / 24);
  if (d < 30) return `hace ${d} d`;
  return fmt.format(date);
}

export default function CommentThread({ postId }: { postId: string }) {
  const { data: session } = useSession();
  const utils = api.useUtils();
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { data: comments = [], isLoading } = api.comments.list.useQuery({ postId });

  const create = api.comments.create.useMutation({
    onSuccess: () => {
      setBody("");
      setError(null);
      void utils.comments.list.invalidate({ postId });
    },
    onError: (e) => setError(e.message),
  });

  const del = api.comments.delete.useMutation({
    onSuccess: () => void utils.comments.list.invalidate({ postId }),
  });

  const myId = session?.user?.id;
  const isAdmin = session?.user?.isAdmin;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    create.mutate({ postId, body: body.trim() });
  }

  return (
    <section className="border-t-2 border-morado/10 mt-10 pt-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle size={18} className="text-morado" />
        <h2 className="font-display uppercase text-xl text-tierra-dark tracking-wide leading-none">
          Comentarios {comments.length > 0 && <span className="text-tierra/40">({comments.length})</span>}
        </h2>
      </div>

      {/* Form */}
      {session ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder="Dejá tu comentario…"
            maxLength={2000}
            className="w-full bg-white border-2 border-morado/20 px-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/30 focus:outline-none focus:border-morado/60 transition-colors resize-y"
          />
          {error && (
            <p className="font-sans text-[0.8rem] text-rosa mt-2 tracking-wide">{error}</p>
          )}
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={create.isPending || !body.trim()}
              className="inline-flex items-center gap-2 bg-morado-dark text-crema font-sans font-semibold text-[0.7rem] px-6 py-3 border-2 border-morado-dark hover:bg-morado transition-colors tracking-widest uppercase block-shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {create.isPending && <Loader2 size={12} className="animate-spin" />}
              Comentar
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-crema border-2 border-morado/15 border-dashed p-6 text-center mb-8">
          <p className="font-sans text-tierra/65 text-sm mb-3">
            Iniciá sesión para dejar tu comentario.
          </p>
          <Link
            href="/login"
            className="inline-block font-sans font-semibold text-[0.7rem] px-5 py-2.5 border-2 border-morado-dark text-tierra-dark hover:bg-morado-dark hover:text-crema transition-colors tracking-widest uppercase block-shadow-sm"
          >
            Iniciar sesión
          </Link>
        </div>
      )}

      {/* Lista */}
      {isLoading ? (
        <div className="flex items-center gap-2 text-tierra/50 py-6">
          <Loader2 size={16} className="animate-spin" />
          <span className="font-sans text-sm">Cargando comentarios…</span>
        </div>
      ) : comments.length === 0 ? (
        <p className="font-sans text-tierra/50 text-sm tracking-wide py-4">
          Todavía no hay comentarios. Sé la primera. ✦
        </p>
      ) : (
        <ul className="space-y-5">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-3">
              {/* Avatar */}
              <div className="shrink-0">
                {c.user.image ? (
                  <Image src={c.user.image} alt="" width={36} height={36} className="rounded-full border-2 border-morado/15" />
                ) : (
                  <div className="w-9 h-9 bg-morado/10 border-2 border-morado/15 rounded-full flex items-center justify-center">
                    <UserIcon size={15} className="text-morado/60" />
                  </div>
                )}
              </div>

              {/* Cuerpo */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-sans font-bold text-[0.85rem] text-tierra-dark">
                    {c.user.name ?? "Anónima"}
                  </span>
                  <span className="font-sans text-[0.68rem] text-tierra/45 tracking-wide">
                    {timeAgo(c.createdAt)}
                  </span>
                  {(c.user.id === myId || isAdmin) && (
                    <button
                      onClick={() => del.mutate({ id: c.id })}
                      disabled={del.isPending}
                      className="ml-auto p-1 text-tierra/35 hover:text-rosa transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
                <p className="font-sans text-[14px] text-tierra-dark/85 leading-relaxed tracking-wide whitespace-pre-wrap break-words">
                  {c.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
