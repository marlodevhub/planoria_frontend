import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDeck, useDeckCards, useDeleteDeck } from "../hooks";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ROUTES, buildRoute } from "@/app/router/routes";
import type { Flashcard } from "../types/flashcard.types";

function DeckPageSkeleton() {
  return (
    <div className="space-y-6 animate-fade-up max-w-2xl mx-auto">
      <div className="h-8 w-48 rounded-lg bg-muted animate-pulse" />
      <div className="h-28 rounded-2xl bg-muted animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-2xl bg-muted animate-pulse"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function FlashcardItem({ card, index }: { card: Flashcard; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped((f) => !f)}
      className="cursor-pointer rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:shadow-sm hover:-translate-y-px min-h-[120px] flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
          {flipped ? "Respuesta" : "Pregunta"} · #{index + 1}
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
          <div
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${flipped ? "bg-primary" : "bg-muted-foreground/30"}`}
          />
        </div>
      </div>

      {/* Separador sutil */}
      <div className="h-px bg-border" />

      {/* Contenido */}
      <p
        className={`text-sm leading-relaxed flex-1 transition-all duration-200 ${flipped ? "text-primary font-medium" : "text-foreground"}`}
      >
        {flipped ? card.answer : card.question}
      </p>

      <p className="text-[10px] text-muted-foreground/60 font-mono">
        {flipped ? "← click para ver pregunta" : "click para ver respuesta →"}
      </p>
    </div>
  );
}

export function DeckPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);

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
    deleteDeck(id, { onSuccess: () => navigate(ROUTES.FLASHCARDS) });
  };

  if (isLoading) return <DeckPageSkeleton />;

  if (isDeckError || !deck) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-destructive/5 border border-destructive/15">
        <i className="ti ti-alert-circle text-destructive text-[18px]" />
        <p className="text-sm text-foreground">No se pudo cargar el mazo.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(ROUTES.FLASHCARDS)}
          className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <i className="ti ti-arrow-left text-[18px]" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-foreground tracking-tight truncate">
            {deck.name}
          </h1>
          <p className="text-muted-foreground text-xs mt-0.5 font-mono">
            {deck.courseName}
          </p>
        </div>
        <Button size="sm" onClick={() => navigate(buildRoute.study(id))}>
          <i className="ti ti-brain text-[14px]" />
          Estudiar
        </Button>
      </div>

      {/* Stats card */}
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total", value: deck.totalCards, icon: "ti-cards" },
            { label: "Dominadas", value: deck.masteredCards, icon: "ti-check" },
            {
              label: "Sin estudiar",
              value: deck.notStudiedCards,
              icon: "ti-clock",
            },
          ].map((s) => (
            <div key={s.label} className="text-center space-y-1">
              <p className="text-xl font-bold text-foreground font-mono">
                {s.value}
              </p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
            <span>Progreso</span>
            <span>{deck.progressPercentage}%</span>
          </div>
          <Progress value={deck.progressPercentage} className="h-1" />
        </div>
      </div>

      <Separator />

      {/* Tarjetas */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Tarjetas</h2>
          <span className="text-xs font-mono text-muted-foreground">
            {cards?.length ?? 0} total
          </span>
        </div>

        {!cards?.length ? (
          <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-dashed border-border">
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
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 space-y-3">
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
          className="text-muted-foreground hover:text-destructive hover:border-destructive/40"
          onClick={() => setConfirming(true)}
        >
          <i className="ti ti-trash text-[14px]" />
          Eliminar mazo
        </Button>
      )}
    </div>
  );
}
