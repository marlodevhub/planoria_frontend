import { useQuery } from '@tanstack/react-query'
import { cronogramaService } from '../services/cronogramaService'

/** Obtiene el contenido asignado a un horario */
export function useScheduleContents(scheduleId: number) {
  return useQuery({
    queryKey: ['schedules', scheduleId, 'contents'],
    queryFn: () => cronogramaService.getContents(scheduleId),
    enabled: !!scheduleId,
  })
}