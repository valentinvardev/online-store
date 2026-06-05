import { adminRouter } from "~/server/api/routers/admin";
import { productsRouter } from "~/server/api/routers/products";
import { coursesRouter } from "~/server/api/routers/courses";
import { servicesRouter } from "~/server/api/routers/services";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  admin: adminRouter,
  products: productsRouter,
  courses: coursesRouter,
  services: servicesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
