
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { courseService } from '../services/courseService'

export function useArchiveCourse() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => courseService.archive(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] })
        },
    })
}