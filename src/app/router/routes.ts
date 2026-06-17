export const ROUTES = {
  LANDING: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/workspace",
  FLASHCARDS: "/workspace/flashcards",
  DECK: "/workspace/flashcards/:deckId",
  FLASHCARDS_STUDY: "/workspace/flashcards/:deckId/study", // ← descomentá
  QUIZZES: "/workspace/quizzes",
  CRONOGRAMA: "/workspace/cronograma",
  PROGRESO: "/workspace/progreso",
  CURSOS: "/workspace/courses",
} as const;

export const buildRoute = {
  deck: (deckId: number) => `/workspace/flashcards/${deckId}`,
  study: (deckId: number) => `/workspace/flashcards/${deckId}/study`, // ← nueva
};
