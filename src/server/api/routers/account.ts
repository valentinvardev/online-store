import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const accountRouter = createTRPCRouter({
  me: protectedProcedure.query(({ ctx }) =>
    ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { id: true, name: true, email: true, image: true, isAdmin: true },
    }),
  ),

  /* Membresía activa (o la más reciente) del usuario, con su tier. */
  membership: protectedProcedure.query(({ ctx }) =>
    ctx.db.membership.findFirst({
      where: { userId: ctx.session.user.id },
      orderBy: [{ status: "asc" }, { startedAt: "desc" }],
      include: { tier: true },
    }),
  ),

  /* Cancela la membresía: la marca CANCELLED. El acceso se corta de inmediato
   * (cuando MP esté wireado, conviene dejar acceso hasta nextBillingAt). */
  cancelMembership: protectedProcedure.mutation(async ({ ctx }) => {
    const active = await ctx.db.membership.findFirst({
      where: { userId: ctx.session.user.id, status: "ACTIVE" },
    });
    if (!active) return { ok: false as const };
    await ctx.db.membership.update({
      where: { id: active.id },
      data: { status: "CANCELLED", cancelledAt: new Date() },
    });
    return { ok: true as const };
  }),

  orders: protectedProcedure.query(({ ctx }) =>
    ctx.db.order.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
  ),

  enrollments: protectedProcedure.query(({ ctx }) =>
    ctx.db.enrollment.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
      include: { course: true },
    }),
  ),

  bookings: protectedProcedure.query(({ ctx }) =>
    ctx.db.booking.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { date: "asc" },
      include: { service: true },
    }),
  ),
});
