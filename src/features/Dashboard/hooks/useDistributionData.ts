import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../services/dashboardService'
import type { DistributionData } from '../types/dashboard.types'

export function useDistributionData(courseId?: number) {
  return useQuery<DistributionData>({
    queryKey: ['dashboard', 'distribution', courseId],
    queryFn: () => dashboardService.getDistributionData(courseId),
    staleTime: 1000 * 60 * 5,
  })
}
