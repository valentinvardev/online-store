type Servicio = {
  id: number;
  numero: string;
  title: string;
  subtitle: string;
  desc: string;
  precio: string;
  badge?: string;
  duration: string;
  format: string;
  contenido: string[];
  accentColor: string;
  bgColor: string;
  coverGradient: string;
  imageUrl?: string;
};

const servicios: Servicio[] = [
  {
    id: 1,
    numero: "01",
    title: "Lectura de Tarot",
    subtitle: "Para lo que estás viviendo ahora",
    desc: "Una hora de lectura personalizada donde las cartas hablan directo a lo que necesitás ver. Sin vaguedades, sin evasivas — claridad real para tu momento actual.",
    precio: "desde $45",
    badge: "La más solicitada",
    duration: "60 minutos",
    format: "Zoom en vivo",
    accentColor: "text-morado",
    bgColor: "bg-morado-pale",
    coverGradient: "from-morado-dark via-morado-mid to-morado",
    contenido: [
      "Sesión en vivo por Zoom",
      "Grabación completa incluida",
      "Resumen escrito post-sesión",
      "Tiempo para tus preguntas",
    ],
  },
  {
    id: 2,
    numero: "02",
    title: "Lectura Extendida",
    subtitle: "Con más profundidad y tiempo",
    desc: "90 minutos para ir a fondo. Ideal si tenés múltiples áreas que trabajar o querés una lectura de carta astral integrada con el tarot.",
    precio: "desde $70",
    duration: "90 minutos",
    format: "Zoom en vivo",
    accentColor: "text-celeste",
    bgColor: "bg-celeste-pale",
    coverGradient: "from-[#0f2744] via-[#1a3a6b] to-celeste",
    contenido: [
      "Sesión extendida por Zoom",
      "Grabación completa incluida",
      "Informe PDF detallado",
      "Opcional: integración astrológica",
    ],
  },
  {
    id: 3,
    numero: "03",
    title: "Ritual Personalizado",
    subtitle: "Diseñado solo para vos",
    desc: "Creo un ritual específico para lo que estás atravesando: para soltar, para atraer, para sanar. Cada elemento tiene sentido. Cada paso tiene intención.",
    precio: "desde $65",
    duration: "Proceso de 7 días",
    format: "Asincrónico",
    accentColor: "text-rosa",
    bgColor: "bg-rosa-pale",
    coverGradient: "from-[#6b0f3a] via-rosa to-[#ff9a5c]",
    contenido: [
      "Cuestionario de intención previo",
      "Guía escrita paso a paso",
      "Lista de elementos y dónde conseguirlos",
      "Seguimiento durante 7 días",
    ],
  },
  {
    id: 4,
    numero: "04",
    title: "Consulta Astrológica",
    subtitle: "Tu carta natal como mapa de vida",
    desc: "Analizamos tu carta natal completa: motivaciones profundas, dones naturales, desafíos kármicos y tránsitos actuales. Para tomar decisiones con claridad.",
    precio: "desde $80",
    duration: "60 min + informe",
    format: "Zoom en vivo",
    accentColor: "text-tierra",
    bgColor: "bg-dorado-pale",
    coverGradient: "from-[#0a0015] via-morado-dark to-morado-mid",
    contenido: [
      "Análisis completo de carta natal",
      "Sesión en vivo por Zoom",
      "Informe PDF para releer",
      "Tránsitos del año en curso",
    ],
  },
  {
    id: 5,
    numero: "05",
    title: "Bundle: Tarot + Ritual",
    subtitle: "La combinación más completa",
    desc: "Primero leemos las cartas para entender dónde estás. Después diseñamos el ritual para moverte hacia donde querés ir. El proceso completo.",
    precio: "$100",
    badge: "Ahorrás $10",
    duration: "60 min + 7 días",
    format: "Zoom + guía escrita",
    accentColor: "text-dorado",
    bgColor: "bg-crema-dark",
    coverGradient: "from-tierra-dark via-[#6b2d00] to-dorado",
    contenido: [
      "Lectura de tarot 60 minutos",
      "Ritual personalizado post-lectura",
      "Grabación + guía + seguimiento",
      "Descuento respecto a contratarlos por separado",
    ],
  },
  {
    id: 6,
    numero: "06",
    title: "Sesión de Cierre",
    subtitle: "Para terminar un ciclo con conciencia",
    desc: "Al final de un año, una relación, una etapa. Hacemos un repaso simbólico, ritual de cierre y apertura intencional al siguiente ciclo.",
    precio: "desde $55",
    duration: "75 minutos",
    format: "Zoom en vivo",
    accentColor: "text-morado-light",
    bgColor: "bg-morado-pale",
    coverGradient: "from-morado-dark via-[#3b0764] to-rosa",
    contenido: [
      "Sesión de integración y cierre",
      "Ritual simbólico guiado",
      "Carta de intención para el nuevo ciclo",
      "Grabación incluida",
    ],
  },
];

/* ── Ilustraciones SVG por sesión ── */
function TarotCover() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      {/* Carta izquierda */}
      <g transform="translate(110,100) rotate(-18)">
        <rect x="-28" y="-48" width="56" height="96" rx="0" fill="#2d1060" stroke="#f5c842" strokeWidth="1.2" opacity="0.7" />
        <rect x="-22" y="-42" width="44" height="84" rx="0" fill="none" stroke="#f5c842" strokeWidth="0.5" opacity="0.4" />
        <text x="0" y="6" textAnchor="middle" fill="#f5c842" fontSize="16" opacity="0.5" fontFamily="serif">☽</text>
      </g>
      {/* Carta derecha */}
      <g transform="translate(210,100) rotate(18)">
        <rect x="-28" y="-48" width="56" height="96" rx="0" fill="#2d1060" stroke="#f5c842" strokeWidth="1.2" opacity="0.7" />
        <rect x="-22" y="-42" width="44" height="84" rx="0" fill="none" stroke="#f5c842" strokeWidth="0.5" opacity="0.4" />
        <text x="0" y="6" textAnchor="middle" fill="#f5c842" fontSize="16" opacity="0.5" fontFamily="serif">☀</text>
      </g>
      {/* Carta central */}
      <g transform="translate(160,100)">
        <rect x="-30" y="-52" width="60" height="104" rx="0" fill="#4c1d95" stroke="#f5c842" strokeWidth="2" />
        <rect x="-24" y="-46" width="48" height="92" rx="0" fill="none" stroke="#f5c842" strokeWidth="0.8" opacity="0.6" />
        <line x1="-24" y1="-34" x2="24" y2="-34" stroke="#f5c842" strokeWidth="0.5" opacity="0.4" />
        <line x1="-24" y1="34" x2="24" y2="34" stroke="#f5c842" strokeWidth="0.5" opacity="0.4" />
        <text x="0" y="8" textAnchor="middle" fill="#f5c842" fontSize="22" opacity="0.95" fontFamily="serif">✦</text>
        <text x="0" y="-20" textAnchor="middle" fill="#f5c842" fontSize="5" opacity="0.7" letterSpacing="2.5">LA REINA</text>
        <text x="0" y="46" textAnchor="middle" fill="#f5c842" fontSize="5" opacity="0.7" letterSpacing="2">DE BASTOS</text>
        <ellipse cx="0" cy="0" rx="12" ry="18" fill="#8b5cf6" opacity="0">
          <animate attributeName="opacity" values="0;0.2;0" dur="3s" repeatCount="indefinite" />
        </ellipse>
      </g>
      {/* Estrellas */}
      {[[40,30],[280,40],[60,160],[270,155],[155,25],[155,175]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="#f5c842" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur={`${2+i*0.4}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

function LecturaExtendidaCover() {
  const cards = [-40, -20, 0, 20, 40];
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      {cards.map((rot, i) => (
        <g key={i} transform={`translate(${128 + i * 18},105) rotate(${rot * 0.55})`}>
          <rect x="-22" y="-44" width="44" height="88" rx="0"
            fill={i === 2 ? "#1a3a6b" : "#0f2744"} stroke="#7ec8e3"
            strokeWidth={i === 2 ? 1.5 : 0.8} opacity={0.5 + i * 0.08} />
          {i === 2 && (
            <>
              <text x="0" y="6" textAnchor="middle" fill="#7ec8e3" fontSize="18" opacity="0.8" fontFamily="serif">☽</text>
              <text x="0" y="-24" textAnchor="middle" fill="#7ec8e3" fontSize="4.5" opacity="0.6" letterSpacing="2">EXTENDIDA</text>
            </>
          )}
        </g>
      ))}
      {/* Estrellas dispersas */}
      {[[30,25],[290,35],[50,170],[275,165],[160,20],[160,178],[80,90],[240,90]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.2" fill="#7ec8e3" opacity="0.4">
          <animate attributeName="opacity" values="0.15;0.7;0.15" dur={`${1.8+i*0.35}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Luna grande de fondo */}
      <circle cx="50" cy="50" r="28" fill="none" stroke="#7ec8e3" strokeWidth="0.5" opacity="0.12" />
      <circle cx="50" cy="50" r="20" fill="#7ec8e3" opacity="0.06" />
    </svg>
  );
}

function RitualCover() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      {/* Vela */}
      <rect x="148" y="110" width="24" height="60" rx="0" fill="#fbf5e6" opacity="0.85" />
      <rect x="154" y="108" width="12" height="4" rx="0" fill="#e8845a" opacity="0.6" />
      {/* Llama */}
      <ellipse cx="160" cy="95" rx="8" ry="14" fill="#f5c842" opacity="0.9">
        <animate attributeName="ry" values="14;16;13;15;14" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="cx" values="160;161;159;160;160" dur="1.2s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="160" cy="97" rx="4" ry="9" fill="#fff" opacity="0.5">
        <animate attributeName="ry" values="9;11;8;10;9" dur="1.8s" repeatCount="indefinite" />
      </ellipse>
      {/* Brillo de llama */}
      <ellipse cx="160" cy="100" rx="30" ry="22" fill="#f5c842" opacity="0">
        <animate attributeName="opacity" values="0;0.08;0.04;0.1;0" dur="2s" repeatCount="indefinite" />
      </ellipse>
      {/* Plato */}
      <ellipse cx="160" cy="170" rx="32" ry="6" fill="#e8845a" opacity="0.4" />
      {/* Hierbas izquierda */}
      <g opacity="0.7">
        <line x1="100" y1="170" x2="100" y2="130" stroke="#6bae75" strokeWidth="1.5" />
        <ellipse cx="92" cy="140" rx="10" ry="6" fill="#6bae75" opacity="0.8" transform="rotate(-25 92 140)" />
        <ellipse cx="108" cy="145" rx="9" ry="5" fill="#3d7a47" opacity="0.7" transform="rotate(20 108 145)" />
        <ellipse cx="95" cy="128" rx="8" ry="5" fill="#6bae75" opacity="0.6" transform="rotate(-10 95 128)" />
      </g>
      {/* Hierbas derecha */}
      <g opacity="0.7">
        <line x1="220" y1="170" x2="220" y2="130" stroke="#6bae75" strokeWidth="1.5" />
        <ellipse cx="228" cy="140" rx="10" ry="6" fill="#6bae75" opacity="0.8" transform="rotate(25 228 140)" />
        <ellipse cx="212" cy="145" rx="9" ry="5" fill="#3d7a47" opacity="0.7" transform="rotate(-20 212 145)" />
        <ellipse cx="225" cy="128" rx="8" ry="5" fill="#6bae75" opacity="0.6" transform="rotate(10 225 128)" />
      </g>
      {/* Estrellas */}
      {[[50,40],[270,35],[40,130],[280,125],[160,25],[90,70],[230,70]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="#f5c842" opacity="0.45">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur={`${2+i*0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

function AstrologiaCover() {
  const zodiacSymbols = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      {/* Rueda exterior */}
      <circle cx="160" cy="100" r="80" fill="none" stroke="#f5c842" strokeWidth="0.8" opacity="0.25" />
      <circle cx="160" cy="100" r="65" fill="none" stroke="#f5c842" strokeWidth="0.5" opacity="0.15" />
      <circle cx="160" cy="100" r="45" fill="none" stroke="#8b5cf6" strokeWidth="0.8" opacity="0.3" />
      <circle cx="160" cy="100" r="25" fill="#4c1d95" opacity="0.5" />
      <circle cx="160" cy="100" r="25" fill="none" stroke="#f5c842" strokeWidth="1" opacity="0.4" />
      {/* Líneas de casa */}
      {Array.from({length:12}).map((_,i) => {
        const angle = (i * 30 - 90) * Math.PI / 180;
        return (
          <line key={i}
            x1={160 + 45 * Math.cos(angle)} y1={100 + 45 * Math.sin(angle)}
            x2={160 + 80 * Math.cos(angle)} y2={100 + 80 * Math.sin(angle)}
            stroke="#f5c842" strokeWidth="0.5" opacity="0.2" />
        );
      })}
      {/* Símbolos zodiacales */}
      {zodiacSymbols.map((sym, i) => {
        const angle = (i * 30 - 75) * Math.PI / 180;
        const x = 160 + 55 * Math.cos(angle);
        const y = 100 + 55 * Math.sin(angle) + 3;
        return (
          <text key={i} x={x} y={y} textAnchor="middle" fill="#f5c842" fontSize="7" opacity="0.5" fontFamily="serif">
            {sym}
          </text>
        );
      })}
      {/* Sol en el centro */}
      <text x="160" y="105" textAnchor="middle" fill="#f5c842" fontSize="16" opacity="0.9" fontFamily="serif">☉</text>
      {/* Planetas */}
      {[
        {angle: 45, r: 60, sym: "♀", color: "#f72585"},
        {angle: 150, r: 57, sym: "♂", color: "#e8845a"},
        {angle: 270, r: 62, sym: "♃", color: "#7ec8e3"},
      ].map((p, i) => {
        const rad = (p.angle - 90) * Math.PI / 180;
        return (
          <text key={i} x={160 + p.r * Math.cos(rad)} y={100 + p.r * Math.sin(rad) + 4}
            textAnchor="middle" fill={p.color} fontSize="8" opacity="0.8" fontFamily="serif">
            {p.sym}
          </text>
        );
      })}
      {/* Estrellas de fondo */}
      {[[20,20],[300,15],[25,180],[295,175],[160,10],[160,190]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.2" fill="#fff" opacity="0.3">
          <animate attributeName="opacity" values="0.1;0.5;0.1" dur={`${2.5+i*0.4}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

function BundleCover() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      {/* Dos cartas de tarot */}
      <g transform="translate(130,105) rotate(-12)">
        <rect x="-24" y="-46" width="48" height="92" rx="0" fill="#3b1a00" stroke="#f5c842" strokeWidth="1.2" opacity="0.8" />
        <text x="0" y="6" textAnchor="middle" fill="#f5c842" fontSize="18" opacity="0.6" fontFamily="serif">✦</text>
      </g>
      <g transform="translate(155,105) rotate(-3)">
        <rect x="-24" y="-46" width="48" height="92" rx="0" fill="#5a2800" stroke="#f5c842" strokeWidth="1.8" opacity="0.9" />
        <rect x="-18" y="-40" width="36" height="80" rx="0" fill="none" stroke="#f5c842" strokeWidth="0.6" opacity="0.5" />
        <text x="0" y="6" textAnchor="middle" fill="#f5c842" fontSize="20" opacity="0.9" fontFamily="serif">✦</text>
        <text x="0" y="-22" textAnchor="middle" fill="#f5c842" fontSize="4.5" opacity="0.7" letterSpacing="2">BUNDLE</text>
      </g>
      {/* Vela pequeña a la derecha */}
      <rect x="196" y="120" width="16" height="42" rx="0" fill="#fbf5e6" opacity="0.75" />
      <rect x="201" y="118" width="6" height="3" rx="0" fill="#c49a6c" opacity="0.6" />
      <ellipse cx="204" cy="110" rx="5" ry="9" fill="#f5c842" opacity="0.9">
        <animate attributeName="ry" values="9;11;8;10;9" dur="1.6s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="204" cy="112" rx="2.5" ry="5.5" fill="#fff" opacity="0.5" />
      {/* Estrellas */}
      {[[40,30],[270,25],[45,165],[275,160],[160,18],[85,80],[235,75]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.4" fill="#f5c842" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.9;0.2" dur={`${1.8+i*0.35}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

function CierreCover() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      {/* Espiral / mandala */}
      {[70, 55, 40, 26, 14].map((r, i) => (
        <circle key={i} cx="160" cy="100" r={r}
          fill="none" stroke={["#f72585","#8b5cf6","#f5c842","#7ec8e3","#f72585"][i]}
          strokeWidth="0.8" opacity={0.15 + i * 0.08}
          strokeDasharray={i % 2 === 0 ? "4 6" : "2 4"} />
      ))}
      {/* Pétalos de mandala */}
      {Array.from({length: 8}).map((_, i) => {
        const angle = (i * 45) * Math.PI / 180;
        const x = 160 + 50 * Math.cos(angle);
        const y = 100 + 50 * Math.sin(angle);
        return (
          <ellipse key={i} cx={x} cy={y} rx="10" ry="18"
            fill={["#f72585","#8b5cf6","#f5c842","#7ec8e3","#f72585","#8b5cf6","#f5c842","#7ec8e3"][i]}
            opacity="0.12"
            transform={`rotate(${i*45} ${x} ${y})`} />
        );
      })}
      {/* Símbolo central */}
      <text x="160" y="106" textAnchor="middle" fill="#f5c842" fontSize="22" opacity="0.85" fontFamily="serif">◯</text>
      <text x="160" y="104" textAnchor="middle" fill="#f5c842" fontSize="10" opacity="0.7" fontFamily="serif">✦</text>
      {/* Cruz de luz */}
      <line x1="160" y1="20" x2="160" y2="180" stroke="#f5c842" strokeWidth="0.4" opacity="0.08" />
      <line x1="80" y1="100" x2="240" y2="100" stroke="#f5c842" strokeWidth="0.4" opacity="0.08" />
      {/* Estrellas */}
      {[[30,30],[290,25],[30,165],[290,170],[160,15],[160,185],[60,55],[260,55],[60,145],[260,145]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.2" fill={i%2===0?"#f72585":"#8b5cf6"} opacity="0.35">
          <animate attributeName="opacity" values="0.1;0.6;0.1" dur={`${2+i*0.25}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

const coverIllustrations: Record<number, React.ReactNode> = {
  1: <TarotCover />,
  2: <LecturaExtendidaCover />,
  3: <RitualCover />,
  4: <AstrologiaCover />,
  5: <BundleCover />,
  6: <CierreCover />,
};

export default function ServiciosGrid() {
  return (
    <section className="bg-crema py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((s) => (
            <article
              key={s.id}
              className={`border-2 border-morado-dark ${s.bgColor} block-shadow flex flex-col overflow-hidden`}
            >
              {/* ── Portada ── */}
              <div className={`relative h-52 bg-gradient-to-br ${s.coverGradient} overflow-hidden shrink-0`}>
                {s.imageUrl ? (
                  <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" />
                ) : (
                  coverIllustrations[s.id]
                )}
                {/* Número flotante */}
                <div className="absolute bottom-3 right-4 font-display text-4xl text-white/10 leading-none select-none tracking-wide">
                  {s.numero}
                </div>
              </div>

              {/* ── Contenido ── */}
              <div className="p-7 flex flex-col flex-1">
                <h3 className="font-sans font-bold uppercase text-xl text-tierra-dark leading-tight tracking-wide">
                  {s.title}
                </h3>
                <p className="font-sans italic text-tierra/50 text-sm mt-1 mb-4">{s.subtitle}</p>

                <p className="font-sans text-tierra/60 text-sm leading-relaxed mb-5 tracking-wide flex-1">
                  {s.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="font-sans text-[0.62rem] bg-white/60 border border-morado/20 text-tierra px-3 py-1 tracking-wide">
                    {s.duration}
                  </span>
                  <span className="font-sans text-[0.62rem] bg-white/60 border border-morado/20 text-tierra px-3 py-1 tracking-wide">
                    {s.format}
                  </span>
                </div>

                {/* Incluye */}
                <ul className="space-y-2 mb-7 border-t border-morado/10 pt-5">
                  {s.contenido.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-sans text-[0.7rem] text-tierra/55 tracking-wide">
                      <span className={`${s.accentColor} text-[0.55rem] mt-[3px] shrink-0`}>✦</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Precio + CTA */}
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="font-display text-3xl text-tierra-dark tracking-wide">{s.precio}</span>
                    {s.badge && (
                      <span className="block font-sans text-[0.58rem] text-dorado tracking-widest uppercase mt-0.5">
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <a
                    href="#reservar"
                    className="bg-morado text-crema font-sans font-semibold text-[0.65rem] px-5 py-2.5 border-2 border-morado-dark hover:bg-morado-light transition-colors tracking-widest uppercase block-shadow-sm whitespace-nowrap"
                  >
                    Reservar
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
