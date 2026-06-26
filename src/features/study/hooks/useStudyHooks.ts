import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { studyService } from '../services/study.service'
import type {
  CreateSessionRequest,
  SubmitAnswerRequest,
  ReviewScheduleRequest,
} from '../types/study.types'

export function useStudySessions() {
  return useQuery({
    queryKey: ['study', 'sessions'],
    queryFn: () => studyService.getSessions(),
    staleTime: 2 * 60 * 1000,
  })
}

export function useStudySession(id: number) {
  return useQuery({
    queryKey: ['study', 'session', id],
    queryFn: () => studyService.getSession(id),
    enabled: !!id,
  })
}

export function useCreateStudySession() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (req: CreateSessionRequest) => studyService.createSession(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study'] })
    },
  })
}

export function useStudyNextCard(sessionId: number) {
  return useQuery({
    queryKey: ['study', 'next-card', sessionId],
    queryFn: () => studyService.getNextCard(sessionId),
    enabled: !!sessionId,
  })
}

export function useSubmitAnswer(sessionId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (req: SubmitAnswerRequest) =>
      studyService.submitAnswer(sessionId, req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study', 'session', sessionId] })
      queryClient.invalidateQueries({ queryKey: ['study', 'next-card', sessionId] })
    },
  })
}

export function useEndStudySession() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => studyService.endSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study'] })
    },
  })
}

export function useSessionSummary(id: number) {
  return useQuery({
    queryKey: ['study', 'summary', id],
    queryFn: () => studyService.getSessionSummary(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export function useDueCards(deckId: number) {
  return useQuery({
    queryKey: ['study', 'due', deckId],
    queryFn: () => studyService.getDueCards(deckId),
    enabled: !!deckId,
    staleTime: 2 * 60 * 1000,
  })
}

export function useOverdue(deckId: number) {
  return useQuery({
    queryKey: ['study', 'overdue', deckId],
    queryFn: () => studyService.getOverdue(deckId),
    enabled: !!deckId,
    staleTime: 2 * 60 * 1000,
  })
}

export function useDeckPerformance(deckId: number) {
  return useQuery({
    queryKey: ['study', 'performance', deckId],
    queryFn: () => studyService.getDeckPerformance(deckId),
    enabled: !!deckId,
    staleTime: 5 * 60 * 1000,
  })
}

export function useScheduleReview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (req: ReviewScheduleRequest) => studyService.scheduleReview(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study', 'due'] })
    },
  })
}

export function useCardDetail(cardId: number) {
  return useQuery({
    queryKey: ['study', 'card', cardId],
    queryFn: () => studyService.getCardDetail(cardId),
    enabled: !!cardId,
  })
}
