// ─── Formulario UI ────────────────────────────────────────
export type DeckMethod = 'tema' | 'archivo' | 'manual'
export type Difficulty = 'easy' | 'med' | 'hard'

export interface ManualCard {
    id: string
    question: string
    answer: string
}

export interface CreateDeckForm {
    courseName: string
    title: string
    method: DeckMethod
    difficulty: Difficulty | null
    topic: string
    cardCount: number
    file: File | null
    manualCards: ManualCard[]
}

// ─── GET /archivo ─────────────────────────────────────────
export interface Deck {
    idArchivo: number
    idUsuario: number
    nombreArchivo: string
    urlArchivo: string
    tipoArchivo: string
    tamanoMB: number
    fechaSubida: string
    estado: string
}

// ─── Sesión de estudio UI ─────────────────────────────────
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