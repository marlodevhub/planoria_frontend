import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { courseService } from '../services/courseService'
import type { AddMemberDto, UpdateMemberRoleDto } from '../types/course.types'

export function useCourseMembers(courseId: number) {
  return useQuery({
    queryKey: ['courses', courseId, 'members'],
    queryFn: () => courseService.getMembers(courseId),
    enabled: !!courseId,
  })
}

export function useAddMember(courseId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: AddMemberDto) => courseService.addMember(courseId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses', courseId, 'members'] })
    },
  })
}

export function useRemoveMember(courseId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (userId: number) => courseService.removeMember(courseId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses', courseId, 'members'] })
    },
  })
}

export function useUpdateMemberRole(courseId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, role }: { userId: number; role: UpdateMemberRoleDto['role'] }) =>
      courseService.updateMemberRole(courseId, userId, { role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses', courseId, 'members'] })
    },
  })
}
