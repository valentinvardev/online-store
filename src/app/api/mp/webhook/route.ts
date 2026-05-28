import { NextRequest, NextResponse } from "next/server";
import { mpPayment } from "~/lib/mercadopago";
import { db } from "~/server/db";
import crypto from "crypto";

type PurchasedItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  itemType?: "PRODUCT" | "COURSE" | "SERVICE";
};

type MPNotification = {
  type: string;
  data?: { id?: string };
};

function verifySignature(req: NextRequest, rawBody: string): boolean {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return true;

  const signature = req.headers.get("x-signature") ?? "";
  const requestId = req.headers.get("x-request-id") ?? "";
  const dataId = req.nextUrl.searchParams.get("data.id") ?? "";

  const ts = signature.match(/ts=([^,]+)/)?.[1];
  const v1 = signature.match(/v1=([^,]+)/)?.[1];
  if (!ts || !v1) return false;

  const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;
  const expected = crypto.createHmac("sha256", secret).update(manifest).digest("hex");
  return expected === v1;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();

    if (!verifySignature(req, rawBody)) {
      return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
    }

    const notification = JSON.parse(rawBody) as MPNotification;
    if (notification.type !== "payment") return NextResponse.json({ ok: true });

    const paymentId = notification.data?.id;
    if (!paymentId) return NextResponse.json({ ok: true });

    const payment = await mpPayment.get({ id: paymentId });

    console.log("[MP Webhook] Payment received:", {
      id: payment.id,
      status: payment.status,
      payer: payment.payer?.email,
      total: payment.transaction_amount,
    });

    if (payment.status !== "approved") return NextResponse.json({ ok: true });

    // Parse purchased items from external_reference
    let purchasedItems: PurchasedItem[] = [];
    if (payment.external_reference) {
      try {
        purchasedItems = JSON.parse(
          Buffer.from(payment.external_reference, "base64").toString()
        ) as PurchasedItem[];
      } catch {
        console.error("[MP Webhook] Could not parse external_reference");
      }
    }

    const payerEmail = payment.payer?.email ?? "desconocido@mp.com";
    const total = payment.transaction_amount ?? 0;

    // Create order in DB
    const order = await db.order.create({
      data: {
        email: payerEmail,
        status: "PAID",
        total,
        mpPaymentId: String(payment.id),
        items: {
          create: purchasedItems.map((item) => ({
            itemType: item.itemType ?? "PRODUCT",
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    });

    console.log("[MP Webhook] Order created:", order.id);

    // Create enrollments for courses
    const courseItems = purchasedItems.filter((i) => i.itemType === "COURSE");
    // Enrollments require userId — will be linked when user logs in with same email
    // For now just log; full linking happens in Phase 4
    if (courseItems.length > 0) {
      console.log("[MP Webhook] Courses purchased:", courseItems.map((i) => i.name));
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[MP Webhook] Error:", error);
    return NextResponse.json({ error: "Error procesando webhook" }, { status: 500 });
  }
}
