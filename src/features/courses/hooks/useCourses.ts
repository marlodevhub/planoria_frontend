// hooks/useCourses.ts

// "dame la lista de cursos"
import { useQuery } from '@tanstack/react-query'
import { courseService } from '../services/courseService'
import type { Course } from '../types/course.types'

export function useCourses() {
    return useQuery<Course[]>({
        queryKey: ['courses'],
        queryFn: () => courseService.getAll(),
    })
}