import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GenerateFlashcardsModal } from "../components/GenerateFlashcardsModal";
import { DeckCard } from "../components/DeckCard";
import { useDecks } from "../hooks";
import { buildRoute } from "@/app/router/routes";
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
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const { data: decks, isLoading, isError } = useDecks();

  const handleStudy = (deck: Deck) => {
    navigate(buildRoute.deck(deck.id));
  };

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Header */}
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
        <Button onClick={() => setModalOpen(true)} size="sm">
          <i className="ti ti-sparkles text-[15px]" />
          Generar mazo
        </Button>
      </div>

      {/* Loading */}
      {isLoading && <DecksSkeleton />}

      {/* Error */}
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

      {/* Empty */}
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

      {/* Grid */}
      {!isLoading && !isError && !!decks?.length && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {decks.map((deck: Deck) => (
            <DeckCard key={deck.id} deck={deck} onStudy={handleStudy} />
          ))}
        </div>
      )}

      {/* Modal */}
      <GenerateFlashcardsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

