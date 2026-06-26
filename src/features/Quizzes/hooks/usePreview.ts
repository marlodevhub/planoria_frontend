import { useQuery } from '@tanstack/react-query'
import { quizService } from '../services/quizService'

export function usePreview(quizId: number) {
  return useQuery({
    queryKey: ['quizzes', quizId, 'preview'],
    queryFn: () => quizService.getPreview(quizId),
    enabled: !!quizId,
  })
}
