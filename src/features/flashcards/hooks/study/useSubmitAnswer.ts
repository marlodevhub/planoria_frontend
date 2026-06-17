import { useMutation } from "@tanstack/react-query";
import { flashcardService } from "../../services/flashcardService";
import type { SubmitAnswerDto } from "../../types/flashcard.types";

export function useSubmitAnswer(sessionId: number) {
  return useMutation({
    mutationFn: (dto: SubmitAnswerDto) =>
      flashcardService.submitAnswer(sessionId, dto),
  });
}
