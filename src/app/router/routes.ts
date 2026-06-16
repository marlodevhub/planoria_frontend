export const ROUTES = {
    LANDING: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/workspace',
    FLASHCARDS: '/workspace/flashcards',
    FLASHCARDS_STUDY: '/workspace/flashcards/:deckId/study',
    QUIZZES: '/workspace/quizzes',
    CRONOGRAMA: '/workspace/cronograma',
    PROGRESO: '/workspace/progreso',
    CURSOS: '/workspace/courses',
} as const
//constantes de paths
export const buildRoute = {
    flashcardsStudy: (deckId: string) => `/workspace/flashcards/${deckId}/study`,
}
