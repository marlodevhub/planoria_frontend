// features/dashboard/components/RetentionByTopic.tsx

interface Topic {
    name: string
    retention: number
    color: string // Tailwind bg class or hex
}

// Replace with real data from your store/API
const TOPICS: Topic[] = [
    { name: 'Estadística', retention: 0, color: '#6366f1' },
    { name: 'Álgebra Lineal', retention: 0, color: '#22c55e' },
    { name: 'Física', retention: 0, color: '#f97316' },
]

interface TopicRowProps extends Topic { }

function TopicRow({ name, retention, color }: TopicRowProps) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                    <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: color }}
                    />
                    <span className="text-text">{name}</span>
                </div>
                <span className="text-muted">{retention}%</span>
            </div>
            <div className="w-full bg-bg rounded-full h-1.5 overflow-hidden">
                <div
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{
                        width: `${retention}%`,
                        backgroundColor: color,
                    }}
                />
            </div>
        </div>
    )
}

export function RetentionByTopic() {
    return (
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-5">
            <h2 className="text-text font-semibold text-base">
                Retención por tema
            </h2>
            <div className="space-y-4">
                {TOPICS.map((topic) => (
                    <TopicRow key={topic.name} {...topic} />
                ))}
            </div>
        </div>
    )
}