import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, signIn } from "~/server/auth";
import LoginCredentialsForm from "./LoginCredentialsForm";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/");

  const googleConfigured = !!(
    process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
  );
  const resendConfigured = !!process.env.AUTH_RESEND_KEY;

  return (
    <main className="min-h-screen bg-crema flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Logo text */}
        <div className="text-center mb-10">
          <p className="font-sans text-[0.8rem] text-morado/65 tracking-[0.45em] uppercase mb-4">
            La Reina de Bastos
          </p>
          <h1 className="font-display uppercase text-[clamp(2.5rem,6vw,3rem)] text-tierra-dark leading-none tracking-wide">
            Iniciar sesión
          </h1>
          <div className="flex items-center gap-4 mt-5 justify-center">
            <div className="h-px w-10 bg-dorado/40" />
            <span className="text-dorado/40 text-[13px]">✦</span>
            <div className="h-px w-10 bg-dorado/40" />
          </div>
        </div>

        {/* Email + password */}
        <LoginCredentialsForm />

        {(googleConfigured || resendConfigured) && (
          <div className="flex items-center gap-3 py-5">
            <div className="flex-1 h-px bg-morado/10" />
            <span className="font-sans text-[0.75rem] text-tierra/30 tracking-widest uppercase">
              o
            </span>
            <div className="flex-1 h-px bg-morado/10" />
          </div>
        )}

        <div className="space-y-3">
          {googleConfigured && (
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-morado/20 text-tierra-dark font-sans font-semibold text-[13px] py-4 px-6 hover:border-morado/50 transition-colors tracking-widest uppercase block-shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continuar con Google
              </button>
            </form>
          )}

          {resendConfigured && (
            <form
              action={async (formData: FormData) => {
                "use server";
                const email = formData.get("email") as string;
                await signIn("resend", { email, redirectTo: "/" });
              }}
              className="space-y-3"
            >
              <input
                name="email"
                type="email"
                placeholder="tu@email.com"
                required
                className="w-full border-2 border-morado/20 bg-white px-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/30 focus:outline-none focus:border-morado/50 transition-colors"
              />
              <button
                type="submit"
                className="w-full border-2 border-morado/30 text-morado font-sans font-semibold text-[13px] py-3.5 px-6 hover:bg-morado/5 transition-colors tracking-widest uppercase"
              >
                Recibir link por email
              </button>
            </form>
          )}
        </div>

        <p className="font-sans text-[0.85rem] text-tierra/55 text-center mt-7 tracking-wide">
          ¿Todavía no tenés cuenta?{" "}
          <Link href="/registro" className="text-morado hover:text-morado-dark font-semibold transition-colors">
            Creá una
          </Link>
        </p>

        <p className="font-sans text-[0.7rem] text-tierra/30 text-center mt-4 tracking-wide leading-relaxed">
          Al continuar aceptás los términos de uso y la política de privacidad.
        </p>
      </div>
    </main>
  );
}
