import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useDeckCards,
  useStartSession,
  useSubmitAnswer,
  useEndSession,
} from "../hooks";
import { StudyCard } from "../components/StudyCard";
import { StudyResult } from "../components/StudyResult";
import { buildRoute } from "@/app/router/routes";
import type { StudySession, Flashcard } from "../types/flashcard.types";

function StudySkeleton() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div className="h-[220px] w-[340px] rounded-2xl bg-muted animate-pulse" />
      <div className="h-3 w-48 rounded bg-muted animate-pulse" />
    </div>
  );
}

function StudyProgress({
  current,
  total,
  known,
  unknown,
}: {
  current: number;
  total: number;
  known: number;
  unknown: number;
}) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="space-y-2 max-w-[340px] w-full mx-auto">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <i className="ti ti-check text-emerald-500 text-[12px]" />
            <span className="font-mono text-emerald-500">{known}</span>
          </span>
          <span className="flex items-center gap-1">
            <i className="ti ti-x text-destructive text-[12px]" />
            <span className="font-mono text-destructive">{unknown}</span>
          </span>
        </div>
        <span className="font-mono text-muted-foreground">
          {current}/{total}
        </span>
      </div>
      <div className="h-1 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export function StudyPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const id = Number(deckId);

  const [sessionId, setSessionId] = useState<number | null>(null);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [unknown, setUnknown] = useState(0);
  const [result, setResult] = useState<StudySession | null>(null);
  const [startTime, setStartTime] = useState(Date.now());

  const { data: cards, isLoading: isCardsLoading } = useDeckCards(id);
  const { mutate: startSession, isPending: isStarting } = useStartSession();
  const { mutate: submitAnswer } = useSubmitAnswer(sessionId ?? 0);
  const { mutate: endSession } = useEndSession();

  const currentCard: Flashcard | undefined = cards?.[idx];
  const total = cards?.length ?? 0;
  const cardsBehind = Math.min(2, total - idx - 1);

  useEffect(() => {
    if (!id) return;
    startSession(
      { deckId: id, sessionType: "normal" },
      { onSuccess: (session) => setSessionId(session.id) },
    );
  }, [id]);

  const handleFlip = useCallback(() => setFlipped((f) => !f), []);
  const handleResetFlip = useCallback(() => setFlipped(false), []);

  const handleNext = useCallback(
    (wasKnown: boolean) => {
      if (!sessionId || !currentCard) return;
      const responseTimeMs = Date.now() - startTime;
      submitAnswer({
        flashcardId: currentCard.id,
        knewIt: wasKnown,
        responseTimeMs,
      });
      if (wasKnown) setKnown((k) => k + 1);
      else setUnknown((u) => u + 1);
      setFlipped(false);
      setStartTime(Date.now());
      const isLast = idx + 1 >= total;
      if (isLast) {
        endSession(sessionId, { onSuccess: (stats) => setResult(stats) });
      } else {
        setIdx((i) => i + 1);
      }
    },
    [sessionId, currentCard, startTime, idx, total, submitAnswer, endSession],
  );

  const handleRepeat = () => {
    setIdx(0);
    setFlipped(false);
    setKnown(0);
    setUnknown(0);
    setResult(null);
    setStartTime(Date.now());
    startSession(
      { deckId: id, sessionType: "normal" },
      { onSuccess: (session) => setSessionId(session.id) },
    );
  };

  const handleExit = () => navigate(buildRoute.deck(id));

  const isLoading = isCardsLoading || isStarting || !sessionId;

  if (result) {
    return (
      <div className="animate-fade-up">
        <StudyResult
          result={result}
          onRepeat={handleRepeat}
          onExit={handleExit}
        />
      </div>
    );
  }

  if (isLoading) return <StudySkeleton />;

  if (!cards?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
        <i className="ti ti-cards text-[40px] text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Este mazo no tiene tarjetas
        </p>
        <button
          onClick={handleExit}
          className="text-xs text-primary hover:underline"
        >
          Volver al mazo
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleExit}
          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <i className="ti ti-arrow-left text-[18px]" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground font-mono">
            Modo estudio
          </p>
        </div>
        <button
          onClick={() => {
            if (!sessionId) return;
            endSession(sessionId, { onSuccess: (stats) => setResult(stats) });
          }}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Terminar sesión
        </button>
      </div>

      {/* Progress */}
      <StudyProgress
        current={idx}
        total={total}
        known={known}
        unknown={unknown}
      />

      {/* Card area */}
      <div className="flex flex-col items-center justify-center py-6 gap-6">
        {currentCard && (
          <StudyCard
            key={currentCard.id}
            card={currentCard}
            flipped={flipped}
            cardsBehind={cardsBehind}
            onFlip={handleFlip}
            onResetFlip={handleResetFlip}
            onNext={handleNext}
          />
        )}

        {/* Hint + botones */}
        <div className="flex flex-col items-center gap-3 min-h-[64px]">
          {!flipped ? (
            <p className="text-xs text-muted-foreground font-mono">
              Mantené presionado para ver la respuesta
            </p>
          ) : (
            <>
              <p className="text-xs text-muted-foreground font-mono">
                Deslizá ↑ si lo sabías · ↓ si no
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNext(false)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-red-400 text-sm hover:bg-red-50 transition-colors font-medium"
                >
                  <i className="ti ti-x text-[14px]" />
                  No lo sabía
                </button>
                <button
                  onClick={() => handleNext(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-emerald-200 text-emerald-500 text-sm hover:bg-emerald-50 transition-colors font-medium"
                >
                  <i className="ti ti-check text-[14px]" />
                  Lo sabía
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
