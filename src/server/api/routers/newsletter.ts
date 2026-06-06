import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";

export const newsletterRouter = createTRPCRouter({
  /* Endpoint público — formularios del sitio */
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email("Email inválido"),
        source: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const email = input.email.toLowerCase().trim();
      try {
        const subscriber = await ctx.db.subscriber.upsert({
          where: { email },
          create: { email, source: input.source ?? "homepage" },
          update: { active: true, unsubscribed: null },
        });
        return { ok: true, id: subscriber.id };
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No pudimos guardar tu suscripción. Intentá de nuevo.",
          cause: e,
        });
      }
    }),

  /* Admin — listar / dar de baja */
  list: adminProcedure.query(({ ctx }) =>
    ctx.db.subscriber.findMany({ orderBy: { createdAt: "desc" } }),
  ),

  setActive: adminProcedure
    .input(z.object({ id: z.string(), active: z.boolean() }))
    .mutation(({ ctx, input }) =>
      ctx.db.subscriber.update({
        where: { id: input.id },
        data: {
          active: input.active,
          unsubscribed: input.active ? null : new Date(),
        },
      }),
    ),
});
