import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '../services/userService'
import type { UpdatePreferencesDto } from '../types/user.types'

export function useUserPreferences() {
  return useQuery({
    queryKey: ['user', 'preferences'],
    queryFn: () => userService.getPreferences(),
    staleTime: 5 * 60 * 1000,
  })
}

export function useUpdatePreferences() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: UpdatePreferencesDto) => userService.updatePreferences(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'preferences'] })
    },
  })
}
