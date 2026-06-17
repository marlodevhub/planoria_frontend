import { useMutation } from '@tanstack/react-query'
import { aiGenerationService } from '../services/aiGenerationService'
import type { GenerateFlashcardsDto } from '../types/aigeneration.types'

export function useGenerateFlashcards() {
  return useMutation({
    mutationFn: (dto: GenerateFlashcardsDto) =>
      aiGenerationService.generateFlashcards(dto),
  })
}

export function useGenerateStatus() {
  return useMutation({
    mutationFn: (id: number) => aiGenerationService.getGenerationStatus(id),
  })
}
