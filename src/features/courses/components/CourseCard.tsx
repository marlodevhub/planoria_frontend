import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Course } from "../types/course.types";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
  onOpen: (course: Course) => void;
  onEdit: (course: Course) => void;
}

function getDaysUntilExam(examDate: string): number | null {
  if (!examDate) return null;
  const exam = new Date(examDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.ceil(
    (exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
  return diff;
}

function ExamCountdown({ examDate }: { examDate: string }) {
  const days = getDaysUntilExam(examDate);
  if (days === null) return null;

  if (days < 0) {
    return (
      <Badge variant="secondary" className="text-[10px] font-mono px-1.5 py-0">
        Examen pasado
      </Badge>
    );
  }
  if (days === 0) {
    return (
      <Badge
        variant="destructive"
        className="text-[10px] font-mono px-1.5 py-0"
      >
        ¡Hoy!
      </Badge>
    );
  }
  if (days <= 7) {
    return (
      <Badge
        variant="destructive"
        className="text-[10px] font-mono px-1.5 py-0 bg-orange-500/15 text-orange-600 border-orange-500/30 hover:bg-orange-500/20"
      >
        {days}d
      </Badge>
    );
  }
  return (
    <span className="text-muted-foreground text-[11px] font-mono">
      {new Date(examDate).toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "short",
      })}
    </span>
  );
}

export function CourseCard({ course, onOpen, onEdit }: CourseCardProps) {
  const isArchived = course.isArchived;

  return (
    <Card
      onClick={() => onOpen(course)}
      className={cn(
        "relative cursor-pointer transition-all duration-200 group p-0 overflow-hidden",
        "hover:shadow-md hover:-translate-y-px active:translate-y-0 active:shadow-none",
        isArchived && "opacity-60",
      )}
    >
      {/* Barra de color lateral */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ backgroundColor: course.colorHex }}
      />

      <div className="pl-5 pr-4 pt-4 pb-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="h-2.5 w-2.5 rounded-full flex-shrink-0 mt-0.5"
              style={{ backgroundColor: course.colorHex }}
            />
            <p className="font-semibold text-foreground text-sm leading-tight truncate">
              {course.name}
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {isArchived && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                Archivado
              </Badge>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(course);
              }}
              className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-150"
              aria-label="Editar curso"
            >
              <i className="ti ti-pencil text-[14px]" />
            </button>
          </div>
        </div>

        {/* Exam date */}
        <div className="flex items-center gap-1.5 mb-3">
          {course.examDate ? (
            <>
              <i className="ti ti-calendar text-[12px] text-muted-foreground" />
              <ExamCountdown examDate={course.examDate} />
            </>
          ) : (
            <span className="text-muted-foreground text-[11px]">
              Sin fecha de examen
            </span>
          )}
        </div>

        {/* Progress */}
        <div className="space-y-1">
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${course.progressPercentage}%`,
                backgroundColor: course.colorHex,
                opacity: 0.85,
              }}
            />
          </div>
          <p className="text-muted-foreground text-[11px] font-mono text-right">
            {course.progressPercentage}%
          </p>
        </div>
      </div>
    </Card>
  );
}
