import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '../services/userService'

export function useDeleteAccount() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ password, confirmationText }: { password: string; confirmationText: string }) =>
      userService.deleteAccount(password, confirmationText),
    onSuccess: () => {
      queryClient.clear()
    },
  })
}
