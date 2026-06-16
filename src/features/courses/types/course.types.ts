// Enviar PUT /courses/:id
export interface UpdateCourseDto {
    name?: string
    description?: string
    examDate?: string
    examTime?: string
    colorHex?: string
    isArchived?: boolean
}

// Enviar POST /courses
export interface CreateCourseDto {
    name: string
    description: string
    examDate: string
    examTime: string
    colorHex?: string
}

// Lo que devuelve GET /courses (lista)
export interface Course {
    id: number
    name: string
    colorHex: string
    examDate: string
    progressPercentage: number
    isArchived: boolean
}

// Lo que devuelve GET /courses/:id (detalle)
export interface CourseDetail {
    id: number
    name: string
    colorHex: string
    examDate: string
    progressPercentage: number
    isArchived: boolean
    description: string
    examTime: string
    totalFlashcards: number
    totalQuizzes: number
    createdAt: string
    updatedAt: string
}