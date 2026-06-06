import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const accountRouter = createTRPCRouter({
  me: protectedProcedure.query(({ ctx }) =>
    ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { id: true, name: true, email: true, image: true, isAdmin: true },
    }),
  ),

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
