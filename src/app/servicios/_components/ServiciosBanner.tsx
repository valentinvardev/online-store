const items = [
  { icon: "✦", text: "Agenda abierta — solo 5 lugares por semana" },
  { icon: "◆", text: "Reserva con mínimo 48hs de anticipación" },
  { icon: "✦", text: "Sesiones por Zoom · Grabación incluida" },
];

export default function ServiciosBanner() {
  return (
    <div className="bg-rosa border-b-2 border-rosa-light/30 py-3.5 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
        {items.map((item, i) => (
          <div key={i} className="flex items-center">
            <div className="flex items-center gap-2.5">
              <span className="text-crema/60 text-[0.6rem]">{item.icon}</span>
              <span className="font-sans text-[0.68rem] text-crema/85 tracking-widest uppercase whitespace-nowrap">
                {item.text}
              </span>
            </div>
            {i < items.length - 1 && (
              <span className="hidden sm:block mx-6 text-crema/20 select-none">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
