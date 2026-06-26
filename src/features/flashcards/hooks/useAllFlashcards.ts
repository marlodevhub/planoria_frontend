import { useQuery } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";

export function useAllFlashcards(page = 1, pageSize = 50) {
  return useQuery({
    queryKey: ["flashcards", "all", page, pageSize],
    queryFn: () => flashcardService.getAllCards(page, pageSize),
    staleTime: 30 * 1000,
  });
}
