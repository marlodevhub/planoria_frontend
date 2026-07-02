import { useQuery } from '@tanstack/react-query'
import { quizService } from '../services/quizService'
import type { QuizDetail } from '../types/quiz.types'

export function useQuiz(id: number) {
  return useQuery<QuizDetail>({
    queryKey: ['quizzes', id],
    queryFn: () => quizService.getById(id),
    enabled: id > 0,
    staleTime: 1000 * 60 * 2,
  })
}
