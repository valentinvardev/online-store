import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { hasActiveMembership } from "~/lib/access";

/* Feed del Círculo — posts publicados. El contenido gateado (requiredTierId)
 * solo se entrega completo a socias activas; al resto se les manda un teaser
 * (sin content/media) para que no se filtre el contenido pago. */

export const circuloRouter = createTRPCRouter({
  feed: publicProcedure.query(async ({ ctx }) => {
    const isMember = await hasActiveMembership(ctx.session?.user?.id);
    const posts = await ctx.db.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      include: {
        requiredTier: { select: { name: true } },
        _count: { select: { comments: true } },
      },
    });
    return {
      isMember,
      posts: posts.map((p) => {
        const locked = !!p.requiredTierId && !isMember;
        const base = {
          id: p.id,
          slug: p.slug,
          title: p.title,
          contentType: p.contentType,
          coverImageUrl: p.coverImageUrl,
          publishedAt: p.publishedAt,
          requiredTier: p.requiredTier,
          commentCount: p._count.comments,
        };
        if (locked) {
          // Teaser: sin contenido ni media. El excerpt de articulos se muestra;
          // el de mensajes (= cuerpo) se oculta.
          return {
            ...base,
            locked: true as const,
            excerpt: p.title ? p.excerpt : null,
            content: "",
            videoUrl: null,
            audioUrl: null,
            images: [] as string[],
            attachments: [] as string[],
          };
        }
        // Desbloqueado: contenido completo para presentar inline en el feed
        return {
          ...base,
          locked: false as const,
          excerpt: p.excerpt,
          content: p.content,
          videoUrl: p.videoUrl,
          audioUrl: p.audioUrl,
          images: p.images,
          attachments: p.attachments,
        };
      }),
    };
  }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { slug: input.slug },
        include: { requiredTier: { select: { name: true } } },
      });
      if (!post || !post.published) return null;

      const isMember = await hasActiveMembership(ctx.session?.user?.id);
      const locked = !!post.requiredTierId && !isMember;

      if (locked) {
        // Teaser: nada de contenido ni media
        return {
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          contentType: post.contentType,
          coverImageUrl: post.coverImageUrl,
          publishedAt: post.publishedAt,
          requiredTier: post.requiredTier,
          locked: true as const,
          content: "",
          videoUrl: null,
          audioUrl: null,
          images: [] as string[],
          attachments: [] as string[],
        };
      }

      return { ...post, locked: false as const };
    }),
});
