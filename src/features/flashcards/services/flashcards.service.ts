import api from '@/lib/axios'
import type { Deck, Card, UploadFileResponse } from '../types/flashcard.types'

export const flashcardService = {
    getDecks: async (): Promise<Deck[]> => {
        const response = await api.get<Deck[]>('/archivo')
        return response.data
    },

    getCardsByDeck: async (deckId: string): Promise<Card[]> => {
        const response = await api.get<UploadFileResponse>(`/archivo/${deckId}`)
        const flashcards = response.data.analisisIA?.[0]?.flashcards ?? []
        return flashcards.map((f: any) => ({
            id: String(f.idFlashcard),
            question: f.pregunta,
            answer: f.respuesta,
        }))
    },

    uploadDocument: async (file: File): Promise<UploadFileResponse> => {
        const formData = new FormData()
        formData.append('archivo', file)

        const response = await api.post<UploadFileResponse>('/archivo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        return response.data
    },
}