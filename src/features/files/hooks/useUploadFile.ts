import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fileService } from '../services/fileService'

export function useUploadFile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ courseId, file }: { courseId: number; file: File }) =>
      fileService.upload(courseId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] })
    },
  })
}
