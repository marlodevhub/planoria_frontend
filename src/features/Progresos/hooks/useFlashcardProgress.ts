import { useQuery } from '@tanstack/react-query'
import { progresosService } from '../services/progresosService'
import type { FlashcardProgress } from '../types/progresos.types'

export function useFlashcardProgress() {
  return useQuery<FlashcardProgress[]>({
    queryKey: ['progresos', 'flashcard-progress'],
    queryFn: () => progresosService.getFlashcardProgress(),
    staleTime: 1000 * 60 * 2,
  })
}
