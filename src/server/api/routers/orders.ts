import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const itemSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int().positive(),
  itemType: z.enum(["product", "course", "service"]),
});

export const ordersRouter = createTRPCRouter({
  /* Crea una orden a partir del carrito + datos del comprador.
   * Sin MP wireado, las ordenes quedan en PENDING y se ven en /mi-cuenta
   * (si el usuario esta logueado). */
  create: publicProcedure
    .input(
      z.object({
        buyer: z.object({
          name: z.string(),
          apellido: z.string().optional(),
          email: z.string().email(),
          phone: z.string().optional(),
        }),
        items: z.array(itemSchema).min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const total = input.items.reduce((acc, it) => acc + it.price * it.quantity, 0);

      // Resuelve IDs reales en DB cuando los recibimos por slug/string.
      // Esto vale la pena porque el cart guarda el id de DB cuando el catalogo
      // viene de tRPC, pero los mocks viejos podrian dar nro.
      const resolvedItems = await Promise.all(
        input.items.map(async (it) => {
          const dbId = typeof it.id === "string" ? it.id : null;
          let productId: string | null = null;
          let courseId: string | null = null;
          let serviceId: string | null = null;

          if (dbId) {
            // Verifica que exista en DB segun itemType
            if (it.itemType === "product") {
              const exists = await ctx.db.product.findUnique({ where: { id: dbId }, select: { id: true } });
              if (exists) productId = exists.id;
            } else if (it.itemType === "course") {
              const exists = await ctx.db.course.findUnique({ where: { id: dbId }, select: { id: true } });
              if (exists) courseId = exists.id;
            } else {
              const exists = await ctx.db.service.findUnique({ where: { id: dbId }, select: { id: true } });
              if (exists) serviceId = exists.id;
            }
          }

          return {
            itemType: (it.itemType.toUpperCase() as "PRODUCT" | "COURSE" | "SERVICE"),
            productId,
            courseId,
            serviceId,
            quantity: it.quantity,
            price: it.price,
            name: it.name,
          };
        }),
      );

      const order = await ctx.db.order.create({
        data: {
          email: input.buyer.email,
          total,
          status: "PENDING",
          userId: ctx.session?.user?.id ?? null,
          items: { create: resolvedItems },
        },
        include: { items: true },
      });

      return { ok: true as const, orderId: order.id, total };
    }),
});
