import { useMutation, useQueryClient } from '@tanstack/react-query'
import { quizService } from '../services/quizService'
import type { ReorderQuestionsDto } from '../types/quiz.types'

export function useReorderQuestions(quizId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: ReorderQuestionsDto) => quizService.reorderQuestions(quizId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes', quizId, 'questions'] })
    },
  })
}
