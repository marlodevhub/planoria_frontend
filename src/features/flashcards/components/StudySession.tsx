import { useState, useEffect } from "react";
import {
  useStartSession,
  useNextCard,
  useSubmitAnswer,
  useEndSession,
} from "../hooks";
import { Button } from "@/components/ui/button";

interface Props {
  deckId: number;
  onFinish: (stats: any) => void;
  onClose: () => void;
}

export function StudySession({ deckId, onFinish, onClose }: Props) {
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const { mutate: startSession, isPending: isStarting } = useStartSession();
  const {
    data: nextCard,
    isLoading: isLoadingCard,
    refetch,
  } = useNextCard(sessionId);
  const { mutate: submitAnswer, isPending: isSubmitting } = useSubmitAnswer(
    sessionId ?? 0,
  );
  const { mutate: endSession } = useEndSession();

  useEffect(() => {
    startSession(
      { deckId, sessionType: "normal" },
      {
        onSuccess: (session) => setSessionId(session.id),
      },
    );
  }, []);

  const handleAnswer = (knewIt: boolean) => {
    if (!sessionId || !nextCard?.flashcard) return;
    const responseTimeMs = Date.now() - startTime;
    submitAnswer(
      { flashcardId: nextCard.flashcard.id, knewIt, responseTimeMs },
      {
        onSuccess: () => {
          setFlipped(false);
          setStartTime(Date.now());
          refetch();
        },
      },
    );
  };

  const handleEnd = () => {
    if (!sessionId) return;
    endSession(sessionId, {
      onSuccess: (stats) => onFinish(stats),
    });
  };

  if (isStarting || !sessionId) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isLoadingCard && !nextCard?.flashcard) {
    return (
      <div className="text-center py-12 space-y-4">
        <i className="ti ti-trophy text-[40px] text-primary" />
        <p className="text-sm font-medium text-foreground">
          ¡Sesión completada!
        </p>
        <Button onClick={handleEnd}>Ver resultados</Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-mono">
          Carta {nextCard?.current ?? "—"} / {nextCard?.total ?? "—"}
        </span>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
        >
          <i className="ti ti-x text-[16px]" />
        </button>
      </div>

      {isLoadingCard ? (
        <div className="h-48 rounded-xl bg-muted animate-pulse" />
      ) : (
        <div
          onClick={() => setFlipped((f) => !f)}
          className="cursor-pointer min-h-[200px] rounded-xl border border-border bg-card p-6 flex flex-col justify-between transition-all hover:shadow-md"
        >
          <span className="text-[10px] text-muted-foreground font-mono">
            {flipped ? "Respuesta" : "Pregunta"}
          </span>
          <p className="text-base text-foreground leading-relaxed text-center">
            {flipped
              ? nextCard?.flashcard?.answer
              : nextCard?.flashcard?.question}
          </p>
          <p className="text-[10px] text-muted-foreground text-center">
            Click para {flipped ? "ver pregunta" : "ver respuesta"}
          </p>
        </div>
      )}

      {flipped && (
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => handleAnswer(false)}
            disabled={isSubmitting}
            className="text-destructive hover:border-destructive/50"
          >
            <i className="ti ti-x text-[15px]" />
            No lo sabía
          </Button>
          <Button onClick={() => handleAnswer(true)} disabled={isSubmitting}>
            <i className="ti ti-check text-[15px]" />
            Lo sabía
          </Button>
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={handleEnd}
        className="w-full text-muted-foreground"
      >
        Terminar sesión
      </Button>
    </div>
  );
}
