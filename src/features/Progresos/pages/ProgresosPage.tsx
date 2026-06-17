// features/progresos/pages/ProgresosPage.tsx

import { Card } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Datos de ejemplo - reemplazar con datos reales de tu API/store
const stats = [
  {
    label: "Días de racha",
    value: "12",
    icon: "ti-flame",
    color: "bg-orange-50 border-orange-200 text-orange-600",
    subtitle: "+2 esta semana",
  },
  {
    label: "Tarjetas hoy",
    value: "48",
    icon: "ti-cards",
    color: "bg-accent/10 border-accent/20 text-accent",
    subtitle: "+12 vs ayer",
  },
  {
    label: "Quizzes completados",
    value: "7",
    icon: "ti-puzzle",
    color: "bg-primary/10 border-primary/20 text-primary",
    subtitle: "80% de acierto",
  },
  {
    label: "Horas estudiadas",
    value: "3.5",
    icon: "ti-clock",
    color: "bg-secondary/10 border-secondary/20 text-secondary",
    subtitle: "+1.5h vs ayer",
  },
];

const WEEKLY_ACTIVITY = [
  { day: "Lun", value: 40 },
  { day: "Mar", value: 65 },
  { day: "Mié", value: 30 },
  { day: "Jue", value: 80 },
  { day: "Vie", value: 55 },
  { day: "Sáb", value: 90 },
  { day: "Dom", value: 45 },
];

const SUBJECTS = [
  { name: "Matemáticas", progress: 75, color: "bg-primary", total: 120 },
  { name: "Física", progress: 60, color: "bg-accent", total: 80 },
  { name: "Estadística", progress: 45, color: "bg-secondary", total: 60 },
  { name: "Historia", progress: 30, color: "bg-destructive", total: 40 },
];

const RECENT_ACHIEVEMENTS = [
  { id: 1, title: "Racha de 7 días", icon: "ti-flame", date: "hoy" },
  { id: 2, title: "100 tarjetas dominadas", icon: "ti-trophy", date: "ayer" },
  { id: 3, title: "Quiz perfecto", icon: "ti-star", date: "hace 2 días" },
];

export function ProgresosPage() {
  const [activeView, setActiveView] = useState<"semana" | "mes">("semana");

  const maxValue = Math.max(...WEEKLY_ACTIVITY.map((d) => d.value));

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Progreso</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Tu rendimiento de esta semana
          </p>
        </div>
        <div className="flex items-center gap-2 bg-bg rounded-xl p-1 border border-border">
          <button
            onClick={() => setActiveView("semana")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              activeView === "semana"
                ? "bg-accent text-accent-foreground shadow-sm shadow-accent/20"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Semana
          </button>
          <button
            onClick={() => setActiveView("mes")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              activeView === "mes"
                ? "bg-accent text-accent-foreground shadow-sm shadow-accent/20"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Mes
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card
            key={s.label}
            className="p-5 bg-white border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className={cn("rounded-xl p-2.5 text-xl border", s.color)}>
                <i className={`ti ${s.icon} text-[20px]`} aria-hidden="true" />
              </div>
              <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                ↑
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-3">{s.value}</p>
            <p className="text-muted-foreground text-xs mt-0.5">{s.label}</p>
            <p className="text-[10px] text-muted-foreground mt-1">
              {s.subtitle}
            </p>
          </Card>
        ))}
      </div>

      {/* Gráfico de Actividad Semanal */}
      <Card className="p-6 bg-white border border-border hover:border-accent/30 transition-all duration-300 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <i className="ti ti-chart-bar text-accent" aria-hidden="true" />
            Actividad semanal
          </h3>
          <span className="text-xs text-muted-foreground bg-bg px-2 py-1 rounded-full">
            Total: {WEEKLY_ACTIVITY.reduce((acc, d) => acc + d.value, 0)} min
          </span>
        </div>
        <div className="flex items-end gap-2 h-32">
          {WEEKLY_ACTIVITY.map((day, i) => {
            const height = (day.value / maxValue) * 100;
            const isToday = i === 6;

            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-1.5 group"
              >
                <div className="relative w-full flex flex-col items-center">
                  <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5">
                    {day.value}
                  </span>
                  <div
                    className={cn(
                      "w-full rounded-t-lg transition-all duration-500 cursor-pointer",
                      isToday
                        ? "bg-accent hover:bg-accent/80"
                        : "bg-accent/30 hover:bg-accent/60",
                    )}
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-mono",
                    isToday
                      ? "text-accent font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Progreso por Materia y Logros */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Progreso por Materia */}
        <Card className="p-6 bg-white border border-border hover:border-accent/30 transition-all duration-300 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <i className="ti ti-book text-accent" aria-hidden="true" />
              Progreso por materia
            </h3>
            <span className="text-xs text-muted-foreground bg-bg px-2 py-1 rounded-full">
              {SUBJECTS.length} materias
            </span>
          </div>
          <div className="space-y-4">
            {SUBJECTS.map((subject) => (
              <div key={subject.name} className="space-y-1.5 group">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-foreground group-hover:text-accent transition-colors">
                    {subject.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs">
                      {subject.progress}% ({subject.total} tarjetas)
                    </span>
                    <span className="text-foreground font-medium text-xs">
                      {Math.round((subject.progress / 100) * subject.total)}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-bg rounded-full h-2 overflow-hidden">
                  <div
                    className={cn(
                      "h-2 rounded-full transition-all duration-700",
                      subject.color,
                    )}
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Logros Recientes */}
        <Card className="p-6 bg-white border border-border hover:border-accent/30 transition-all duration-300 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <i className="ti ti-trophy text-accent" aria-hidden="true" />
              Logros recientes
            </h3>
            <button className="text-xs text-accent hover:text-accent/80 transition-colors flex items-center gap-1">
              Ver todos
              <i className="ti ti-arrow-right text-xs" aria-hidden="true" />
            </button>
          </div>
          <div className="space-y-3">
            {RECENT_ACHIEVEMENTS.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-bg border border-border hover:border-accent/30 transition-all duration-200 group"
              >
                <div className="text-xl text-accent group-hover:scale-110 transition-transform">
                  <i className={`ti ${achievement.icon}`} aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground text-sm font-medium">
                    {achievement.title}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {achievement.date}
                  </p>
                </div>
                <i
                  className="ti ti-star text-accent opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>

          {/* Resumen rápido */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progreso total:</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-1.5 bg-bg rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full"
                    style={{ width: "52%" }}
                  />
                </div>
                <span className="text-foreground font-medium">52%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
