import { useMutation } from '@tanstack/react-query'
import { aiGenerationService } from '../services/aiGenerationService'
import type { GenerateQuizDto } from '../types/aigeneration.types'

export function useGenerateQuiz() {
  return useMutation({
    mutationFn: (dto: GenerateQuizDto) =>
      aiGenerationService.generateQuiz(dto),
  })
}
