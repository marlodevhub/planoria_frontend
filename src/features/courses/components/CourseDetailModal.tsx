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
import { Progress } from "@/components/ui/progress";

interface CourseDetailModalProps {
  course: CourseDetail;
  onClose: () => void;
  onEdit: () => void;
}

export function CourseDetailModal({
  course,
  onClose,
  onEdit,
}: CourseDetailModalProps) {
  const { mutate: deleteCourse, isPending } = useDeleteCourse();
  const [confirming, setConfirming] = useState(false);

  const handleDelete = () => {
    deleteCourse(course.id, { onSuccess: onClose });
  };

  const examDate = course.examDate
    ? new Date(course.examDate).toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/* Barra de color superior */}
        <div
          className="h-2 w-full"
          style={{ backgroundColor: course.colorHex }}
        />

        <div className="px-6 pt-4 pb-2">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: course.colorHex }}
              />
              {course.name}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Descripción */}
          {course.description && (
            <p className="text-sm text-muted-foreground">
              {course.description}
            </p>
          )}

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            {examDate && (
              <div className="bg-muted/50 rounded-xl p-3">
                <p className="text-muted-foreground text-xs mb-1">
                  Fecha examen
                </p>
                <p className="text-foreground text-sm font-medium">
                  {examDate}
                </p>
              </div>
            )}
            {course.examTime && (
              <div className="bg-muted/50 rounded-xl p-3">
                <p className="text-muted-foreground text-xs mb-1">Hora</p>
                <p className="text-foreground text-sm font-medium">
                  {course.examTime}
                </p>
              </div>
            )}
            <div className="bg-muted/50 rounded-xl p-3">
              <p className="text-muted-foreground text-xs mb-1">Flashcards</p>
              <p className="text-foreground text-sm font-medium">
                {course.totalFlashcards}
              </p>
            </div>
            <div className="bg-muted/50 rounded-xl p-3">
              <p className="text-muted-foreground text-xs mb-1">Quizzes</p>
              <p className="text-foreground text-sm font-medium">
                {course.totalQuizzes}
              </p>
            </div>
          </div>

          {/* Progreso */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progreso</span>
              <span>{course.progressPercentage}%</span>
            </div>
            <Progress value={course.progressPercentage} className="h-1.5" />
          </div>

          {/* Confirmación borrar */}
          {confirming ? (
            <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 space-y-3">
              <p className="text-sm text-foreground">
                ¿Seguro que querés borrar{" "}
                <span className="font-medium">"{course.name}"</span>?
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setConfirming(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleDelete}
                  disabled={isPending}
                >
                  {isPending ? "Borrando..." : "Borrar"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 pt-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setConfirming(true)}
                className="text-muted-foreground hover:border-destructive/50 hover:text-destructive"
              >
                <i className="ti ti-trash text-[16px]" />
              </Button>
              <Button className="flex-1" onClick={onEdit}>
                Editar curso
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

