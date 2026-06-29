import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cronogramaService } from '../services/cronogramaService'

export function useDeleteSchedule() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => cronogramaService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cronograma'] })
    },
  })
}
