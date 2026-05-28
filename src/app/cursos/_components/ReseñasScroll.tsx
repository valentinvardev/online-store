"use client";

const reseñas = [
  { nombre: "Valentina R.", inicial: "V", texto: "El curso de Tarot me cambió la vida. Nunca pensé que podía leer las cartas con tanta claridad y profundidad.", curso: "Tarot desde Cero", color: "from-morado/40 to-morado-mid/30" },
  { nombre: "Sofía M.",     inicial: "S", texto: "Los rituales lunares me ayudaron a conectar con mis ciclos de una manera completamente nueva. Cada luna es distinta.", curso: "Rituales Lunares", color: "from-rosa/30 to-morado/20" },
  { nombre: "Camila T.",    inicial: "C", texto: "La astrología práctica me dio herramientas concretas. Ya no leo el horóscopo — entiendo mi carta natal.", curso: "Astrología Práctica", color: "from-celeste/30 to-morado/20" },
  { nombre: "Lucía P.",     inicial: "L", texto: "Las meditaciones son sin clichés ni poses. Aterrizadas, reales y transformadoras. Las hago cada mañana.", curso: "Meditación y Presencia", color: "from-verde/30 to-celeste/20" },
  { nombre: "Romina G.",    inicial: "R", texto: "El tarot avanzado abrió dimensiones que no sabía que existían. Las tiradas complejas son un regalo absoluto.", curso: "Tarot Avanzado", color: "from-dorado/25 to-morado/20" },
  { nombre: "Abril F.",     inicial: "A", texto: "Ahora leo mis sueños de una forma que nunca imaginé posible. Cada noche es un viaje de autoconocimiento.", curso: "Sueños y Simbolismo", color: "from-morado/30 to-rosa/20" },
  { nombre: "Julieta C.",   inicial: "J", texto: "Los chakras ahora son parte de mi vida cotidiana. La guía de sonidos y cristales es increíblemente práctica.", curso: "Chakras: Mapa Interior", color: "from-celeste/35 to-verde/20" },
  { nombre: "Macarena S.",  inicial: "M", texto: "Las hierbas rituales transformaron completamente mi espacio. Cada baño energético se convirtió en una ceremonia.", curso: "Herbología y Rituales", color: "from-verde/35 to-dorado/20" },
  { nombre: "Florencia D.", inicial: "F", texto: "La numerología me mostró patrones en mi vida que no podía ver. Profundo, claro y completamente transformador.", curso: "Numerología Esencial", color: "from-dorado/30 to-morado/20" },
];

function ReseñaCard({ r }: { r: typeof reseñas[0] }) {
  return (
    <div
      className={`bg-gradient-to-br ${r.color} border border-white/10 p-5 shrink-0`}
      style={{ width: "340px" }}
    >
      <p className="font-sans text-crema/70 text-sm leading-relaxed tracking-wide mb-4">
        "{r.texto}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
          <span className="font-display text-crema text-sm leading-none">{r.inicial}</span>
        </div>
        <div>
          <p className="font-sans font-semibold text-crema text-xs tracking-wide">{r.nombre}</p>
          <p className="font-sans text-[0.58rem] text-crema/40 tracking-widest uppercase">{r.curso}</p>
        </div>
      </div>
    </div>
  );
}

const lista = [...reseñas, ...reseñas, ...reseñas];

export default function ReseñasScroll() {
  return (
    <section className="bg-morado-dark py-14 overflow-hidden relative">
      {/* Fade izquierda */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #1e0a3c, transparent)" }}
      />
      {/* Fade derecha */}
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #1e0a3c, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 mb-8">
        <span className="font-sans text-[0.58rem] text-crema/30 tracking-[0.4em] uppercase">
          Lo que dicen nuestras alumnas
        </span>
      </div>

      <div className="flex gap-4" style={{ animation: "scrollLeft 90s linear infinite" }}>
        {lista.map((r, i) => (
          <ReseñaCard key={i} r={r} />
        ))}
      </div>

      <style>{`
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
