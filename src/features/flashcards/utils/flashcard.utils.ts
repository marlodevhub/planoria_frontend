import type { ManualCard } from '../types/flashcard.types'

export const makeCard = (): ManualCard => ({
    id: crypto.randomUUID(),
    question: '',
    answer: '',
})