# La Reina de Bastos — Project Brief

## Identidad de Marca

**Nombre:** La Reina de Bastos
**Referencia:** La Reina de Bastos es una carta del tarot (equivalente a la Queen of Wands en inglés).
Simboliza confianza, creatividad, pasión, conexión con la naturaleza y liderazgo espiritual.

**Esencia:** La marca mezcla la espiritualidad y la conexión con lo divino con el goce terrenal —
disfrutar un vino, bailar, escuchar música, vivir el cuerpo. No es espiritualidad ascética ni
rígida: es expansiva, sensorial, encarnada, festiva.

**Tono de voz:** Cálido, poético, directo. Habla como una amiga sabia que también sabe divertirse.
No solemne, no new-age cliché, no académico. Cercano, vibrante, auténtico.

---

## Estética Visual

### Paleta de Colores
- **Verde selva / hierba:** #3D7A47, #6BAE75 — naturaleza, crecimiento, tierra
- **Celeste cielo:** #7EC8E3, #B0E0F5 — expansión, espíritu, liviandad
- **Amarillo dorado / girasol:** #F5C842, #FFE066 — luz solar, abundancia, alegría
- **Naranja cálido / ámbar:** #E8845A, #FF9A5C — fuego, creatividad, sensualidad
- **Rosa psicodélico / fucsia:** #D45FA0, #F07DC0 — magia, feminidad, misterio
- **Morado / violeta:** #7B5EA7, #A882D8 — divinidad, intuición, profundidad
- **Crema / hueso:** #FBF5E6 — fondo cálido, papel, orgánico
- **Marrón tierra:** #8B5E3C — raíz, terrenalidad, enraizamiento

### Estilo Visual
- **Referencias:** Flower Power (años 60-70), psicodelia suave, arte bohemio, groovy
- **Elementos:** Florales geométricos, mandalas, ondas, hojas tropicales, soles, lunas, estrellas
- **Texturas:** Papel viejo, acuarela, lienzo, naturaleza orgánica
- **Tipografía:** Ver sección dedicada abajo
- **Fotografía:** Cálida, natural, analógica. Mujeres reales, naturaleza real, momentos cotidianos elevados

### Tipografía

| Rol | Estilo | Opciones recomendadas (Google Fonts) |
|---|---|---|
| **Títulos / Hero** | Sans-serif pesada, sofisticada, con carácter | `Big Shoulders Display`, `Bebas Neue`, `Anton SC`, `Familjen Grotesk` (Black) |
| **Subtítulos / Acento** | Serif ornamental o script — contraste elegante | `Playfair Display`, `Cormorant Garamond`, `DM Serif Display` |
| **Cuerpo / UI** | Sans-serif moderna, neutra, legible | `Inter`, `DM Sans`, `Outfit` |

**Principio de combinación:** Peso y carácter en los titulares — el grosor y la personalidad de
la sans pesada anclan la marca en lo terrenal y confiante. La serif delicada en subtítulos aporta
el toque místico/divino. El cuerpo neutro garantiza legibilidad.

**Fuente elegida para iterar:** `Big Shoulders Display` (display) + `Cormorant Garamond` (acento) + `DM Sans` (cuerpo).
Actualizar si el usuario elige otra durante el proceso.

### Lo que NO es
- No minimalismo frío ni tech-aesthetic
- No espiritualidad Instagram genérica (mucha luz blanca, sans-serif thin)
- No kitsch sobrecargado que pierda legibilidad
- No colores apagados ni paleta desaturada

---

## Producto / Oferta

### Tienda (E-commerce)
- Productos físicos o digitales relacionados con espiritualidad, bienestar, rituales
- Categorías por definir (cristales, cartas, herramientas rituales, etc.)

### Cursos
- Cursos online de espiritualidad, tarot, desarrollo personal, rituales
- Con sistema de acceso / membresía (a definir)

### Newsletter
- Formulario de suscripción en homepage
- Contenido: reflexiones, rituales, novedades, ofertas

---

## Páginas del Sitio

- `/` — Homepage: hero impactante, propuesta de valor, destacados de tienda y cursos, newsletter
- `/tienda` — Catálogo de productos
- `/cursos` — Catálogo de cursos
- `/sobre-mi` — Historia y persona detrás de la marca
- `/blog` o `/columnas` — Contenido editorial (opcional)

---

## Stack Técnico

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS 4
- **API:** tRPC 11
- **ORM:** Prisma 6 → PostgreSQL vía Supabase
- **Auth:** NextAuth 5
- **DB:** Supabase (pendiente de conectar — ver Fase 2 en roadmap)

---

## Estado del Proyecto

| Fase | Estado |
|---|---|
| Setup T3 Stack + Supabase config | ✅ Completo |
| Maqueta Frontend | 🔄 En curso |
| Conexión Supabase / DB | ⏳ Pendiente |
| Auth / Login | ⏳ Pendiente |
| E-commerce funcional | ⏳ Pendiente |
| Cursos / membresías | ⏳ Pendiente |

---

## Directrices para Claude

- Siempre mantener coherencia con la paleta y estética definida arriba
- Usar `/contexto` para recargar este brief en cualquier momento
- Cuando se agreguen features nuevas, actualizar la tabla de estado
- Preferir componentes reutilizables y con nombres semánticos de la marca
- No agregar dependencias sin justificarlo primero
