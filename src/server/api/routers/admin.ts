import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";

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

function requireAdmin(user: { isAdmin?: boolean; email?: string | null } | null | undefined) {
  // En dev sin credenciales, acceso libre al admin
  if (isDev && !hasCredentials) return;
  // Fuente de verdad: el flag isAdmin (lo setea el JWT desde la DB / ADMIN_EMAILS)
  if (user?.isAdmin) return;
  // Fallback por email para el admin principal
  const adminEmails = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  if (!user?.email || !adminEmails.includes(user.email.toLowerCase())) {
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

const postInput = z.object({
  title: z.string().min(1, "Necesitamos un título"),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1, "El contenido no puede estar vacío"),
  contentType: z.enum(["TEXT", "VIDEO", "AUDIO", "GALLERY"]).default("TEXT"),
  coverImageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  audioUrl: z.string().optional(),
  images: z.array(z.string()).default([]),
  attachments: z.array(z.string()).default([]),
  requiredTierId: z.string().nullable().optional(),
  published: z.boolean().default(false),
});

// ─── Router ──────────────────────────────────────────────────────────────────

export const adminRouter = createTRPCRouter({

  // ── Dashboard stats ──────────────────────────────────────────────────────
  stats: adminProcedure.query(async ({ ctx }) => {
    requireAdmin(ctx.session?.user);
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
    list: adminProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx.session?.user);
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

    getById: adminProcedure.input(z.string()).query(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user);
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

    create: adminProcedure.input(cursoInput).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user);
      const slug = slugify(input.name);
      return ctx.db.course.create({ data: { ...input, slug } });
    }),

    update: adminProcedure
      .input(z.object({ id: z.string(), data: cursoInput.partial() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user);
        const data: Record<string, unknown> = { ...input.data };
        if (input.data.name) data.slug = slugify(input.data.name);
        return ctx.db.course.update({ where: { id: input.id }, data });
      }),

    delete: adminProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user);
      return ctx.db.course.delete({ where: { id: input } });
    }),

    toggleActive: adminProcedure
      .input(z.object({ id: z.string(), active: z.boolean() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user);
        return ctx.db.course.update({ where: { id: input.id }, data: { active: input.active } });
      }),

    // ── Módulos ───────────────────────────────────────────────────────────────
    createModule: adminProcedure
      .input(z.object({ courseId: z.string(), title: z.string().min(1) }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user);
        const last = await ctx.db.courseModule.findFirst({
          where: { courseId: input.courseId },
          orderBy: { order: "desc" },
        });
        return ctx.db.courseModule.create({
          data: { courseId: input.courseId, title: input.title, order: (last?.order ?? 0) + 1 },
          include: { lessons: { orderBy: { order: "asc" } } },
        });
      }),

    updateModule: adminProcedure
      .input(z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        attachments: z.array(z.string()).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user);
        const { id, ...data } = input;
        return ctx.db.courseModule.update({ where: { id }, data });
      }),

    deleteModule: adminProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user);
      return ctx.db.courseModule.delete({ where: { id: input } });
    }),

    // ── Lecciones ─────────────────────────────────────────────────────────────
    createLesson: adminProcedure
      .input(z.object({
        moduleId: z.string(),
        title: z.string().min(1),
        content: z.string().optional(),
        videoUrl: z.string().optional(),
        freePreview: z.boolean().default(false),
        publishedAt: z.coerce.date().nullable().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user);
        const last = await ctx.db.courseLesson.findFirst({
          where: { moduleId: input.moduleId },
          orderBy: { order: "desc" },
        });
        return ctx.db.courseLesson.create({
          data: { ...input, order: (last?.order ?? 0) + 1 },
        });
      }),

    updateLesson: adminProcedure
      .input(z.object({
        id: z.string(),
        data: z.object({
          title: z.string().min(1).optional(),
          content: z.string().optional(),
          videoUrl: z.string().optional(),
          freePreview: z.boolean().optional(),
          attachments: z.array(z.string()).optional(),
          publishedAt: z.coerce.date().nullable().optional(),
        }),
      }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user);
        return ctx.db.courseLesson.update({ where: { id: input.id }, data: input.data });
      }),

    deleteLesson: adminProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user);
      return ctx.db.courseLesson.delete({ where: { id: input } });
    }),
  }),

  // ── Productos ────────────────────────────────────────────────────────────
  productos: createTRPCRouter({
    list: adminProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx.session?.user);
      if (!dbReady) return [];
      return ctx.db.product.findMany({ orderBy: { createdAt: "desc" } });
    }),

    getById: adminProcedure.input(z.string()).query(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user);
      if (!dbReady) return null;
      return ctx.db.product.findUnique({ where: { id: input } });
    }),

    create: adminProcedure.input(productoInput).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user);
      const slug = slugify(input.name);
      return ctx.db.product.create({ data: { ...input, slug } });
    }),

    update: adminProcedure
      .input(z.object({ id: z.string(), data: productoInput.partial() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user);
        const data: Record<string, unknown> = { ...input.data };
        if (input.data.name) data.slug = slugify(input.data.name);
        return ctx.db.product.update({ where: { id: input.id }, data });
      }),

    delete: adminProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user);
      return ctx.db.product.delete({ where: { id: input } });
    }),

    toggleActive: adminProcedure
      .input(z.object({ id: z.string(), active: z.boolean() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user);
        return ctx.db.product.update({ where: { id: input.id }, data: { active: input.active } });
      }),
  }),

  // ── Servicios ────────────────────────────────────────────────────────────
  servicios: createTRPCRouter({
    list: adminProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx.session?.user);
      if (!dbReady) return [];
      return ctx.db.service.findMany({ orderBy: { createdAt: "desc" } });
    }),

    getById: adminProcedure.input(z.string()).query(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user);
      if (!dbReady) return null;
      return ctx.db.service.findUnique({ where: { id: input } });
    }),

    create: adminProcedure.input(servicioInput).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user);
      const slug = slugify(input.name);
      return ctx.db.service.create({ data: { ...input, slug } });
    }),

    update: adminProcedure
      .input(z.object({ id: z.string(), data: servicioInput.partial() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user);
        const data: Record<string, unknown> = { ...input.data };
        if (input.data.name) data.slug = slugify(input.data.name);
        return ctx.db.service.update({ where: { id: input.id }, data });
      }),

    delete: adminProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user);
      return ctx.db.service.delete({ where: { id: input } });
    }),

    toggleActive: adminProcedure
      .input(z.object({ id: z.string(), active: z.boolean() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user);
        return ctx.db.service.update({ where: { id: input.id }, data: { active: input.active } });
      }),
  }),

  // ── Usuarios ─────────────────────────────────────────────────────────────
  usuarios: createTRPCRouter({
    list: adminProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx.session?.user);
      if (!dbReady) return [];
      return ctx.db.user.findMany({
        orderBy: { emailVerified: "desc" },
        include: { _count: { select: { enrollments: true, orders: true } } },
      });
    }),
  }),

  // ── Órdenes ──────────────────────────────────────────────────────────────
  ordenes: createTRPCRouter({
    list: adminProcedure.query(async ({ ctx }) => {
      requireAdmin(ctx.session?.user);
      if (!dbReady) return [];
      return ctx.db.order.findMany({
        orderBy: { createdAt: "desc" },
        include: { items: true },
        take: 50,
      });
    }),
  }),

  // ── Posts del círculo ────────────────────────────────────────────────────
  posts: createTRPCRouter({
    list: adminProcedure.query(({ ctx }) => {
      requireAdmin(ctx.session?.user);
      return ctx.db.post.findMany({
        orderBy: [{ published: "asc" }, { createdAt: "desc" }],
        include: { requiredTier: { select: { name: true, slug: true, color: true } } },
      });
    }),

    getById: adminProcedure.input(z.string()).query(({ ctx, input }) => {
      requireAdmin(ctx.session?.user);
      return ctx.db.post.findUnique({
        where: { id: input },
        include: { requiredTier: true },
      });
    }),

    tiers: adminProcedure.query(({ ctx }) => {
      requireAdmin(ctx.session?.user);
      return ctx.db.membershipTier.findMany({
        where: { active: true },
        orderBy: { sortOrder: "asc" },
        select: { id: true, slug: true, name: true, color: true },
      });
    }),

    create: adminProcedure.input(postInput).mutation(async ({ ctx, input }) => {
      requireAdmin(ctx.session?.user);
      const slug = (input.slug?.trim() || slugify(input.title ?? "post"));
      const publishedAt = input.published ? new Date() : null;
      return ctx.db.post.create({
        data: { ...input, slug, publishedAt },
      });
    }),

    /* Mensaje rápido — estilo feed/estado. Sin título, TEXT, publicado al toque. */
    quickPost: adminProcedure
      .input(z.object({
        content: z.string().min(1, "Escribí algo"),
        requiredTierId: z.string().nullable().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user);
        const body = input.content.trim();
        const excerpt = body.length > 180 ? body.slice(0, 177).trimEnd() + "…" : body;
        return ctx.db.post.create({
          data: {
            slug: `mensaje-${Date.now().toString(36)}`,
            title: null,
            excerpt,
            content: body,
            contentType: "TEXT",
            requiredTierId: input.requiredTierId ?? null,
            published: true,
            publishedAt: new Date(),
            images: [],
            attachments: [],
          },
        });
      }),

    update: adminProcedure
      .input(z.object({ id: z.string(), data: postInput.partial() }))
      .mutation(async ({ ctx, input }) => {
        requireAdmin(ctx.session?.user);
        const existing = await ctx.db.post.findUnique({
          where: { id: input.id },
          select: { published: true },
        });
        const data: Record<string, unknown> = { ...input.data };
        // Si pasa de unpublished → published, setea publishedAt
        if (input.data.published === true && existing && !existing.published) {
          data.publishedAt = new Date();
        }
        if (input.data.title && !input.data.slug) {
          data.slug = slugify(input.data.title);
        }
        return ctx.db.post.update({ where: { id: input.id }, data });
      }),

    delete: adminProcedure.input(z.string()).mutation(({ ctx, input }) => {
      requireAdmin(ctx.session?.user);
      return ctx.db.post.delete({ where: { id: input } });
    }),

    togglePublished: adminProcedure
      .input(z.object({ id: z.string(), published: z.boolean() }))
      .mutation(({ ctx, input }) => {
        requireAdmin(ctx.session?.user);
        return ctx.db.post.update({
          where: { id: input.id },
          data: {
            published: input.published,
            publishedAt: input.published ? new Date() : null,
          },
        });
      }),
  }),
});
