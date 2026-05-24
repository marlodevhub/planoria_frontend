import { useCallback } from 'react'
import type { ManualCard } from '../../types/flashcard.types'

// Representa UNA fila de tarjeta manual.

interface ManualCardRowProps {
    card: ManualCard
    index: number
    onChange: (id: string, field: 'question' | 'answer', value: string) => void
    onDelete: (id: string) => void
    canDelete: boolean
}

const inputCls = [
    'w-full bg-white rounded-lg px-3 py-2',
    'text-text text-sm placeholder:text-muted',
    'focus:outline-none focus:border-accent/60 transition-colors resize-none overflow-hidden',
].join(' ')

function AutoTextarea({ value, onChange, placeholder }: {
    value: string
    onChange: (v: string) => void
    placeholder: string
}) {
    const ref = useCallback((el: HTMLTextAreaElement | null) => {
        if (!el) return
        el.style.height = 'auto'
        el.style.height = `${el.scrollHeight}px`
    }, [value])

    return (
        <textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={1}
            className={inputCls}
        />
    )
}

export function ManualCardRow({ card, index, onChange, onDelete, canDelete }: ManualCardRowProps) {
    return (
        <div className="flex items-start gap-2">
            <span className="text-muted text-xs font-mono pt-2.5 w-5 flex-shrink-0 text-right">
                {index + 1}
            </span>
            <div className="flex-1 space-y-2">
                <AutoTextarea
                    value={card.question}
                    onChange={(v) => onChange(card.id, 'question', v)}
                    placeholder="Pregunta..."
                />
                <AutoTextarea
                    value={card.answer}
                    onChange={(v) => onChange(card.id, 'answer', v)}
                    placeholder="Respuesta..."
                />
            </div>
            <button
                type="button"
                onClick={() => onDelete(card.id)}
                disabled={!canDelete}
                className="mt-1.5 h-8 w-8 flex items-center justify-center rounded-lg text-muted hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                aria-label="Eliminar tarjeta"
            >
                <i className="ti ti-trash text-[15px]" aria-hidden="true" />
            </button>
        </div>
    )
} 