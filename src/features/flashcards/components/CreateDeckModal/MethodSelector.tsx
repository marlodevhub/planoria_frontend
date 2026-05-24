import { cn } from '@/lib/utils'
import type { DeckMethod } from '../../types/flashcard.types'

// Selector para elegir el método de creación del mazo.

const methods: { key: DeckMethod; icon: string; label: string }[] = [
    { key: 'tema', icon: 'ti-bulb', label: 'Por tema' },
    { key: 'archivo', icon: 'ti-file-upload', label: 'Por archivo' },
    { key: 'manual', icon: 'ti-edit', label: 'Manual' },
]

interface MethodSelectorProps {
    value: DeckMethod
    onChange: (m: DeckMethod) => void
}

export function MethodSelector({ value, onChange }: MethodSelectorProps) {
    return (
        <div className="grid grid-cols-3 gap-2">
            {methods.map((m) => (
                <button
                    key={m.key}
                    type="button"
                    onClick={() => onChange(m.key)}
                    className={cn(
                        'flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-150',
                        value === m.key
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-border text-muted hover:bg-white/5 hover:text-text'
                    )}
                >
                    <i className={`ti ${m.icon} text-[20px]`} aria-hidden="true" />
                    <span className="text-xs font-medium">{m.label}</span>
                </button>
            ))}
        </div>
    )
}