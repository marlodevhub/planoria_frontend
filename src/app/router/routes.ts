export const ROUTES = {
  LANDING: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/workspace",
  FLASHCARDS: "/workspace/flashcards",
  DECK: "/workspace/flashcards/:deckId",
  QUIZZES: "/workspace/quizzes",
  CRONOGRAMA: "/workspace/cronograma",
  PROGRESO: "/workspace/progreso",
  CURSOS: "/workspace/courses",
} as const;

export const buildRoute = {
  deck: (deckId: number | string) => `/workspace/flashcards/${deckId}`,
};
