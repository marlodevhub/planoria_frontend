import { useQuery } from '@tanstack/react-query'
import { cronogramaService } from '../services/cronogramaService'
import type { Schedule } from '../types/cronograma.types'

export function useSchedule(id: number) {
  return useQuery<Schedule>({
    queryKey: ['cronograma', id],
    queryFn: () => cronogramaService.getById(id),
    enabled: id > 0,
    staleTime: 1000 * 60 * 2,
  })
}
