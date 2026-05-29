"use client";

import { useState } from "react";
import {
  Calendar, Clock, Plus, Trash2, Save, Globe, Megaphone,
  Plane, Ban, Sliders,
} from "lucide-react";
import AdminHeader from "../_components/AdminHeader";
import { useToast } from "../_components/AdminToast";

// ── Tipos ─────────────────────────────────────────────────────────────────────
type TimeBlock = { id: string; start: string; end: string };
type DaySchedule = { enabled: boolean; blocks: TimeBlock[] };
type DayKey = "lun" | "mar" | "mie" | "jue" | "vie" | "sab" | "dom";
type Vacation = { id: string; from: string; to: string; message: string };
type Exception = { id: string; date: string; reason: string };

const dayNames: { key: DayKey; label: string }[] = [
  { key: "lun", label: "Lunes" },
  { key: "mar", label: "Martes" },
  { key: "mie", label: "Miércoles" },
  { key: "jue", label: "Jueves" },
  { key: "vie", label: "Viernes" },
  { key: "sab", label: "Sábado" },
  { key: "dom", label: "Domingo" },
];

const newId = (p: string) => `${p}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
const today = () => new Date().toISOString().split("T")[0]!;

const initialWeekly: Record<DayKey, DaySchedule> = {
  lun: { enabled: true, blocks: [{ id: "lun-1", start: "10:00", end: "13:00" }, { id: "lun-2", start: "14:00", end: "18:00" }] },
  mar: { enabled: true, blocks: [{ id: "mar-1", start: "10:00", end: "13:00" }, { id: "mar-2", start: "14:00", end: "18:00" }] },
  mie: { enabled: true, blocks: [{ id: "mie-1", start: "10:00", end: "13:00" }, { id: "mie-2", start: "14:00", end: "18:00" }] },
  jue: { enabled: true, blocks: [{ id: "jue-1", start: "10:00", end: "13:00" }, { id: "jue-2", start: "14:00", end: "18:00" }] },
  vie: { enabled: true, blocks: [{ id: "vie-1", start: "10:00", end: "13:00" }] },
  sab: { enabled: false, blocks: [] },
  dom: { enabled: false, blocks: [] },
};

const inputClass = "bg-white border-2 border-morado/20 px-3 py-2 font-sans text-sm text-tierra-dark focus:outline-none focus:border-morado transition-colors";
const labelClass = "block font-sans text-[0.58rem] text-tierra-dark tracking-widest uppercase mb-1.5";

export default function DisponibilidadPage() {
  const { toast } = useToast();

  const [banner, setBanner] = useState({
    enabled: false,
    message: "Esta semana solo turnos online por viaje. ¡Vuelvo a presenciales el lunes!",
  });
  const [weekly, setWeekly] = useState(initialWeekly);
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [exceptions, setExceptions] = useState<Exception[]>([]);
  const [config, setConfig] = useState({
    timezone: "America/Argentina/Buenos_Aires",
    leadTimeHours: 24,
    bufferMinutes: 15,
    maxBookingsPerDay: 6,
  });

  // ── Handlers semanales ──────────────────────────────────────────────────────
  const toggleDay = (key: DayKey) =>
    setWeekly((prev) => ({ ...prev, [key]: { ...prev[key], enabled: !prev[key].enabled } }));

  const addBlock = (key: DayKey) =>
    setWeekly((prev) => ({
      ...prev,
      [key]: { ...prev[key], blocks: [...prev[key].blocks, { id: newId("b"), start: "10:00", end: "13:00" }] },
    }));

  const updateBlock = (key: DayKey, blockId: string, field: "start" | "end", value: string) =>
    setWeekly((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        blocks: prev[key].blocks.map((b) => (b.id === blockId ? { ...b, [field]: value } : b)),
      },
    }));

  const removeBlock = (key: DayKey, blockId: string) =>
    setWeekly((prev) => ({
      ...prev,
      [key]: { ...prev[key], blocks: prev[key].blocks.filter((b) => b.id !== blockId) },
    }));

  // ── Vacaciones ──────────────────────────────────────────────────────────────
  const addVacation = () =>
    setVacations((prev) => [...prev, { id: newId("v"), from: today(), to: today(), message: "" }]);

  const updateVacation = (id: string, field: keyof Omit<Vacation, "id">, value: string) =>
    setVacations((prev) => prev.map((v) => (v.id === id ? { ...v, [field]: value } : v)));

  const removeVacation = (id: string) =>
    setVacations((prev) => prev.filter((v) => v.id !== id));

  // ── Excepciones ─────────────────────────────────────────────────────────────
  const addException = () =>
    setExceptions((prev) => [...prev, { id: newId("e"), date: today(), reason: "" }]);

  const updateException = (id: string, field: keyof Omit<Exception, "id">, value: string) =>
    setExceptions((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const removeException = (id: string) =>
    setExceptions((prev) => prev.filter((e) => e.id !== id));

  // ── Guardar (demo) ──────────────────────────────────────────────────────────
  const saveAll = () => toast("Disponibilidad guardada");

  // ── Stats agregadas ─────────────────────────────────────────────────────────
  const activeDays = dayNames.filter((d) => weekly[d.key].enabled).length;
  const totalHours = dayNames.reduce((acc, { key }) => {
    if (!weekly[key].enabled) return acc;
    return acc + weekly[key].blocks.reduce((sum, b) => {
      const [sh = 0, sm = 0] = b.start.split(":").map(Number);
      const [eh = 0, em = 0] = b.end.split(":").map(Number);
      return sum + Math.max(0, (eh + em / 60) - (sh + sm / 60));
    }, 0);
  }, 0);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Disponibilidad"
        subtitle={`${activeDays} días activos · ${totalHours.toFixed(1)} hs semanales disponibles`}
        action={
          <button
            onClick={saveAll}
            className="flex items-center gap-2 bg-morado-dark text-crema font-sans text-[0.65rem] px-5 py-3 tracking-widest uppercase font-semibold border-2 border-morado-dark block-shadow hover:bg-morado transition-colors"
          >
            <Save size={13} /> Guardar cambios
          </button>
        }
      />

      {/* ─── Mensaje global ──────────────────────────────────────────────────── */}
      <section className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
        <header className="bg-morado-dark px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Megaphone size={16} className="text-dorado" strokeWidth={1.8} />
            <h2 className="font-sans font-semibold text-crema text-sm tracking-widest uppercase">
              Mensaje global
            </h2>
          </div>
          <button
            onClick={() => setBanner((b) => ({ ...b, enabled: !b.enabled }))}
            className={`relative w-10 h-5 border-2 border-crema/40 transition-colors ${banner.enabled ? "bg-dorado" : "bg-white/10"}`}
          >
            <span className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-crema transition-all ${banner.enabled ? "left-5" : "left-0.5"}`} />
          </button>
        </header>
        <div className="px-6 py-5 space-y-3">
          <p className="font-sans text-xs text-tierra/60 tracking-wide">
            Banner editable que aparece arriba de la página de Servicios cuando está activo.
          </p>
          <textarea
            rows={2}
            value={banner.message}
            onChange={(e) => setBanner((b) => ({ ...b, message: e.target.value }))}
            placeholder="Ej: Esta semana solo turnos online. ¡Vuelvo a presenciales el lunes!"
            className={`${inputClass} w-full resize-none`}
          />
        </div>
      </section>

      {/* ─── Horarios semanales ──────────────────────────────────────────────── */}
      <section className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
        <header className="bg-morado-dark px-6 py-4 flex items-center gap-3">
          <Calendar size={16} className="text-dorado" strokeWidth={1.8} />
          <h2 className="font-sans font-semibold text-crema text-sm tracking-widest uppercase">
            Horarios semanales
          </h2>
          <span className="ml-auto font-sans text-[0.55rem] text-crema/40 tracking-widest uppercase">
            Recurrente
          </span>
        </header>
        <div className="divide-y divide-morado/10">
          {dayNames.map(({ key, label }) => {
            const day = weekly[key];
            return (
              <div
                key={key}
                className="px-6 py-5 grid grid-cols-[160px_1fr_70px] gap-5 items-start"
              >
                {/* Día + toggle */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => toggleDay(key)}
                    className={`relative w-10 h-5 border-2 border-morado-dark transition-colors shrink-0 ${day.enabled ? "bg-dorado" : "bg-tierra/10"}`}
                  >
                    <span className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-morado-dark transition-all ${day.enabled ? "left-5" : "left-0.5"}`} />
                  </button>
                  <span className={`font-sans font-semibold text-sm tracking-wide ${day.enabled ? "text-tierra-dark" : "text-tierra/35"}`}>
                    {label}
                  </span>
                </div>

                {/* Bloques horarios */}
                <div className="space-y-2">
                  {day.enabled ? (
                    <>
                      {day.blocks.map((block) => (
                        <div key={block.id} className="flex items-center gap-2">
                          <Clock size={12} className="text-morado/40 shrink-0" />
                          <input
                            type="time"
                            value={block.start}
                            onChange={(e) => updateBlock(key, block.id, "start", e.target.value)}
                            className={`${inputClass} w-28`}
                          />
                          <span className="font-sans text-xs text-tierra/40 px-1">→</span>
                          <input
                            type="time"
                            value={block.end}
                            onChange={(e) => updateBlock(key, block.id, "end", e.target.value)}
                            className={`${inputClass} w-28`}
                          />
                          <button
                            onClick={() => removeBlock(key, block.id)}
                            className="p-1.5 text-tierra/30 hover:text-rosa transition-colors"
                            title="Quitar bloque"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addBlock(key)}
                        className="flex items-center gap-1.5 font-sans text-[0.6rem] text-morado/50 hover:text-morado tracking-widest uppercase transition-colors pt-1"
                      >
                        <Plus size={11} /> Agregar bloque
                      </button>
                    </>
                  ) : (
                    <p className="font-sans text-xs text-tierra/30 italic pt-1">
                      Día sin disponibilidad
                    </p>
                  )}
                </div>

                {/* Resumen */}
                <div className="text-right pt-2">
                  {day.enabled && day.blocks.length > 0 && (
                    <p className="font-sans text-[0.55rem] text-tierra/35 tracking-widest uppercase">
                      {day.blocks.length} bloque{day.blocks.length !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Vacaciones + Excepciones (dos columnas) ────────────────────────── */}
      <div className="grid grid-cols-2 gap-6">
        {/* Vacaciones */}
        <section className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
          <header className="bg-morado-dark px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Plane size={16} className="text-dorado" strokeWidth={1.8} />
              <h2 className="font-sans font-semibold text-crema text-sm tracking-widest uppercase">
                Vacaciones
              </h2>
            </div>
            <button
              onClick={addVacation}
              className="flex items-center gap-1.5 font-sans text-[0.6rem] px-3 py-1.5 bg-white/10 text-crema/80 border border-white/15 hover:bg-white/20 tracking-widest uppercase transition-colors"
            >
              <Plus size={11} /> Agregar
            </button>
          </header>
          <div className="px-6 py-5 space-y-3">
            <p className="font-sans text-xs text-tierra/55 tracking-wide -mt-1 mb-2">
              Rangos de fechas donde no aceptás reservas, con mensaje opcional para tus clientas.
            </p>
            {vacations.length === 0 ? (
              <p className="font-sans text-xs text-tierra/30 italic text-center py-6">
                No hay vacaciones programadas
              </p>
            ) : (
              vacations.map((v) => (
                <div key={v.id} className="border border-morado/15 bg-white p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Desde</label>
                      <input
                        type="date"
                        value={v.from}
                        onChange={(e) => updateVacation(v.id, "from", e.target.value)}
                        className={`${inputClass} w-full`}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Hasta</label>
                      <input
                        type="date"
                        value={v.to}
                        onChange={(e) => updateVacation(v.id, "to", e.target.value)}
                        className={`${inputClass} w-full`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Mensaje (opcional)</label>
                    <textarea
                      rows={2}
                      value={v.message}
                      onChange={(e) => updateVacation(v.id, "message", e.target.value)}
                      placeholder="Ej: Retiro en las sierras, vuelvo renovada"
                      className={`${inputClass} w-full resize-none`}
                    />
                  </div>
                  <button
                    onClick={() => removeVacation(v.id)}
                    className="flex items-center gap-1.5 font-sans text-[0.58rem] text-rosa/70 hover:text-rosa tracking-widest uppercase transition-colors"
                  >
                    <Trash2 size={10} /> Eliminar período
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Excepciones puntuales */}
        <section className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
          <header className="bg-morado-dark px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Ban size={16} className="text-dorado" strokeWidth={1.8} />
              <h2 className="font-sans font-semibold text-crema text-sm tracking-widest uppercase">
                Excepciones
              </h2>
            </div>
            <button
              onClick={addException}
              className="flex items-center gap-1.5 font-sans text-[0.6rem] px-3 py-1.5 bg-white/10 text-crema/80 border border-white/15 hover:bg-white/20 tracking-widest uppercase transition-colors"
            >
              <Plus size={11} /> Agregar
            </button>
          </header>
          <div className="px-6 py-5 space-y-3">
            <p className="font-sans text-xs text-tierra/55 tracking-wide -mt-1 mb-2">
              Días sueltos bloqueados (feriados, personal). Anulan el horario semanal.
            </p>
            {exceptions.length === 0 ? (
              <p className="font-sans text-xs text-tierra/30 italic text-center py-6">
                Sin excepciones cargadas
              </p>
            ) : (
              exceptions.map((e) => (
                <div key={e.id} className="border border-morado/15 bg-white p-4 space-y-3">
                  <div>
                    <label className={labelClass}>Fecha bloqueada</label>
                    <input
                      type="date"
                      value={e.date}
                      onChange={(ev) => updateException(e.id, "date", ev.target.value)}
                      className={`${inputClass} w-full`}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Motivo (opcional)</label>
                    <input
                      type="text"
                      value={e.reason}
                      onChange={(ev) => updateException(e.id, "reason", ev.target.value)}
                      placeholder="Ej: Feriado, capacitación..."
                      className={`${inputClass} w-full`}
                    />
                  </div>
                  <button
                    onClick={() => removeException(e.id)}
                    className="flex items-center gap-1.5 font-sans text-[0.58rem] text-rosa/70 hover:text-rosa tracking-widest uppercase transition-colors"
                  >
                    <Trash2 size={10} /> Quitar día
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* ─── Reglas de reserva ──────────────────────────────────────────────── */}
      <section className="bg-crema border-2 border-morado-dark block-shadow overflow-hidden">
        <header className="bg-morado-dark px-6 py-4 flex items-center gap-3">
          <Sliders size={16} className="text-dorado" strokeWidth={1.8} />
          <h2 className="font-sans font-semibold text-crema text-sm tracking-widest uppercase">
            Reglas de reserva
          </h2>
        </header>
        <div className="px-6 py-5 grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label className={labelClass}>
              <Globe size={9} className="inline mr-1 -mt-0.5" />
              Zona horaria
            </label>
            <select
              value={config.timezone}
              onChange={(e) => setConfig((c) => ({ ...c, timezone: e.target.value }))}
              className={`${inputClass} w-full cursor-pointer`}
            >
              <option value="America/Argentina/Buenos_Aires">Buenos Aires (GMT-3)</option>
              <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
              <option value="America/Santiago">Santiago (GMT-3)</option>
              <option value="America/Bogota">Bogotá (GMT-5)</option>
              <option value="America/Lima">Lima (GMT-5)</option>
              <option value="Europe/Madrid">Madrid (GMT+1)</option>
            </select>
            <p className="font-sans text-[0.6rem] text-tierra/40 tracking-wide mt-1.5">
              Para sesiones online con clientas de otro huso
            </p>
          </div>
          <div>
            <label className={labelClass}>Anticipación mínima (h)</label>
            <input
              type="number"
              min={0}
              value={config.leadTimeHours}
              onChange={(e) => setConfig((c) => ({ ...c, leadTimeHours: parseInt(e.target.value) || 0 }))}
              className={`${inputClass} w-full`}
            />
            <p className="font-sans text-[0.6rem] text-tierra/40 tracking-wide mt-1.5">
              Cuántas horas antes se puede reservar
            </p>
          </div>
          <div>
            <label className={labelClass}>Buffer entre sesiones (min)</label>
            <input
              type="number"
              min={0}
              step={5}
              value={config.bufferMinutes}
              onChange={(e) => setConfig((c) => ({ ...c, bufferMinutes: parseInt(e.target.value) || 0 }))}
              className={`${inputClass} w-full`}
            />
            <p className="font-sans text-[0.6rem] text-tierra/40 tracking-wide mt-1.5">
              Descanso entre cada reserva
            </p>
          </div>
          <div>
            <label className={labelClass}>Cupo diario máximo</label>
            <input
              type="number"
              min={1}
              value={config.maxBookingsPerDay}
              onChange={(e) => setConfig((c) => ({ ...c, maxBookingsPerDay: parseInt(e.target.value) || 1 }))}
              className={`${inputClass} w-full`}
            />
            <p className="font-sans text-[0.6rem] text-tierra/40 tracking-wide mt-1.5">
              Tope de reservas por día
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
