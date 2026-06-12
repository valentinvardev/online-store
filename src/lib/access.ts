import { db } from "~/server/db";

/* Acceso al Círculo — con el modelo de membresía única, una membresía ACTIVE
 * desbloquea TODOS los cursos + el feed del Círculo + la comunidad. */

export async function hasActiveMembership(
  userId: string | null | undefined,
): Promise<boolean> {
  if (!userId) return false;
  const membership = await db.membership.findFirst({
    where: { userId, status: "ACTIVE" },
    select: { id: true },
  });
  return !!membership;
}

/* Acceso a un curso puntual. Verdadero si:
 *  - tiene membresía activa (modelo nuevo), o
 *  - tiene un Enrollment viejo de cuando los cursos se compraban sueltos.
 * El segundo caso es backward-compat para no dejar afuera a quien ya compró. */
export async function hasCourseAccess(
  userId: string | null | undefined,
  courseId: string,
): Promise<boolean> {
  if (!userId) return false;
  if (await hasActiveMembership(userId)) return true;
  const enrollment = await db.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
    select: { id: true },
  });
  return !!enrollment;
}

/* Slug del tier principal — punto de conversión único de la membresía. */
export const CIRCULO_SLUG = "circulo-reina";
export const CIRCULO_CHECKOUT = `/comprar/membresia/${CIRCULO_SLUG}`;
