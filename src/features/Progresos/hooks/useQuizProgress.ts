import { useQuery } from '@tanstack/react-query'
import { progresosService } from '../services/progresosService'
import type { QuizProgress } from '../types/progresos.types'

export function useQuizProgress() {
  return useQuery<QuizProgress[]>({
    queryKey: ['progresos', 'quiz-progress'],
    queryFn: () => progresosService.getQuizProgress(),
    staleTime: 1000 * 60 * 2,
  })
}
