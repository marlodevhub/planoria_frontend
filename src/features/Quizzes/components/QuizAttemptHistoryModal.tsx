import { useAttemptHistory, useBestAttempt } from "../hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface QuizAttemptHistoryModalProps {
  quizId: number;
  quizTitle: string;
  open: boolean;
  onClose: () => void;
}

export function QuizAttemptHistoryModal({
  quizId,
  quizTitle,
  open,
  onClose,
}: QuizAttemptHistoryModalProps) {
  const { data: history, isLoading: historyLoading } = useAttemptHistory(quizId);
  const { data: best, isLoading: bestLoading } = useBestAttempt(quizId);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] flex flex-col p-0 gap-0">
        <div className="px-6 pt-5 pb-3 border-b border-border">
          <DialogHeader>
            <DialogTitle className="text-base">Historial de intentos</DialogTitle>
            <p className="text-xs text-muted-foreground mt-0.5">{quizTitle}</p>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4 space-y-4">
          {bestLoading || historyLoading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {best && (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Mejor puntuación</p>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-primary">{best.porcentaje}%</span>
                    <div className="flex-1">
                      <Progress value={best.porcentaje} className="h-2" />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">
                      {best.puntuacion}/{best.puntuacionTotal}
                    </span>
                  </div>
                </div>
              )}

              {(!history || history.length === 0) && (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center mb-3">
                    <i className="ti ti-history text-[18px] text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">Sin intentos</p>
                  <p className="text-xs text-muted-foreground">Aún no has realizado este quiz</p>
                </div>
              )}

              {history && history.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    {history.length} intento{history.length !== 1 ? "s" : ""}
                  </p>
                  {history.map((attempt) => (
                    <div
                      key={attempt.id}
                      className="flex items-center gap-3 rounded-xl border border-border p-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-semibold ${attempt.porcentaje >= 80
                              ? "text-green-600"
                              : attempt.porcentaje >= 50
                                ? "text-amber-600"
                                : "text-red-600"
                              }`}
                          >
                            {attempt.porcentaje}%
                          </span>
                          <Badge
                            variant="secondary"
                            className="text-[10px]"
                          >
                            {attempt.puntuacion}/{attempt.puntuacionTotal}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {new Date(attempt.fechaInicio).toLocaleDateString("es-PE", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {attempt.completado ? (
                        <Badge className="text-[10px] bg-green-500/10 text-green-600 border-green-500/20">
                          Completado
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[10px]">
                          En progreso
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}