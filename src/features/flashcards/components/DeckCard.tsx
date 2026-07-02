import { Card } from "@/components/ui/card";
import type { Deck } from "../types/flashcard.types";

interface DeckCardProps {
  deck: Deck;
  onStudy: (deck: Deck) => void;
}

export function DeckCard({ deck, onStudy }: DeckCardProps) {
  return (
    <Card
      onClick={() => onStudy(deck)}
      className="relative cursor-pointer transition-all duration-200 group p-0 overflow-hidden hover:shadow-md hover:-translate-y-px"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ backgroundColor: deck.colorHex }}
      />

      <div className="pl-5 pr-4 pt-4 pb-4">
        {/* Header */}
        <div className="flex items-start gap-2 mb-3">
          <div
            className="h-2.5 w-2.5 rounded-full flex-shrink-0 mt-0.5"
            style={{ backgroundColor: deck.colorHex }}
          />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-foreground text-sm leading-tight truncate">
              {deck.name}
            </p>
            <p className="text-muted-foreground text-[11px] mt-0.5">
              {deck.courseName}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] font-mono text-muted-foreground">
            {deck.totalCards} tarjetas
          </span>
          {deck.dueCardsCount > 0 && (
            <span className="text-[11px] font-mono text-orange-500">
              {deck.dueCardsCount} pendientes
            </span>
          )}
        </div>

        {/* Progress */}
        <div className="space-y-1">
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${deck.masteredPercentage}%`,
                backgroundColor: deck.colorHex,
                opacity: 0.85,
              }}
            />
          </div>
          <p className="text-muted-foreground text-[11px] font-mono text-right">
            {deck.masteredPercentage}% dominado
          </p>
        </div>
      </div>
    </Card>
  );
}
