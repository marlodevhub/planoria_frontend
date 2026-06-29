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

export function useQuizComparison(quizId1: number, quizId2: number) {
  return useQuery({
    queryKey: ['quizzes', 'comparison', quizId1, quizId2],
    queryFn: () => quizService.getQuizComparison(quizId1, quizId2),
    enabled: !!quizId1 && !!quizId2,
    staleTime: 5 * 60 * 1000,
  })
}

export function useQuizWeakTopics(courseId: number) {
  return useQuery({
    queryKey: ['quizzes', 'weak-topics', courseId],
    queryFn: () => quizService.getQuizWeakTopics(courseId),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000,
  })
}

export function useQuizImprovement(quizId: number) {
  return useQuery({
    queryKey: ['quizzes', 'improvement', quizId],
    queryFn: () => quizService.getQuizImprovement(quizId),
    enabled: !!quizId,
    staleTime: 5 * 60 * 1000,
  })
}

export function useQuizAverage() {
  return useQuery({
    queryKey: ['quizzes', 'average'],
    queryFn: () => quizService.getQuizAverage(),
    staleTime: 5 * 60 * 1000,
  })
}

export function useCompareCourses() {
  return useQuery({
    queryKey: ['quizzes', 'compare-courses'],
    queryFn: () => quizService.getCompareCourses(),
    staleTime: 5 * 60 * 1000,
  })
}

export function useCompareTimeframes() {
  return useQuery({
    queryKey: ['quizzes', 'compare-timeframes'],
    queryFn: () => quizService.getCompareTimeframes(),
    staleTime: 5 * 60 * 1000,
  })
}
