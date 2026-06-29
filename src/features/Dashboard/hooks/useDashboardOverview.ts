import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../services/dashboardService'
import type { DashboardOverview } from '../types/dashboard.types'

export function useDashboardOverview() {
  return useQuery<DashboardOverview>({
    queryKey: ['dashboard', 'overview'],
    queryFn: () => dashboardService.getOverview(),
    staleTime: 1000 * 60 * 2,
  })
}
