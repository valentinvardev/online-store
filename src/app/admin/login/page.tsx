import { redirect } from "next/navigation";
import { auth, signIn } from "~/server/auth";

export default async function AdminLoginPage() {
  const session = await auth();

  // If already logged in, redirect to admin
  if (session?.user?.email) {
    const adminEmails = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim());
    if (adminEmails.includes(session.user.email)) redirect("/admin");
    else redirect("/"); // logged in but not admin
  }

  return (
    <div className="min-h-screen bg-morado-dark flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-morado/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rosa/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-10">
          <p className="font-display text-dorado text-3xl tracking-widest uppercase leading-none">La Reina</p>
          <p className="font-display text-crema/30 text-3xl tracking-widest uppercase leading-none">de Bastos</p>
          <span className="font-sans text-[0.55rem] text-crema/25 tracking-[0.35em] uppercase block mt-4">
            Administración
          </span>
        </div>

        <div className="bg-crema border-4 border-dorado block-shadow-dorado p-8 space-y-4">
          {/* Google */}
          <form action={async () => { "use server"; await signIn("google", { redirectTo: "/admin" }); }}>
            <button type="submit" className="w-full flex items-center justify-center gap-3 bg-white border-2 border-morado/20 text-tierra-dark font-sans font-semibold text-xs py-3.5 hover:border-morado/40 transition-colors tracking-widest uppercase">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Entrar con Google
            </button>
          </form>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-morado/10" />
            <span className="font-sans text-[0.6rem] text-tierra/30 tracking-widest">o</span>
            <div className="flex-1 h-px bg-morado/10" />
          </div>

          {/* Email magic link */}
          <form action={async (fd: FormData) => {
            "use server";
            const email = fd.get("email") as string;
            await signIn("resend", { email, redirectTo: "/admin" });
          }} className="space-y-3">
            <input name="email" type="email" placeholder="tu@email.com" required
              className="w-full border-2 border-morado/20 bg-white px-4 py-3 font-sans text-sm text-tierra-dark placeholder:text-tierra/30 focus:outline-none focus:border-morado transition-colors" />
            <button type="submit"
              className="w-full bg-morado-dark text-crema font-sans font-semibold text-[0.7rem] py-3.5 tracking-widest uppercase block-shadow hover:bg-morado transition-colors">
              ✦ Recibir link por email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
