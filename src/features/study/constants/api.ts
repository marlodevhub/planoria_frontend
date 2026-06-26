export const STUDY_API_ROUTES = {
  SESSIONS: '/study/sessions',
  SESSION_BY_ID: (id: number) => `/study/sessions/${id}`,
  CREATE_SESSION: '/study/sessions',
  NEXT_CARD: (id: number) => `/study/sessions/${id}/next`,
  SUBMIT_ANSWER: (id: number) => `/study/sessions/${id}/answer`,
  END_SESSION: (id: number) => `/study/sessions/${id}/end`,
  SESSION_SUMMARY: (id: number) => `/study/sessions/${id}/summary`,
  DUE_CARDS: (deckId: number) => `/study/decks/${deckId}/due`,
  OVERDUE: (deckId: number) => `/study/decks/${deckId}/overdue`,
  DECK_PERFORMANCE: (deckId: number) => `/study/decks/${deckId}/performance`,
  REVIEWS_SCHEDULE: '/study/reviews/schedule',
  CARD_DETAIL: (cardId: number) => `/study/cards/${cardId}`,
} as const
