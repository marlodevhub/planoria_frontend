import { useQuery } from '@tanstack/react-query'
import { courseService } from '../services/courseService'

export function useCourseStats(courseId: number) {
  return useQuery({
    queryKey: ['courses', courseId, 'stats'],
    queryFn: () => courseService.getStats(courseId),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000,
  })
}
