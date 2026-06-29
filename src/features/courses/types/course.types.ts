//CRUD

// POST /courses  (Crear un curso)
// POST /api/courses
export interface CreateCoursePayload {
    name: string
    description?: string
    examDate?: string
    examTime?: string
    colorHex?: string
}


//PUT /courses/:id (ACTUALOZAR)
export interface UpdateCourseDto {
    name?: string
    description?: string
    examDate?: string
    examTime?: string
    colorHex?: string
    isArchived?: boolean
}

//GET /courses (lista Cursos)
export interface Course {
    id: number
    name: string
    colorHex: string
    examDate: string
    progressPercentage: number
    isArchived: boolean
}

// GET /courses/:id (Detalle de un curso)
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