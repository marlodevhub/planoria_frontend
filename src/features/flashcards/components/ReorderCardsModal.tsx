import { useState, useCallback } from "react";
import type { Flashcard } from "../types/flashcard.types";
import { useDeckCards, useReorderCards } from "../hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ReorderCardsModalProps {
  deckId: number;
  deckName: string;
  open: boolean;
  onClose: () => void;
}

export function ReorderCardsModal({
  deckId,
  deckName,
  open,
  onClose,
}: ReorderCardsModalProps) {
  const { data, isLoading } = useDeckCards(deckId, 1, 200);
  const { mutate: reorder, isPending } = useReorderCards(deckId);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  useState(() => {
    if (data?.items) {
      setCards(data.items);
    }
  });

  const moveCard = useCallback((index: number, direction: -1 | 1) => {
    setCards((prev) => {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[newIndex]] = [next[newIndex], next[index]];
      setHasChanges(true);
      return next;
    });
  }, []);

  const handleSave = () => {
    reorder(
      { cardIds: cards.map((c) => c.id) },
      { onSuccess: () => { setHasChanges(false); onClose(); } },
    );
  };

  const items = cards.length > 0 ? cards : data?.items ?? [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] flex flex-col p-0 gap-0">
        <div className="px-6 pt-5 pb-3">
          <DialogHeader>
            <DialogTitle className="text-base">Reordenar tarjetas</DialogTitle>
            <p className="text-xs text-muted-foreground mt-0.5">{deckName}</p>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-3 space-y-1.5">
          {isLoading && (
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-14 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          )}

          {!isLoading && items.length === 0 && (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center mb-3">
                <i className="ti ti-cards text-[18px] text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">Sin tarjetas</p>
              <p className="text-xs text-muted-foreground">Este mazo no tiene tarjetas para reordenar</p>
            </div>
          )}

          {!isLoading && items.map((card, index) => (
            <div
              key={card.id}
              className="flex items-center gap-2 rounded-xl border p-2.5"
            >
              <span className="text-xs text-muted-foreground font-mono w-6 text-right flex-shrink-0">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {card.question}
                </p>
              </div>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <button
                  onClick={() => moveCard(index, -1)}
                  disabled={index === 0}
                  className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Mover arriba"
                >
                  <i className="ti ti-chevron-up text-[14px]" />
                </button>
                <button
                  onClick={() => moveCard(index, 1)}
                  disabled={index === items.length - 1}
                  className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Mover abajo"
                >
                  <i className="ti ti-chevron-down text-[14px]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 pb-5 pt-2 flex gap-2">
          <Button variant="outline" className="flex-1" size="sm" onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button className="flex-1" size="sm" onClick={handleSave} disabled={isPending || !hasChanges}>
            {isPending ? "Guardando..." : "Guardar orden"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
