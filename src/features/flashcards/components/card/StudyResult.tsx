import { cn } from '@/lib/utils'
import type { StudyResult } from '../../types/flashcard.types'

interface StudyResultProps {
    result: StudyResult
    onRepeat: () => void
    onExit: () => void
}

export function StudyResult({ result, onRepeat, onExit }: StudyResultProps) {
    const pct = Math.round((result.known / result.total) * 100)

    const stats = [
        { label: 'Sabía', value: result.known, color: 'text-emerald-400' },
        { label: 'No sabía', value: result.unknown, color: 'text-red-400' },
        { label: 'Retención', value: `${pct}%`, color: 'text-accent' },
    ]

    return (
        <div className="min-h-[80vh] flex items-center justify-center animate-fade-up">
            <div className="flex flex-col items-center gap-6 text-center max-w-sm">
                <div className="h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <i className="ti ti-trophy text-emerald-400 text-[36px]" aria-hidden="true" />
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-text">¡Mazo completado!</h1>
                    <p className="text-muted text-sm mt-1">Aquí tienes tu resumen</p>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full">
                    {stats.map((s) => (
                        <div key={s.label} className="bg-surface border border-border rounded-xl p-3 text-center">
                            <p className={cn('text-2xl font-bold', s.color)}>{s.value}</p>
                            <p className="text-muted text-xs font-mono mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>

                <div className="flex gap-3 w-full">
                    <button
                        onClick={onRepeat}
                        className="flex-1 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white text-sm font-medium transition-colors"
                    >
                        Repetir mazo
                    </button>
                    <button
                        onClick={onExit}
                        className="flex-1 py-2.5 rounded-xl border border-border text-muted hover:text-text hover:bg-white/5 text-sm transition-colors"
                    >
                        Volver
                    </button>
                </div>
            </div>
        </div>
    )
}