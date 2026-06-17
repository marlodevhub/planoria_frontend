export interface GenerateFlashcardsDto {
  fileId: number
  contentType: 'flashcard'
  topic: string
  targetCourseId: number
  numberOfItems: number
  difficulty: 'easy' | 'medium' | 'hard'
  language: string
}

export interface GenerateFlashcardsResponse {
  generationId: number
  fileId: number
  contentType: string
  status: string
  progress: number
  estimatedTime: number
  createdAt: string
}

export interface GenerateSummaryDto {
  fileId: number
  maxLength?: number
  language?: string
}

export interface GenerateSummaryResponse {
  generationId: number
  summary: string
  keyPoints: string[]
  status: string
  createdAt: string
}

export interface GenerateQuizDto {
  fileId: number
  title: string
  targetCourseId: number
  numberOfQuestions: number
  difficulty: 'easy' | 'medium' | 'hard'
  language: string
}

export interface GenerateQuizResponse {
  generationId: number
  quizId: number
  title: string
  questions: GeneratedQuestion[]
  status: string
  createdAt: string
}

export interface GeneratedQuestion {
  text: string
  options: { text: string; isCorrect: boolean }[]
  explanation: string
}

export interface AIConfig {
  id: number
  model: string
  temperature: number
  maxTokens: number
  apiEndpoint: string
  isActive: boolean
}

export interface UpdateAIConfigDto {
  model?: string
  temperature?: number
  maxTokens?: number
  apiEndpoint?: string
  isActive?: boolean
}

export interface TokenUsage {
  totalTokensUsed: number
  tokensUsedToday: number
  monthlyLimit: number
  monthlyUsed: number
  remaining: number
}
