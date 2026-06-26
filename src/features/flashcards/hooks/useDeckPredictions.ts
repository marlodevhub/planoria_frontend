import { useQuery } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";

export function useDeckPredictions(deckId: number) {
  return useQuery({
    queryKey: ["flashcards", "predictions", deckId],
    queryFn: () => flashcardService.getDeckPredictions(deckId),
    enabled: !!deckId,
    staleTime: 5 * 60 * 1000,
  });
}
