import { useMutation, useQueryClient } from '@tanstack/react-query'
import { quizService } from '../services/quizService'
import type { CreateQuizRequest } from '../types/quiz.types'

export function useCreateQuiz() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (req: CreateQuizRequest) => quizService.create(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] })
    },
  })
}
