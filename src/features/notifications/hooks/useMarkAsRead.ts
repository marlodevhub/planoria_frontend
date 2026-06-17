import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notificationService } from '../services/notificationService'

export function useMarkAsRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => notificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}
