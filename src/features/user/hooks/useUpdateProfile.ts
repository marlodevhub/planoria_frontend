import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '../services/userService'
import type { UpdateProfileDto } from '../types/user.types'

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: UpdateProfileDto) => userService.updateProfile(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
    },
  })
}
