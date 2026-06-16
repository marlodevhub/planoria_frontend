import { useState } from "react";
import type { CourseDetail } from "../types/course.types";
import { useDeleteCourse } from "../hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface CourseDetailModalProps {
  course: CourseDetail | null; // ← permite null
  open: boolean; // ← nueva prop
  onClose: () => void;
  onEdit: () => void;
}

function StatBox({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-muted/50 rounded-xl p-3 flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <i className={`${icon} text-[13px]`} />
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-foreground text-sm font-semibold">{value}</p>
    </div>
  );
}

export function CourseDetailModal({
  course,
  open,
  onClose,
  onEdit,
}: CourseDetailModalProps) {
  const { mutate: deleteCourse, isPending } = useDeleteCourse();
  const [confirming, setConfirming] = useState(false);

  const handleDelete = () => {
    if (!course) return;
    deleteCourse(course.id, { onSuccess: onClose });
  };

  const examDate = course?.examDate
    ? new Date(course.examDate).toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  const daysUntil = course?.examDate
    ? Math.ceil(
        (new Date(course.examDate).getTime() -
          new Date().setHours(0, 0, 0, 0)) /
          (1000 * 60 * 60 * 24),
      )
    : null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden gap-0">
        {course && (
          <>
            {/* Color header */}
            <div
              className="h-1.5 w-full flex-shrink-0"
              style={{ backgroundColor: course.colorHex }}
            />

            <div className="px-6 pt-5 pb-2">
              <DialogHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="h-3 w-3 rounded-full flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: course.colorHex }}
                    />
                    <DialogTitle className="text-base leading-tight">
                      {course.name}
                    </DialogTitle>
                  </div>
                  {course.isArchived && (
                    <Badge
                      variant="secondary"
                      className="flex-shrink-0 text-xs"
                    >
                      Archivado
                    </Badge>
                  )}
                </div>
              </DialogHeader>
            </div>

            <div className="px-6 pb-6 space-y-4">
              {course.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {course.description}
                </p>
              )}

              <div className="grid grid-cols-2 gap-2">
                {examDate && (
                  <StatBox
                    icon="ti ti-calendar"
                    label="Fecha examen"
                    value={examDate}
                  />
                )}
                {course.examTime && (
                  <StatBox
                    icon="ti ti-clock"
                    label="Hora"
                    value={course.examTime}
                  />
                )}
                <StatBox
                  icon="ti ti-cards"
                  label="Flashcards"
                  value={course.totalFlashcards}
                />
                <StatBox
                  icon="ti ti-clipboard-check"
                  label="Quizzes"
                  value={course.totalQuizzes}
                />
              </div>

              {daysUntil !== null && daysUntil >= 0 && (
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono"
                  style={{
                    backgroundColor: `${course.colorHex}15`,
                    borderLeft: `3px solid ${course.colorHex}`,
                  }}
                >
                  <i
                    className="ti ti-hourglass text-[13px]"
                    style={{ color: course.colorHex }}
                  />
                  <span className="text-muted-foreground">
                    {daysUntil === 0
                      ? "¡El examen es hoy!"
                      : `${daysUntil} día${daysUntil !== 1 ? "s" : ""} para el examen`}
                  </span>
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progreso general</span>
                  <span className="font-mono">
                    {course.progressPercentage}%
                  </span>
                </div>
                <Progress value={course.progressPercentage} className="h-1.5" />
              </div>

              <Separator />

              {confirming ? (
                <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 space-y-3">
                  <p className="text-sm text-foreground">
                    ¿Seguro que querés borrar{" "}
                    <span className="font-medium">"{course.name}"</span>? Esta
                    acción no se puede deshacer.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      size="sm"
                      onClick={() => setConfirming(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      size="sm"
                      onClick={handleDelete}
                      disabled={isPending}
                    >
                      {isPending ? "Borrando..." : "Borrar"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setConfirming(true)}
                    className="text-muted-foreground hover:border-destructive/50 hover:text-destructive flex-shrink-0"
                    aria-label="Borrar curso"
                  >
                    <i className="ti ti-trash text-[15px]" />
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    size="sm"
                    onClick={onEdit}
                  >
                    <i className="ti ti-pencil text-[14px]" />
                    Editar
                  </Button>
                  <Button className="flex-1" size="sm" onClick={onEdit}>
                    <i className="ti ti-arrow-right text-[14px]" />
                    Abrir
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
