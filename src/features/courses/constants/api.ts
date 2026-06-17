export const COURSE_API_ROUTES = {
  BASE: "/courses",
  SEARCH: "/courses/search",
  BY_ID: (id: number) => `/courses/${id}`,
  ARCHIVE: (id: number) => `/courses/${id}/archive`,
  RESTORE: (id: number) => `/courses/${id}/restore`,
  MEMBERS: (id: number) => `/courses/${id}/members`,
  MEMBER_BY_ID: (courseId: number, userId: number) => `/courses/${courseId}/members/${userId}`,
  EXAMS: (id: number) => `/courses/${id}/exams`,
  EXAM_BY_ID: (courseId: number, examId: number) => `/courses/${courseId}/exams/${examId}`,
  STATS: (id: number) => `/courses/${id}/stats`,
  COURSE_EXAM_PROGRESS: (courseId: number) => `/courses/${courseId}/exam-progress`,
  EXAM_READINESS: (courseId: number) => `/courses/${courseId}/readiness`,
  EXAM_WEAKNESSES: (courseId: number) => `/courses/${courseId}/weaknesses`,
} as const;

