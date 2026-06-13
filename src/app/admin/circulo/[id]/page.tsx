"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import PostForm from "../_components/PostForm";
import { api } from "~/trpc/react";

type Props = { params: Promise<{ id: string }> };

export default function EditPostPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const { data: post, isLoading } = api.admin.posts.getById.useQuery(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3 text-tierra/60">
        <Loader2 size={18} className="animate-spin" />
        <span className="font-sans text-sm tracking-wide">Cargando post...</span>
      </div>
    );
  }

  if (!post) {
    router.push("/admin/circulo");
    return null;
  }

  return (
    <PostForm
      initial={{
        id: post.id,
        title: post.title ?? undefined,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        contentType: post.contentType,
        coverImageUrl: post.coverImageUrl,
        videoUrl: post.videoUrl,
        audioUrl: post.audioUrl,
        images: post.images,
        attachments: post.attachments,
        requiredTierId: post.requiredTierId,
        published: post.published,
      }}
    />
  );
}
