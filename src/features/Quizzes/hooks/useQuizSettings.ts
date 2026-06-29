import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { quizService } from '../services/quizService'
import type { UpdateQuizSettingsDto } from '../types/quiz.types'

export function useQuizSettings(quizId: number) {
  return useQuery({
    queryKey: ['quizzes', quizId, 'settings'],
    queryFn: () => quizService.getSettings(quizId),
    enabled: !!quizId,
  })
}

export function useUpdateSettings(quizId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: UpdateQuizSettingsDto) => quizService.updateSettings(quizId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes', quizId, 'settings'] })
    },
  })
}

export function useResetSettings(quizId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => quizService.resetSettings(quizId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes', quizId, 'settings'] })
    },
  })
}
