import { useQuery } from '@tanstack/react-query'
import { progresosService } from '../services/progresosService'
import type { WeeklyTrend } from '../types/progresos.types'

export function useWeeklyTrend(weeks = 1) {
  return useQuery<WeeklyTrend[]>({
    queryKey: ['progresos', 'weekly-trend', weeks],
    queryFn: () => progresosService.getWeeklyTrend(weeks),
    staleTime: 1000 * 60 * 5,
  })
}
