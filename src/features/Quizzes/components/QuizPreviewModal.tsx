import { usePreview } from "../hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface QuizPreviewModalProps {
  quizId: number;
  quizTitle: string;
  open: boolean;
  onClose: () => void;
}

export function QuizPreviewModal({ quizId, quizTitle, open, onClose }: QuizPreviewModalProps) {
  const { data: quiz, isLoading } = usePreview(quizId);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0 gap-0">
        <div className="px-6 pt-5 pb-3 border-b border-border">
          <DialogHeader>
            <DialogTitle className="text-base">Vista previa: {quizTitle}</DialogTitle>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4 space-y-4">
          {isLoading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          )}

          {!isLoading && !quiz && (
            <div className="flex flex-col items-center py-10 text-center">
              <i className="ti ti-eye-off text-[22px] text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No se pudo cargar la vista previa</p>
            </div>
          )}

          {!isLoading && quiz && (
            <>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{quiz.preguntas?.length ?? 0} preguntas</span>
                <span className="text-muted-foreground/40">·</span>
                <span>Puntuación total: {quiz.puntuacionTotal}</span>
              </div>

              {quiz.preguntas?.map((q, i) => (
                <div key={q.id} className="rounded-xl border border-border p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">
                      <span className="text-muted-foreground font-mono mr-2">{i + 1}.</span>
                      {q.texto}
                    </p>
                    <span className="text-xs text-muted-foreground font-mono flex-shrink-0">
                      {q.puntuacion} pts
                    </span>
                  </div>
                  <div className="space-y-1.5 pl-5">
                    {q.opciones?.map((opt) => (
                      <div
                        key={opt.id}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${opt.esCorrecta
                          ? "bg-green-500/10 border border-green-500/20 text-green-700"
                          : "bg-muted/50 text-muted-foreground"
                          }`}
                      >
                        {opt.esCorrecta && <i className="ti ti-check text-[13px] text-green-600" />}
                        <span>{opt.texto}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="px-6 pb-5 pt-2 border-t border-border">
          <Button variant="outline" className="w-full" size="sm" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}