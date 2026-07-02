// hooks/useDeleteCourse.ts

// "Borra un curso"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { courseService } from '../services/courseService'

export function useDeleteCourse() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => courseService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] })
        },
    })
}