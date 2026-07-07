import { useMutation } from '@tanstack/react-query'
import { quizService } from '../services/quizService'
import type { SimulateRequest } from '../types/quiz.types'

export function useSimulate(quizId: number) {
  return useMutation({
    mutationFn: (dto: SimulateRequest) => quizService.simulate(quizId, dto),
  })
}
