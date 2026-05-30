const promos = [
  { icon: "✦", text: "Envío gratis en compras mayores a $80" },
  { icon: "◆", text: "Usá REINA10 para 10% off en tu primera compra" },
  { icon: "✦", text: "Retiro en Córdoba disponible sin costo" },
];

export default function PromoBanner() {
  // Duplico el array para loop continuo sin saltos
  const loop = [...promos, ...promos];

  return (
    <div className="bg-morado-dark border-b-2 border-dorado/30 py-3.5 overflow-hidden">
      <div className="flex animate-marquee w-max">
        {loop.map((promo, i) => (
          <div key={i} className="flex items-center shrink-0">
            <div className="flex items-center gap-2.5 px-8">
              <span className="text-dorado text-[0.6rem]">{promo.icon}</span>
              <span className="font-sans text-[0.68rem] text-crema/80 tracking-widest uppercase whitespace-nowrap">
                {promo.text}
              </span>
            </div>
            <span className="text-crema/15 select-none">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
