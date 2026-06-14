"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "../../_components/AdminToast";
import { api } from "~/trpc/react";
import AccessLockToggle from "./AccessLockToggle";

export default function QuickComposer() {
  const { toast } = useToast();
  const utils = api.useUtils();
  const [body, setBody] = useState("");
  const [locked, setLocked] = useState(false); // false = libre, true = solo socias

  const { data: tiers = [] } = api.admin.posts.tiers.useQuery();
  const mainTierId = tiers[0]?.id ?? null;

  const quick = api.admin.posts.quickPost.useMutation({
    onSuccess: () => {
      setBody("");
      void utils.admin.posts.list.invalidate();
      toast("Mensaje publicado en el Círculo", "success");
    },
    onError: (e) => toast(e.message, "error"),
  });

  const submit = () => {
    if (!body.trim()) return;
    quick.mutate({ content: body.trim(), requiredTierId: locked ? mainTierId : null });
  };

  return (
    <div className="bg-white border-2 border-morado-dark block-shadow p-5">
      <div className="flex items-center gap-2 mb-3">
        <Send size={14} className="text-morado" />
        <h2 className="font-sans font-bold text-sm text-tierra-dark tracking-wide">
          Mensaje rápido al Círculo
        </h2>
        <span className="font-sans text-[0.6rem] text-tierra/45 tracking-wide">
          (se publica al toque, sin título)
        </span>
      </div>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit();
        }}
        rows={3}
        placeholder="Compartí algo con el Círculo… (Cmd/Ctrl + Enter para publicar)"
        className="w-full bg-crema/40 border-2 border-morado/20 px-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/35 focus:outline-none focus:border-morado/60 transition-colors resize-y"
      />

      <div className="flex items-center justify-between gap-3 mt-3 flex-wrap">
        {/* Acceso: switch de candado */}
        <AccessLockToggle locked={locked} onChange={setLocked} />

        <button
          onClick={submit}
          disabled={quick.isPending || !body.trim()}
          className="flex items-center gap-2 bg-morado-dark text-crema font-sans font-semibold text-[0.65rem] px-6 py-3 tracking-widest uppercase border-2 border-morado-dark block-shadow-sm hover:bg-morado transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {quick.isPending ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
          Publicar
        </button>
      </div>
    </div>
  );
}
