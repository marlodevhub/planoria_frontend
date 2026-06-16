import { Card } from "@/components/ui/card";
import type { Course } from "../types/course.types";

interface CourseCardProps {
  course: Course;
  onOpen: (course: Course) => void;
  onEdit: (course: Course) => void;
}

export function CourseCard({ course, onOpen, onEdit }: CourseCardProps) {
  return (
    <Card className="hover:border-primary/50 cursor-pointer transition-all duration-200 group p-5">
      <div onClick={() => onOpen(course)} className="h-full w-full">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: course.colorHex }}
            />
            <p className="font-semibold text-foreground">{course.name}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(course);
            }}
            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <i className="ti ti-pencil text-[15px]" />
          </button>
        </div>
        {course.examDate && (
          <p className="text-muted-foreground text-xs font-mono mb-3">
            Examen: {new Date(course.examDate).toLocaleDateString("es-PE")}
          </p>
        )}
        <div className="h-1.5 bg-border rounded-full overflow-hidden mb-1">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${course.progressPercentage}%` }}
          />
        </div>
        <p className="text-muted-foreground text-xs font-mono">
          {course.progressPercentage}% completado
        </p>
      </div>
    </Card>
  );
}
