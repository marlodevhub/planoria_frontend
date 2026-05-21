import { Card } from '@/components/ui/Card'

const bars = [
    { label: 'Tareas', value: 40, color: 'bg-accent' },
    { label: 'Trabajos compl.', value: 80, color: 'bg-emerald-500' },
    { label: 'Horas', value: 25, color: 'bg-yellow-500' },
]

export function StatisticsPanel() {
    return (
        <Card className="h-full flex flex-col">
            <h3 className="font-semibold text-text mb-4">Estadísticas del mes</h3>

            {/* Placeholder gráfico circular */}
            <div className="flex items-center justify-center py-6">
                <div className="relative h-28 w-28">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-border)" strokeWidth="10" />
                        <circle
                            cx="50" cy="50" r="40" fill="none"
                            stroke="var(--color-accent)" strokeWidth="10"
                            strokeDasharray="251.2" strokeDashoffset="75"
                            strokeLinecap="round"
                            className="transition-all duration-700"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-text font-bold text-lg">70%</span>
                    </div>
                </div>
            </div>

            {/* Barras */}
            <div className="space-y-3 mt-2">
                {bars.map((bar) => (
                    <div key={bar.label}>
                        <div className="flex justify-between mb-1">
                            <span className="text-muted text-xs font-mono">{bar.label}</span>
                            <span className="text-text text-xs font-mono font-medium">{bar.value}%</span>
                        </div>
                        <div className="h-1.5 bg-border rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-700 ${bar.color}`}
                                style={{ width: `${bar.value}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}