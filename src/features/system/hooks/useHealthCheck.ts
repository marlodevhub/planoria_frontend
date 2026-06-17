import { useQuery } from '@tanstack/react-query'
import { systemService } from '../services/systemService'

export function useHealthCheck() {
  return useQuery({
    queryKey: ['system', 'health'],
    queryFn: () => systemService.healthCheck(),
    refetchInterval: 60 * 1000,
  })
}
