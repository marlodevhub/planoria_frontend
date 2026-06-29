import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cronogramaService } from '../services/cronogramaService'

export function useToggleComplete() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      completed ? cronogramaService.markComplete(id) : cronogramaService.markIncomplete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cronograma'] })
    },
  })
}
