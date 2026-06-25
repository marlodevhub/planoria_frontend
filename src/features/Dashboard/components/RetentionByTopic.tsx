// features/dashboard/components/RetentionByTopic.tsx

interface Topic {
  name: string;
  retention: number;
}

const TOPICS: Topic[] = [
  { name: "Estadística", retention: 76 },
  { name: "Álgebra Lineal", retention: 62 },
  { name: "Física", retention: 45 },
  { name: "Cálculo", retention: 38 },
];

function TopicRow({ name, retention }: Topic) {
  return (
    <div className="space-y-1.5 group">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-primary transition-transform group-hover:scale-110" />
          <span className="text-foreground group-hover:text-primary transition-colors duration-200">
            {name}
          </span>
        </div>
        <span className="font-medium text-sm text-foreground">
          {retention}%
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="h-2 rounded-full bg-primary transition-all duration-700"
          style={{ width: `${retention}%` }}
        />
      </div>
    </div>
  );
}

export function RetentionByTopic() {
  const average = Math.round(
    TOPICS.reduce((acc, t) => acc + t.retention, 0) / TOPICS.length,
  );

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-5 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md">
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i
            className="ti ti-chart-bar text-primary text-[18px]"
            aria-hidden="true"
          />
          <h2 className="text-foreground font-semibold text-base">
            Retención por tema
          </h2>
        </div>
        <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
          {TOPICS.length} temas
        </span>
      </div>

      {/* ─── Lista de temas ─── */}
      <div className="space-y-4">
        {TOPICS.map((topic) => (
          <TopicRow key={topic.name} {...topic} />
        ))}
      </div>

      {/* ─── Footer con promedio ─── */}
      <div className="pt-3 border-t border-border/50">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Promedio general</span>
          <span className="font-medium text-foreground">{average}%</span>
        </div>
      </div>
    </div>
  );
}
