import { useMutation, useQueryClient } from '@tanstack/react-query'
import { quizService } from '../services/quizService'
import type { CreateOptionDto, UpdateOptionDto } from '../types/quiz.types'

export function useCreateOption(quizId: number, questionId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateOptionDto) => quizService.createOption(quizId, questionId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes', quizId, 'questions'] })
    },
  })
}

export function useUpdateOption(quizId: number, questionId: number, optionId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: UpdateOptionDto) => quizService.updateOption(quizId, questionId, optionId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes', quizId, 'questions'] })
    },
  })
}

export function useDeleteOption(quizId: number, questionId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (optionId: number) => quizService.deleteOption(quizId, questionId, optionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes', quizId, 'questions'] })
    },
  })
}
