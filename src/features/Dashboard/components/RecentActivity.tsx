// features/dashboard/components/RecentActivity.tsx

interface ActivityItem {
    id: string
    description: string
    timeAgo: string
    type: 'quiz' | 'set' | 'flashcard' | 'other'
}

// Replace with real data from your store/API
const ACTIVITY: ActivityItem[] = [
    {
        id: '1',
        description: 'Nuevo quiz generado — Quiz: La mediana',
        timeAgo: 'hace 1 día',
        type: 'quiz',
    },
    {
        id: '2',
        description: 'Nuevo set creado — Arte',
        timeAgo: 'hace 1 día',
        type: 'set',
    },
    {
        id: '3',
        description: 'Sesión de flashcards — Varianza y desviación estándar',
        timeAgo: 'hace 7 días',
        type: 'flashcard',
    },
    {
        id: '4',
        description: 'Sesión de flashcards — Varianza y desviación estándar',
        timeAgo: 'hace 6 días',
        type: 'flashcard',
    },
    {
        id: '5',
        description: 'Sesión de flashcards — Varianza y desviación estándar',
        timeAgo: 'hace 5 días',
        type: 'flashcard',
    },
    {
        id: '6',
        description: 'Sesión de flashcards — Varianza y desviación estándar',
        timeAgo: 'hace 4 días',
        type: 'flashcard',
    },
    {
        id: '7',
        description: 'Sesión de flashcards — Varianza y desviación estándar',
        timeAgo: 'hace 3 días',
        type: 'flashcard',
    },
]

const TYPE_ICON: Record<ActivityItem['type'], string> = {
    quiz: '📝',
    set: '📚',
    flashcard: '🃏',
    other: '📌',
}

export function RecentActivity() {
    return (
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
            <h2 className="text-text font-semibold text-base">
                Actividad reciente
            </h2>
            <div className="space-y-1">
                {ACTIVITY.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-start justify-between gap-3 py-2.5 border-b border-border last:border-0"
                    >
                        <div className="flex items-start gap-2.5 min-w-0">
                            <span className="text-sm mt-0.5 shrink-0">
                                {TYPE_ICON[item.type]}
                            </span>
                            <p className="text-text text-sm truncate">
                                {item.description}
                            </p>
                        </div>
                        <span className="text-muted text-xs shrink-0 whitespace-nowrap">
                            {item.timeAgo}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}