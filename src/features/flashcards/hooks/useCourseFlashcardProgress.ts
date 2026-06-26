import { useQuery } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";

export function useCourseFlashcardProgress(courseId: number) {
  return useQuery({
    queryKey: ["flashcards", "progress", "course", courseId],
    queryFn: () => flashcardService.getCourseFlashcardProgress(courseId),
    enabled: !!courseId,
    staleTime: 2 * 60 * 1000,
  });
}
