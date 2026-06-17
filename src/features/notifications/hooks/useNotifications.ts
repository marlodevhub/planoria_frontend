import { useQuery } from '@tanstack/react-query'
import { notificationService } from '../services/notificationService'

export function useNotifications(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ['notifications', page, pageSize],
    queryFn: () => notificationService.getAll(page, pageSize),
    staleTime: 30 * 1000,
  })
}

export function useUnreadCount() {
  return useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: () => notificationService.getUnreadCount(),
    refetchInterval: 60 * 1000,
  })
}
