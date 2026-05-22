import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { Deck } from '../types/flashcard.types'

interface DeckCardProps {
    deck: Deck
    onEdit: (deck: Deck) => void
}

const methodBadge: Record<string, { label: string; icon: string; cls: string }> = {
    manual: { label: 'Manual', icon: 'ti-edit', cls: 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20' },
    tema: { label: 'IA', icon: 'ti-sparkles', cls: 'bg-accent/10 text-accent border border-accent/20' },
    archivo: { label: 'Archivo', icon: 'ti-file', cls: 'bg-yellow-500/10 text-yellow-700 border border-yellow-500/20' },
}

const diffLabel: Record<string, string> = {
    easy: 'Fácil',
    med: 'Media',
    hard: 'Difícil',
}

function retentionColor(r: number) {
    if (r >= 75) return 'bg-emerald-500'
    if (r >= 50) return 'bg-accent'
    return 'bg-red-500'
}

export function DeckCard({ deck, onEdit }: DeckCardProps) {
    const navigate = useNavigate()
    const badge = methodBadge[deck.method]

    return (
        <div className="bg-surface border border-border rounded-2xl p-4 flex flex-col gap-3 hover:border-accent/40 transition-colors duration-200 group">

            {/* Top */}
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="font-semibold text-text text-sm leading-snug truncate">{deck.courseName}</p>
                    <p className="text-muted text-xs mt-0.5 font-mono">
                        {deck.cards.length > 0 ? 'Manual' : deck.method}
                    </p>
                </div>
                <span className={cn('flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full flex-shrink-0', badge.cls)}>
                    <i className={`ti ${badge.icon} text-[11px]`} aria-hidden="true" />
                    {badge.label}
                </span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs text-muted font-mono">
                    <i className="ti ti-cards text-[14px]" aria-hidden="true" />
                    {deck.cardCount} tarjetas
                </span>
                {deck.difficulty && (
                    <span className="flex items-center gap-1.5 text-xs text-muted font-mono">
                        <i className="ti ti-flame text-[14px]" aria-hidden="true" />
                        {diffLabel[deck.difficulty]}
                    </span>
                )}
            </div>

            {/* Retención */}
            <div>
                <div className="flex justify-between text-[11px] font-mono mb-1">
                    <span className="text-muted">Retención</span>
                    <span className="text-text">{deck.retention}%</span>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                        className={cn('h-full rounded-full transition-all duration-500', retentionColor(deck.retention))}
                        style={{ width: `${deck.retention}%` }}
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
                <button
                    onClick={() => navigate(`/workspace/flashcards/${deck.id}/study`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-xl bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
                >
                    <i className="ti ti-player-play text-[14px]" aria-hidden="true" />
                    Estudiar
                </button>
                <button
                    onClick={() => onEdit(deck)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-xl border border-border text-muted hover:text-text hover:bg-white/5 transition-colors"
                >
                    <i className="ti ti-edit text-[14px]" aria-hidden="true" />
                    Editar
                </button>
            </div>
        </div>
    )
}