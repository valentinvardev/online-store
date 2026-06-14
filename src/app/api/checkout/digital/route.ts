import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { db } from "~/server/db";

/* Checkout digital — combina registro + creacion de orden/enrollment/membership.
 *
 * Para servicios:   crea Order PAID + OrderItem (admin coordina la fecha).
 * Para cursos:      crea Order PAID + Enrollment (acceso inmediato a /mi-cuenta).
 * Para membresia:   crea Order PAID + Membership ACTIVE.
 *
 * TODO: cuando MP este wireado, cambiar status PAID → PENDING y dejar que el
 * webhook confirme. La membresia tambien deberia estar PENDING hasta cobro real. */

const checkoutSchema = z.object({
  type: z.enum(["curso", "servicio", "membresia"]),
  slug: z.string(),
  buyer: z.object({
    email: z.string().email("Email inválido"),
    name: z.string().min(1, "Necesitamos tu nombre"),
    apellido: z.string().min(1, "Necesitamos tu apellido"),
    phone: z.string().optional(),
    password: z.string().min(8, "La contraseña tiene que tener al menos 8 caracteres"),
  }),
});

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as unknown;
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Datos inválidos";
      return NextResponse.json({ error: message }, { status: 400 });
    }
    const { type, slug, buyer } = parsed.data;
    const email = buyer.email.toLowerCase();
    const fullName = `${buyer.name.trim()} ${buyer.apellido.trim()}`.trim();

    /* 1) Buscar el item */
    let itemName = "";
    let itemPrice = 0;
    let courseId: string | undefined;
    let serviceId: string | undefined;
    let tierId: string | undefined;
    let itemType: "COURSE" | "SERVICE" | "MEMBERSHIP";

    if (type === "curso") {
      const course = await db.course.findUnique({ where: { slug, active: true } });
      if (!course) return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });
      itemName = course.name;
      itemPrice = course.price;
      courseId = course.id;
      itemType = "COURSE";
    } else if (type === "servicio") {
      const service = await db.service.findUnique({ where: { slug, active: true } });
      if (!service) return NextResponse.json({ error: "Servicio no encontrado" }, { status: 404 });
      itemName = service.name;
      itemPrice = service.price;
      serviceId = service.id;
      itemType = "SERVICE";
    } else {
      const tier = await db.membershipTier.findUnique({ where: { slug, active: true } });
      if (!tier) return NextResponse.json({ error: "Membresía no encontrada" }, { status: 404 });
      itemName = tier.name;
      itemPrice = tier.price;
      tierId = tier.id;
      itemType = "MEMBERSHIP";
    }

    /* 2) User: crear si no existe, agregar password si vino sin (vino por Google) */
    let user = await db.user.findUnique({ where: { email } });
    const passwordHash = await bcrypt.hash(buyer.password, 12);

    if (!user) {
      user = await db.user.create({
        data: {
          email,
          name: fullName,
          phone: buyer.phone ?? null,
          passwordHash,
          isAdmin: ADMIN_EMAILS.includes(email),
        },
      });
    } else if (!user.passwordHash) {
      user = await db.user.update({
        where: { id: user.id },
        data: { passwordHash, name: user.name ?? fullName, phone: buyer.phone ?? user.phone },
      });
    } else {
      // Existe con password — verificar que coincida; si no, error claro
      const ok = await bcrypt.compare(buyer.password, user.passwordHash);
      if (!ok) {
        return NextResponse.json(
          { error: "Ya hay una cuenta con ese email. Ingresá la contraseña existente o usá otro email." },
          { status: 409 },
        );
      }
    }

    /* 3) Crear Order + acceso */
    if (itemType === "MEMBERSHIP" && tierId) {
      // Membership
      const existing = await db.membership.findUnique({
        where: { userId_tierId: { userId: user.id, tierId } },
      });
      if (existing?.status === "ACTIVE") {
        return NextResponse.json(
          { error: "Ya tenés una membresía activa para este tier" },
          { status: 409 },
        );
      }
      await db.membership.upsert({
        where: { userId_tierId: { userId: user.id, tierId } },
        create: {
          userId: user.id,
          tierId,
          status: "ACTIVE", // TODO: PENDING hasta webhook de MP
          startedAt: new Date(),
          nextBillingAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
        update: {
          status: "ACTIVE",
          startedAt: new Date(),
          cancelledAt: null,
          nextBillingAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
    }

    if (itemType === "COURSE" && courseId) {
      await db.enrollment.upsert({
        where: { userId_courseId: { userId: user.id, courseId } },
        create: { userId: user.id, courseId },
        update: {},
      });
    }

    const order = await db.order.create({
      data: {
        userId: user.id,
        email,
        total: itemPrice,
        status: "PAID", // TODO: PENDING hasta webhook MP
        items: {
          create: [
            {
              itemType: itemType === "MEMBERSHIP" ? "SERVICE" : itemType,
              courseId,
              serviceId,
              quantity: 1,
              price: itemPrice,
              name: itemName,
            },
          ],
        },
      },
    });

    /* 4) Phone — lo guardamos como note en una eventual Booking si era servicio.
     * Por ahora, si vino phone, lo seteamos en el name del User como contexto.
     * (Schema no tiene phone en User — podriamos extender pero queda fuera de scope.) */

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      type,
      itemName,
      total: itemPrice,
    });
  } catch (err) {
    console.error("[checkout/digital] Error:", err);
    return NextResponse.json(
      { error: "No pudimos procesar la compra. Probá de nuevo." },
      { status: 500 },
    );
  }
}
