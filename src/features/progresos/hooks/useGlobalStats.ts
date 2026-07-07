import { useQuery } from '@tanstack/react-query'
import { progresosService } from '../services/progresosService'
import type { GlobalStats } from '../types/progresos.types'

export function useGlobalStats() {
  return useQuery<GlobalStats>({
    queryKey: ['progresos', 'global-stats'],
    queryFn: async () => {
      const res = await progresosService.getGlobalStats()
      return res.stats
    },
    staleTime: 1000 * 60 * 5,
  })
}
