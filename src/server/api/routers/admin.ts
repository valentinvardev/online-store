import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function requireAdmin(email: string | null | undefined) {
  const adminEmails = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim());
  if (!email || !adminEmails.includes(email)) {
    throw new TRPCError({ code: "FORBIDDEN", message: "No tenés permisos de administrador" });
  }
}

// ─── Schemas ─────────────────────────────────────────────────────────────────

const cursoInput = z.object({
  name: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().min(1),
  price: z.number().positive(),
  badge: z.string().optional(),
  level: z.string().default("Todos los niveles"),
  durationWeeks: z.number().int().positive().optional(),
  lessonsCount: z.number().int().positive().optional(),
  imageUrl: z.string().optional(),
  active: z.boolean().default(true),
});

const productoInput = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  priceOld: z.number().positive().optional(),
  type: z.enum(["FISICO", "DIGITAL", "PERSONALIZADO"]),
  badge: z.string().optional(),
  imageUrl: z.string().optional(),
  fileUrl: z.string().optional(),
  stock: z.number().int().optional(),
  active: z.boolean().default(true),
});

const servicioInput = z.object({
  name: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().min(1),
  price: z.number().positive(),
  duration: z.number().int().positive(),
  format: z.string().default("Zoom"),
  active: z.boolean().default(true),
});

// ─── Router ──────────────────────────────────────────────────────────────────

export const adminRouter = createTRPCRouter({

  // ── Dashboard stats ──────────────────────────────────────────────────────
  stats: protectedProcedure.query(async ({ ctx }) => {
    requireAdmin(ctx.session.user.email);
    const [cursos, productos, servicios, usuarios, ordenesPagadas] = await Promise.all([
      ctx.db.course.count({ where: { active: true } }),
      ctx.db.product.count({ where: { active: true } }),
      ctx.db.service.count({ where: { active: true } }),
      ctx.db.user.count(),
      ctx.db.order.findMany({ where: { status: "PAID" }, select: { total: true } }),
    ]);
    const ingresos = ordenesPagadas.reduce((acc, o) => acc + o.total, 0);
    return { cursos, productos, servicios, usuarios, ingresos };
  }),

  // ── Cursos ───────────────────────────────────────────────────────────────
  cursos: createTRPCRouter({
    list: protectedProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx.session.user.email);
      return ctx.db.course.findMany({
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { enrollments: true } } },
      });
    }),

    create: protectedProcedure.input(cursoInput).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session.user.email);
      const slug = slugify(input.name);
      return ctx.db.course.create({ data: { ...input, slug } });
    }),

    update: protectedProcedure
      .input(z.object({ id: z.string(), data: cursoInput.partial() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session.user.email);
        const data: Record<string, unknown> = { ...input.data };
        if (input.data.name) data.slug = slugify(input.data.name);
        return ctx.db.course.update({ where: { id: input.id }, data });
      }),

    delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session.user.email);
      return ctx.db.course.delete({ where: { id: input } });
    }),

    toggleActive: protectedProcedure
      .input(z.object({ id: z.string(), active: z.boolean() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session.user.email);
        return ctx.db.course.update({ where: { id: input.id }, data: { active: input.active } });
      }),
  }),

  // ── Productos ────────────────────────────────────────────────────────────
  productos: createTRPCRouter({
    list: protectedProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx.session.user.email);
      return ctx.db.product.findMany({ orderBy: { createdAt: "desc" } });
    }),

    create: protectedProcedure.input(productoInput).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session.user.email);
      return ctx.db.product.create({ data: input });
    }),

    update: protectedProcedure
      .input(z.object({ id: z.string(), data: productoInput.partial() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session.user.email);
        return ctx.db.product.update({ where: { id: input.id }, data: input.data });
      }),

    delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session.user.email);
      return ctx.db.product.delete({ where: { id: input } });
    }),

    toggleActive: protectedProcedure
      .input(z.object({ id: z.string(), active: z.boolean() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session.user.email);
        return ctx.db.product.update({ where: { id: input.id }, data: { active: input.active } });
      }),
  }),

  // ── Servicios ────────────────────────────────────────────────────────────
  servicios: createTRPCRouter({
    list: protectedProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx.session.user.email);
      return ctx.db.service.findMany({ orderBy: { createdAt: "desc" } });
    }),

    create: protectedProcedure.input(servicioInput).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session.user.email);
      return ctx.db.service.create({ data: input });
    }),

    update: protectedProcedure
      .input(z.object({ id: z.string(), data: servicioInput.partial() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session.user.email);
        return ctx.db.service.update({ where: { id: input.id }, data: input.data });
      }),

    delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session.user.email);
      return ctx.db.service.delete({ where: { id: input } });
    }),

    toggleActive: protectedProcedure
      .input(z.object({ id: z.string(), active: z.boolean() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session.user.email);
        return ctx.db.service.update({ where: { id: input.id }, data: { active: input.active } });
      }),
  }),

  // ── Usuarios ─────────────────────────────────────────────────────────────
  usuarios: createTRPCRouter({
    list: protectedProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx.session.user.email);
      return ctx.db.user.findMany({
        orderBy: { emailVerified: "desc" },
        include: { _count: { select: { enrollments: true, orders: true } } },
      });
    }),
  }),

  // ── Órdenes ──────────────────────────────────────────────────────────────
  ordenes: createTRPCRouter({
    list: protectedProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx.session.user.email);
      return ctx.db.order.findMany({
        orderBy: { createdAt: "desc" },
        include: { items: true },
        take: 50,
      });
    }),
  }),
});
