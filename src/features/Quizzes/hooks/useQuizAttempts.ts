import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { quizService } from '../services/quizService'
import type { SubmitAnswerDto, UpdateAnswerDto, BulkAnswersDto } from '../types/quiz.types'

export function useSubmitAnswer() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: SubmitAnswerDto) => quizService.submitAnswer(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] })
    },
  })
}

export function useUpdateAnswer() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: UpdateAnswerDto) => quizService.updateAnswer(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] })
    },
  })
}

export function useSubmitBulkAnswers() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: BulkAnswersDto) => quizService.submitBulkAnswers(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] })
    },
  })
}

export function useGradeAttempt() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (attemptId: number) => quizService.gradeAttempt(attemptId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] })
    },
  })
}

export function useRegradeAttempt() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (attemptId: number) => quizService.regradeAttempt(attemptId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] })
    },
  })
}

export function useAttemptHistory(quizId: number) {
  return useQuery({
    queryKey: ['quizzes', quizId, 'attempts', 'history'],
    queryFn: () => quizService.getAttemptHistory(quizId),
    enabled: !!quizId,
  })
}

export function useBestAttempt(quizId: number) {
  return useQuery({
    queryKey: ['quizzes', quizId, 'attempts', 'best'],
    queryFn: () => quizService.getBestAttempt(quizId),
    enabled: !!quizId,
  })
}

export function useCompareAttempts(ids: number[]) {
  return useQuery({
    queryKey: ['quizzes', 'attempts', 'compare', ids],
    queryFn: () => quizService.compareAttempts(ids),
    enabled: ids.length > 0,
  })
}
