import { Card } from "@/components/ui/card";

const stats = [
  {
    label: "Días de racha",
    value: "12",
    icon: "ti-flame",
    color: "text-orange-400",
  },
  {
    label: "Tarjetas hoy",
    value: "48",
    icon: "ti-cards",
    color: "text-accent",
  },
  {
    label: "Quizzes completados",
    value: "7",
    icon: "ti-puzzle",
    color: "text-emerald-400",
  },
  {
    label: "Horas estudiadas",
    value: "3.5",
    icon: "ti-clock",
    color: "text-yellow-400",
  },
];

export function ProgresosPage() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-text">Progreso</h1>
        <p className="text-muted text-sm mt-1">Tu rendimiento de esta semana</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <i
              className={`ti ${s.icon} ${s.color} text-[24px]`}
              aria-hidden="true"
            />
            <p className="text-2xl font-bold text-text mt-2">{s.value}</p>
            <p className="text-muted text-xs font-mono mt-1">{s.label}</p>
          </Card>
        ))}
      </div>
      <Card>
        <h3 className="font-semibold text-text mb-4">Actividad semanal</h3>
        <div className="flex items-end gap-2 h-24">
          {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-lg bg-accent/30 hover:bg-accent/60 transition-colors cursor-pointer"
                style={{ height: `${h}%` }}
              />
              <span className="text-muted text-[10px] font-mono">
                {["L", "M", "X", "J", "V", "S", "D"][i]}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

