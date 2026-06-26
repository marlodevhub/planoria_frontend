export const COURSE_API_ROUTES = {
  BASE: "/courses",
  SEARCH: "/courses/search",
  BY_ID: (id: number) => `/courses/${id}`,
  ARCHIVE: (id: number) => `/courses/${id}/archive`,
  RESTORE: (id: number) => `/courses/${id}/restore`,
  MEMBERS: (id: number) => `/courses/${id}/members`,
  MEMBER_BY_ID: (courseId: number, userId: number) => `/courses/${courseId}/members/${userId}`,
  MEMBER_ROLE: (courseId: number, userId: number) => `/courses/${courseId}/members/${userId}/role`,
  EXAMS: (id: number) => `/courses/${id}/exam`,
  STATS: (id: number) => `/courses/${id}/stats`,
  COURSE_EXAM_PROGRESS: (courseId: number) => `/progress/exam/courses/${courseId}`,
  EXAM_READINESS: (courseId: number) => `/progress/exam/courses/${courseId}/readiness`,
  EXAM_WEAKNESSES: (courseId: number) => `/progress/exam/courses/${courseId}/weaknesses`,
} as const;

