// features/dashboard/components/RecentActivity.tsx

import { cn } from "@/lib/utils";

// ─── Tipos ──────────────────────────────────────────────
interface ActivityItem {
  id: string;
  description: string;
  timeAgo: string;
  type: "quiz" | "set" | "flashcard" | "other";
}

// ─── Datos mock (reemplazar con datos reales) ──────────
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

// ─── Configuración de tipos ─────────────────────────────
const TYPE_CONFIG: Record<
  ActivityItem["type"],
  { icon: string; hoverClass: string }
> = {
  quiz: {
    icon: "📝",
    hoverClass: "hover:bg-primary/5 hover:border-primary/30",
  },
  set: {
    icon: "📚",
    hoverClass: "hover:bg-secondary/10 hover:border-secondary/30",
  },
  flashcard: {
    icon: "🃏",
    hoverClass: "hover:bg-accent/5 hover:border-accent/30",
  },
  other: {
    icon: "📌",
    hoverClass: "hover:bg-muted/10 hover:border-muted/30",
  },
};

// ─── Componente ──────────────────────────────────────────
export function RecentActivity() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md">
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i
            className="ti ti-clock text-primary text-[18px]"
            aria-hidden="true"
          />
          <h2 className="text-foreground font-semibold text-base">
            Actividad reciente
          </h2>
        </div>
        <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
          {ACTIVITY.length}
        </span>
      </div>

      {/* ─── Lista de actividades ─── */}
      <div className="divide-y divide-border/50">
        {ACTIVITY.map((item) => {
          const config = TYPE_CONFIG[item.type];
          return (
            <div
              key={item.id}
              className={cn(
                "group flex items-start justify-between gap-3 py-2.5 px-2 -mx-2 rounded-lg",
                "border border-transparent transition-all duration-200 cursor-default",
                config.hoverClass,
              )}
            >
              {/* ─── Icono y descripción ─── */}
              <div className="flex items-start gap-2.5 min-w-0 flex-1">
                <span
                  className="text-sm mt-0.5 shrink-0 transition-transform duration-200 group-hover:scale-110"
                  role="img"
                  aria-hidden="true"
                >
                  {config.icon}
                </span>
                <p className="text-foreground text-sm truncate group-hover:text-primary transition-colors duration-200">
                  {item.description}
                </p>
              </div>

              {/* ─── Tiempo ─── */}
              <span className="text-muted-foreground text-xs shrink-0 whitespace-nowrap bg-muted/30 px-2 py-0.5 rounded-full">
                {item.timeAgo}
              </span>
            </div>
          );
        })}
      </div>

      {/* ─── Footer ─── */}
      <div className="pt-2 border-t border-border/50">
        <button
          className="text-xs text-primary hover:text-primary/80 transition-colors duration-200 flex items-center gap-1"
          onClick={() => {
            /* TODO: Ver todas las actividades */
          }}
        >
          Ver todas las actividades
          <i className="ti ti-arrow-right text-[12px]" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
