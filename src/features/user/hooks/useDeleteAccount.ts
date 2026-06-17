import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '../services/userService'

export function useDeleteAccount() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (password: string) => userService.deleteAccount(password),
    onSuccess: () => {
      queryClient.clear()
    },
  })
}
