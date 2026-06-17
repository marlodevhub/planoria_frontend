export interface StudySession {
  id: number
  deckId: number
  deckName: string
  courseName: string
  status: 'not_started' | 'in_progress' | 'paused' | 'completed'
  totalCards: number
  reviewedCards: number
  correctCards: number
  incorrectCards: number
  startedAt: string
  pausedAt: string | null
  completedAt: string | null
  duration: number
}

export interface StartSessionResponse {
  sessionId: number
  firstCard: StudyCard | null
  totalCards: number
}

export interface StudyCard {
  cardId: number
  question: string
  answer: string
  hint: string | null
  difficulty: 'easy' | 'medium' | 'hard'
  deckId: number
}

export interface NextCardResponse {
  card: StudyCard | null
  remainingCards: number
  isComplete: boolean
}

export interface SubmitResultRequest {
  cardId: number
  quality: 1 | 2 | 3 | 4 | 5
  responseTimeMs: number
}

export interface SubmitResultResponse {
  correct: boolean
  nextReview: string
  interval: number
}

export interface CompleteSessionResponse {
  sessionId: number
  totalReviewed: number
  totalCorrect: number
  totalIncorrect: number
  accuracy: number
  duration: number
  xpGained: number
}

export interface DueCardsInfo {
  deckId: number
  dueCount: number
  nextDue: string
}

export interface CardDetail {
  id: number
  question: string
  answer: string
  hint: string | null
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
  deckId: number
  deckName: string
  lastReviewed: string | null
  nextReview: string
  interval: number
  ease: number
  repetitions: number
}
