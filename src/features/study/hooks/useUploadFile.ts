import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { studyService } from '../services/study.service'

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

export function useStartSession() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => studyService.startSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study'] })
    },
  })
}

export function useSubmitResult(sessionId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (req: import('../types/study.types').SubmitResultRequest) =>
      studyService.submitResult(sessionId, req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study', 'session', sessionId] })
    },
  })
}

export function useCompleteSession() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => studyService.completeSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study'] })
    },
  })
}
