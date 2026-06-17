// features/cronograma/pages/CronogramaPage.tsx

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Datos de ejemplo - reemplazar con datos reales de tu API/store
const EXAMS = [
  {
    id: 1,
    course: "Matemáticas",
    topic: "Álgebra Lineal",
    date: "2026-06-20",
    time: "09:00",
    priority: "alta",
  },
  {
    id: 2,
    course: "Física",
    topic: "Mecánica Clásica",
    date: "2026-06-22",
    time: "11:00",
    priority: "media",
  },
  {
    id: 3,
    course: "Estadística",
    topic: "Probabilidad",
    date: "2026-06-25",
    time: "15:00",
    priority: "alta",
  },
  {
    id: 4,
    course: "Historia",
    topic: "Edad Media",
    date: "2026-06-28",
    time: "10:00",
    priority: "baja",
  },
  {
    id: 5,
    course: "Inglés",
    topic: "Gramática Avanzada",
    date: "2026-07-01",
    time: "14:00",
    priority: "media",
  },
];

// Estudios diarios programados
const DAILY_STUDY = [
  { time: "08:00", course: "Matemáticas", topic: "Álgebra Lineal" },
  { time: "10:00", course: "Física", topic: "Mecánica Clásica" },
  { time: "13:00", course: "Estadística", topic: "Probabilidad" },
  { time: "15:00", course: "Historia", topic: "Edad Media" },
  { time: "17:00", course: "Inglés", topic: "Gramática Avanzada" },
];

// Colores por curso (usando tus colores)
const COURSE_COLORS: Record<string, string> = {
  Matemáticas: "bg-primary text-primary-foreground",
  Física: "bg-accent text-accent-foreground",
  Estadística: "bg-secondary text-secondary-foreground",
  Historia: "bg-destructive text-destructive-foreground",
  Inglés: "bg-muted text-muted-foreground",
};

const PRIORITY_COLORS: Record<string, string> = {
  alta: "bg-red-500",
  media: "bg-yellow-500",
  baja: "bg-green-500",
};

const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export function CronogramaPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"semana" | "mes">("semana");

  const currentMonth = selectedDate.toLocaleString("es", { month: "long" });
  const currentYear = selectedDate.getFullYear();

  // Obtener día actual
  const today = new Date().getDate();
  const currentDay = new Date().getDay();

  const handlePrevWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  // Filtrar exámenes para la semana actual
  const getExamsForWeek = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    return EXAMS.filter((exam) => {
      const examDate = new Date(exam.date);
      return examDate >= startOfWeek && examDate <= endOfWeek;
    });
  };

  const weekExams = getExamsForWeek();

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cronograma</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Planifica tu semana de estudio y visualiza tus exámenes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrevWeek}
            className="p-2 rounded-xl border border-border hover:bg-accent/10 transition-all duration-200"
          >
            ←
          </button>
          <span className="text-sm font-medium text-foreground">
            {currentMonth} {currentYear}
          </span>
          <button
            onClick={handleNextWeek}
            className="p-2 rounded-xl border border-border hover:bg-accent/10 transition-all duration-200"
          >
            →
          </button>
        </div>
      </div>

      {/* Calendario Semanal */}
      <Card className="p-6 bg-white border border-border hover:border-accent/30 transition-all duration-300 shadow-sm">
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, i) => {
            const dayNumber = 18 + i; // Ejemplo, reemplazar con lógica real
            const isToday = dayNumber === today;
            const hasExam = weekExams.some((exam) => {
              const examDay = new Date(exam.date).getDate();
              return examDay === dayNumber;
            });

            return (
              <div key={day} className="text-center">
                <p className="text-muted-foreground text-xs font-medium mb-2">
                  {day}
                </p>
                <div
                  className={cn(
                    "h-10 w-10 mx-auto rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200",
                    isToday
                      ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30 scale-105"
                      : hasExam
                        ? "bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 cursor-pointer"
                        : "bg-bg text-foreground hover:bg-accent/10 cursor-pointer",
                  )}
                >
                  {dayNumber}
                </div>
                {hasExam && (
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary mx-auto" />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Vista de Exámenes y Estudio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Próximos Exámenes */}
        <Card className="p-6 bg-white border border-border hover:border-accent/30 transition-all duration-300 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-foreground font-semibold text-base flex items-center gap-2">
              Próximos Exámenes
            </h2>
            <span className="text-xs text-muted-foreground bg-bg px-2 py-1 rounded-full">
              {EXAMS.length} total
            </span>
          </div>
          <div className="space-y-3">
            {EXAMS.map((exam) => {
              const examDate = new Date(exam.date);
              const daysUntil = Math.ceil(
                (examDate.getTime() - new Date().getTime()) /
                  (1000 * 60 * 60 * 24),
              );
              const isUrgent = daysUntil <= 3;

              return (
                <div
                  key={exam.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl border transition-all duration-200",
                    isUrgent
                      ? "border-red-200 bg-red-50/50 hover:bg-red-50"
                      : "border-border hover:bg-accent/5",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full",
                        PRIORITY_COLORS[exam.priority],
                      )}
                    />
                    <div>
                      <p className="text-foreground text-sm font-medium">
                        {exam.course}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {exam.topic}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-foreground text-sm font-mono">
                      {exam.time}
                    </p>
                    <p
                      className={cn(
                        "text-xs",
                        isUrgent
                          ? "text-red-500 font-medium"
                          : "text-muted-foreground",
                      )}
                    >
                      {daysUntil === 0
                        ? "Hoy"
                        : daysUntil === 1
                          ? "Mañana"
                          : `en ${daysUntil} días`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Estudio Diario */}
        <Card className="p-6 bg-white border border-border hover:border-accent/30 transition-all duration-300 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-foreground font-semibold text-base flex items-center gap-2">
              📚 Estudio de hoy
            </h2>
            <span className="text-xs text-muted-foreground bg-bg px-2 py-1 rounded-full">
              {DAILY_STUDY.length} bloques
            </span>
          </div>
          <div className="space-y-2">
            {DAILY_STUDY.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-bg border border-border hover:border-accent/30 transition-all duration-200"
              >
                <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                <span className="text-foreground text-sm font-mono">
                  {item.time}
                </span>
                <span className="text-foreground text-sm">—</span>
                <span className="text-foreground text-sm font-medium">
                  {item.course}
                </span>
                <span className="text-muted-foreground text-xs hidden sm:block">
                  {item.topic}
                </span>
              </div>
            ))}
          </div>

          {/* Resumen rápido */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Horas de estudio hoy:
              </span>
              <span className="text-foreground font-medium">5h</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-muted-foreground">Progreso semanal:</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-bg rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full"
                    style={{ width: "60%" }}
                  />
                </div>
                <span className="text-foreground font-medium">60%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Leyenda */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground bg-white border border-border rounded-xl px-4 py-2 shadow-sm">
        <span>🔵 Hoy</span>
        <span>🟢 Examen próximo</span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500" /> Urgente
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-yellow-500" /> Media
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500" /> Baja
        </span>
      </div>
    </div>
  );
}
