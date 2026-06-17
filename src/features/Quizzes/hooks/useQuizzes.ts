import { useQuery } from '@tanstack/react-query'
import { quizService } from '../services/quizService'
import type { QuizListItem } from '../types/quiz.types'

export function useQuizzes() {
  return useQuery<QuizListItem[]>({
    queryKey: ['quizzes', 'all'],
    queryFn: () => quizService.getAll(),
    staleTime: 1000 * 60 * 2,
  })
}
