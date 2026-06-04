const items = [
  { icon: "✦", text: "Agenda abierta — solo 5 lugares por semana" },
  { icon: "◆", text: "Reserva con mínimo 48hs de anticipación" },
  { icon: "✦", text: "Sesiones por Zoom · Grabación incluida" },
];

export default function ServiciosBanner() {
  // Duplico el array para loop continuo sin saltos
  const loop = [...items, ...items];

  return (
    <div className="bg-rosa border-b-2 border-rosa-light/30 py-3.5 overflow-hidden">
      <div className="flex animate-marquee w-max">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <div className="flex items-center gap-2.5 px-8">
              <span className="text-crema/70 text-[0.8rem]">{item.icon}</span>
              <span className="font-sans text-[0.78rem] text-crema/85 tracking-widest uppercase whitespace-nowrap">
                {item.text}
              </span>
            </div>
            <span className="text-crema/25 select-none">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
