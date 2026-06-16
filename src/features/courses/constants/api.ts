// features/courses/constants/api.ts
export const COURSE_API_ROUTES = {
    BASE: '/courses',
    BY_ID: (id: number) => `/courses/${id}`,
} as const