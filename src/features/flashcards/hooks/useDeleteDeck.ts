import { useMutation, useQueryClient } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";

export function useDeleteDeck() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => flashcardService.deleteDeck(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },
  });
}
