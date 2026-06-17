// features/dashboard/components/TodayRecommendation.tsx

export function TodayRecommendation() {
  return (
    <div className="bg-white border border-border rounded-2xl p-6 h-full flex flex-col gap-4 hover:border-accent/30 transition-all duration-300 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Estrella con accent */}
        <div className="bg-accent rounded-xl p-2.5 text-accent-foreground text-xl shrink-0 shadow-lg shadow-accent/20">
          ✦
        </div>
        <div>
          <h2 className="text-text font-semibold text-base">
            Recomendación de hoy
          </h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            Generada por la IA según tu progreso y exámenes
          </p>
        </div>
      </div>

      <p className="text-text text-sm leading-relaxed">
        Empieza creando un curso y generando tu primer set de flashcards con IA.
      </p>

      <div className="mt-auto flex items-center gap-3 flex-wrap">
        {/* Botón principal - con accent */}
        <button className="flex items-center gap-2 text-sm text-accent-foreground font-medium bg-accent border border-accent rounded-xl px-4 py-2 hover:bg-accent/80 hover:border-accent/80 transition-all duration-300 group shadow-sm shadow-accent/20">
          Ver cronograma del día
          <span className="text-base group-hover:translate-x-1 transition-transform">
            →
          </span>
        </button>

        {/* Botón estrella - con secondary */}
        <button className="flex items-center gap-2 text-sm text-secondary-foreground font-medium bg-secondary border border-secondary rounded-xl px-4 py-2 hover:bg-secondary/80 hover:border-secondary/80 transition-all duration-300 group shadow-sm shadow-secondary/20">
          <span className="group-hover:scale-110 transition-transform inline-block">
            ✦
          </span>
          Nueva sesión
        </button>
      </div>
    </div>
  );
}

