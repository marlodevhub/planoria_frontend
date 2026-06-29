import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cronogramaService } from '../services/cronogramaService'
import type { CreateScheduleContentDto } from '../types/cronograma.types'

export function useCreateScheduleContent(scheduleId: number) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (dto: CreateScheduleContentDto) =>
            cronogramaService.createContent(scheduleId, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['schedules', scheduleId, 'contents'] })
        },
    })
}