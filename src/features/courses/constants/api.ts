// constants/api.ts
export const COURSE_API_ROUTES = {
  // CRUD BÁSICO
  BASE: "/courses",
  BY_ID: (id: number) => `/courses/${id}`,

  // ARCHIVO Y RESTAURACIÓN
  ARCHIVE: (id: number) => `/courses/${id}/archive`,
  RESTORE: (id: number) => `/courses/${id}/restore`,

  // BÚSQUEDA Y ESTADÍSTICAS
  SEARCH: "/courses/search",
  STATS: (id: number) => `/courses/${id}/stats`,

  // FECHAS DE EXAMEN
  EXAM: (id: number) => `/courses/${id}/exam`,

  // MIEMBROS DEL CURSO
  MEMBERS: (id: number) => `/courses/${id}/members`,
  MEMBER: (id: number, userId: number) => `/courses/${id}/members/${userId}`,
  MEMBER_ROLE: (id: number, userId: number) => `/courses/${id}/members/${userId}/role`,
} as const