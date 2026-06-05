import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const coursesRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) =>
    ctx.db.course.findMany({
      where: { active: true },
      orderBy: { createdAt: "asc" },
    }),
  ),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) =>
      ctx.db.course.findUnique({
        where: { slug: input.slug },
        include: {
          modules: {
            orderBy: { order: "asc" },
            include: {
              lessons: { orderBy: { order: "asc" } },
            },
          },
        },
      }),
    ),
});
