export function TodayRecommendation() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="bg-accent rounded-xl p-2.5 text-white text-xl shrink-0">
          ✦
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

      <p className="text-foreground text-sm leading-relaxed">
        Empieza creando un curso y generando tu primer set de flashcards con IA.
      </p>

      <div className="mt-auto">
        <button className="flex items-center gap-2 text-sm text-foreground border border-border rounded-xl px-4 py-2 hover:bg-muted transition-colors">
          Ver cronograma del día
          <span className="text-base">→</span>
        </button>
      </div>
    </div>
  )
}
