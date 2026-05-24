// features/dashboard/components/UpcomingExam.tsx

interface Exam {
    subject: string
    daysUntil: number
    retention: number
}

// Replace with real data from your store/API
const UPCOMING_EXAM: Exam = {
    subject: 'Física',
    daysUntil: 0,
    retention: 0,
}

export function UpcomingExam() {
    const { subject, daysUntil, retention } = UPCOMING_EXAM

    const daysLabel =
        daysUntil === 0
            ? 'en 0 días'
            : daysUntil === 1
                ? 'mañana'
                : `en ${daysUntil} días`

    return (
        <div className="bg-surface border border-border rounded-2xl p-6 h-full flex flex-col gap-4">
            <div className="flex items-center gap-2 text-muted text-sm font-medium">
                <span>📅</span>
                Próximo examen
            </div>

            <div>
                <h2 className="text-text text-2xl font-bold">{subject}</h2>
                <p className="text-accent text-sm mt-1">{daysLabel}</p>
            </div>

            <div className="mt-auto space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted">Retención actual:</span>
                    <span className="text-text font-medium">{retention}%</span>
                </div>
                <div className="w-full bg-bg rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-accent h-2 rounded-full transition-all duration-500"
                        style={{ width: `${retention}%` }}
                    />
                </div>
            </div>
        </div>
    )
}