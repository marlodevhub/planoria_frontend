// features/dashboard/components/UpcomingExam.tsx

interface Exam {
  subject: string;
  daysUntil: number;
  retention: number;
}

const UPCOMING_EXAM: Exam = {
  subject: "Física",
  daysUntil: 0,
  retention: 0,
};

export function UpcomingExam() {
  const { subject, daysUntil, retention } = UPCOMING_EXAM;

  const daysLabel =
    daysUntil === 0
      ? "en 0 días"
      : daysUntil === 1
        ? "mañana"
        : `en ${daysUntil} días`;

  const getRetentionColor = (value: number) => {
    if (value >= 70) return "bg-green-500";
    if (value >= 40) return "bg-accent";
    return "bg-red-500";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full flex flex-col gap-4">
      <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
        <span>📅</span>
        Próximo examen
      </div>

      <div>
        <h2 className="text-gray-900 text-2xl font-bold">{subject}</h2>
        <p
          className={`text-sm mt-1 font-medium ${
            daysUntil <= 3 ? "text-red-500" : "text-accent"
          }`}
        >
          {daysLabel}
        </p>
      </div>

      <div className="mt-auto space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Retención actual:</span>
          <span className="text-gray-900 font-medium">{retention}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className={`${getRetentionColor(retention)} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${retention}%` }}
          />
        </div>
      </div>
    </div>
  );
}
