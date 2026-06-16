// hooks/useCreateCourse.ts

// "Creara un curso"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../services/courseService";
import type { CreateCourseDto } from "../types/course.types";

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateCourseDto) => courseService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

