import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const servicesRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) =>
    ctx.db.service.findMany({
      where: { active: true },
      orderBy: { numero: "asc" },
    }),
  ),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) =>
      ctx.db.service.findUnique({ where: { slug: input.slug } }),
    ),
});
