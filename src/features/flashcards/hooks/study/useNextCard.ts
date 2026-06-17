// hooks/study/useNextCard.ts
import { useQuery } from "@tanstack/react-query";
import { flashcardService } from "../../services/flashcardService";

export function useNextCard(sessionId: number | null) {
  return useQuery({
    queryKey: ["nextCard", sessionId],
    queryFn: () => flashcardService.getNextCard(sessionId!),
    enabled: sessionId !== null,
  });
}
