export const AI_API_ROUTES = {
  GENERATE_FLASHCARDS: '/ai/generate/flashcards',
  GENERATE_SUMMARY: '/ai/generate/summary',
  GENERATE_QUIZ: '/ai/generate/quiz',
  STATUS: (id: number) => `/ai/generate/${id}/status`,
  CONFIG: '/ai/config',
  UPDATE_CONFIG: '/ai/config',
  TOKEN_USAGE: '/ai/token-usage',
} as const
