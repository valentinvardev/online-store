import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { hasActiveMembership } from "~/lib/access";

export const commentsRouter = createTRPCRouter({
  /* Comentarios de un post — público (cualquiera puede leerlos). */
  list: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(({ ctx, input }) =>
      ctx.db.comment.findMany({
        where: { postId: input.postId },
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { id: true, name: true, image: true } },
        },
      }),
    ),

  /* Crear comentario — requiere sesión + acceso al post (membresía si es gateado). */
  create: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        body: z.string().min(1, "Escribí algo").max(2000),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input.postId },
        select: { id: true, published: true, requiredTierId: true },
      });
      if (!post?.published) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Publicación no encontrada" });
      }
      if (post.requiredTierId) {
        const member = await hasActiveMembership(ctx.session.user.id);
        if (!member) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Necesitás una membresía activa para comentar acá",
          });
        }
      }
      return ctx.db.comment.create({
        data: {
          body: input.body.trim(),
          postId: input.postId,
          userId: ctx.session.user.id,
        },
        include: { user: { select: { id: true, name: true, image: true } } },
      });
    }),

  /* Borrar — solo el autor o un admin. */
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.db.comment.findUnique({
        where: { id: input.id },
        select: { userId: true },
      });
      if (!comment) throw new TRPCError({ code: "NOT_FOUND" });
      if (comment.userId !== ctx.session.user.id && !ctx.session.user.isAdmin) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      await ctx.db.comment.delete({ where: { id: input.id } });
      return { ok: true as const };
    }),
});
