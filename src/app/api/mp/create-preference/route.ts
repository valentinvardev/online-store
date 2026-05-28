import { NextRequest, NextResponse } from "next/server";
import { mpPreference } from "~/lib/mercadopago";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  itemType?: "PRODUCT" | "COURSE" | "SERVICE";
};

type RequestBody = {
  items: CartItem[];
  email?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RequestBody;
    const { items, email } = body;

    if (!items?.length) {
      return NextResponse.json({ error: "No hay ítems en el carrito" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? req.nextUrl.origin;

    // Encode items as external_reference so the webhook knows what was purchased
    const externalRef = Buffer.from(JSON.stringify(items)).toString("base64");

    const preference = await mpPreference.create({
      body: {
        items: items.map((item) => ({
          id: String(item.id),
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: "ARS",
        })),
        payer: email ? { email } : undefined,
        external_reference: externalRef,
        back_urls: {
          success: `${baseUrl}/pago/exito`,
          failure: `${baseUrl}/pago/error`,
          pending: `${baseUrl}/pago/pendiente`,
        },
        auto_return: "approved",
        notification_url: `${baseUrl}/api/mp/webhook`,
        statement_descriptor: "La Reina de Bastos",
      },
    });

    return NextResponse.json({
      id: preference.id,
      init_point: preference.init_point,
      sandbox_init_point: preference.sandbox_init_point,
    });
  } catch (error) {
    console.error("[MP] Error creando preferencia:", error);
    return NextResponse.json({ error: "Error al crear preferencia de pago" }, { status: 500 });
  }
}
