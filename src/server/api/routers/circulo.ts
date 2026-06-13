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
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        contentType: true,
        coverImageUrl: true,
        publishedAt: true,
        requiredTierId: true,
        requiredTier: { select: { name: true } },
      },
    });
    return {
      isMember,
      posts: posts.map((p) => {
        const locked = !!p.requiredTierId && !isMember;
        // En articulos el excerpt es un teaser deliberado (se puede mostrar).
        // En mensajes (sin titulo) el excerpt ES el cuerpo → ocultarlo si esta gateado.
        const excerpt = locked && !p.title ? null : p.excerpt;
        return { ...p, excerpt, locked };
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
