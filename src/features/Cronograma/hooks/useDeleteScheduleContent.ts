import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cronogramaService } from '../services/cronogramaService'

export function useDeleteScheduleContent(scheduleId: number) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (contentId: number) =>
            cronogramaService.deleteContent(scheduleId, contentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['schedules', scheduleId, 'contents'] })
        },
    })
}