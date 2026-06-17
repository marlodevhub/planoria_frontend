import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../services/dashboardService'
import type { ActivityItem } from '../types/dashboard.types'

export function useRecentActivity(limit = 20) {
  return useQuery<ActivityItem[]>({
    queryKey: ['dashboard', 'activity', limit],
    queryFn: () => dashboardService.getRecentActivity(limit),
    staleTime: 1000 * 60 * 2,
  })
}
