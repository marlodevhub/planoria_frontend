import { useState, useMemo } from "react";
import { useCourses, useCourse } from "../hooks";
import { CourseCard } from "../components/CourseCard";
import { EmptyState } from "../components/EmptyState";
import { CourseFormModal } from "../components/CourseFormModal";
import { CourseDetailModal } from "../components/CourseDetailModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Course } from "../types/course.types";

function CoursesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-[108px] rounded-xl bg-muted animate-pulse"
          style={{ animationDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  );
}

type Tab = "active" | "archived";
type ModalMode = "create" | "edit" | "detail" | null;

export function CoursesPage() {
  const { data: courses, isLoading, isError } = useCourses();
  const [tab, setTab] = useState<Tab>("active");
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: courseDetail } = useCourse(selectedId ?? 0, {
    enabled: selectedId !== null,
  });

  const activeCourses = useMemo(
    () => courses?.filter((c) => !c.isArchived) ?? [],
    [courses],
  );
  const archivedCourses = useMemo(
    () => courses?.filter((c) => c.isArchived) ?? [],
    [courses],
  );

  const visibleCourses = tab === "active" ? activeCourses : archivedCourses;
  const hasCourses = (courses?.length ?? 0) > 0;

  const openCreate = () => {
    setSelectedId(null);
    setModalMode("create");
  };

  const openEdit = (course: Course | { id: number }) => {
    setSelectedId(course.id);
    setModalMode("edit");
  };

  const openDetail = (course: Course) => {
    setSelectedId(course.id);
    setModalMode("detail");
  };

  const closeAll = () => {
    setModalMode(null);
    setSelectedId(null);
  };

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Cursos
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {isLoading
              ? "Cargando..."
              : courses?.length
                ? `${activeCourses.length} activo${activeCourses.length !== 1 ? "s" : ""}${archivedCourses.length ? ` · ${archivedCourses.length} archivado${archivedCourses.length !== 1 ? "s" : ""}` : ""}`
                : "Tus materias y exámenes"}
          </p>
        </div>
        {hasCourses && (
          <Button onClick={openCreate} size="sm">
            <i className="ti ti-plus text-[15px]" />
            Nuevo curso
          </Button>
        )}
      </div>

      {/* Tabs (siempre visibles) */}
      {!isLoading && (
        <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
          <TabsList className="h-8">
            <TabsTrigger value="active" className="text-xs px-3 h-6">
              Activos
              {activeCourses.length > 0 && (
                <span className="ml-1.5 text-[10px] font-mono bg-muted-foreground/15 rounded px-1">
                  {activeCourses.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="archived" className="text-xs px-3 h-6">
              Archivados
              {archivedCourses.length > 0 && (
                <span className="ml-1.5 text-[10px] font-mono bg-muted-foreground/15 rounded px-1">
                  {archivedCourses.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      {/* Loading */}
      {isLoading && <CoursesSkeleton />}

      {/* Error */}
      {isError && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/15">
          <i className="ti ti-alert-circle text-destructive text-[18px] flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">
              No se pudieron cargar los cursos
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Revisá tu conexión e intentá de nuevo
            </p>
          </div>
        </div>
      )}

      {/* Empty */}
      {!isLoading &&
        !isError &&
        visibleCourses.length === 0 &&
        (tab === "active" ? (
          <EmptyState onNew={openCreate} />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <i className="ti ti-archive text-[22px] text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground mb-1">Sin archivados</p>
            <p className="text-muted-foreground text-sm">
              Los cursos archivados aparecerán acá
            </p>
          </div>
        ))}

      {/* Grid */}
      {!isLoading && !isError && visibleCourses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onOpen={openDetail}
            />
          ))}
        </div>
      )}

      {/* Modales — nunca dos abiertos al mismo tiempo */}
      <CourseDetailModal
        course={courseDetail ?? null}
        open={modalMode === "detail" && !!courseDetail}
        onClose={closeAll}
        onEdit={() => openEdit(courseDetail!)}
      />
      <CourseFormModal
        course={modalMode === "edit" ? (courseDetail ?? null) : null}
        open={modalMode === "create" || modalMode === "edit"}
        onClose={closeAll}
      />
    </div>
  );
}