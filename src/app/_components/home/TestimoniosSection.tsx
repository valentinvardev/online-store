import { Star } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import StarField from "./StarField";

type Testimonio = {
  id: number;
  nombre: string;
  texto: string;
  servicio: string;
  stars: number;
};

const testimonios: Testimonio[] = [
  {
    id: 1,
    nombre: "Valentina M.",
    texto: "La lectura de tarot fue lo más honesta y clara que tuve en años. Salí con un mapa de lo que necesitaba hacer. Nada de vaguedades.",
    servicio: "Lectura de Tarot",
    stars: 5,
  },
  {
    id: 2,
    nombre: "Lucía R.",
    texto: "El curso de tarot cambió cómo me relaciono con mi intuición. No memoricé cartas: aprendí a escucharme. Es la diferencia.",
    servicio: "Tarot desde Cero",
    stars: 5,
  },
  {
    id: 3,
    nombre: "Camila V.",
    texto: "Recibí el kit ritual y cada detalle tiene sentido. No es decoración, es herramienta. Mis meditaciones cambiaron.",
    servicio: "Kit de Inicio Ritual",
    stars: 5,
  },
  {
    id: 4,
    nombre: "Sofía T.",
    texto: "El ritual personalizado me ayudó a soltar algo que cargaba hace dos años. No sé cómo explicarlo, pero sé que funcionó.",
    servicio: "Ritual Personalizado",
    stars: 5,
  },
];

export default function TestimoniosSection() {
  return (
    <section className="bg-rosa py-24 px-6 relative overflow-hidden">
      <StarField color="#fff0f5" />
      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll direction="up" delay={0}>
          <div className="text-center mb-16">
            <h2 className="font-display uppercase text-[clamp(1.75rem,7vw,4rem)] text-crema leading-none tracking-wide">
              Ellas ya<br />encontraron su camino
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonios.map((t, i) => (
            <RevealOnScroll key={t.id} direction="up" delay={120 * i}>
              <figure className="bg-white border-2 border-morado-dark p-6 flex flex-col block-shadow h-full">
                <div className="flex text-dorado mb-5 gap-0.5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="font-sans text-tierra text-sm leading-relaxed flex-1 mb-6">
                  "{t.texto}"
                </blockquote>
                <figcaption>
                  <p className="font-sans font-semibold text-tierra-dark text-xs tracking-widest uppercase">{t.nombre}</p>
                  <p className="font-sans text-morado/60 text-xs mt-0.5 tracking-wide">{t.servicio}</p>
                </figcaption>
              </figure>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
