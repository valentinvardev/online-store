import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const isDev = process.env.NODE_ENV === "development";
const hasCredentials = !!(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
const dbReady = !!(process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("[tu-project-ref]"));

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function requireAdmin(email: string | null | undefined) {
  // En dev sin credenciales, acceso libre al admin
  if (isDev && !hasCredentials) return;
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
  images: z.array(z.string()).optional(),
  videoUrl: z.string().optional(),
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
  images: z.array(z.string()).optional(),
  videoUrl: z.string().optional(),
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
  imageUrl: z.string().optional(),
  images: z.array(z.string()).optional(),
  videoUrl: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  active: z.boolean().default(true),
});

// ─── Router ──────────────────────────────────────────────────────────────────

export const adminRouter = createTRPCRouter({

  // ── Dashboard stats ──────────────────────────────────────────────────────
  stats: publicProcedure.query(async ({ ctx }) => {
    requireAdmin(ctx.session?.user?.email);
    if (!dbReady) return { cursos: 0, productos: 0, servicios: 0, usuarios: 0, ingresos: 0 };
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
    list: publicProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx.session?.user?.email);
      if (!dbReady) return [];
      return ctx.db.course.findMany({
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { enrollments: true } } },
      });
    }),

    create: publicProcedure.input(cursoInput).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user?.email);
      const slug = slugify(input.name);
      return ctx.db.course.create({ data: { ...input, slug } });
    }),

    update: publicProcedure
      .input(z.object({ id: z.string(), data: cursoInput.partial() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user?.email);
        const data: Record<string, unknown> = { ...input.data };
        if (input.data.name) data.slug = slugify(input.data.name);
        return ctx.db.course.update({ where: { id: input.id }, data });
      }),

    delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user?.email);
      return ctx.db.course.delete({ where: { id: input } });
    }),

    toggleActive: publicProcedure
      .input(z.object({ id: z.string(), active: z.boolean() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user?.email);
        return ctx.db.course.update({ where: { id: input.id }, data: { active: input.active } });
      }),
  }),

  // ── Productos ────────────────────────────────────────────────────────────
  productos: createTRPCRouter({
    list: publicProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx.session?.user?.email);
      if (!dbReady) return [];
      return ctx.db.product.findMany({ orderBy: { createdAt: "desc" } });
    }),

    create: publicProcedure.input(productoInput).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user?.email);
      const slug = slugify(input.name);
      return ctx.db.product.create({ data: { ...input, slug } });
    }),

    update: publicProcedure
      .input(z.object({ id: z.string(), data: productoInput.partial() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user?.email);
        const data: Record<string, unknown> = { ...input.data };
        if (input.data.name) data.slug = slugify(input.data.name);
        return ctx.db.product.update({ where: { id: input.id }, data });
      }),

    delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user?.email);
      return ctx.db.product.delete({ where: { id: input } });
    }),

    toggleActive: publicProcedure
      .input(z.object({ id: z.string(), active: z.boolean() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user?.email);
        return ctx.db.product.update({ where: { id: input.id }, data: { active: input.active } });
      }),
  }),

  // ── Servicios ────────────────────────────────────────────────────────────
  servicios: createTRPCRouter({
    list: publicProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx.session?.user?.email);
      if (!dbReady) return [];
      return ctx.db.service.findMany({ orderBy: { createdAt: "desc" } });
    }),

    create: publicProcedure.input(servicioInput).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user?.email);
      const slug = slugify(input.name);
      return ctx.db.service.create({ data: { ...input, slug } });
    }),

    update: publicProcedure
      .input(z.object({ id: z.string(), data: servicioInput.partial() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user?.email);
        const data: Record<string, unknown> = { ...input.data };
        if (input.data.name) data.slug = slugify(input.data.name);
        return ctx.db.service.update({ where: { id: input.id }, data });
      }),

    delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user?.email);
      return ctx.db.service.delete({ where: { id: input } });
    }),

    toggleActive: publicProcedure
      .input(z.object({ id: z.string(), active: z.boolean() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user?.email);
        return ctx.db.service.update({ where: { id: input.id }, data: { active: input.active } });
      }),
  }),

  // ── Usuarios ─────────────────────────────────────────────────────────────
  usuarios: createTRPCRouter({
    list: publicProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx.session?.user?.email);
      if (!dbReady) return [];
      return ctx.db.user.findMany({
        orderBy: { emailVerified: "desc" },
        include: { _count: { select: { enrollments: true, orders: true } } },
      });
    }),
  }),

  // ── Órdenes ──────────────────────────────────────────────────────────────
  ordenes: createTRPCRouter({
    list: publicProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx.session?.user?.email);
      if (!dbReady) return [];
      return ctx.db.order.findMany({
        orderBy: { createdAt: "desc" },
        include: { items: true },
        take: 50,
      });
    }),
  }),
});
