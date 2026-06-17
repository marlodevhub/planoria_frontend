import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { systemService } from '../services/systemService'
import type { UpdateSystemConfigDto } from '../types/system.types'

export function useSystemConfig() {
  return useQuery({
    queryKey: ['system', 'config'],
    queryFn: () => systemService.getConfig(),
    staleTime: 10 * 60 * 1000,
  })
}

export function useUpdateSystemConfig(key: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: UpdateSystemConfigDto) =>
      systemService.updateConfig(key, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system', 'config'] })
    },
  })
}
