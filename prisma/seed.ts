/* Seed inicial — vuelca los mocks (productos, cursos, servicios) a la DB.
 * Idempotente: usa upsert por slug, así se puede correr varias veces sin duplicar. */

import { PrismaClient, ProductType } from "../generated/prisma";
import { productos } from "../src/app/tienda/_data/productos";
import { cursos } from "../src/app/cursos/_data/cursos";

const prisma = new PrismaClient();

// Helper: extrae el primer número de un string tipo "$45" / "desde $80" / "$100"
const priceToNumber = (s: string): number => {
  const m = s.match(/(\d+(?:\.\d+)?)/);
  return m && m[1] ? parseFloat(m[1]) : 0;
};

const categoryToType = (c: string): ProductType => {
  switch (c) {
    case "Físico":
      return ProductType.FISICO;
    case "Digital":
      return ProductType.DIGITAL;
    case "Personalizado":
      return ProductType.PERSONALIZADO;
    default:
      return ProductType.FISICO;
  }
};

// Servicios — el mock vive dentro del componente, lo duplico acá para no
// hacer un parse complicado. Si el catálogo crece, se mueve a _data/servicios.ts.
const servicios = [
  {
    slug: "tarot",
    numero: "01",
    title: "Lectura de Tarot",
    subtitle: "Para lo que estás viviendo ahora",
    desc: "Una hora de lectura personalizada donde las cartas hablan directo a lo que necesitás ver. Sin vaguedades, sin evasivas — claridad real para tu momento actual.",
    precio: "desde $45",
    precioNum: 45,
    badge: "La más solicitada",
    durationMin: 60,
    durationLabel: "60 minutos",
    format: "Zoom en vivo",
    accentColor: "text-morado",
    bgColor: "bg-dorado-light",
    coverGradient: "from-morado-dark via-morado-mid to-morado",
    contenido: [
      "Sesión en vivo por Zoom",
      "Grabación completa incluida",
      "Resumen escrito post-sesión",
      "Tiempo para tus preguntas",
    ],
  },
  {
    slug: "lectura-extendida",
    numero: "02",
    title: "Lectura Extendida",
    subtitle: "Con más profundidad y tiempo",
    desc: "90 minutos para ir a fondo. Ideal si tenés múltiples áreas que trabajar o querés una lectura de carta astral integrada con el tarot.",
    precio: "desde $70",
    precioNum: 70,
    durationMin: 90,
    durationLabel: "90 minutos",
    format: "Zoom en vivo",
    accentColor: "text-celeste",
    bgColor: "bg-dorado-light",
    coverGradient: "from-[#0f2744] via-[#1a3a6b] to-celeste",
    contenido: [
      "Sesión extendida por Zoom",
      "Grabación completa incluida",
      "Informe PDF detallado",
      "Opcional: integración astrológica",
    ],
  },
  {
    slug: "ritual",
    numero: "03",
    title: "Ritual Personalizado",
    subtitle: "Diseñado solo para vos",
    desc: "Creo un ritual específico para lo que estás atravesando: para soltar, para atraer, para sanar. Cada elemento tiene sentido. Cada paso tiene intención.",
    precio: "desde $65",
    precioNum: 65,
    durationMin: 60,
    durationLabel: "Proceso de 7 días",
    format: "Asincrónico",
    accentColor: "text-rosa",
    bgColor: "bg-dorado-light",
    coverGradient: "from-[#6b0f3a] via-rosa to-[#ff9a5c]",
    contenido: [
      "Cuestionario de intención previo",
      "Guía escrita paso a paso",
      "Lista de elementos y dónde conseguirlos",
      "Seguimiento durante 7 días",
    ],
  },
  {
    slug: "astrologia",
    numero: "04",
    title: "Consulta Astrológica",
    subtitle: "Tu carta natal como mapa de vida",
    desc: "Analizamos tu carta natal completa: motivaciones profundas, dones naturales, desafíos kármicos y tránsitos actuales. Para tomar decisiones con claridad.",
    precio: "desde $80",
    precioNum: 80,
    durationMin: 60,
    durationLabel: "60 min + informe",
    format: "Zoom en vivo",
    accentColor: "text-tierra",
    bgColor: "bg-dorado-light",
    coverGradient: "from-[#0a0015] via-morado-dark to-morado-mid",
    contenido: [
      "Análisis completo de carta natal",
      "Sesión en vivo por Zoom",
      "Informe PDF para releer",
      "Tránsitos del año en curso",
    ],
  },
  {
    slug: "bundle",
    numero: "05",
    title: "Bundle: Tarot + Ritual",
    subtitle: "La combinación más completa",
    desc: "Primero leemos las cartas para entender dónde estás. Después diseñamos el ritual para moverte hacia donde querés ir. El proceso completo.",
    precio: "$100",
    precioNum: 100,
    badge: "Ahorrás $10",
    durationMin: 60,
    durationLabel: "60 min + 7 días",
    format: "Zoom + guía escrita",
    accentColor: "text-dorado",
    bgColor: "bg-dorado-light",
    coverGradient: "from-tierra-dark via-[#6b2d00] to-dorado",
    contenido: [
      "Lectura de tarot 60 minutos",
      "Ritual personalizado post-lectura",
      "Grabación + guía + seguimiento",
      "Descuento respecto a contratarlos por separado",
    ],
  },
  {
    slug: "cierre",
    numero: "06",
    title: "Sesión de Cierre",
    subtitle: "Para terminar un ciclo con conciencia",
    desc: "Al final de un año, una relación, una etapa. Hacemos un repaso simbólico, ritual de cierre y apertura intencional al siguiente ciclo.",
    precio: "desde $55",
    precioNum: 55,
    durationMin: 75,
    durationLabel: "75 minutos",
    format: "Zoom en vivo",
    accentColor: "text-morado-light",
    bgColor: "bg-dorado-light",
    coverGradient: "from-morado-dark via-[#3b0764] to-rosa",
    contenido: [
      "Sesión de integración y cierre",
      "Ritual simbólico guiado",
      "Carta de intención para el nuevo ciclo",
      "Grabación incluida",
    ],
  },
];

async function seedProducts() {
  console.log("\n→ Productos...");
  for (const p of productos) {
    const data = {
      name: p.name,
      description: p.desc,
      descLong: p.descLong,
      price: p.priceNum,
      priceOld: p.priceOld ? priceToNumber(p.priceOld) : null,
      type: categoryToType(p.category),
      badge: p.badge ?? null,
      imageUrl: p.imageUrl ?? null,
      images: [],
      features: p.features,
      details: p.details as object[],
      gradient: p.gradient,
      active: true,
    };
    await prisma.product.upsert({
      where: { slug: p.slug },
      create: { slug: p.slug, ...data },
      update: data,
    });
    console.log(`  ✓ ${p.name}`);
  }
}

async function seedCourses() {
  console.log("\n→ Cursos...");
  for (const c of cursos) {
    const data = {
      name: c.title,
      subtitle: c.subtitle,
      description: c.desc,
      descLong: c.descLong,
      price: priceToNumber(c.price),
      priceOld: c.priceOld ? priceToNumber(c.priceOld) : null,
      badge: c.badge ?? null,
      level: c.level,
      duration: c.duration,
      lessonsLabel: c.lessons,
      studentsLabel: c.students,
      includes: c.includes,
      videoUrl: c.videoId ? `https://player.vimeo.com/video/${c.videoId}` : null,
      imageUrl: c.imageUrl ?? null,
      images: [],
      active: true,
    };

    const course = await prisma.course.upsert({
      where: { slug: c.slug },
      create: { slug: c.slug, ...data },
      update: data,
      include: { modules: { include: { lessons: true } } },
    });

    // Reemplaza módulos y lecciones por completo en cada seed.
    // Idempotente: borra y recrea desde cero.
    await prisma.courseModule.deleteMany({ where: { courseId: course.id } });
    for (let mi = 0; mi < c.modules.length; mi++) {
      const m = c.modules[mi];
      if (!m) continue;
      await prisma.courseModule.create({
        data: {
          courseId: course.id,
          title: m.title,
          order: mi,
          attachments: [],
          lessons: {
            create: m.lessons.map((title, li) => ({
              title,
              order: li,
              attachments: [],
              freePreview: li === 0 && mi === 0,
            })),
          },
        },
      });
    }
    console.log(`  ✓ ${c.title} (${c.modules.length} módulos)`);
  }
}

async function seedServices() {
  console.log("\n→ Servicios...");
  for (const s of servicios) {
    const data = {
      name: s.title,
      subtitle: s.subtitle,
      description: s.desc,
      price: s.precioNum,
      priceLabel: s.precio,
      badge: s.badge ?? null,
      duration: s.durationMin,
      durationLabel: s.durationLabel,
      format: s.format,
      numero: s.numero,
      contenido: s.contenido,
      accentColor: s.accentColor,
      bgColor: s.bgColor,
      coverGradient: s.coverGradient,
      imageUrl: null,
      images: [],
      attachments: [],
      active: true,
    };
    await prisma.service.upsert({
      where: { slug: s.slug },
      create: { slug: s.slug, ...data },
      update: data,
    });
    console.log(`  ✓ ${s.title}`);
  }
}

async function main() {
  console.log("🌱 Seed iniciado");
  await seedProducts();
  await seedCourses();
  await seedServices();
  console.log("\n✅ Seed completo\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
