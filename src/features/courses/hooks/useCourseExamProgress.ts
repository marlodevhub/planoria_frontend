import { useQuery } from '@tanstack/react-query'
import { courseService } from '../services/courseService'

export function useCourseExamProgress(courseId: number) {
  return useQuery({
    queryKey: ['courses', courseId, 'exam-progress'],
    queryFn: () => courseService.getExamProgress(courseId),
    enabled: !!courseId,
    staleTime: 2 * 60 * 1000,
  })
}

export function useCourseReadiness(courseId: number) {
  return useQuery({
    queryKey: ['courses', courseId, 'readiness'],
    queryFn: () => courseService.getReadiness(courseId),
    enabled: !!courseId,
    staleTime: 10 * 60 * 1000,
  })
}

export function useCourseWeaknesses(courseId: number) {
  return useQuery({
    queryKey: ['courses', courseId, 'weaknesses'],
    queryFn: () => courseService.getWeaknesses(courseId),
    enabled: !!courseId,
    staleTime: 10 * 60 * 1000,
  })
}
