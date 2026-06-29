import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cronogramaService } from '../services/cronogramaService'
import type { CreateScheduleRequest } from '../types/cronograma.types'

export function useCreateSchedule() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (req: CreateScheduleRequest) => cronogramaService.create(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cronograma'] })
    },
  })
}
