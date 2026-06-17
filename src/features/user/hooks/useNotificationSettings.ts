import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '../services/userService'
import type { UpdateNotificationSettingsDto } from '../types/user.types'

export function useNotificationSettings() {
  return useQuery({
    queryKey: ['user', 'notification-settings'],
    queryFn: () => userService.getNotificationSettings(),
    staleTime: 5 * 60 * 1000,
  })
}

export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: UpdateNotificationSettingsDto) =>
      userService.updateNotificationSettings(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'notification-settings'] })
    },
  })
}
