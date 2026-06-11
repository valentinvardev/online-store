"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff, FileText, Video, Headphones, Image as ImageIcon } from "lucide-react";
import AdminHeader from "../_components/AdminHeader";
import ConfirmModal from "../_components/ConfirmModal";
import { useToast } from "../_components/AdminToast";
import { api } from "~/trpc/react";

const fmt = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "short", year: "numeric" });

const typeIcon: Record<string, React.ReactNode> = {
  TEXT: <FileText size={13} className="text-tierra/60" />,
  VIDEO: <Video size={13} className="text-celeste" />,
  AUDIO: <Headphones size={13} className="text-rosa" />,
  GALLERY: <ImageIcon size={13} className="text-dorado" />,
};

const typeLabel: Record<string, string> = {
  TEXT: "Texto",
  VIDEO: "Video",
  AUDIO: "Audio",
  GALLERY: "Galería",
};

export default function AdminCirculo() {
  const { toast } = useToast();
  const utils = api.useUtils();

  const { data: posts = [], isLoading } = api.admin.posts.list.useQuery();

  const deleteMutation = api.admin.posts.delete.useMutation({
    onSuccess: () => {
      void utils.admin.posts.list.invalidate();
      setDeleteId(null);
      toast("Post eliminado", "error");
    },
  });
  const toggleMutation = api.admin.posts.togglePublished.useMutation({
    onSuccess: () => void utils.admin.posts.list.invalidate(),
  });

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const deleteTarget = posts.find((p) => p.id === deleteId);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Círculo"
        subtitle={`${posts.length} ${posts.length === 1 ? "post" : "posts"} en total`}
        action={
          <Link
            href="/admin/circulo/nuevo"
            className="flex items-center gap-2 bg-morado-dark text-crema font-sans text-[0.65rem] px-5 py-3 tracking-widest uppercase font-semibold border-2 border-morado-dark block-shadow hover:bg-morado transition-colors"
          >
            <Plus size={13} /> Nuevo post
          </Link>
        }
      />

      <div className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-tierra/60">
            <Loader2 size={18} className="animate-spin" />
            <span className="font-sans text-sm tracking-wide">Cargando posts...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-sans text-sm text-tierra/55 mb-5">
              Todavía no hay posts en el círculo.
            </p>
            <Link
              href="/admin/circulo/nuevo"
              className="inline-flex items-center gap-2 bg-dorado text-tierra-dark font-sans font-semibold text-[0.7rem] px-5 py-3 tracking-widest uppercase border-2 border-morado-dark block-shadow hover:bg-dorado-light transition-colors"
            >
              <Plus size={13} /> Crear el primero
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-morado-dark bg-morado-dark">
                <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-6 py-4">Post</th>
                <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Tipo</th>
                <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Tier</th>
                <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Estado</th>
                <th className="text-left font-sans text-[0.55rem] text-crema/50 tracking-widest uppercase px-4 py-4">Fecha</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-morado/10">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-dorado/5 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-sans font-semibold text-sm text-tierra-dark tracking-wide">{p.title}</p>
                    {p.excerpt && (
                      <p className="font-sans text-xs text-tierra/60 line-clamp-1 mt-0.5">{p.excerpt}</p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 font-sans text-xs text-tierra/70">
                      {typeIcon[p.contentType]}
                      {typeLabel[p.contentType]}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {p.requiredTier ? (
                      <span className="font-sans text-[0.7rem] text-morado font-semibold tracking-wide">
                        {p.requiredTier.name}
                      </span>
                    ) : (
                      <span className="font-sans text-[0.7rem] text-verde tracking-widest uppercase">Libre</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => toggleMutation.mutate({ id: p.id, published: !p.published })}
                      disabled={toggleMutation.isPending}
                      className={`inline-flex items-center gap-1.5 font-sans text-[0.6rem] px-2.5 py-1 border rounded-full tracking-widest uppercase transition-colors ${
                        p.published
                          ? "bg-verde/10 text-verde border-verde/25 hover:bg-verde/20"
                          : "bg-tierra/8 text-tierra/60 border-tierra/15 hover:bg-tierra/15"
                      }`}
                    >
                      {p.published ? <Eye size={9} /> : <EyeOff size={9} />}
                      {p.published ? "Publicado" : "Borrador"}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-sans text-xs text-tierra/55">
                      {fmt.format(p.publishedAt ?? p.createdAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin/circulo/${p.id}`}
                        className="p-2 text-tierra/60 hover:text-morado transition-colors"
                        title="Editar"
                      >
                        <Pencil size={14} />
                      </Link>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="p-2 text-tierra/60 hover:text-rosa transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ConfirmModal
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="¿Eliminar este post?"
        message={`Vas a eliminar "${deleteTarget?.title ?? ""}". No se puede deshacer.`}
        confirmLabel="Eliminar"
      />
    </div>
  );
}
