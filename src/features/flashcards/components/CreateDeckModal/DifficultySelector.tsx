import { cn } from '@/lib/utils'
import type { Difficulty } from '../../types/flashcard.types'

// Botones de deficultad

const opts: { key: Difficulty; label: string; cls: string }[] = [
    { key: 'easy', label: 'Fácil', cls: 'border-emerald-500 bg-emerald-500/10 text-emerald-400' },
    { key: 'med', label: 'Media', cls: 'border-yellow-500  bg-yellow-500/10  text-yellow-400' },
    { key: 'hard', label: 'Difícil', cls: 'border-red-500     bg-red-500/10     text-red-400' },
]

interface DifficultyProps {
    value: Difficulty | null
    onChange: (d: Difficulty) => void
}

export function DifficultySelector({ value, onChange }: DifficultyProps) {
    return (
        <div className="flex gap-2">
            {opts.map((o) => (
                <button
                    key={o.key}
                    type="button"
                    onClick={() => onChange(o.key)}
                    className={cn(
                        'flex-1 py-2 rounded-lg border text-xs font-medium transition-all duration-150',
                        value === o.key ? o.cls : 'border-border text-muted hover:bg-white/5'
                    )}
                >
                    {o.label}
                </button>
            ))}
        </div>
    )
}