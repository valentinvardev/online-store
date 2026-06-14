import {
  Html, Head, Preview, Body, Container, Section, Text, Heading,
  Button, Link, Img, Hr, Row, Column,
} from "@react-email/components";

/* ── Paleta de marca ── */
const C = {
  crema: "#FBF5E6",
  cremaDark: "#EFE6D2",
  moradoDark: "#3a1f5e",
  morado: "#7B5EA7",
  dorado: "#F5C842",
  rosa: "#D45FA0",
  verde: "#3D7A47",
  tierra: "#5a3d28",
  tierraSoft: "#8B5E3C",
};

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://online-store-seven-ashen.vercel.app";
const LOGO = `${SITE}/logo-rdb.png`;

const sansStack = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const serifStack = "Georgia, 'Times New Roman', serif";

/* ── Shell reutilizable ── */
function EmailLayout({ preview, children }: { preview: string; children: React.ReactNode }) {
  return (
    <Html lang="es">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: C.cremaDark, margin: 0, padding: "28px 0", fontFamily: sansStack }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", backgroundColor: C.crema, border: `2px solid ${C.moradoDark}` }}>
          {/* Strip superior */}
          <div style={{ height: 8, backgroundColor: C.moradoDark }} />

          {/* Header con logo */}
          <Section style={{ padding: "30px 0 16px", textAlign: "center" as const }}>
            <Img src={LOGO} alt="La Reina de Bastos" width="118" style={{ margin: "0 auto" }} />
            <Text style={{ margin: "14px 0 0", color: C.dorado, letterSpacing: 6, fontSize: 11 }}>✦ ✦ ✦</Text>
          </Section>

          {/* Contenido */}
          <Section style={{ padding: "8px 40px 36px" }}>{children}</Section>

          {/* Footer */}
          <Section style={{ borderTop: `2px solid ${C.morado}22`, padding: "20px 40px 30px", textAlign: "center" as const }}>
            <Text style={{ margin: 0, fontFamily: serifStack, fontStyle: "italic", color: C.tierraSoft, fontSize: 14 }}>
              La Reina de Bastos
            </Text>
            <Text style={{ margin: "6px 0 0", color: `${C.tierra}99`, fontSize: 11, lineHeight: "16px" }}>
              Magia para la vida cotidiana.<br />
              Recibís este correo porque tenés una cuenta o una reserva con nosotras.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

/* ── Piezas ── */
function H({ children }: { children: React.ReactNode }) {
  return (
    <Heading as="h1" style={{ fontFamily: serifStack, fontSize: 28, lineHeight: "32px", color: C.tierra, margin: "0 0 14px", fontWeight: 700 }}>
      {children}
    </Heading>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return <Text style={{ fontSize: 15, lineHeight: "24px", color: `${C.tierra}DD`, margin: "0 0 14px" }}>{children}</Text>;
}
function CTA({ href, children, color = C.moradoDark }: { href: string; children: React.ReactNode; color?: string }) {
  return (
    <Section style={{ textAlign: "center" as const, padding: "10px 0 6px" }}>
      <Button href={href} style={{ backgroundColor: color, color: C.crema, fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const, padding: "14px 30px", border: `2px solid ${C.moradoDark}` }}>
        {children}
      </Button>
    </Section>
  );
}
function DataBox({ rows }: { rows: [string, string][] }) {
  return (
    <Section style={{ backgroundColor: "#fff", border: `2px solid ${C.morado}22`, padding: "16px 18px", margin: "4px 0 18px" }}>
      {rows.map(([k, v], i) => (
        <Row key={i} style={{ marginBottom: i < rows.length - 1 ? 8 : 0 }}>
          <Column style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" as const, color: `${C.tierra}88`, width: 110, verticalAlign: "top" as const }}>{k}</Column>
          <Column style={{ fontSize: 14, color: C.tierra, fontWeight: 600 }}>{v}</Column>
        </Row>
      ))}
    </Section>
  );
}

/* ════════════ TEMPLATES ════════════ */

export function BookingReceivedEmail(p: {
  clientName?: string; service?: string; date?: string; format?: string; email?: string; phone?: string; notes?: string;
}) {
  const { clientName = "María González", service = "Lectura de Tarot", date = "Jue 19 jun · 18:00 hs", format = "Zoom en vivo", email = "maria@ejemplo.com", phone = "+54 9 11 2345 6789", notes = "Prefiero la tarde. ¡Gracias!" } = p;
  return (
    <EmailLayout preview={`Nueva reserva de ${clientName}`}>
      <Text style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: C.rosa, margin: "0 0 6px", fontWeight: 700 }}>Nueva reserva</Text>
      <H>Te reservaron una sesión ✦</H>
      <P><strong>{clientName}</strong> reservó <strong>{service}</strong>. Escribile para confirmar.</P>
      <DataBox rows={[["Sesión", service], ["Cuándo", date], ["Formato", format], ["Email", email], ["WhatsApp", phone], ["Notas", notes]]} />
      <CTA href={`${SITE}/admin/reservas`}>Ver en el panel</CTA>
    </EmailLayout>
  );
}

export function BookingConfirmationEmail(p: { clientName?: string; service?: string; date?: string }) {
  const { clientName = "María", service = "Lectura de Tarot", date = "Jueves 19 de junio, 18:00 hs" } = p;
  return (
    <EmailLayout preview="Recibimos tu reserva ✦">
      <H>Recibimos tu reserva</H>
      <P>Hola {clientName}, gracias por reservar tu <strong>{service}</strong>.</P>
      <DataBox rows={[["Sesión", service], ["Cuándo", date]]} />
      <P>Te escribimos en menos de 24 horas para confirmar el día y el horario, y pasarte el link. Cualquier cosa antes, respondé este correo.</P>
      <CTA href={`${SITE}/mi-cuenta`} color={C.morado}>Ver mi cuenta</CTA>
    </EmailLayout>
  );
}

export function WelcomeCircleEmail(p: { name?: string }) {
  const { name = "María" } = p;
  return (
    <EmailLayout preview="Bienvenida al Círculo ✦">
      <Text style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: C.morado, margin: "0 0 6px", fontWeight: 700 }}>Tu membresía está activa</Text>
      <H>Bienvenida al Círculo</H>
      <P>Qué alegría tenerte, {name}. Desde hoy tenés acceso a todo: rituales del mes, meditaciones, lecturas, los cursos completos y la comunidad.</P>
      <P>Entrá cuando quieras — el contenido nuevo va apareciendo en el feed, mes a mes.</P>
      <CTA href={`${SITE}/circulo`}>Entrar al Círculo</CTA>
      <Hr style={{ borderColor: `${C.morado}22`, margin: "22px 0 14px" }} />
      <Text style={{ fontSize: 12, color: `${C.tierra}99`, lineHeight: "18px", margin: 0 }}>
        Se renueva todos los meses. Podés cancelar cuando quieras desde tu cuenta, sin vueltas.
      </Text>
    </EmailLayout>
  );
}

export function OrderConfirmationEmail(p: { name?: string; items?: { name: string; price: number }[]; total?: number }) {
  const { name = "María", items = [{ name: "Tarot desde Cero", price: 89 }, { name: "Kit de Inicio Ritual", price: 45 }], total = 134 } = p;
  return (
    <EmailLayout preview="Tu compra está confirmada">
      <H>¡Gracias por tu compra!</H>
      <P>Hola {name}, confirmamos tu pedido. Acá está el detalle:</P>
      <Section style={{ backgroundColor: "#fff", border: `2px solid ${C.morado}22`, padding: "8px 18px", margin: "4px 0 18px" }}>
        {items.map((it, i) => (
          <Row key={i} style={{ borderBottom: i < items.length - 1 ? `1px solid ${C.morado}15` : "none" }}>
            <Column style={{ fontSize: 14, color: C.tierra, padding: "10px 0" }}>{it.name}</Column>
            <Column style={{ fontSize: 14, color: C.tierra, fontWeight: 700, textAlign: "right" as const, padding: "10px 0" }}>${it.price}</Column>
          </Row>
        ))}
        <Row>
          <Column style={{ fontSize: 13, letterSpacing: 1, textTransform: "uppercase" as const, color: `${C.tierra}88`, padding: "12px 0 4px" }}>Total</Column>
          <Column style={{ fontSize: 20, color: C.morado, fontWeight: 700, textAlign: "right" as const, padding: "12px 0 4px" }}>${total}</Column>
        </Row>
      </Section>
      <P>Lo digital ya está en tu cuenta. Si compraste algo físico, te avisamos cuando salga el envío.</P>
      <CTA href={`${SITE}/mi-cuenta`} color={C.morado}>Ver mi cuenta</CTA>
    </EmailLayout>
  );
}

export function NewPostEmail(p: { title?: string; excerpt?: string; slug?: string }) {
  const { title = "Ritual de Luna Nueva del mes", excerpt = "Un ritual completo para plantar intenciones en este ciclo.", slug = "ritual-de-luna-nueva-del-mes" } = p;
  return (
    <EmailLayout preview={`Nuevo en el Círculo: ${title}`}>
      <Text style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase" as const, color: C.dorado, margin: "0 0 6px", fontWeight: 700, backgroundColor: C.moradoDark, display: "inline-block", padding: "4px 10px" }}>Nuevo en el Círculo</Text>
      <H>{title}</H>
      <P>{excerpt}</P>
      <CTA href={`${SITE}/circulo/${slug}`}>Leer ahora</CTA>
    </EmailLayout>
  );
}

/* ── Registro: plantilla + su evento ── */
export type EmailEntry = {
  key: string;
  subject: string;
  event: string;       // cuándo se dispara
  to: string;          // destinatario
  accent: string;
  element: React.ReactElement;
};

export const emailRegistry: EmailEntry[] = [
  {
    key: "welcome-circle",
    subject: "Bienvenida al Círculo ✦",
    event: "Cuando alguien activa su membresía del Círculo",
    to: "La nueva socia",
    accent: C.morado,
    element: <WelcomeCircleEmail />,
  },
  {
    key: "new-post",
    subject: "Nuevo en el Círculo: {título}",
    event: "Cuando publicás un post nuevo en el Círculo",
    to: "Todas las socias",
    accent: C.dorado,
    element: <NewPostEmail />,
  },
  {
    key: "booking-confirmation",
    subject: "Recibimos tu reserva ✦",
    event: "Cuando una clienta reserva una sesión",
    to: "La clienta",
    accent: C.verde,
    element: <BookingConfirmationEmail />,
  },
  {
    key: "booking-received",
    subject: "Nueva reserva de {nombre}",
    event: "Cuando entra una reserva (aviso para vos)",
    to: "Belén (admin)",
    accent: C.rosa,
    element: <BookingReceivedEmail />,
  },
  {
    key: "order-confirmation",
    subject: "Tu compra está confirmada",
    event: "Cuando se completa una compra",
    to: "Quien compró",
    accent: C.dorado,
    element: <OrderConfirmationEmail />,
  },
];
