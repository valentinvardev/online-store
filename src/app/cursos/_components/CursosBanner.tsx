const items = [
  { icon: "✦", text: "Acceso de por vida en todos los cursos" },
  { icon: "◆", text: "Nuevas cohortes que arrancan cada mes" },
  { icon: "✦", text: "Certificado de finalización incluido" },
];

export default function CursosBanner() {
  return (
    <div className="bg-morado border-b-2 border-morado-dark/40 py-3.5 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
        {items.map((item, i) => (
          <div key={i} className="flex items-center">
            <div className="flex items-center gap-2.5">
              <span className="text-dorado text-[0.6rem]">{item.icon}</span>
              <span className="font-sans text-[0.68rem] text-crema/75 tracking-widest uppercase whitespace-nowrap">
                {item.text}
              </span>
            </div>
            {i < items.length - 1 && (
              <span className="hidden sm:block mx-6 text-crema/15 select-none">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
