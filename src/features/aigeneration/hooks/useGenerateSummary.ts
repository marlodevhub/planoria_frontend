import { useMutation } from '@tanstack/react-query'
import { aiGenerationService } from '../services/aiGenerationService'
import type { GenerateSummaryDto } from '../types/aigeneration.types'

export function useGenerateSummary() {
  return useMutation({
    mutationFn: (dto: GenerateSummaryDto) =>
      aiGenerationService.generateSummary(dto),
  })
}
