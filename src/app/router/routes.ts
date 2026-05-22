export const ROUTES = {
    LANDING: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    WORKSPACE: '/workspace',
    FLASHCARDS: '/workspace/flashcards',
    FLASHCARDS_STUDY: '/workspace/flashcards/:deckId/study',
    QUIZZES: '/workspace/quizzes',
    CRONOGRAMA: '/workspace/cronograma',
    PROGRESO: '/workspace/progreso',
    CURSOS: '/workspace/cursos',
    ADMIN: '/admin',
} as const