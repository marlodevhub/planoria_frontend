import api from '@/lib/axios'
import type { Deck, Card } from '../types/flashcard.types'
import type { UploadFileResponse } from '@/features/study/types/study.types'

export const flashcardService = {
    getDecks: async (): Promise<Deck[]> => {
        const response = await api.get<Deck[]>('/archivo')
        return response.data
    },

    getCardsByDeck: async (deckId: string): Promise<Card[]> => {
        const response = await api.get<UploadFileResponse>(`/archivo/${deckId}`)
        const flashcards = response.data.analisisIA?.[0]?.flashcards ?? []
        return flashcards.map((f) => ({
            id: String(f.idFlashcard),
            question: f.pregunta,
            answer: f.respuesta,
        }))
    },
}