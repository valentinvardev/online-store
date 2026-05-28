export type Nivel = "Principiante" | "Intermedio" | "Todos los niveles";
export type Badge = "Nuevo" | "Más vendido" | "Últimos lugares";

export interface Modulo {
  title: string;
  lessons: string[];
}

export interface Curso {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  level: Nivel;
  duration: string;
  lessons: string;
  students: string;
  price: string;
  priceOld?: string;
  badge?: Badge;
  desc: string;
  descLong: string;
  includes: string[];
  videoId?: string;
  modules: Modulo[];
  imageUrl?: string;
}

export const cursos: Curso[] = [
  {
    id: 1,
    slug: "tarot-desde-cero",
    title: "Tarot desde Cero",
    subtitle: "Leé tu propio código sagrado",
    level: "Principiante",
    duration: "8 semanas",
    lessons: "24 clases",
    students: "+340 alumnas",
    price: "$89",
    badge: "Más vendido",
    desc: "Aprendé a leer el tarot con profundidad y claridad. Sin memorizar, sin rigidez. Desde la intuición y la práctica viva.",
    descLong: "Este curso es un viaje de autoconocimiento a través del lenguaje simbólico del tarot. No vas a memorizar significados de un libro — vas a aprender a leer desde tu propia intuición, con una metodología que integra simbolismo, psicología y espiritualidad práctica. Cada clase está diseñada para que puedas aplicar lo aprendido de inmediato, ya sea para vos misma o para otros.",
    includes: ["24 clases en video", "Guía de cartas descargable", "Comunidad privada"],
    videoId: "76979871",
    modules: [
      {
        title: "Módulo 1 — El universo del Tarot",
        lessons: ["¿Qué es el Tarot y cómo funciona?", "Historia y origen del mazo", "Los 78 arcanos: estructura general", "Cómo elegir tu primer mazo"],
      },
      {
        title: "Módulo 2 — Arcanos Mayores",
        lessons: ["El Loco y el inicio del viaje", "La Sacerdotisa y la intuición", "El Carro: acción y voluntad", "La Rueda de la Fortuna: ciclos", "El Mundo: integración y cierre"],
      },
      {
        title: "Módulo 3 — Arcanos Menores",
        lessons: ["Los cuatro palos: fuego, agua, aire y tierra", "Los ases y el potencial puro", "Las figuras de la corte", "Numerología aplicada al tarot"],
      },
      {
        title: "Módulo 4 — Tiradas y lecturas",
        lessons: ["Tirada de tres cartas", "Tirada de la Cruz Celta", "Cómo formular buenas preguntas", "Ética en la lectura para otros", "Tu primera lectura completa"],
      },
    ],
  },
  {
    id: 2,
    slug: "rituales-lunares",
    title: "Rituales Lunares",
    subtitle: "Vivir en sintonía con los ciclos",
    level: "Todos los niveles",
    duration: "4 semanas",
    lessons: "12 clases",
    students: "+210 alumnas",
    price: "$59",
    desc: "Diseñá rituales personales para cada fase lunar: limpiezas energéticas, intenciones, gratitud y liberación.",
    descLong: "La luna es el reloj más antiguo de la humanidad. En este curso aprendés a vivir en sintonía con sus fases: a plantar intenciones en luna nueva, a accionar en cuarto creciente, a celebrar en luna llena y a soltar en cuarto menguante. Rituales simples, poderosos y adaptables a tu vida cotidiana.",
    includes: ["12 clases en video", "Calendario lunar 2025", "Rituales en PDF"],
    videoId: "76979871",
    modules: [
      {
        title: "Módulo 1 — La Luna y sus ciclos",
        lessons: ["Por qué la luna nos afecta", "Las cuatro fases principales", "Cómo armar tu altar lunar", "Materiales básicos para rituales"],
      },
      {
        title: "Módulo 2 — Luna Nueva y Creciente",
        lessons: ["Ritual de intenciones en luna nueva", "Escribir cartas al universo", "Acción y momentum en cuarto creciente", "Cristales para el crecimiento"],
      },
      {
        title: "Módulo 3 — Luna Llena y Menguante",
        lessons: ["Ceremonia de luna llena", "Gratitud y celebración", "El arte de soltar en cuarto menguante", "Ritual de cierre de ciclo"],
      },
    ],
  },
  {
    id: 3,
    slug: "astrologia-practica",
    title: "Astrología Práctica",
    subtitle: "Tu carta natal como mapa de vida",
    level: "Intermedio",
    duration: "6 semanas",
    lessons: "18 clases",
    students: "+175 alumnas",
    price: "$75",
    desc: "Interpretá tu carta natal, tus tránsitos y cómo usar la astrología como herramienta cotidiana real.",
    descLong: "La astrología no es para predecir el futuro — es para entenderte mejor. En este curso aprendés a leer tu carta natal como un mapa de tu psicología, tus talentos y tus desafíos. Trabajamos con los planetas, signos, casas y aspectos de manera integrada, con casos prácticos y tu propia carta como material de trabajo.",
    includes: ["18 clases en video", "Lectura de tu carta natal", "Guía de tránsitos"],
    videoId: "76979871",
    modules: [
      {
        title: "Módulo 1 — Fundamentos astrológicos",
        lessons: ["Los 12 signos del zodiaco", "Los planetas y sus arquetipos", "Las 12 casas astrológicas", "Cómo leer una carta natal"],
      },
      {
        title: "Módulo 2 — Tu carta natal",
        lessons: ["El Sol: tu identidad central", "La Luna: tu mundo emocional", "El Ascendente: tu máscara social", "Mercurio, Venus y Marte personales"],
      },
      {
        title: "Módulo 3 — Tránsitos y ciclos",
        lessons: ["Qué son los tránsitos", "Saturno: el gran maestro", "Júpiter: el año de expansión", "Eclipses: portales de cambio", "Retrogradación de Mercurio: cómo trabajarla"],
      },
    ],
  },
  {
    id: 4,
    slug: "meditacion-y-presencia",
    title: "Meditación y Presencia",
    subtitle: "Silenciar el ruido, escuchar el alma",
    level: "Principiante",
    duration: "3 semanas",
    lessons: "9 clases",
    students: "+90 alumnas",
    price: "$39",
    badge: "Nuevo",
    desc: "Técnicas de meditación guiada para el día a día. Sin yoga ni espiritualidad de Instagram — real, concreta, tuya.",
    descLong: "Meditar no es vaciar la mente — es aprender a observarla. Este curso te da herramientas concretas para construir una práctica de meditación sostenible, incluso si tenés poco tiempo o la cabeza muy ocupada. Cada clase dura menos de 30 minutos y viene con una práctica guiada para hacer sola.",
    includes: ["9 clases en audio y video", "Meditaciones mp3", "Diario de práctica"],
    videoId: "76979871",
    modules: [
      {
        title: "Módulo 1 — Empezar",
        lessons: ["Por qué meditar (y por qué te cuesta)", "Tu primer minuto de silencio", "Respiración como ancla"],
      },
      {
        title: "Módulo 2 — Técnicas",
        lessons: ["Meditación de cuerpo completo", "Visualización guiada", "Meditación caminando", "Journaling como práctica contemplativa"],
      },
      {
        title: "Módulo 3 — Sostener la práctica",
        lessons: ["Crear un ritual diario", "Qué hacer cuando no tenés ganas", "Meditación en movimiento"],
      },
    ],
  },
  {
    id: 5,
    slug: "tarot-avanzado",
    title: "Tarot Avanzado",
    subtitle: "Las capas ocultas del mazo",
    level: "Intermedio",
    duration: "6 semanas",
    lessons: "18 clases",
    students: "+120 alumnas",
    price: "$95",
    priceOld: "$110",
    desc: "Tiradas complejas, arcanos mayores en profundidad, numerología aplicada y lecturas para otros con ética.",
    descLong: "Para quienes ya conocen el tarot y quieren ir más profundo. En este curso exploramos las capas simbólicas ocultas de cada arcano, las correspondencias con kabbalah y numerología, tiradas complejas para situaciones específicas y la ética profesional en lecturas para otros.",
    includes: ["18 clases en video", "Spreads exclusivos", "Sesión grupal en vivo"],
    videoId: "76979871",
    modules: [
      {
        title: "Módulo 1 — Profundidad simbólica",
        lessons: ["Simbolismo esotérico en el Rider-Waite", "Correspondencias kabalísticas", "Numerología en los arcanos mayores"],
      },
      {
        title: "Módulo 2 — Lecturas complejas",
        lessons: ["Tirada de la herradura", "El árbol de la vida en tarot", "Lecturas de año completo", "Tiradas relacionales"],
      },
      {
        title: "Módulo 3 — Lectura profesional",
        lessons: ["Ética y límites del lector", "Cómo estructurar una sesión paga", "Preguntas difíciles: cómo responder", "Construir tu estilo propio"],
      },
    ],
  },
  {
    id: 6,
    slug: "chakras-mapa-interior",
    title: "Chakras: Mapa Interior",
    subtitle: "Energía, cuerpo y conciencia",
    level: "Todos los niveles",
    duration: "4 semanas",
    lessons: "12 clases",
    students: "+155 alumnas",
    price: "$65",
    desc: "Explorá cada centro energético con herramientas prácticas: movimiento, sonido, cristales y visualizaciones.",
    descLong: "Los chakras son mucho más que colores en una ilustración. Son centros de energía que se corresponden con áreas concretas de tu vida: tu seguridad, tu creatividad, tu poder personal, tu amor, tu expresión, tu intuición. En este curso aprendés a reconocerlos, a detectar bloqueos y a trabajarlos con herramientas reales.",
    includes: ["12 clases en video", "Mapa de chakras descargable", "Playlist de sonidos"],
    videoId: "76979871",
    modules: [
      {
        title: "Módulo 1 — Introducción al sistema chakra",
        lessons: ["Qué son los chakras y de dónde vienen", "Cómo detectar un chakra bloqueado", "Herramientas de trabajo energético"],
      },
      {
        title: "Módulo 2 — Los siete centros",
        lessons: ["Muladhara: raíz y seguridad", "Svadhisthana: placer y creatividad", "Manipura: poder y voluntad", "Anahata: amor y conexión", "Vishuddha: expresión y verdad", "Ajna: intuición y visión", "Sahasrara: conciencia y espíritu"],
      },
      {
        title: "Módulo 3 — Práctica integradora",
        lessons: ["Diagnóstico de tu sistema energético", "Ritual de alineación completa"],
      },
    ],
  },
  {
    id: 7,
    slug: "suenos-y-simbolismo",
    title: "Sueños y Simbolismo",
    subtitle: "Tu inconsciente te habla",
    level: "Principiante",
    duration: "3 semanas",
    lessons: "9 clases",
    students: "+65 alumnas",
    price: "$45",
    badge: "Nuevo",
    desc: "Aprendé a registrar, interpretar y trabajar simbólicamente con tus sueños como fuente de autoconocimiento.",
    descLong: "Los sueños son el idioma del inconsciente. En este curso aprendés a recordarlos, registrarlos y leerlos como mensajes simbólicos. No hay interpretaciones universales — hay un método para encontrar el tuyo propio, usando el simbolismo junguiano y técnicas de trabajo activo con imágenes oníricas.",
    includes: ["9 clases en video", "Diccionario de símbolos", "Diario de sueños PDF"],
    videoId: "76979871",
    modules: [
      {
        title: "Módulo 1 — El mundo onírico",
        lessons: ["Por qué soñamos", "Cómo recordar los sueños", "El diario de sueños: técnica y ritual"],
      },
      {
        title: "Módulo 2 — Lectura simbólica",
        lessons: ["Arquetipos junguianos en los sueños", "Los símbolos más comunes y sus lecturas", "Tu diccionario personal"],
      },
      {
        title: "Módulo 3 — Trabajo activo",
        lessons: ["Técnica de imaginación activa", "Integrar el mensaje del sueño", "Ritual de cierre onírico"],
      },
    ],
  },
  {
    id: 8,
    slug: "herbologia-y-rituales",
    title: "Herbología y Rituales",
    subtitle: "La magia que crece de la tierra",
    level: "Todos los niveles",
    duration: "5 semanas",
    lessons: "15 clases",
    students: "+88 alumnas",
    price: "$55",
    badge: "Últimos lugares",
    desc: "Plantas medicinales y rituales, sahumerios, baños energéticos, aceites y preparaciones con propósito.",
    descLong: "Las plantas son aliadas espirituales de la humanidad desde siempre. En este curso aprendés a trabajar con hierbas sagradas de manera segura, intencional y respetuosa. Preparás sahumerios propios, baños rituales, aceites y tisanas con propósito energético, conectando con la tierra a través de la práctica.",
    includes: ["15 clases en video", "Guía de plantas sagradas", "Recetario ritual"],
    videoId: "76979871",
    modules: [
      {
        title: "Módulo 1 — Las plantas y la magia",
        lessons: ["Historia de la herbología ritual", "Cómo conseguir y conservar tus hierbas", "El lenguaje de las plantas"],
      },
      {
        title: "Módulo 2 — Preparaciones",
        lessons: ["Sahumerios: mezclas y técnicas", "Baños rituales de limpieza", "Aceites esenciales e infusionados", "Tisanas con intención"],
      },
      {
        title: "Módulo 3 — Rituales con plantas",
        lessons: ["Ritual de protección con hierbas", "Ritual de abundancia", "Ritual de amor propio", "Recetario completo de temporada"],
      },
    ],
  },
  {
    id: 9,
    slug: "numerologia-esencial",
    title: "Numerología Esencial",
    subtitle: "Los números que te definen",
    level: "Principiante",
    duration: "3 semanas",
    lessons: "9 clases",
    students: "+50 alumnas",
    price: "$49",
    desc: "Calculá e interpretá tu número de vida, misión, alma y más. La numerología como espejo de tu propósito.",
    descLong: "Los números no mienten. La numerología es un sistema de autoconocimiento que usa la fecha de nacimiento y el nombre para revelar patrones, talentos y propósito de vida. En este curso aprendés a calcular e interpretar los números más importantes de tu carta numerológica y a usarlos en tu vida cotidiana.",
    includes: ["9 clases en video", "Calculadora numerológica", "Guía completa PDF"],
    videoId: "76979871",
    modules: [
      {
        title: "Módulo 1 — Los números sagrados",
        lessons: ["Historia y origen de la numerología", "Cómo calcular tus números", "El significado del 1 al 9"],
      },
      {
        title: "Módulo 2 — Tu carta numerológica",
        lessons: ["Número de vida: tu camino", "Número de destino: tu misión", "Número del alma: tu deseo profundo", "Número de personalidad"],
      },
      {
        title: "Módulo 3 — Aplicaciones prácticas",
        lessons: ["Años personales y ciclos", "Numerología en las decisiones", "Tu carta completa integrada"],
      },
    ],
  },
];
