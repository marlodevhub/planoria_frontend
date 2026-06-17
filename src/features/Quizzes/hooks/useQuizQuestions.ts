import { useQuery } from '@tanstack/react-query'
import { quizService } from '../services/quizService'
import type { Question } from '../types/quiz.types'

export function useQuizQuestions(id: number) {
  return useQuery<Question[]>({
    queryKey: ['quizzes', id, 'questions'],
    queryFn: () => quizService.getQuestions(id),
    enabled: id > 0,
    staleTime: 1000 * 60 * 5,
  })
}
