import { useState } from 'react'
import { DeckCard } from '../components/DeckCard'
import { CreateDeckModal } from '../components/CreateDeckModal/CreateDeckModal'
import { EditDeckModal } from '../components/EditDeckModal/EditDeckModal'
import type { CreateDeckForm, Deck } from '../types/flashcard.types'

const initialDecks: Deck[] = [
    { id: '1', courseName: 'Varianza y desviación estándar', cardCount: 12, method: 'tema', difficulty: 'hard', retention: 60, cards: [] },
    { id: '2', courseName: 'Revolución Francesa', cardCount: 18, method: 'manual', difficulty: 'med', retention: 82, cards: [] },
    { id: '3', courseName: 'Leyes de Newton', cardCount: 24, method: 'archivo', difficulty: 'easy', retention: 45, cards: [] },
    { id: '4', courseName: 'Inglés B2', cardCount: 15, method: 'manual', difficulty: 'med', retention: 71, cards: [] },
    { id: '5', courseName: 'Geografía mundial', cardCount: 20, method: 'tema', difficulty: 'easy', retention: 90, cards: [] },
    { id: '6', courseName: 'Física cuántica', cardCount: 12, method: 'manual', difficulty: 'hard', retention: 30, cards: [] },
]

export function FlashcardsPage() {
    const [decks, setDecks] = useState<Deck[]>(initialDecks)
    const [showCreate, setShowCreate] = useState(false)
    const [editingDeck, setEditingDeck] = useState<Deck | null>(null)

    const handleCreate = (form: CreateDeckForm) => {
        const count = form.method === 'manual' ? form.manualCards.length : form.cardCount
        const newDeck: Deck = {
            id: crypto.randomUUID(),
            courseName: form.courseName || 'Nuevo mazo',
            cardCount: count,
            method: form.method,
            difficulty: form.difficulty,
            retention: 0,
            cards: form.method === 'manual' ? form.manualCards : [],
        }
        setDecks((prev) => [newDeck, ...prev])
        setShowCreate(false)
    }

    const handleSave = (updated: Deck) => {
        setDecks((prev) => prev.map((d) => d.id === updated.id ? updated : d))
        setEditingDeck(null)
    }

    return (
        <>
            <div className="space-y-6 animate-fade-up">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-text">Flashcards</h1>
                        <p className="text-muted text-sm mt-1">Estudia con tarjetas de memoria</p>
                    </div>
                    <button
                        onClick={() => setShowCreate(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-xl transition-colors shadow-lg shadow-accent/20"
                    >
                        <i className="ti ti-plus text-[16px]" aria-hidden="true" />
                        Nuevo mazo
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {decks.map((deck) => (
                        <DeckCard
                            key={deck.id}
                            deck={deck}
                            onEdit={(d) => setEditingDeck(d)}
                        />
                    ))}
                </div>
            </div>

            {showCreate && (
                <CreateDeckModal
                    onClose={() => setShowCreate(false)}
                    onSubmit={handleCreate}
                />
            )}

            {editingDeck && (
                <EditDeckModal
                    deck={editingDeck}
                    onClose={() => setEditingDeck(null)}
                    onSave={handleSave}
                />
            )}
        </>
    )
}