import { useState } from "react";
import { useBulkCreateCards } from "../hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { CreateFlashcardDto } from "../types/flashcard.types";

interface BulkCardsModalProps {
  deckId: number;
  deckName: string;
  open: boolean;
  onClose: () => void;
}

export function BulkCardsModal({ deckId, deckName, open, onClose }: BulkCardsModalProps) {
  const { mutate: bulkCreate, isPending } = useBulkCreateCards(deckId);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const parseCards = (input: string): CreateFlashcardDto[] => {
    return input
      .split("\n")
      .filter((line) => line.includes("|"))
      .map((line) => {
        const [question, answer] = line.split("|").map((s) => s.trim());
        return { question: question || "", answer: answer || "" };
      })
      .filter((c) => c.question && c.answer);
  };

  const handleImport = () => {
    const cards = parseCards(text);
    if (cards.length === 0) {
      setError("Formato: una tarjeta por línea, separando pregunta y respuesta con |");
      return;
    }
    setError(null);
    bulkCreate(
      { cards },
      { onSuccess: () => { setText(""); onClose(); } },
    );
  };

  const cardCount = parseCards(text).length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base">Añadir tarjetas en lote</DialogTitle>
          <p className="text-xs text-muted-foreground mt-0.5">{deckName}</p>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Escribí una tarjeta por línea. Separá pregunta y respuesta con <code className="bg-muted px-1 rounded">|</code></p>
            <p className="font-mono text-[11px] bg-muted p-2 rounded-lg">
              ¿Qué es React?|Una biblioteca de UI<br />
              ¿Qué es TypeScript?|Un superset de JavaScript
            </p>
          </div>

          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={"¿Qué es React?|Una biblioteca de UI\n¿Qué es TypeScript?|Un superset de JavaScript"}
            className="min-h-[160px] font-mono text-sm"
          />

          {cardCount > 0 && (
            <p className="text-xs text-muted-foreground">
              {cardCount} tarjeta{cardCount !== 1 ? "s" : ""} detectada{cardCount !== 1 ? "s" : ""}
            </p>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/5 border border-destructive/15">
              <i className="ti ti-alert-circle text-destructive text-sm" />
              <p className="text-xs text-destructive">{error}</p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" size="sm" onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button className="flex-1" size="sm" onClick={handleImport} disabled={cardCount === 0 || isPending}>
            {isPending ? "Guardando..." : `Añadir ${cardCount} tarjeta${cardCount !== 1 ? "s" : ""}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
