import { useMutation, useQueryClient } from '@tanstack/react-query'
import { quizService } from '../services/quizService'

export function useDuplicateQuiz() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => quizService.duplicateQuiz(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] })
    },
  })
}
