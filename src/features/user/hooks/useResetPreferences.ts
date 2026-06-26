import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '../services/userService'

export function useResetPreferences() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => userService.resetPreferences(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'preferences'] })
    },
  })
}
