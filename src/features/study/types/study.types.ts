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

export interface CreateSessionRequest {
  deckId: number
  sessionType?: 'normal' | 'review' | 'cram'
  includeCards?: number[]
}

export interface CreateSessionResponse {
  id: number
  deckId: number
  deckName: string
  startedAt: string
  cardsReviewed: number
  cardsKnown: number
  cardsUnknown: number
  performanceScore: number
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
  flashcard: StudyCard
  sessionId: number
  current: number
  total: number
  remainingCards: number
}

export interface SubmitAnswerRequest {
  flashcardId: number
  sessionId: number
  knewIt: boolean
  responseTimeMs: number
}

export interface SubmitAnswerResponse {
  correct: boolean
  nextReview: string
  interval: number
}

export interface EndSessionResponse {
  id: number
  deckId: number
  deckName: string
  startedAt: string
  endedAt: string
  cardsReviewed: number
  cardsKnown: number
  cardsUnknown: number
  performanceScore: number
}

export interface SessionSummary {
  id: number
  deckId: number
  deckName: string
  courseName: string
  startedAt: string
  endedAt: string
  duration: number
  totalCards: number
  reviewedCards: number
  correctCards: number
  incorrectCards: number
  accuracy: number
  xpGained: number
}

export interface DueCardsInfo {
  deckId: number
  dueCount: number
  nextDue: string
}

export interface OverdueInfo {
  deckId: number
  deckName: string
  overdueCount: number
  cards: {
    cardId: number
    question: string
    daysOverdue: number
    interval: number
  }[]
}

export interface ReviewScheduleRequest {
  deckId: number
  cardIds: number[]
  scheduledDate: string
}

export interface ReviewScheduleResponse {
  scheduledCount: number
  scheduledDate: string
}

export interface DeckPerformance {
  deckId: number
  deckName: string
  totalSessions: number
  totalReviewed: number
  averageAccuracy: number
  totalStudyTime: number
  streakDays: number
  trend: { date: string; accuracy: number; reviewed: number }[]
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
