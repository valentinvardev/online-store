import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { db } from "~/server/db";

const registerSchema = z.object({
  name: z.string().min(1, "Necesitamos tu nombre"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "La contraseña tiene que tener al menos 8 caracteres"),
});

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as unknown;
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Datos inválidos";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { name, email: rawEmail, password } = parsed.data;
    const email = rawEmail.toLowerCase();

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      if (existing.passwordHash) {
        return NextResponse.json(
          { error: "Ya hay una cuenta con ese email" },
          { status: 409 },
        );
      }
      // Existe via Google/Resend pero sin password — le agregamos password
      const passwordHash = await bcrypt.hash(password, 12);
      await db.user.update({
        where: { email },
        data: { passwordHash, name: existing.name ?? name },
      });
      return NextResponse.json({ ok: true });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await db.user.create({
      data: {
        name,
        email,
        passwordHash,
        isAdmin: ADMIN_EMAILS.includes(email),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[register] Error:", err);
    return NextResponse.json(
      { error: "No pudimos crear tu cuenta. Probá de nuevo." },
      { status: 500 },
    );
  }
}
