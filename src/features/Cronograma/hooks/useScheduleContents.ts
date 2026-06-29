import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { cronogramaService } from '../services/cronogramaService'
import type { CreateScheduleContentDto, AutoAssignRequest } from '../types/cronograma.types'

export function useScheduleContents(scheduleId: number) {
  return useQuery({
    queryKey: ['schedules', scheduleId, 'contents'],
    queryFn: () => cronogramaService.getContents(scheduleId),
    enabled: !!scheduleId,
  })
}

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

export function useAutoAssignContent(scheduleId: number) {
  return useMutation({
    mutationFn: (dto: AutoAssignRequest) =>
      cronogramaService.autoAssignContent(scheduleId, dto),
  })
}
