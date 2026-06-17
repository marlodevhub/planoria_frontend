import { useQuery } from '@tanstack/react-query'
import { userService } from '../services/userService'

export function useUserProfile() {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => userService.getProfile(),
    staleTime: 5 * 60 * 1000,
  })
}
