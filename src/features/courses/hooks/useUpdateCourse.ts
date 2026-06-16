// hooks/useUpdateCourse.ts

// "edita un curso"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { courseService } from '../services/courseService'
import type { UpdateCourseDto } from '../types/course.types'

export function useUpdateCourse(id: number) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (dto: UpdateCourseDto) => courseService.update(id, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] })
            queryClient.invalidateQueries({ queryKey: ['courses', id] })
        },
    })
}