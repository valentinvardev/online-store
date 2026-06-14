"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { MessageCircle, Loader2, Trash2, User as UserIcon, Reply } from "lucide-react";
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

type CommentUser = { id: string; name: string | null; image: string | null };
type CommentNode = {
  id: string; body: string; createdAt: Date; user: CommentUser;
  replies?: CommentNode[];
};

function Avatar({ src, size = 36 }: { src: string | null; size?: number }) {
  if (src) return <Image src={src} alt="" width={size} height={size} className="rounded-full border-2 border-morado/15" />;
  return (
    <div style={{ width: size, height: size }} className="bg-morado/10 border-2 border-morado/15 rounded-full flex items-center justify-center shrink-0">
      <UserIcon size={Math.round(size * 0.42)} className="text-morado/60" />
    </div>
  );
}

function CommentForm({ postId, parentId, onDone, onCancel, placeholder, submitLabel, autoFocus }: {
  postId: string; parentId?: string; onDone: () => void; onCancel?: () => void;
  placeholder: string; submitLabel: string; autoFocus?: boolean;
}) {
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const create = api.comments.create.useMutation({
    onSuccess: () => { setBody(""); setError(null); onDone(); },
    onError: (e) => setError(e.message),
  });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    create.mutate({ postId, body: body.trim(), parentId });
  };
  return (
    <form onSubmit={submit}>
      <textarea
        autoFocus={autoFocus}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={parentId ? 2 : 3}
        placeholder={placeholder}
        maxLength={2000}
        className="w-full bg-white border-2 border-morado/20 px-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/30 focus:outline-none focus:border-morado/60 transition-colors resize-y"
      />
      {error && <p className="font-sans text-[0.8rem] text-rosa mt-2 tracking-wide">{error}</p>}
      <div className="flex justify-end gap-2 mt-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="font-sans text-[0.68rem] text-tierra/55 hover:text-tierra-dark tracking-widest uppercase px-3 py-2 transition-colors">
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={create.isPending || !body.trim()}
          className="inline-flex items-center gap-2 bg-morado-dark text-crema font-sans font-semibold text-[0.68rem] px-5 py-2.5 border-2 border-morado-dark hover:bg-morado transition-colors tracking-widest uppercase block-shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {create.isPending && <Loader2 size={11} className="animate-spin" />}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function CommentNodeItem({ comment, postId, session, onChanged, isReply = false }: {
  comment: CommentNode; postId: string; session: Session | null; onChanged: () => void; isReply?: boolean;
}) {
  const [replying, setReplying] = useState(false);
  const del = api.comments.delete.useMutation({ onSuccess: onChanged });
  const myId = session?.user?.id;
  const isAdmin = session?.user?.isAdmin;
  const canModerate = comment.user.id === myId || isAdmin;
  const avatarSize = isReply ? 30 : 36;

  return (
    <li className="flex gap-3">
      <Avatar src={comment.user.image} size={avatarSize} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-sans font-bold text-[0.85rem] text-tierra-dark">{comment.user.name ?? "Anónima"}</span>
          <span className="font-sans text-[0.68rem] text-tierra/45 tracking-wide">{timeAgo(comment.createdAt)}</span>
          {canModerate && (
            <button
              onClick={() => del.mutate({ id: comment.id })}
              disabled={del.isPending}
              className="ml-auto p-1 text-tierra/35 hover:text-rosa transition-colors"
              title="Eliminar"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
        <p className="font-sans text-[14px] text-tierra-dark/85 leading-relaxed tracking-wide whitespace-pre-wrap break-words">
          {comment.body}
        </p>

        {/* Responder */}
        {session && !replying && (
          <button
            onClick={() => setReplying(true)}
            className="mt-1.5 inline-flex items-center gap-1 font-sans text-[0.65rem] text-morado/70 hover:text-morado tracking-widest uppercase font-semibold transition-colors"
          >
            <Reply size={11} /> Responder
          </button>
        )}
        {replying && session && (
          <div className="mt-3">
            <CommentForm
              postId={postId}
              parentId={comment.id}
              autoFocus
              placeholder={`Respondé a ${comment.user.name ?? "este comentario"}…`}
              submitLabel="Responder"
              onCancel={() => setReplying(false)}
              onDone={() => { setReplying(false); onChanged(); }}
            />
          </div>
        )}

        {/* Respuestas */}
        {comment.replies && comment.replies.length > 0 && (
          <ul className="mt-4 space-y-4 border-l-2 border-morado/10 pl-4">
            {comment.replies.map((r) => (
              <CommentNodeItem key={r.id} comment={r} postId={postId} session={session} onChanged={onChanged} isReply />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export default function CommentThread({ postId }: { postId: string }) {
  const { data: session } = useSession();
  const utils = api.useUtils();
  const invalidate = () => void utils.comments.list.invalidate({ postId });

  const { data: comments = [], isLoading } = api.comments.list.useQuery({ postId });
  const total = comments.reduce((n, c) => n + 1 + (c.replies?.length ?? 0), 0);

  return (
    <section className="border-t-2 border-morado/10 mt-10 pt-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle size={18} className="text-morado" />
        <h2 className="font-sans font-bold text-xl text-tierra-dark tracking-wide leading-none">
          Comentarios {total > 0 && <span className="text-tierra/40">({total})</span>}
        </h2>
      </div>

      {/* Form de nivel superior */}
      {session ? (
        <div className="mb-8">
          <CommentForm postId={postId} placeholder="Dejá tu comentario…" submitLabel="Comentar" onDone={invalidate} />
        </div>
      ) : (
        <div className="bg-crema border-2 border-morado/15 border-dashed p-6 text-center mb-8">
          <p className="font-sans text-tierra/65 text-sm mb-3">Iniciá sesión para dejar tu comentario.</p>
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
        <ul className="space-y-6">
          {comments.map((c) => (
            <CommentNodeItem key={c.id} comment={c} postId={postId} session={session} onChanged={invalidate} />
          ))}
        </ul>
      )}
    </section>
  );
}
