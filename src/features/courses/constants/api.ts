// constants/api.ts
export const COURSE_API_ROUTES = {
  BASE: "/courses",
  SEARCH: "/courses/search",
  BY_ID: (id: number) => `/courses/${id}`,
  ARCHIVE: (id: number) => `/courses/${id}/archive`,
  RESTORE: (id: number) => `/courses/${id}/restore`,
} as const;

