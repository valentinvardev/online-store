import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productsRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) =>
    ctx.db.product.findMany({
      where: { active: true },
      orderBy: { createdAt: "asc" },
    }),
  ),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) =>
      ctx.db.product.findUnique({ where: { slug: input.slug } }),
    ),
});
