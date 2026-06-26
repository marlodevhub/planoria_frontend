import { useQuery } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";

export function useDeckById(id: number) {
  return useQuery({
    queryKey: ["decks", id],
    queryFn: () => flashcardService.getDeckById(id),
    enabled: !!id,
  });
}
