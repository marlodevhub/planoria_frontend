import { useQuery } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";

export function useFlashcardStats(deckId: number) {
  return useQuery({
    queryKey: ["flashcards", "progress", deckId],
    queryFn: () => flashcardService.getFlashcardProgress(deckId),
    enabled: !!deckId,
    staleTime: 2 * 60 * 1000,
  });
}

export function useDeckMastery(deckId: number) {
  return useQuery({
    queryKey: ["flashcards", "mastery", deckId],
    queryFn: () => flashcardService.getDeckMastery(deckId),
    enabled: !!deckId,
    staleTime: 5 * 60 * 1000,
  });
}
