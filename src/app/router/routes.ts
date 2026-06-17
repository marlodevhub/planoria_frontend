export const ROUTES = {
  LANDING: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/workspace",
  FLASHCARDS: "/workspace/flashcards",
  QUIZZES: "/workspace/quizzes",
  CRONOGRAMA: "/workspace/cronograma",
  PROGRESO: "/workspace/progreso",
  CURSOS: "/workspace/courses",
  PERFIL: "/workspace/perfil",
} as const;

export const buildRoute = {
  deckDetail: (deckId: number) => `/workspace/flashcards/${deckId}`,
  studySession: (deckId: number) => `/workspace/flashcards/${deckId}/study`,
}
