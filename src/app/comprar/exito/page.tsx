import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle2, BookOpen, Calendar, Sparkles, ArrowRight, Mail } from "lucide-react";
import Navbar from "~/app/_components/home/Navbar";
import Footer from "~/app/_components/home/Footer";

interface SearchParams {
  type?: string;
  slug?: string;
  orderId?: string;
}

export default async function ExitoPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  return (
    <Suspense fallback={null}>
      <ExitoContent type={sp.type} slug={sp.slug} orderId={sp.orderId} />
    </Suspense>
  );
}

function ExitoContent({ type, slug, orderId }: SearchParams) {
  const config = getConfig(type);

  return (
    <>
      <Navbar />

      <main className="bg-crema min-h-screen">
        {/* Hero confirmación */}
        <section className="bg-dorado-light border-b-2 border-morado-dark py-16 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-morado-dark border-4 border-morado-dark block-shadow mb-6">
              <CheckCircle2 size={36} className="text-dorado" strokeWidth={2} />
            </div>
            <p className="font-sans text-[0.7rem] text-tierra-dark/65 tracking-[0.45em] uppercase mb-4">
              Compra confirmada
            </p>
            <h1 className="font-display uppercase text-[clamp(2.5rem,7vw,4rem)] text-tierra-dark leading-none tracking-wide mb-4">
              {config.heroTitle}
            </h1>
            <p className="font-sans italic text-tierra-dark/80 text-lg max-w-md mx-auto leading-relaxed">
              {config.heroSub}
            </p>
            {orderId && (
              <p className="font-sans text-[0.7rem] text-tierra-dark/50 tracking-widest uppercase mt-6">
                Orden #{orderId.slice(-8)}
              </p>
            )}
          </div>
        </section>

        {/* Instrucciones */}
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <p className="font-sans text-[0.7rem] text-morado/70 tracking-[0.4em] uppercase text-center mb-3">
              Cómo accedés
            </p>
            <h2 className="font-display uppercase text-[clamp(1.75rem,4vw,2.5rem)] text-tierra-dark leading-none tracking-wide text-center mb-10">
              Los siguientes pasos
            </h2>

            <ol className="space-y-5">
              {config.steps.map((step, i) => (
                <li
                  key={i}
                  className="bg-white border-2 border-morado-dark block-shadow-sm p-6 flex gap-5"
                >
                  <div className="shrink-0">
                    <div className="w-10 h-10 bg-morado-dark text-crema flex items-center justify-center font-display text-xl block-shadow-xs">
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-morado-dark">{step.icon}</span>
                      <h3 className="font-sans font-bold text-tierra-dark tracking-wide">
                        {step.title}
                      </h3>
                    </div>
                    <p className="font-sans text-[14px] text-tierra-dark/75 tracking-wide leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
              <Link
                href={config.primaryHref}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-morado-dark text-crema font-sans font-semibold text-[13px] px-8 py-4 border-2 border-morado-dark block-shadow hover:bg-morado transition-colors tracking-widest uppercase"
              >
                {config.primaryLabel} <ArrowRight size={14} />
              </Link>
              <Link
                href="/mi-cuenta"
                className="flex-1 sm:flex-none inline-flex items-center justify-center font-sans text-[13px] px-8 py-4 border-2 border-morado-dark text-tierra-dark hover:bg-morado-dark hover:text-crema transition-colors tracking-widest uppercase"
              >
                Ver mi cuenta
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function getConfig(type?: string) {
  if (type === "curso") {
    return {
      heroTitle: "Tu curso está listo",
      heroSub: "Te dimos acceso inmediato. Empezá cuando quieras desde tu cuenta.",
      steps: [
        {
          icon: <Mail size={15} />,
          title: "Te llegó un email de confirmación",
          desc: "Con tu orden y los datos de tu cuenta. Si no lo ves, revisá spam.",
        },
        {
          icon: <BookOpen size={15} />,
          title: "Accedé al curso desde Mi cuenta",
          desc: "El curso queda guardado en tu sección 'Mis cursos'. Podés empezar las clases ahora mismo o cuando quieras — no caduca.",
        },
        {
          icon: <Sparkles size={15} />,
          title: "Volvé cuando quieras",
          desc: "Tu contraseña te deja entrar de nuevo en /login. Si la olvidás, podemos resetearla por mail.",
        },
      ],
      primaryHref: "/mi-cuenta",
      primaryLabel: "Empezar el curso",
    };
  }

  if (type === "servicio") {
    return {
      heroTitle: "Recibimos tu reserva",
      heroSub: "Te escribimos en menos de 24 horas para coordinar fecha y hora.",
      steps: [
        {
          icon: <Mail size={15} />,
          title: "Te llegó un email de confirmación",
          desc: "Con los detalles de tu compra. Si no lo ves, revisá spam.",
        },
        {
          icon: <Calendar size={15} />,
          title: "Coordinamos por mail o WhatsApp",
          desc: "Belén te va a contactar para fijar día y hora de la sesión. Si tenés preferencia horaria, podés contarla cuando responda.",
        },
        {
          icon: <Sparkles size={15} />,
          title: "El día de la sesión",
          desc: "Te llega un link de Zoom (o el formato acordado) 15 minutos antes. Cualquier duda antes, escribinos.",
        },
      ],
      primaryHref: "/mi-cuenta",
      primaryLabel: "Ver mi sesión",
    };
  }

  // membresia
  return {
    heroTitle: "Bienvenida al Círculo",
    heroSub: "Tu membresía está activa. Ya tenés acceso a todos los contenidos.",
    steps: [
      {
        icon: <Mail size={15} />,
        title: "Te llegó un email de bienvenida",
        desc: "Con los detalles de tu suscripción. Si no lo ves, revisá spam.",
      },
      {
        icon: <Sparkles size={15} />,
        title: "Entrá al feed del Círculo",
        desc: "Acá vas a encontrar los rituales, meditaciones, lecturas y todo el contenido exclusivo de socias.",
      },
      {
        icon: <Calendar size={15} />,
        title: "Renovación automática",
        desc: "La membresía se renueva todos los meses. Podés cancelar cuando quieras desde Mi cuenta — no preguntamos por qué.",
      },
    ],
    primaryHref: "/circulo",
    primaryLabel: "Entrar al Círculo",
  };
}
