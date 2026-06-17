// features/dashboard/components/RetentionByTopic.tsx

interface Topic {
  name: string;
  retention: number;
  color: string;
}

const TOPICS: Topic[] = [
  { name: "Estadística", retention: 0, color: "#6366f1" },
  { name: "Álgebra Lineal", retention: 0, color: "#22c55e" },
  { name: "Física", retention: 0, color: "#f97316" },
];

interface TopicRowProps extends Topic {}

function TopicRow({ name, retention, color }: TopicRowProps) {
  return (
    <div className="space-y-1.5 group">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform group-hover:scale-110"
            style={{ backgroundColor: color }}
          />
          <span className="text-gray-700 group-hover:text-accent transition-colors">
            {name}
          </span>
        </div>
        <span className="text-gray-500 font-medium">{retention}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className="h-2 rounded-full transition-all duration-700"
          style={{
            width: `${retention}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

export function RetentionByTopic() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5 hover:border-accent/20 transition-all duration-300">
      <h2 className="text-gray-900 font-semibold text-base flex items-center gap-2">
        📊 Retención por tema
      </h2>
      <div className="space-y-4">
        {TOPICS.map((topic) => (
          <TopicRow key={topic.name} {...topic} />
        ))}
      </div>
    </div>
  );
}
