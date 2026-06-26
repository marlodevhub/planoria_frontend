import { useDeckCards, useFlashcardStats, useDeckMastery, useDeckPredictions, useDeckTimeline } from "../hooks";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DeckProgressPanelProps {
  deckId: number;
  deckName: string;
}

export function DeckProgressPanel({ deckId, deckName }: DeckProgressPanelProps) {
  const { data: stats, isLoading: statsLoading } = useFlashcardStats(deckId);
  const { data: mastery, isLoading: masteryLoading } = useDeckMastery(deckId);
  const { data: predictions, isLoading: predsLoading } = useDeckPredictions(deckId);
  const { data: timeline, isLoading: timelineLoading } = useDeckTimeline(deckId);
  const { data: cardsData, isLoading: cardsLoading } = useDeckCards(deckId, 1, 10);

  const isLoading = statsLoading || masteryLoading || predsLoading || timelineLoading;

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-4 space-y-1">
          <p className="text-xs text-muted-foreground">Total tarjetas</p>
          <p className="text-2xl font-bold text-foreground">{stats?.totalCards ?? 0}</p>
        </Card>
        <Card className="p-4 space-y-1">
          <p className="text-xs text-muted-foreground">Dominadas</p>
          <p className="text-2xl font-bold text-green-600">{stats?.masteredCards ?? 0}</p>
        </Card>
        <Card className="p-4 space-y-1">
          <p className="text-xs text-muted-foreground">Hoy revisadas</p>
          <p className="text-2xl font-bold text-primary">{stats?.cardsReviewedToday ?? 0}</p>
        </Card>
        <Card className="p-4 space-y-1">
          <p className="text-xs text-muted-foreground">Maestría</p>
          <p className="text-2xl font-bold text-foreground">{Math.round(stats?.masteryPercentage ?? 0)}%</p>
        </Card>
      </div>

      {/* Mastery with difficulty breakdown */}
      {mastery && (
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Progreso de maestría</p>
            <span className="text-xs text-muted-foreground">
              {Math.round(mastery.masteryPercentage)}%
            </span>
          </div>
          <Progress value={mastery.masteryPercentage} className="h-2" />
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="text-center">
              <p className="text-lg font-bold text-green-500">{mastery.byDifficulty?.easy ?? 0}</p>
              <p className="text-[10px] text-muted-foreground">Fáciles</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-yellow-500">{mastery.byDifficulty?.medium ?? 0}</p>
              <p className="text-[10px] text-muted-foreground">Medias</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-red-500">{mastery.byDifficulty?.hard ?? 0}</p>
              <p className="text-[10px] text-muted-foreground">Difíciles</p>
            </div>
          </div>
        </Card>
      )}

      {/* Predictions */}
      {predictions && (
        <Card className="p-4 space-y-3">
          <p className="text-sm font-medium text-foreground">Predicciones</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Maestría estimada</p>
              <p className="text-lg font-bold text-foreground">{Math.round(predictions.predictedMastery)}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Días para dominar</p>
              <p className="text-lg font-bold text-foreground">{predictions.estimatedDaysToMastery}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Retención estimada</p>
              <p className="text-lg font-bold text-foreground">{Math.round(predictions.predictedRetentionRate)}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Revisión próx. semana</p>
              <p className="text-lg font-bold text-foreground">{predictions.nextWeekReviewLoad} tarjetas</p>
            </div>
          </div>
        </Card>
      )}

      {/* Timeline */}
      {timeline && timeline.entries.length > 0 && (
        <Card className="p-4 space-y-3">
          <p className="text-sm font-medium text-foreground">Línea de tiempo</p>
          <div className="space-y-2 max-h-[240px] overflow-y-auto">
            {timeline.entries.map((entry, i) => (
              <div key={i} className="flex items-center gap-3 text-xs">
                <span className="text-muted-foreground font-mono w-24 flex-shrink-0">
                  {new Date(entry.date).toLocaleDateString()}
                </span>
                <div className="flex-1 flex items-center gap-3">
                  <span className="text-green-600 font-mono w-12 text-right">{entry.masteredCards}</span>
                  <Progress value={entry.cumulativeMastery} className="h-1.5 flex-1" />
                  <span className="text-muted-foreground font-mono w-8 text-right">{Math.round(entry.cumulativeMastery)}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Cards summary */}
      {cardsData && cardsData.items.length > 0 && (
        <Card className="p-4 space-y-2">
          <p className="text-sm font-medium text-foreground">Últimas tarjetas</p>
          {cardsData.items.slice(0, 5).map((card) => (
            <div key={card.id} className="flex items-center gap-2 py-1.5 border-b border-border/50 last:border-0">
              <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                card.difficulty === "easy" ? "bg-green-500" :
                card.difficulty === "medium" ? "bg-yellow-500" : "bg-red-500"
              }`} />
              <p className="text-xs text-foreground truncate flex-1">{card.question}</p>
              <span className="text-[10px] text-muted-foreground font-mono">
                {card.repetitions} rep.
              </span>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
