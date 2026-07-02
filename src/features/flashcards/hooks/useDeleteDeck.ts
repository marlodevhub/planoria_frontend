import { useMutation, useQueryClient } from "@tanstack/react-query";
import { flashcardService } from "../services/flashcardService";

// Elimina un mazo e invalida la lista de mazos
export function useDeleteDeck() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => flashcardService.deleteDeck(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },
  });
}
