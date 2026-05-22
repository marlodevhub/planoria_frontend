import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/app/router/routes'
import { fetchCardsByDeck } from '../services/flashcards.service'
import { useStudySession } from '../hooks/useStudySession'
import { StudyCard } from '../components/study/StudyCard'
import { StudyResult } from '../components/study/StudyResult'
import type { Card } from '../types/flashcard.types'

export function StudyPage() {
    const { deckId } = useParams()
    const navigate = useNavigate()
    const [cards, setCards] = useState<Card[]>([])

    const { current, idx, flipped, known, unknown, done, progress, flip, resetFlip, advance, reset } = useStudySession(cards)

    useEffect(() => {
        if (deckId) fetchCardsByDeck(deckId).then(setCards)
    }, [deckId])

    if (done) {
        return (
            <StudyResult
                result={{ known, unknown, total: cards.length }}
                onRepeat={reset}
                onExit={() => navigate(ROUTES.FLASHCARDS)}
            />
        )
    }

    if (!current) return null

    return (
        <div
            className="min-h-[80vh] flex flex-col items-center justify-center gap-6 animate-fade-in"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
        >
            {/* Header */}
            <div className="w-full max-w-sm flex items-center justify-between">
                <button
                    onClick={() => navigate(ROUTES.FLASHCARDS)}
                    className="text-muted hover:text-text transition-colors flex items-center gap-1.5 text-sm"
                >
                    <i className="ti ti-arrow-left text-[16px]" aria-hidden="true" />
                    Salir
                </button>
                <span className="text-muted text-xs font-mono">{idx + 1} / {cards.length}</span>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-sm h-1.5 bg-border rounded-full overflow-hidden">
                <div
                    className="h-full bg-accent rounded-full transition-all duration-500"
                    style={{ width: `${progress * 100}%` }}
                />
            </div>

            {/* Tarjeta */}
            <StudyCard
                card={current}
                flipped={flipped}
                cardsBehind={Math.min(cards.length - idx - 1, 2)}
                onFlip={flip}
                onResetFlip={resetFlip}
                onNext={advance}
            />

            {/* Botones */}
            <div className="flex gap-3 w-80">
                <button
                    onClick={() => advance(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500/30 bg-red-500/5 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
                >
                    <i className="ti ti-x text-[18px]" aria-hidden="true" />
                    No lo sé
                </button>
                <button
                    onClick={() => advance(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10 transition-colors text-sm font-medium"
                >
                    <i className="ti ti-check text-[18px]" aria-hidden="true" />
                    Lo sé
                </button>
            </div>

            <p className="text-muted text-xs font-mono">Scroll · Desliza · Mantén para voltear</p>
        </div>
    )
}