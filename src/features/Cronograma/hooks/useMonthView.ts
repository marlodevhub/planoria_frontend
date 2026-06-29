import { useQuery } from '@tanstack/react-query'
import { cronogramaService } from '../services/cronogramaService'
import type { CalendarDay } from '../types/cronograma.types'

export function useMonthView(year: number, month: number) {
  return useQuery<CalendarDay[]>({
    queryKey: ['cronograma', 'month', year, month],
    queryFn: () => cronogramaService.getMonthView(year, month),
    staleTime: 1000 * 60 * 5,
  })
}
