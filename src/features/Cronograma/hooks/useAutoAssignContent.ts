import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cronogramaService } from '../services/cronogramaService'
import type { AutoAssignRequest } from '../types/cronograma.types'

export function useAutoAssignContent(scheduleId: number) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (dto: AutoAssignRequest) =>
            cronogramaService.autoAssignContent(scheduleId, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['schedules', scheduleId, 'contents'] })
        },
    })
}