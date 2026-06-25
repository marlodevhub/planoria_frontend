// features/dashboard/components/UpcomingExam.tsx

interface Exam {
  subject: string;
  daysUntil: number;
  retention: number;
}

// ✅ Cambiar retention a un valor > 0
const UPCOMING_EXAM: Exam = {
  subject: "Física",
  daysUntil: 3,
  retention: 45, // ← 45% para que se vea
};

export function UpcomingExam() {
  const { subject, daysUntil, retention } = UPCOMING_EXAM;

  const daysLabel =
    daysUntil === 0
      ? "Hoy"
      : daysUntil === 1
        ? "Mañana"
        : `En ${daysUntil} días`;

  // ✅ Cambiar los colores para que sean visibles
  const getRetentionColor = (value: number) => {
    if (value >= 70) return "bg-success";
    if (value >= 40) return "bg-primary"; // ← Ahora usa primary (teal)
    return "bg-destructive";
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col gap-4 shadow-sm hover:border-primary/20 transition-all duration-300">
      <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
        <i className="ti ti-calendar-event text-primary" aria-hidden="true" />
        Próximo examen
      </div>

      <div>
        <h2 className="text-foreground text-2xl font-bold">{subject}</h2>
        <p
          className={`text-sm mt-1 font-medium ${
            daysUntil <= 3 ? "text-destructive" : "text-primary"
          }`}
        >
          {daysLabel}
        </p>
      </div>

      <div className="mt-auto space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Retención actual:</span>
          <span className="text-foreground font-medium">{retention}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className={`${getRetentionColor(retention)} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${retention}%` }}
          />
        </div>
      </div>
    </div>
  );
}
