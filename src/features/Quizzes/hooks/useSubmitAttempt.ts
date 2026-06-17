import { useMutation, useQueryClient } from '@tanstack/react-query'
import { quizService } from '../services/quizService'
import type { SubmitAttemptRequest, QuizResult } from '../types/quiz.types'

export function useSubmitAttempt() {
  const queryClient = useQueryClient()

  return useMutation<QuizResult, Error, SubmitAttemptRequest>({
    mutationFn: (req: SubmitAttemptRequest) => quizService.submitAttempt(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] })
      queryClient.invalidateQueries({ queryKey: ['progresos'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}
