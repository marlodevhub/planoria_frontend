import { useQuery } from '@tanstack/react-query'
import { reportService } from '../services/reportService'

export function useCourseReport(courseId?: number) {
  return useQuery({
    queryKey: ['reports', 'performance', courseId],
    queryFn: () => reportService.getPerformanceReport(courseId),
    staleTime: 5 * 60 * 1000,
  })
}
