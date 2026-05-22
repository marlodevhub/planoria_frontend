import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ManualCardRow } from '../CreateDeckModal/ManualCardRow'
import type { Deck, ManualCard } from '../../types/flashcard.types'

const makeCard = (): ManualCard => ({
    id: crypto.randomUUID(),
    question: '',
    answer: '',
})

interface EditDeckModalProps {
    deck: Deck
    onClose: () => void
    onSave: (deck: Deck) => void
}

const inputCls = 'w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-text text-sm placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors'

export function EditDeckModal({ deck, onClose, onSave }: EditDeckModalProps) {
    const [courseName, setCourseName] = useState(deck.courseName)
    const [cards, setCards] = useState<ManualCard[]>(
        deck.cards.length > 0
            ? deck.cards
            : [makeCard(), makeCard()]
    )

    const addCard = () => setCards((c) => [...c, makeCard()])

    const deleteCard = (id: string) =>
        setCards((c) => c.filter((card) => card.id !== id))

    const updateCard = (id: string, field: 'question' | 'answer', value: string) =>
        setCards((c) => c.map((card) => card.id === id ? { ...card, [field]: value } : card))

    const handleSave = () => {
        onSave({ ...deck, courseName, cards, cardCount: cards.length })
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-surface border border-border rounded-2xl w-full max-w-lg shadow-2xl shadow-black/40 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
                    <div>
                        <h2 className="font-semibold text-text">Editar mazo</h2>
                        <p className="text-muted text-xs font-mono mt-0.5">{cards.length} tarjetas</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="h-8 w-8 flex items-center justify-center rounded-lg text-muted hover:text-text hover:bg-white/5 transition-colors"
                        aria-label="Cerrar"
                    >
                        <i className="ti ti-x text-[18px]" aria-hidden="true" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

                    {/* Nombre */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted">Nombre del curso</label>
                        <input
                            type="text"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            className={inputCls}
                        />
                    </div>

                    {/* Tarjetas */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted">Tarjetas</label>
                        <div className="bg-bg/50 border border-border rounded-xl p-4 space-y-4">
                            {cards.map((card, i) => (
                                <ManualCardRow
                                    key={card.id}
                                    card={card}
                                    index={i}
                                    onChange={updateCard}
                                    onDelete={deleteCard}
                                    canDelete={cards.length > 1}
                                />
                            ))}
                            <div className="flex items-center justify-between pt-1">
                                <button
                                    type="button"
                                    onClick={addCard}
                                    className="flex items-center gap-2 text-sm text-muted hover:text-text border border-dashed border-border hover:border-border rounded-lg px-3 py-2 transition-colors"
                                >
                                    <i className="ti ti-plus text-[15px]" aria-hidden="true" />
                                    Agregar tarjeta
                                </button>
                                <span className="text-xs text-muted font-mono">{cards.length} tarjetas</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-muted hover:text-text border border-border rounded-xl hover:bg-white/5 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-5 py-2 text-sm font-medium bg-accent hover:bg-accent/90 text-white rounded-xl transition-colors shadow-lg shadow-accent/20"
                    >
                        Guardar cambios
                    </button>
                </div>
            </div>
        </div>
    )
}