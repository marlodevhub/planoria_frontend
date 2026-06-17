// features/dashboard/components/RecentActivity.tsx

interface ActivityItem {
  id: string;
  description: string;
  timeAgo: string;
  type: "quiz" | "set" | "flashcard" | "other";
}

// Replace with real data from your store/API
const ACTIVITY: ActivityItem[] = [
  {
    id: "1",
    description: "Nuevo quiz generado — Quiz: La mediana",
    timeAgo: "hace 1 día",
    type: "quiz",
  },
  {
    id: "2",
    description: "Nuevo set creado — Arte",
    timeAgo: "hace 1 día",
    type: "set",
  },
  {
    id: "3",
    description: "Sesión de flashcards — Varianza y desviación estándar",
    timeAgo: "hace 7 días",
    type: "flashcard",
  },
  {
    id: "4",
    description: "Sesión de flashcards — Varianza y desviación estándar",
    timeAgo: "hace 6 días",
    type: "flashcard",
  },
  {
    id: "5",
    description: "Sesión de flashcards — Varianza y desviación estándar",
    timeAgo: "hace 5 días",
    type: "flashcard",
  },
  {
    id: "6",
    description: "Sesión de flashcards — Varianza y desviación estándar",
    timeAgo: "hace 4 días",
    type: "flashcard",
  },
  {
    id: "7",
    description: "Sesión de flashcards — Varianza y desviación estándar",
    timeAgo: "hace 3 días",
    type: "flashcard",
  },
];

const TYPE_ICON: Record<ActivityItem["type"], string> = {
  quiz: "📝",
  set: "📚",
  flashcard: "🃏",
  other: "📌",
};

// Usando tus colores para los hover de cada tipo
const TYPE_HOVER: Record<ActivityItem["type"], string> = {
  quiz: "hover:bg-accent/10 hover:border-accent/30",
  set: "hover:bg-primary/10 hover:border-primary/30",
  flashcard: "hover:bg-secondary/10 hover:border-secondary/30",
  other: "hover:bg-muted/10 hover:border-muted/30",
};

export function RecentActivity() {
  return (
    <div className="bg-white border border-border rounded-2xl p-6 space-y-4 hover:border-accent/30 transition-all duration-300 shadow-sm">
      <h2 className="text-text font-semibold text-base flex items-center gap-2">
        🕐 Actividad reciente
      </h2>
      <div className="space-y-1">
        {ACTIVITY.map((item) => (
          <div
            key={item.id}
            className={`
              flex items-start justify-between gap-3 py-2.5 px-3 rounded-xl 
              border border-transparent transition-all duration-200
              ${TYPE_HOVER[item.type]}
            `}
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <span className="text-sm mt-0.5 shrink-0">
                {TYPE_ICON[item.type]}
              </span>
              <p className="text-text text-sm truncate group-hover:text-accent transition-colors">
                {item.description}
              </p>
            </div>
            <span className="text-muted-foreground text-xs shrink-0 whitespace-nowrap bg-bg/50 px-2 py-0.5 rounded-full">
              {item.timeAgo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
