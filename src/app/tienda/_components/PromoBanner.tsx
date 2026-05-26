const promos = [
  { icon: "✦", text: "Envío gratis en compras mayores a $80" },
  { icon: "◆", text: "Usá REINA10 para 10% off en tu primera compra" },
  { icon: "✦", text: "Retiro en Córdoba disponible sin costo" },
];

export default function PromoBanner() {
  return (
    <div className="bg-morado-dark border-b-2 border-dorado/30 py-3.5 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
        {promos.map((promo, i) => (
          <div key={i} className="flex items-center">
            <div className="flex items-center gap-2.5">
              <span className="text-dorado text-[0.6rem]">{promo.icon}</span>
              <span className="font-sans text-[0.68rem] text-crema/80 tracking-widest uppercase whitespace-nowrap">
                {promo.text}
              </span>
            </div>
            {i < promos.length - 1 && (
              <span className="hidden sm:block mx-6 text-crema/15 select-none">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
