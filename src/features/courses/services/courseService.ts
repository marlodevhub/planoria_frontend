import api from '@/lib/axios'
import { COURSE_API_ROUTES } from '../constants/api'
import type { Course, CourseDetail, CreateCourseDto, UpdateCourseDto } from '../types/course.types'



export const courseService = {
    async getAll(): Promise<Course[]> {
        const { data } = await api.get<Course[]>(COURSE_API_ROUTES.BASE)
        return data
    },

    async getById(id: number): Promise<CourseDetail> {
        const { data } = await api.get<CourseDetail>(COURSE_API_ROUTES.BY_ID(id))
        return data
    },

    async create(dto: CreateCourseDto): Promise<Course> {
        const { data } = await api.post<Course>(COURSE_API_ROUTES.BASE, dto)
        return data
    },

    async update(id: number, dto: UpdateCourseDto): Promise<Course> {
        const { data } = await api.put<Course>(COURSE_API_ROUTES.BY_ID(id), dto)
        return data
    },

    async remove(id: number): Promise<void> {
        await api.delete(COURSE_API_ROUTES.BY_ID(id))
    },
}