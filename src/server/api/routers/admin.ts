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
      if (!dbReady) return [
        {
          id: "demo-curso-1",
          slug: "tarot-desde-cero",
          name: "Tarot desde Cero",
          subtitle: "Leé tu propio código sagrado",
          description: "Un recorrido completo por los 78 arcanos del tarot. Aprendés a leer el mazo con confianza, profundidad y tu propio lenguaje.",
          price: 15000,
          badge: "Más vendido",
          level: "Principiante",
          durationWeeks: 8,
          lessonsCount: 24,
          imageUrl: null,
          images: [] as string[],
          videoUrl: null,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          _count: { enrollments: 47 },
        },
      ];
      return ctx.db.course.findMany({
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { enrollments: true } } },
      });
    }),

    getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user?.email);
      if (!dbReady) return input === "demo-curso-1" ? {
        id: "demo-curso-1",
        slug: "tarot-desde-cero",
        name: "Tarot desde Cero",
        subtitle: "Leé tu propio código sagrado",
        description: "Un recorrido completo por los 78 arcanos del tarot.",
        price: 15000,
        badge: "Más vendido",
        level: "Principiante",
        durationWeeks: 8,
        lessonsCount: 24,
        imageUrl: null,
        images: [] as string[],
        videoUrl: null,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        _count: { enrollments: 47 },
        modules: [
          {
            id: "mod-1", courseId: "demo-curso-1", title: "Introducción al Tarot", order: 1, attachments: [] as string[],
            lessons: [
              { id: "les-1", moduleId: "mod-1", title: "¿Qué es el Tarot?", content: "Historia y orígenes del tarot.", videoUrl: null, attachments: [] as string[], order: 1, freePreview: true },
              { id: "les-2", moduleId: "mod-1", title: "El mazo Rider-Waite", content: null, videoUrl: null, attachments: [] as string[], order: 2, freePreview: false },
            ],
          },
          {
            id: "mod-2", courseId: "demo-curso-1", title: "Arcanos Mayores", order: 2, attachments: [] as string[],
            lessons: [
              { id: "les-3", moduleId: "mod-2", title: "El Loco — el comienzo", content: null, videoUrl: null, attachments: [] as string[], order: 1, freePreview: false },
              { id: "les-4", moduleId: "mod-2", title: "El Mago — la voluntad", content: null, videoUrl: null, attachments: [] as string[], order: 2, freePreview: false },
              { id: "les-5", moduleId: "mod-2", title: "La Sacerdotisa — la intuición", content: null, videoUrl: null, attachments: [] as string[], order: 3, freePreview: false },
            ],
          },
          {
            id: "mod-3", courseId: "demo-curso-1", title: "Arcanos Menores", order: 3, attachments: [] as string[],
            lessons: [] as { id: string; moduleId: string; title: string; content: string | null; videoUrl: string | null; attachments: string[]; order: number; freePreview: boolean }[],
          },
        ],
      } : null;
      return ctx.db.course.findUnique({
        where: { id: input },
        include: {
          modules: {
            orderBy: { order: "asc" },
            include: { lessons: { orderBy: { order: "asc" } } },
          },
          _count: { select: { enrollments: true } },
        },
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

    // ── Módulos ───────────────────────────────────────────────────────────────
    createModule: publicProcedure
      .input(z.object({ courseId: z.string(), title: z.string().min(1) }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user?.email);
        const last = await ctx.db.courseModule.findFirst({
          where: { courseId: input.courseId },
          orderBy: { order: "desc" },
        });
        return ctx.db.courseModule.create({
          data: { courseId: input.courseId, title: input.title, order: (last?.order ?? 0) + 1 },
          include: { lessons: { orderBy: { order: "asc" } } },
        });
      }),

    updateModule: publicProcedure
      .input(z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        attachments: z.array(z.string()).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user?.email);
        const { id, ...data } = input;
        return ctx.db.courseModule.update({ where: { id }, data });
      }),

    deleteModule: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user?.email);
      return ctx.db.courseModule.delete({ where: { id: input } });
    }),

    // ── Lecciones ─────────────────────────────────────────────────────────────
    createLesson: publicProcedure
      .input(z.object({
        moduleId: z.string(),
        title: z.string().min(1),
        content: z.string().optional(),
        videoUrl: z.string().optional(),
        freePreview: z.boolean().default(false),
      }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user?.email);
        const last = await ctx.db.courseLesson.findFirst({
          where: { moduleId: input.moduleId },
          orderBy: { order: "desc" },
        });
        return ctx.db.courseLesson.create({
          data: { ...input, order: (last?.order ?? 0) + 1 },
        });
      }),

    updateLesson: publicProcedure
      .input(z.object({
        id: z.string(),
        data: z.object({
          title: z.string().min(1).optional(),
          content: z.string().optional(),
          videoUrl: z.string().optional(),
          freePreview: z.boolean().optional(),
          attachments: z.array(z.string()).optional(),
        }),
      }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user?.email);
        return ctx.db.courseLesson.update({ where: { id: input.id }, data: input.data });
      }),

    deleteLesson: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user?.email);
      return ctx.db.courseLesson.delete({ where: { id: input } });
    }),
  }),

  // ── Productos ────────────────────────────────────────────────────────────
  productos: createTRPCRouter({
    list: publicProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx.session?.user?.email);
      if (!dbReady) return [];
      return ctx.db.product.findMany({ orderBy: { createdAt: "desc" } });
    }),

    getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user?.email);
      if (!dbReady) return null;
      return ctx.db.product.findUnique({ where: { id: input } });
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

    getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user?.email);
      if (!dbReady) return null;
      return ctx.db.service.findUnique({ where: { id: input } });
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
