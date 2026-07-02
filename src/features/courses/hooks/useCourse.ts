// hooks/useCourse.ts
// "dame un curso por id"
import { useQuery } from "@tanstack/react-query";
import { courseService } from "../services/courseService";
import type { CourseDetail } from "../types/course.types";

// hooks/useCourse.ts
export function useCourse(id: number, options?: { enabled?: boolean }) {
  return useQuery<CourseDetail>({
    queryKey: ["course", id],
    queryFn: () => courseService.getById(id),
    enabled: options?.enabled ?? true,
    staleTime: 0, // ← siempre refetch al abrir
  });
}

