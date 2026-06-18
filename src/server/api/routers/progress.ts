import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const progressRouter = createTRPCRouter({
  /* Progreso del usuario en un curso: lecciones completadas + última vista. */
  forCourse: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ ctx, input }) => {
      const rows = await ctx.db.lessonProgress.findMany({
        where: { userId: ctx.session.user.id, courseId: input.courseId },
        orderBy: { updatedAt: "desc" },
      });
      return {
        completed: rows.filter((r) => r.completed).map((r) => r.lessonId),
        lastLessonId: rows[0]?.lessonId ?? null,
        hasStarted: rows.length > 0,
      };
    }),

  /* Marca una lección como vista (bumpea updatedAt → "donde dejaste"). */
  view: protectedProcedure
    .input(z.object({ courseId: z.string(), lessonId: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.db.lessonProgress.upsert({
        where: { userId_lessonId: { userId: ctx.session.user.id, lessonId: input.lessonId } },
        create: { userId: ctx.session.user.id, lessonId: input.lessonId, courseId: input.courseId },
        update: {}, // updatedAt se bumpea solo
      }),
    ),

  /* Marca / desmarca completada. */
  setCompleted: protectedProcedure
    .input(z.object({ courseId: z.string(), lessonId: z.string(), completed: z.boolean() }))
    .mutation(({ ctx, input }) =>
      ctx.db.lessonProgress.upsert({
        where: { userId_lessonId: { userId: ctx.session.user.id, lessonId: input.lessonId } },
        create: { userId: ctx.session.user.id, lessonId: input.lessonId, courseId: input.courseId, completed: input.completed },
        update: { completed: input.completed },
      }),
    ),
});
