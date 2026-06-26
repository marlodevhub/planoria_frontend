import { useQuery } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";

export function useDeckTimeline(deckId: number) {
  return useQuery({
    queryKey: ["flashcards", "timeline", deckId],
    queryFn: () => flashcardService.getDeckTimeline(deckId),
    enabled: !!deckId,
    staleTime: 2 * 60 * 1000,
  });
}
