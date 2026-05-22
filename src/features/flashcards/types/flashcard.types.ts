export type DeckMethod = 'tema' | 'archivo' | 'manual'
export type Difficulty = 'easy' | 'med' | 'hard'

export interface ManualCard {
    id: string
    question: string
    answer: string
}

export interface CreateDeckForm {
    courseName: string
    method: DeckMethod
    difficulty: Difficulty | null
    topic: string
    cardCount: number
    file: File | null
    manualCards: ManualCard[]
}

export interface Deck {
    id: string
    courseName: string
    cardCount: number
    method: DeckMethod
    difficulty: Difficulty | null
    retention: number
    cards: ManualCard[]
}


export interface Card {
    id: string
    question: string
    answer: string
}

export interface StudySession {
    cards: Card[]
    idx: number
    known: number
    unknown: number
    done: boolean
    flipped: boolean
}

export interface StudyResult {
    known: number
    unknown: number
    total: number
}
