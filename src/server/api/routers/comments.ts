import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { hasActiveMembership } from "~/lib/access";

export const commentsRouter = createTRPCRouter({
  /* Comentarios de un post — público. Devuelve los de primer nivel con sus
   * respuestas anidadas (un nivel de hilo). */
  list: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(({ ctx, input }) =>
      ctx.db.comment.findMany({
        where: { postId: input.postId, parentId: null },
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { id: true, name: true, image: true } },
          replies: {
            orderBy: { createdAt: "asc" },
            include: { user: { select: { id: true, name: true, image: true } } },
          },
        },
      }),
    ),

  /* Crear comentario o respuesta — requiere sesión + acceso al post. */
  create: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        body: z.string().min(1, "Escribí algo").max(2000),
        parentId: z.string().optional(),
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
      // Si es respuesta, validar que el padre exista y sea del mismo post.
      // Aplana a un solo nivel: si el padre ya es respuesta, cuelga del raíz.
      let parentId: string | undefined;
      if (input.parentId) {
        const parent = await ctx.db.comment.findUnique({
          where: { id: input.parentId },
          select: { postId: true, parentId: true, id: true },
        });
        if (!parent || parent.postId !== input.postId) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Comentario inválido" });
        }
        parentId = parent.parentId ?? parent.id;
      }
      return ctx.db.comment.create({
        data: {
          body: input.body.trim(),
          postId: input.postId,
          userId: ctx.session.user.id,
          parentId,
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
