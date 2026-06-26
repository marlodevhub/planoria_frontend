import { useMutation, useQueryClient } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";
import type { ReorderCardsDto } from "../types/flashcard.types";

export function useReorderCards(deckId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: ReorderCardsDto) => flashcardService.reorderCards(deckId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards", deckId] });
    },
  });
}
