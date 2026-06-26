import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GenerateFlashcardsModal } from "../components/GenerateFlashcardsModal";
import { ReorderCardsModal } from "../components/ReorderCardsModal";
import { AllFlashcardsModal } from "../components/AllFlashcardsModal";
import { DeckCard } from "../components/DeckCard";
import { useDecks, useDuplicateDeck } from "../hooks";
import type { Deck } from "../types/flashcard.types";

function DecksSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-[108px] rounded-xl bg-muted animate-pulse"
          style={{ animationDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  );
}

export function FlashcardsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [allCardsOpen, setAllCardsOpen] = useState(false);
  const [reorderTarget, setReorderTarget] = useState<Deck | null>(null);
  const { data: decks, isLoading, isError } = useDecks();
  const { mutate: duplicateDeck, isPending: isDuplicating } = useDuplicateDeck();
  const navigate = useNavigate();

  const handleStudy = (deck: Deck) => {
    navigate(`/workspace/flashcards/${deck.id}`);
  };

  const handleDuplicate = (deck: Deck) => {
    if (isDuplicating) return;
    duplicateDeck(deck.id);
  };

  const handleReorder = (deck: Deck) => {
    setReorderTarget(deck);
  };

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Flashcards
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {isLoading
              ? "Cargando..."
              : decks?.length
                ? `${decks.length} mazo${decks.length !== 1 ? "s" : ""}`
                : "Generá mazos desde tus archivos"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setAllCardsOpen(true)} variant="ghost" size="sm">
            <i className="ti ti-search text-[15px]" />
            Tarjetas
          </Button>
          <Button onClick={() => setModalOpen(true)} size="sm">
            <i className="ti ti-sparkles text-[15px]" />
            Generar mazo
          </Button>
        </div>
      </div>

      {isLoading && <DecksSkeleton />}

      {isError && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/15">
          <i className="ti ti-alert-circle text-destructive text-[18px] flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">
              No se pudieron cargar los mazos
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Revisá tu conexión e intentá de nuevo
            </p>
          </div>
        </div>
      )}

      {!isLoading && !isError && decks?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="relative mb-5">
            <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center">
              <i className="ti ti-cards text-[26px] text-muted-foreground" />
            </div>
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
              <i className="ti ti-sparkles text-[11px] text-primary-foreground" />
            </div>
          </div>
          <p className="font-semibold text-foreground mb-1">
            Sin mazos todavía
          </p>
          <p className="text-muted-foreground text-sm mb-5 max-w-[220px] leading-relaxed">
            Generá tu primer mazo subiendo un PDF de tu curso
          </p>
          <Button onClick={() => setModalOpen(true)} size="sm">
            <i className="ti ti-sparkles text-[15px]" />
            Generar mazo
          </Button>
        </div>
      )}

      {!isLoading && !isError && !!decks?.length && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {decks.map((deck) => (
            <DeckCard
              key={deck.id}
              deck={deck}
              onStudy={handleStudy}
              onDuplicate={handleDuplicate}
              onReorder={handleReorder}
            />
          ))}
        </div>
      )}

      <GenerateFlashcardsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {reorderTarget && (
        <ReorderCardsModal
          deckId={reorderTarget.id}
          deckName={reorderTarget.name}
          open={!!reorderTarget}
          onClose={() => setReorderTarget(null)}
        />
      )}

      <AllFlashcardsModal
        open={allCardsOpen}
        onClose={() => setAllCardsOpen(false)}
      />
    </div>
  );
}
