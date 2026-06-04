const items = [
  { icon: "✦", text: "Acceso de por vida en todos los cursos" },
  { icon: "◆", text: "Nuevas cohortes que arrancan cada mes" },
  { icon: "✦", text: "Certificado de finalización incluido" },
];

export default function CursosBanner() {
  const loop = [...items, ...items];

  return (
    <div className="bg-morado border-b-2 border-morado-dark/40 py-3.5 overflow-hidden">
      <div className="flex animate-marquee w-max">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <div className="flex items-center gap-2.5 px-8">
              <span className="text-dorado text-[0.8rem]">{item.icon}</span>
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
