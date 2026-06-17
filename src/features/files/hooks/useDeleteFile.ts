import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fileService } from '../services/fileService'

export function useDeleteFile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => fileService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] })
    },
  })
}
