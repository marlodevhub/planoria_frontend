import type { Card } from '../types/flashcard.types'

// Cuando conectes tu API, solo cambias este archivo
export async function fetchCardsByDeck(deckId: string): Promise<Card[]> {
    // TODO: reemplazar con llamada real
    // return api.get(`/decks/${deckId}/cards`)
    return MOCK_CARDS
}

const MOCK_CARDS: Card[] = [
    { id: '1', question: '¿Qué es la varianza?', answer: 'Medida de dispersión que indica cuánto se alejan los datos de la media' },
    { id: '2', question: '¿Qué es la desviación estándar?', answer: 'Raíz cuadrada de la varianza, en las mismas unidades que los datos' },
    { id: '3', question: '¿Qué es la media aritmética?', answer: 'Suma de todos los valores dividida entre el número de elementos' },
    { id: '4', question: '¿Qué es la moda?', answer: 'El valor que aparece con mayor frecuencia en un conjunto de datos' },
    { id: '5', question: '¿Qué es la mediana?', answer: 'El valor central cuando los datos están ordenados de menor a mayor' },
]
