# Roadmap — Sistema de Reservas
## La Reina de Bastos

> Objetivo: que una clienta pueda reservar y pagar una sesión desde el sitio,
> recibir el link de Zoom automáticamente, y que Belén tenga todo centralizado en el admin.

---

## Prerequisito: Conectar Supabase

Antes de arrancar cualquier fase, la base de datos tiene que estar activa.

- [ ] Llenar `DATABASE_URL` y `DIRECT_URL` con las credenciales reales de Supabase
- [ ] Correr `npx prisma db push` para crear las tablas
- [ ] Verificar que el admin funciona con datos reales

---

## Fase 1 — Modelos de datos

**Nuevas tablas en Prisma:**

```
Booking        → reserva de una clienta
Availability   → configuración de días/horarios disponibles
BlockedDate    → fechas bloqueadas (feriados, vacaciones)
```

**Campos clave de Booking:**
- `serviceId` → qué servicio reservó
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

## Fase 2 — Admin: Configurar agenda

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

## Fase 3 — Flujo de reserva (cliente)

**Páginas:**

```
/servicios/[slug]          → detalle del servicio + botón "Reservar"
/servicios/[slug]/reservar → flujo de reserva
```

**Pasos del flujo:**

```
1. Elegir fecha  →  calendario con días disponibles resaltados
2. Elegir horario  →  grilla de turnos libres para ese día
3. Completar datos  →  nombre, email, mensaje opcional
4. Confirmar y pagar  →  resumen + botón de pago MP
```

**UX:**
- Los días sin disponibilidad aparecen deshabilitados
- Los turnos ya tomados aparecen como ocupados
- Resumen del servicio siempre visible (nombre, duración, precio)

---

## Fase 4 — Pago con MercadoPago

- [ ] Crear preferencia de pago al confirmar la reserva (`/api/mp/checkout`)
- [ ] Redirigir al checkout de MP
- [ ] Webhook `/api/mp/webhook` que recibe la confirmación del pago
- [ ] Al recibir pago OK → cambiar estado a PAID → disparar Fase 5 y 6

**Estados del pago:**
```
PENDING  →  reserva creada, esperando pago
PAID     →  pago confirmado por MP
CONFIRMED →  Zoom link generado, emails enviados
CANCELLED →  cancelada (por clienta o por Belén)
```

---

## Fase 5 — Notificaciones por email (Resend)

Al confirmar el pago se envían automáticamente:

- [ ] **Email a la clienta** — confirmación con: fecha, hora, servicio, link de Zoom, instrucciones
- [ ] **Email a Belén** — aviso de nueva reserva con datos de la clienta
- [ ] **Recordatorio 24h antes** — cron job que envía recordatorio a ambas

**Plantillas:**
- Diseño con la identidad visual de la marca (crema, morado, tipografía)
- Incluye nombre de Belén como remitente ("La Reina de Bastos")

---

## Fase 6 — Integración Zoom

- [ ] Credenciales de Zoom en `/admin/configuracion` (Account ID, Client ID, Client Secret)
- [ ] Al confirmarse el pago → `POST /v2/users/me/meetings` → guardar `join_url` en la reserva
- [ ] Link de Zoom incluido en el email de confirmación
- [ ] Link visible también en el panel de la clienta

---

## Fase 7 — Admin: Gestión de reservas

**Página: `/admin/reservas`**

- [ ] Lista de todas las reservas con filtros (estado, fecha, servicio)
- [ ] Vista de detalle por reserva
- [ ] Confirmar / cancelar manualmente
- [ ] Ver/copiar link de Zoom
- [ ] Notas internas (solo visibles para Belén)
- [ ] Botón para reprogramar (cambia fecha/hora, reenvía email)

**Vista de calendario:**
- [ ] Semana/mes con reservas marcadas
- [ ] Click en turno → detalle de la reserva

---

## Fase 8 — Panel de la clienta

**Página: `/mi-cuenta/reservas`** (requiere login)

- [ ] Ver reservas activas con link de Zoom
- [ ] Historial de sesiones pasadas
- [ ] Cancelar (si faltan más de X horas)
- [ ] Solicitar reprogramación

---

## Orden de implementación sugerido

| # | Qué | Depende de |
|---|-----|-----------|
| 0 | Conectar Supabase | — |
| 1 | Modelos DB (Booking, Availability) | Supabase |
| 2 | Admin: configurar agenda | Modelos |
| 3 | Página detalle servicio + calendario de reserva | Modelos |
| 4 | Checkout MP + webhook | Modelos + MP |
| 5 | Emails de confirmación (Resend) | Pago confirmado |
| 6 | Zoom automático | Pago confirmado |
| 7 | Admin: gestión de reservas | Todo lo anterior |
| 8 | Panel de la clienta | Auth + reservas |

---

## Stack técnico

| Herramienta | Uso |
|---|---|
| Prisma + Supabase | Base de datos |
| tRPC | API interna |
| MercadoPago Checkout Pro | Pagos |
| Resend | Emails transaccionales |
| Zoom Server-to-Server OAuth | Links de reunión |
| NextAuth | Sesión de la clienta |
| Vercel Cron | Recordatorios 24h antes |
