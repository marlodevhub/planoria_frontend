import { useMutation } from '@tanstack/react-query'
import { quizService } from '../services/quizService'
import type { StartAttemptResponse } from '../types/quiz.types'

export function useStartAttempt() {
  return useMutation<StartAttemptResponse, Error, number>({
    mutationFn: (quizId: number) => quizService.startAttempt(quizId),
  })
}
