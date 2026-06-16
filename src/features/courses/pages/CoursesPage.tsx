import { useState } from "react";
import { useCourses, useCourse } from "../hooks";
import { CourseCard } from "../components/CourseCard";
import { EmptyState } from "../components/EmptyState";
import { CourseFormModal } from "../components/CourseFormModal";
import { CourseDetailModal } from "../components/CourseDetailModal";
import { Button } from "@/components/ui/button";
import type { Course } from "../types/course.types";

export function CoursesPage() {
  const { data: courses, isLoading, isError } = useCourses();
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: courseDetail } = useCourse(selectedId ?? 0, {
    enabled: selectedId !== null,
  });

  const openCreate = () => {
    setSelectedId(null);
    setFormModalOpen(true);
  };
  const openEdit = (course: Course) => {
    setSelectedId(course.id);
    setDetailModalOpen(false);
    setFormModalOpen(true);
  };
  const openDetail = (course: Course) => {
    setSelectedId(course.id);
    setDetailModalOpen(true);
  };
  const closeAll = () => {
    setFormModalOpen(false);
    setDetailModalOpen(false);
    setSelectedId(null);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cursos</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {courses?.length
              ? `${courses.length} curso${courses.length !== 1 ? "s" : ""}`
              : "Tus materias y exámenes"}
          </p>
        </div>
        <Button onClick={openCreate} size="sm">
          <i className="ti ti-plus text-[16px]" />
          Nuevo curso
        </Button>
      </div>

      {/* Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <i className="ti ti-alert-circle text-destructive text-[20px]" />
          <p className="text-sm text-foreground">
            No se pudieron cargar los cursos. Intentá de nuevo.
          </p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && courses?.length === 0 && (
        <EmptyState onNew={openCreate} />
      )}

      {/* Grid */}
      {!isLoading && !isError && !!courses?.length && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onOpen={openDetail}
              onEdit={openEdit}
            />
          ))}
        </div>
      )}

      {/* Modales */}
      {detailModalOpen && courseDetail && (
        <CourseDetailModal
          course={courseDetail}
          onClose={closeAll}
          onEdit={() => openEdit(courseDetail)}
        />
      )}
      {formModalOpen && (
        <CourseFormModal
          course={selectedId ? (courseDetail ?? null) : null}
          onClose={closeAll}
        />
      )}
    </div>
  );
}
