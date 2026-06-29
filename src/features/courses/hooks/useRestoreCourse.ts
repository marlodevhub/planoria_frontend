import { useMutation, useQueryClient } from '@tanstack/react-query'
import { courseService } from '../services/courseService'

export function useRestoreCourse() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => courseService.restore(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] })
        },
    })
}