import { useMutation, useQueryClient } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";
import type { GenerateFlashcardsDto } from "../types/flashcard.types";

export function useGenerateFlashcards(courseId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: GenerateFlashcardsDto) => flashcardService.generate(dto),
    onSuccess: () => {
      // Invalida las flashcards del curso al generar nuevas
      queryClient.invalidateQueries({ queryKey: ["flashcards", courseId] });
    },
  });
}
