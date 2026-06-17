import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDeck, useDeckCards, useDeleteDeck } from "../hooks";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/app/router/routes";
import type { Flashcard } from "../types/flashcard.types";
import { StudySession } from "../components/StudySession";

// ─── Skeleton ──────────────────────────────────────────────
function DeckPageSkeleton() {
  return (
    <div className="space-y-5 animate-fade-up">
      <div className="h-8 w-48 rounded-lg bg-muted animate-pulse" />
      <div className="h-24 rounded-xl bg-muted animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-xl bg-muted animate-pulse"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── FlashcardItem ─────────────────────────────────────────
function FlashcardItem({ card, index }: { card: Flashcard; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped((f) => !f)}
      className="cursor-pointer rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-px min-h-[112px] flex flex-col justify-between"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-[10px] font-mono text-muted-foreground">
          #{index + 1}
        </span>
        <div className="flex items-center gap-1.5">
          {card.difficulty && (
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 font-mono"
            >
              {card.difficulty}
            </Badge>
          )}
          <span className="text-[10px] text-muted-foreground">
            {flipped ? "Respuesta" : "Pregunta"}
          </span>
        </div>
      </div>

      <p className="text-sm text-foreground leading-relaxed">
        {flipped ? card.answer : card.question}
      </p>

      <p className="text-[10px] text-muted-foreground mt-2">
        Click para {flipped ? "ver pregunta" : "ver respuesta"}
      </p>
    </div>
  );
}

// ─── DeckPage ──────────────────────────────────────────────
export function DeckPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);
  const [studying, setStudying] = useState(false);

  const id = Number(deckId);
  const {
    data: deck,
    isLoading: isDeckLoading,
    isError: isDeckError,
  } = useDeck(id);
  const { data: cards, isLoading: isCardsLoading } = useDeckCards(id);
  const { mutate: deleteDeck, isPending: isDeleting } = useDeleteDeck();

  const isLoading = isDeckLoading || isCardsLoading;

  const handleDelete = () => {
    deleteDeck(id, {
      onSuccess: () => navigate(ROUTES.FLASHCARDS),
    });
  };

  if (isLoading) return <DeckPageSkeleton />;

  if (isDeckError || !deck) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/15">
        <i className="ti ti-alert-circle text-destructive text-[18px]" />
        <p className="text-sm text-foreground">No se pudo cargar el mazo.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(ROUTES.FLASHCARDS)}
          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <i className="ti ti-arrow-left text-[18px]" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-foreground tracking-tight truncate">
            {deck.name}
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {deck.courseName}
          </p>
        </div>
        <Button size="sm" onClick={() => setStudying(true)}>
          <i className="ti ti-brain text-[15px]" />
          Estudiar
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-muted/50 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-foreground">{deck.totalCards}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-foreground">
            {deck.masteredCards}
          </p>
          <p className="text-xs text-muted-foreground">Dominadas</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-foreground">
            {deck.notStudiedCards}
          </p>
          <p className="text-xs text-muted-foreground">Sin estudiar</p>
        </div>
      </div>

      {/* Progreso */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progreso</span>
          <span className="font-mono">{deck.progressPercentage}%</span>
        </div>
        <Progress value={deck.progressPercentage} className="h-1.5" />
      </div>

      <Separator />

      {/* Tarjetas */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">
            Tarjetas
            <span className="ml-2 text-xs font-mono text-muted-foreground">
              {cards?.length ?? 0}
            </span>
          </h2>
        </div>

        {!cards?.length ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <i className="ti ti-cards text-[28px] text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">
              Sin tarjetas todavía
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cards.map((card, i) => (
              <FlashcardItem key={card.id} card={card} index={i} />
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Zona de peligro */}
      {confirming ? (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 space-y-3">
          <p className="text-sm text-foreground">
            ¿Seguro que querés borrar este mazo? Se eliminarán todas las
            tarjetas.
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => setConfirming(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="flex-1"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Borrando..." : "Borrar mazo"}
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="text-muted-foreground hover:text-destructive hover:border-destructive/50"
          onClick={() => setConfirming(true)}
        >
          <i className="ti ti-trash text-[14px]" />
          Eliminar mazo
        </Button>
      )}

      {/* Modal de sesión de estudio */}
      {studying && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-md bg-card rounded-2xl border border-border p-5 shadow-lg">
            <StudySession
              deckId={id}
              onFinish={() => setStudying(false)}
              onClose={() => setStudying(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
