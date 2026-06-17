import { useDistributionData } from '../hooks'

interface Topic {
  name: string
  retention: number
  color: string
}

const COLORS = ['#6366f1', '#22c55e', '#f97316', '#ec4899', '#06b6d4', '#eab308']

export function RetentionByTopic() {
  const { data: distribution, isLoading } = useDistributionData()

  if (isLoading) {
    return <div className="h-48 rounded-2xl bg-muted animate-pulse" />
  }

  const topics: Topic[] = distribution
    ? distribution.labels.map((label, i) => ({
        name: label,
        retention: Math.round(Number(distribution.values[i] ?? 0)),
        color: COLORS[i % COLORS.length],
      }))
    : []

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
      <h2 className="text-foreground font-semibold text-base">
        Retención por tema
      </h2>

      {topics.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No hay datos de retención aún. Estudia flashcards para ver tu progreso.
        </p>
      ) : (
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.name} className="space-y-1.5">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: topic.color }}
                  />
                  <span className="text-foreground">{topic.name}</span>
                </div>
                <span className="text-muted-foreground">{topic.retention}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-1.5 rounded-full transition-all duration-700"
                  style={{
                    width: `${topic.retention}%`,
                    backgroundColor: topic.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
