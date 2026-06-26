import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { courseService } from '../services/courseService'
import type { CreateExamDto, UpdateExamDto } from '../types/course.types'

export function useCourseExams(courseId: number) {
  return useQuery({
    queryKey: ['courses', courseId, 'exams'],
    queryFn: () => courseService.getExams(courseId),
    enabled: !!courseId,
  })
}

export function useCreateExam(courseId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateExamDto) => courseService.createExam(courseId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses', courseId, 'exams'] })
    },
  })
}

export function useUpdateExam(courseId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ examId, ...dto }: UpdateExamDto & { examId: number }) =>
      courseService.updateExam(courseId, examId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses', courseId, 'exams'] })
    },
  })
}

export function useDeleteExam(courseId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (examId: number) => courseService.deleteExam(courseId, examId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses', courseId, 'exams'] })
    },
  })
}
