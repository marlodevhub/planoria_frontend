import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cronogramaService } from '../services/cronogramaService'

export function useAutoAssignContent(scheduleId: number) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () =>
            cronogramaService.autoAssignContent(scheduleId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['schedules', scheduleId, 'contents'] })
        },
    })
}