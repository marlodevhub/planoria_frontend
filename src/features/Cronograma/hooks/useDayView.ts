import { useQuery } from '@tanstack/react-query'
import { cronogramaService } from '../services/cronogramaService'
import type { ScheduleListItem } from '../types/cronograma.types'

export function useDayView(date: string) {
  return useQuery<ScheduleListItem[]>({
    queryKey: ['cronograma', 'day', date],
    queryFn: () => cronogramaService.getDayView(date),
    enabled: !!date,
    staleTime: 1000 * 60 * 2,
  })
}
