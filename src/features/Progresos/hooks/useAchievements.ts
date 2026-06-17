import { useQuery } from '@tanstack/react-query'
import { progresosService } from '../services/progresosService'
import type { Achievement } from '../types/progresos.types'

export function useAchievements() {
  return useQuery<Achievement[]>({
    queryKey: ['progresos', 'achievements'],
    queryFn: () => progresosService.getAchievements(),
    staleTime: 1000 * 60 * 5,
  })
}
