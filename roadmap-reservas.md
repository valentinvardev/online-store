# Roadmap — Sistema de Reservas + Panel de Clienta
## La Reina de Bastos

> Objetivo: que una clienta pueda registrarse, reservar y pagar una sesión desde el sitio,
> recibir el link de Zoom automáticamente, y gestionar todo desde su panel personal.

---

## Prerequisito: Conectar Supabase

Antes de arrancar cualquier fase, la base de datos tiene que estar activa.

- [ ] Llenar `DATABASE_URL` y `DIRECT_URL` con las credenciales reales de Supabase
- [ ] Correr `npx prisma db push` para crear las tablas
- [ ] Verificar que el admin funciona con datos reales

---

## Fase 1 — Autenticación de clientas

> NextAuth ya está configurado en el proyecto — solo hay que activar los proveedores
> y construir la UI de login/registro orientada a clientas (distinta al login de admin).

**Opciones de ingreso (las tres pueden coexistir):**

| Método | Experiencia | Requiere |
|---|---|---|
| **Magic link por email** | La clienta ingresa su email → recibe un link → entra directo, sin contraseña | `AUTH_RESEND_KEY` en `.env` |
| **Google** | Un click con su cuenta de Google | `AUTH_GOOGLE_ID` + `AUTH_GOOGLE_SECRET` |
| **Email + contraseña** | Clásico registro/login con clave propia | Proveedor Credentials en NextAuth + tabla User con password |

**Recomendación:** arrancar con **magic link + Google**. Son más seguros, no requieren
gestionar contraseñas, y la experiencia es más simple para la usuaria.
El registro con contraseña se puede agregar después si hay demanda.

**Páginas:**
```
/login           → pantalla de ingreso (magic link + Google)
/login/verificar → "Revisá tu email, te enviamos un link"
/registro        → solo si se agrega email+contraseña más adelante
```

**Modelo User (ya existe en Prisma, completar con):**
- `name`, `email`, `image` (viene de NextAuth)
- `phone` → opcional, para recordatorios por WhatsApp a futuro
- `role` → CLIENT | ADMIN

---

## Fase 2 — Modelos de datos para reservas

**Nuevas tablas en Prisma:**

```
Booking        → reserva de una clienta
Availability   → configuración de días/horarios disponibles
BlockedDate    → fechas bloqueadas (feriados, vacaciones)
```

**Campos clave de Booking:**
- `serviceId` → qué servicio reservó
- `userId` → clienta registrada (si tiene cuenta) o null (reserva como invitada)
- `clientName`, `clientEmail`
- `date`, `time` → cuándo es la sesión
- `status` → PENDING / PAID / CONFIRMED / CANCELLED
- `zoomLink` → se llena después del pago
- `mpPaymentId` → referencia del pago en MercadoPago
- `notes` → comentario opcional de la clienta

**Campos clave de Availability:**
- `dayOfWeek` → 0–6 (domingo a sábado)
- `startTime`, `endTime` → ej. "10:00" a "18:00"
- `slotDuration` → duración de cada turno en minutos (viene del servicio)

---

## Fase 3 — Admin: Configurar agenda

**Página: `/admin/agenda`**

- Belén define en qué días y horarios atiende
- Puede bloquear fechas puntuales (feriados, vacaciones)
- Cada servicio usa su propio `duration` para calcular los turnos

**Funcionalidades:**
- [ ] Selector de días disponibles (ej: Lunes, Miércoles, Viernes)
- [ ] Rango horario por día (ej: 10:00 a 18:00)
- [ ] Bloquear fechas individuales con motivo
- [ ] Preview del calendario con los turnos generados

---

## Fase 4 — Flujo de reserva (cliente)

**Páginas:**

```
/servicios/[slug]          → detalle del servicio + botón "Reservar"
/servicios/[slug]/reservar → flujo de reserva (requiere estar logueada)
```

**Pasos del flujo:**

```
1. Elegir fecha    →  calendario con días disponibles resaltados
2. Elegir horario  →  grilla de turnos libres para ese día
3. Confirmar datos →  nombre, email (pre-cargados si está logueada), mensaje opcional
4. Pagar           →  resumen + botón de pago MercadoPago
```

**UX:**
- Si la clienta no está logueada, el botón "Reservar" lleva primero al login
- Los días sin disponibilidad aparecen deshabilitados en el calendario
- Los turnos ya tomados aparecen como ocupados
- Resumen del servicio siempre visible (nombre, duración, precio)

---

## Fase 5 — Pago con MercadoPago

- [ ] Crear preferencia de pago al confirmar la reserva (`/api/mp/checkout`)
- [ ] Redirigir al checkout de MP
- [ ] Webhook `/api/mp/webhook` que recibe la confirmación del pago
- [ ] Al recibir pago OK → cambiar estado a PAID → disparar Fases 6 y 7

**Estados de la reserva:**
```
PENDING    →  reserva creada, esperando pago
PAID       →  pago confirmado por MP
CONFIRMED  →  Zoom link generado, emails enviados
CANCELLED  →  cancelada (por clienta o por Belén)
RESCHEDULED → reprogramada
```

---

## Fase 6 — Notificaciones por email (Resend)

Al confirmar el pago se envían automáticamente:

- [ ] **Email a la clienta** — confirmación con: fecha, hora, servicio, link de Zoom, instrucciones
- [ ] **Email a Belén** — aviso de nueva reserva con datos de la clienta
- [ ] **Recordatorio 24h antes** — cron job que envía recordatorio a ambas

**Plantillas:**
- Diseño con la identidad visual de la marca (crema, morado, tipografía)
- Remitente: "La Reina de Bastos" vía Resend

---

## Fase 7 — Integración Zoom

- [ ] Credenciales Zoom en `/admin/configuracion` (Account ID, Client ID, Client Secret)
- [ ] Al confirmarse el pago → `POST /v2/users/me/meetings` → guardar `join_url` en la reserva
- [ ] Link de Zoom en el email de confirmación
- [ ] Link visible en el panel de la clienta

---

## Fase 8 — Admin: Gestión de reservas

**Página: `/admin/reservas`**

- [ ] Lista de todas las reservas con filtros (estado, fecha, servicio)
- [ ] Vista de detalle por reserva
- [ ] Confirmar / cancelar / reprogramar manualmente
- [ ] Ver y copiar link de Zoom
- [ ] Notas internas (solo visibles para Belén)

**Vista de calendario:**
- [ ] Vista semanal/mensual con reservas marcadas por color de estado
- [ ] Click en turno → detalle de la reserva

---

## Fase 9 — Panel de la clienta

**Sección: `/mi-cuenta`** (requiere login)

### `/mi-cuenta` — Inicio
- Saludo personalizado con nombre
- Resumen rápido: próxima sesión, cursos activos, órdenes recientes

### `/mi-cuenta/reservas` — Mis sesiones
- [ ] Próximas reservas con link de Zoom visible
- [ ] Historial de sesiones pasadas
- [ ] Cancelar reserva (si faltan más de 24h)
- [ ] Solicitar reprogramación (formulario → aviso a Belén)
- [ ] Badge de estado por reserva (Confirmada / Pendiente de pago / Cancelada)

### `/mi-cuenta/cursos` — Mis cursos
- [ ] Cursos a los que está inscripta
- [ ] Acceso al material de cada curso
- [ ] Progreso (si se implementa sistema de lecciones)

### `/mi-cuenta/compras` — Mis compras
- [ ] Historial de productos comprados
- [ ] Descargar productos digitales
- [ ] Estado de envío para productos físicos

### `/mi-cuenta/perfil` — Mi perfil
- [ ] Editar nombre y teléfono
- [ ] Cambiar foto (desde Google si inició con Google)
- [ ] Gestionar métodos de ingreso vinculados

---

## Orden de implementación sugerido

| # | Qué | Depende de |
|---|-----|-----------|
| 0 | Conectar Supabase | — |
| 1 | Auth clientas (magic link + Google) + páginas login | Supabase |
| 2 | Modelos DB (Booking, Availability) | Supabase |
| 3 | Panel de clienta — estructura + perfil | Auth |
| 4 | Admin: configurar agenda | Modelos |
| 5 | Flujo de reserva (fecha → horario → pago) | Auth + Modelos |
| 6 | Checkout MP + webhook | MP configurado |
| 7 | Emails de confirmación (Resend) | Pago confirmado |
| 8 | Zoom automático | Pago confirmado |
| 9 | Panel clienta — reservas, cursos, compras | Todo lo anterior |
| 10 | Admin: gestión de reservas + calendario | Reservas funcionando |

---

## Stack técnico

| Herramienta | Uso |
|---|---|
| Prisma + Supabase | Base de datos |
| NextAuth (Resend + Google) | Autenticación de clientas |
| tRPC | API interna |
| MercadoPago Checkout Pro | Pagos |
| Resend | Emails transaccionales + magic links |
| Zoom Server-to-Server OAuth | Links de reunión automáticos |
| Vercel Cron | Recordatorios 24h antes |
