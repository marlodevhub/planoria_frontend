import { useMutation } from "@tanstack/react-query";
import { flashcardService } from "../../services/flashcardService";
import type { StartStudySessionDto } from "../../types/flashcard.types";

export function useStartSession() {
  return useMutation({
    mutationFn: (dto: StartStudySessionDto) =>
      flashcardService.startSession(dto),
  });
}
