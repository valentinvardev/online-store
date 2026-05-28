import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { auth } from "~/server/auth";

type BookingBody = {
  serviceId: string;
  email: string;
  date: string;
  notes?: string;
};

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const body = (await req.json()) as BookingBody;
    const { serviceId, email, date, notes } = body;

    if (!serviceId || !email || !date) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const service = await db.service.findUnique({ where: { id: serviceId, active: true } });
    if (!service) {
      return NextResponse.json({ error: "Servicio no encontrado" }, { status: 404 });
    }

    const booking = await db.booking.create({
      data: {
        serviceId,
        email,
        date: new Date(date),
        notes,
        userId: session?.user?.id,
      },
    });

    return NextResponse.json({ ok: true, bookingId: booking.id });
  } catch (error) {
    console.error("[Bookings] Error:", error);
    return NextResponse.json({ error: "Error al crear reserva" }, { status: 500 });
  }
}
