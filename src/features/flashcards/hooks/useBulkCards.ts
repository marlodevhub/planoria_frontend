import { useMutation, useQueryClient } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";
import type { BulkCreateFlashcardsDto, BulkUpdateFlashcardsDto } from "../types/flashcard.types";

export function useBulkCreateCards(deckId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: BulkCreateFlashcardsDto) => flashcardService.bulkCreateCards(deckId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] });
    },
  });
}

export function useBulkUpdateCards(deckId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: BulkUpdateFlashcardsDto) => flashcardService.bulkUpdateCards(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards", deckId] });
    },
  });
}
