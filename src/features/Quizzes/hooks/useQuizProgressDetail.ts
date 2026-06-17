import { useQuery } from '@tanstack/react-query'
import { quizService } from '../services/quizService'

export function useQuizProgressDetail(quizId: number) {
  return useQuery({
    queryKey: ['quizzes', quizId, 'progress'],
    queryFn: () => quizService.getQuizProgress(quizId),
    enabled: !!quizId,
    staleTime: 2 * 60 * 1000,
  })
}

export function useQuizComparison(quizId: number) {
  return useQuery({
    queryKey: ['quizzes', quizId, 'comparison'],
    queryFn: () => quizService.getQuizComparison(quizId),
    enabled: !!quizId,
    staleTime: 5 * 60 * 1000,
  })
}

export function useQuizWeakTopics(quizId: number) {
  return useQuery({
    queryKey: ['quizzes', quizId, 'weak-topics'],
    queryFn: () => quizService.getQuizWeakTopics(quizId),
    enabled: !!quizId,
    staleTime: 5 * 60 * 1000,
  })
}
