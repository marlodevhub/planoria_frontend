export const STUDY_API_ROUTES = {
  SESSIONS: '/study/sessions',
  SESSION_BY_ID: (id: number) => `/study/sessions/${id}`,
  START_SESSION: (id: number) => `/study/sessions/${id}/start`,
  NEXT_CARD: (id: number) => `/study/sessions/${id}/next-card`,
  SUBMIT_RESULT: (id: number) => `/study/sessions/${id}/submit-result`,
  PAUSE_SESSION: (id: number) => `/study/sessions/${id}/pause`,
  RESUME_SESSION: (id: number) => `/study/sessions/${id}/resume`,
  COMPLETE_SESSION: (id: number) => `/study/sessions/${id}/complete`,
  DUE_CARDS: (deckId: number) => `/study/decks/${deckId}/due`,
  CARD_DETAIL: (cardId: number) => `/study/cards/${cardId}`,
} as const
