import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { StudySession } from "../types/flashcard.types";

interface StudyResultProps {
  result: StudySession;
  onRepeat: () => void;
  onExit: () => void;
}

export function StudyResult({ result, onRepeat, onExit }: StudyResultProps) {
  const pct = Math.round(result.performanceScore);

  const stats = [
    { label: "Sabía", value: result.cardsKnown, color: "text-emerald-500" },
    {
      label: "No sabía",
      value: result.cardsUnknown,
      color: "text-destructive",
    },
    { label: "Retención", value: `${pct}%`, color: "text-primary" },
  ];

  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-fade-up">
      <div className="flex flex-col items-center gap-6 text-center max-w-sm w-full">
        <div className="h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <i className="ti ti-trophy text-emerald-500 text-[36px]" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground">
            ¡Mazo completado!
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Aquí tenés tu resumen
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-muted/50 border border-border rounded-xl p-3 text-center"
            >
              <p className={cn("text-2xl font-bold", s.color)}>{s.value}</p>
              <p className="text-muted-foreground text-xs font-mono mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 w-full">
          <Button className="flex-1" onClick={onRepeat}>
            <i className="ti ti-refresh text-[14px]" />
            Repetir mazo
          </Button>
          <Button variant="outline" className="flex-1" onClick={onExit}>
            <i className="ti ti-arrow-left text-[14px]" />
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
}
