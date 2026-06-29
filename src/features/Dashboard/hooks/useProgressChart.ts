import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../services/dashboardService'
import type { ChartData } from '../types/dashboard.types'

export function useProgressChart(courseId?: number, period = 'week') {
  return useQuery<ChartData>({
    queryKey: ['dashboard', 'progress-chart', courseId, period],
    queryFn: () => dashboardService.getProgressChart(courseId, period),
    staleTime: 1000 * 60 * 5,
  })
}
