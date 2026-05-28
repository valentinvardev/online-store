import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    AUTH_GOOGLE_ID: z.string().optional(),
    AUTH_GOOGLE_SECRET: z.string().optional(),
    AUTH_RESEND_KEY: z.string().optional(),
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),
    SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
    MP_ACCESS_TOKEN: z.string().optional(),
    MP_WEBHOOK_SECRET: z.string().optional(),
    NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
    NEXT_PUBLIC_MP_PUBLIC_KEY: z.string().optional(),
  },

  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    AUTH_RESEND_KEY: process.env.AUTH_RESEND_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    MP_ACCESS_TOKEN: process.env.MP_ACCESS_TOKEN,
    MP_WEBHOOK_SECRET: process.env.MP_WEBHOOK_SECRET,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_MP_PUBLIC_KEY: process.env.NEXT_PUBLIC_MP_PUBLIC_KEY,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
