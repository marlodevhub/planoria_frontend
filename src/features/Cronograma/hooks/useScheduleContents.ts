import { useQuery } from '@tanstack/react-query'
import { cronogramaService } from '../services/cronogramaService'
import type { ScheduleContentItem } from '../types/cronograma.types'

/** Obtiene el contenido asignado a un horario */
export function useScheduleContents(scheduleId: number) {
  return useQuery<ScheduleContentItem[]>({
    queryKey: ['schedules', scheduleId, 'contents'],
    queryFn: () => cronogramaService.getContents(scheduleId),
    enabled: !!scheduleId,
  })
}