import { useMutation } from '@tanstack/react-query'
import { userService } from '../services/userService'

export function useTestNotification() {
  return useMutation({
    mutationFn: () => userService.testNotification(),
  })
}
