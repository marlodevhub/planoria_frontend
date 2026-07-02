import { useQuery } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";
import type { DeckDetail } from "../types/flashcard.types";

export function useDeck(id: number) {
  return useQuery<DeckDetail>({
    queryKey: ["deck", id],
    queryFn: () => flashcardService.getDeckById(id),
    enabled: !!id,
  });
}
