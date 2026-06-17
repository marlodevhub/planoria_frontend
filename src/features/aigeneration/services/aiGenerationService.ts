import api from '@/lib/axios'
import { AI_API_ROUTES } from '../constants/api'
import type {
  GenerateFlashcardsDto,
  GenerateFlashcardsResponse,
  GenerateSummaryDto,
  GenerateSummaryResponse,
  GenerateQuizDto,
  GenerateQuizResponse,
  AIConfig,
  UpdateAIConfigDto,
  TokenUsage,
} from '../types/aigeneration.types'

export const aiGenerationService = {
  async generateFlashcards(
    dto: GenerateFlashcardsDto,
  ): Promise<GenerateFlashcardsResponse> {
    const { data } = await api.post<GenerateFlashcardsResponse>(
      AI_API_ROUTES.GENERATE_FLASHCARDS,
      dto,
    )
    return data
  },

  async generateSummary(
    dto: GenerateSummaryDto,
  ): Promise<GenerateSummaryResponse> {
    const { data } = await api.post<GenerateSummaryResponse>(
      AI_API_ROUTES.GENERATE_SUMMARY,
      dto,
    )
    return data
  },

  async generateQuiz(dto: GenerateQuizDto): Promise<GenerateQuizResponse> {
    const { data } = await api.post<GenerateQuizResponse>(
      AI_API_ROUTES.GENERATE_QUIZ,
      dto,
    )
    return data
  },

  async getGenerationStatus(id: number): Promise<{ status: string; progress: number }> {
    const { data } = await api.get<{ status: string; progress: number }>(
      AI_API_ROUTES.STATUS(id),
    )
    return data
  },

  async getConfig(): Promise<AIConfig> {
    const { data } = await api.get<AIConfig>(AI_API_ROUTES.CONFIG)
    return data
  },

  async updateConfig(dto: UpdateAIConfigDto): Promise<AIConfig> {
    const { data } = await api.put<AIConfig>(AI_API_ROUTES.UPDATE_CONFIG, dto)
    return data
  },

  async getTokenUsage(): Promise<TokenUsage> {
    const { data } = await api.get<TokenUsage>(AI_API_ROUTES.TOKEN_USAGE)
    return data
  },
}
