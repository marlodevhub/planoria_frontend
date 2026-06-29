// ============================================================
// CRUD BÁSICO
// ============================================================

// POST /api/courses
export interface CreateCoursePayload {
    name: string
    description?: string | null  // ← agregá null
    examDate?: string | null     // ← agregá null
    examTime?: string | null     // ← agregá null
    colorHex?: string
}

// PUT /api/courses/:id
export interface UpdateCourseDto {
    name?: string
    description?: string | null  // ← agregá null
    examDate?: string | null     // ← agregá null
    examTime?: string | null     // ← agregá null
    colorHex?: string
    isArchived?: boolean
}

// GET /api/courses
export interface Course {
    id: number
    name: string
    colorHex: string
    examDate: string
    progressPercentage: number
    isArchived: boolean
}

// GET /api/courses/:id
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

// ============================================================
// BÚSQUEDA Y ESTADÍSTICAS
// ============================================================

// GET /api/courses/search?searchTerm=xxx
export interface CourseSearchParams {
    searchTerm: string
}

// GET /api/courses/:id/stats
export interface CourseStats {
    courseId: number
    courseName: string
    totalStudents: number
    averageProgress: number
    totalFlashcards: number
    totalQuizzes: number
    completedQuizzes: number
    averageQuizScore: number
}

// ============================================================
// FECHAS DE EXAMEN
// ============================================================

// // GET /api/courses/:id/exam
// export interface ExamDate {
//     id: number
//     courseId: number
//     examDate: string
//     examTime: string
//     createdAt: string
//     updatedAt: string
// }

// // PUT /api/courses/:id/exam
// export interface SetExamDateRequest {
//     examDate: string
//     examTime: string
// }

// // DELETE /api/courses/:id/exam (sin body)

// // ============================================================
// // MIEMBROS DEL CURSO
// // ============================================================

// // GET /api/courses/:id/members
// export interface CourseMember {
//     id: number
//     userId: number
//     userName: string
//     userEmail: string
//     role: 'owner' | 'editor' | 'viewer'
//     joinedAt: string
//     progressPercentage: number
// }

// // POST /api/courses/:id/members
// export interface AddCourseMemberRequest {
//     userId: number
//     role?: 'editor' | 'viewer'
// }

// // DELETE /api/courses/:id/members/:userId (sin body)

// // PUT /api/courses/:id/members/:userId/role
// export interface UpdateMemberRoleRequest {
//     role: 'owner' | 'editor' | 'viewer'
// }