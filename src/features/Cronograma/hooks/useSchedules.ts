import { useQuery } from '@tanstack/react-query'
import { cronogramaService } from '../services/cronogramaService'
import type { ScheduleListItem } from '../types/cronograma.types'

export function useSchedules() {
  return useQuery<ScheduleListItem[]>({
    queryKey: ['cronograma', 'all'],
    queryFn: () => cronogramaService.getAll(),
    staleTime: 1000 * 60 * 2,
  })
}
