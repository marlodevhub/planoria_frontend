// features/dashboard/components/TodayRecommendation.tsx

import { Button } from "@/components/ui/button";

export function TodayRecommendation() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col gap-4 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
      {/* ─── Header ─── */}
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 rounded-xl p-2.5 text-primary text-xl shrink-0 shadow-lg shadow-primary/20">
          <i className="ti ti-sparkles text-2xl" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-foreground font-semibold text-base">
            Recomendación de hoy
          </h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            Generada por la IA según tu progreso y exámenes
          </p>
        </div>
      </div>

      {/* ─── Descripción ─── */}
      <p className="text-foreground/80 text-sm leading-relaxed">
        Empieza creando un curso y generando tu primer set de flashcards con IA.
      </p>

      {/* ─── Botones ─── */}
      <div className="mt-auto flex items-center gap-3 flex-wrap">
        <Button className="gap-2 shadow-sm shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
          Ver cronograma del día
          <i
            className="ti ti-arrow-right text-base group-hover:translate-x-1 transition-transform"
            aria-hidden="true"
          />
        </Button>

        <Button variant="outline" className="gap-2">
          <i className="ti ti-sparkles" aria-hidden="true" />
          Nueva sesión
        </Button>
      </div>
    </div>
  );
}
