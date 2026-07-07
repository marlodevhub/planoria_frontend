import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../services/dashboardService'
import type { UpcomingDeadline } from '../types/dashboard.types'

export function useUpcomingDeadlines(days = 30) {
  return useQuery<UpcomingDeadline[]>({
    queryKey: ['dashboard', 'deadlines', days],
    queryFn: () => dashboardService.getUpcomingDeadlines(days),
    staleTime: 1000 * 60 * 5,
  })
}
