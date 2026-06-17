import { useMutation } from '@tanstack/react-query'
import { userService } from '../services/userService'

export function useDeactivateAccount() {
  return useMutation({
    mutationFn: (password: string) => userService.deactivateAccount(password),
  })
}